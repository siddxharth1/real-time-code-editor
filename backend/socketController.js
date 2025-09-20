const Actions = require("./Actions");
const getAllConnectedClients = require("./getAllConnectedClients");
const redis = require("./services/redis");

const getUsernameFromSocketId = async (socketId) => {
  return await redis.hget("userToUsernameMap", socketId);
};

const socketController = (io) => {
  io.on("connection", (socket) => {

    socket.on(Actions.JOIN, async ({ roomId, username, isCreator, deviceInfo }) => {
      // Store user info
      redis.hset("userToUsernameMap", socket.id, username);
      redis.sadd(`rooms:${roomId}`, socket.id);
      
      // Check if room already has an admin
      const existingAdminData = await redis.hget(`room:${roomId}:admin`, "info");
      
      // If user is creator and no admin exists, make them admin
      if (isCreator && !existingAdminData) {
        const adminInfo = {
          socketId: socket.id,
          username,
          deviceInfo
        };
        await redis.hset(`room:${roomId}:admin`, "info", JSON.stringify(adminInfo));
        // console.log(`Set ${username} as admin for room ${roomId}`);
      }

      socket.join(roomId);

      // Get admin info to send to clients
      const adminData = await redis.hget(`room:${roomId}:admin`, "info");
      const admin = adminData ? JSON.parse(adminData) : null;

      // Emit joined event with admin info
      io.to(roomId).emit(Actions.JOINED, {
        clients: await getAllConnectedClients(roomId, io),
        username,
        socketId: socket.id,
        admin
      });
    });

    socket.on("disconnecting", async () => {
      const rooms = [...socket.rooms];

      for (const roomId of rooms) {
        if (roomId === socket.id) continue; // Skip socket's own room

        // Check if disconnecting user is admin
        const adminData = await redis.hget(`room:${roomId}:admin`, "info");
        const admin = adminData ? JSON.parse(adminData) : null;

        if (admin?.socketId === socket.id) {
          // Clear admin for this room
          await redis.hdel(`room:${roomId}:admin`, "info");
          
          // Get remaining clients
          const remainingClients = await getAllConnectedClients(roomId, io);
          
          // If there are other clients, make the first one admin
          if (remainingClients.length > 0) {
            const newAdmin = remainingClients[0];
            const newAdminInfo = {
              socketId: newAdmin.socketId,
              username: newAdmin.username,
              deviceInfo: null
            };
            await redis.hset(`room:${roomId}:admin`, "info", JSON.stringify(newAdminInfo));
            
            // Notify room about new admin
            io.to(roomId).emit(Actions.JOINED, {
              clients: remainingClients,
              admin: newAdminInfo
            });
          }
        }

        // Regular disconnect handling
        redis.srem(`rooms:${roomId}`, socket.id);
        socket.in(roomId).emit(Actions.DISCONNECTED, {
          socketId: socket.id,
          username: await getUsernameFromSocketId(socket.id),
        });
      }

      redis.hdel("userToUsernameMap", socket.id);
      socket.leaveAll();
    });

    socket.on(Actions.CODE_CHANGE, ({ roomId, code }) => {
      socket.in(roomId).emit(Actions.CODE_CHANGE, { code });
    });

    socket.on(Actions.SYNC_CODE, ({ code, newClientSocket }) => {
      io.to(newClientSocket).emit(Actions.CODE_CHANGE, { code });
    });

    socket.on(Actions.SEND_CHAT, ({ roomId, message, username }) => {
      socket.in(roomId).emit(Actions.CHAT, { message, username });
    });

    socket.on(Actions.CURSOR_CHANGE, ({ roomId, username, position }) => {
      socket.in(roomId).emit(Actions.CURSOR_CHANGE, {
        username,
        position,
      });
    });

    socket.on(Actions.LANGUAGE_CHANGE, ({ roomId, language }) => {
      redis.hset(`room:${roomId}`, "language", JSON.stringify(language));
      socket.in(roomId).emit(Actions.LANGUAGE_CHANGE, { language });
    });

    socket.on(Actions.KICK_USER, async ({ roomId, socketId }) => {
      // Verify the sender is admin
      const adminData = await redis.hget(`room:${roomId}:admin`, "info");
      const admin = adminData ? JSON.parse(adminData) : null;
      
      if (admin?.socketId === socket.id) {
        // Get the username of the kicked user
        const username = await getUsernameFromSocketId(socketId);
        
        // Emit kick event to the specific user
        io.to(socketId).emit(Actions.KICKED);
        
        // Remove user from room in Redis
        await redis.srem(`rooms:${roomId}`, socketId);
        
        // Remove user from room
        const kickedSocket = io.sockets.sockets.get(socketId);
        if (kickedSocket) {
          kickedSocket.leave(roomId);
        }
        
        // Notify other clients about the disconnection
        io.to(roomId).emit(Actions.DISCONNECTED, {
          socketId,
          username,
        });
        
        // Get updated client list after kick
        const updatedClients = await getAllConnectedClients(roomId, io);
        
        // Send updated client list to all remaining users
        io.to(roomId).emit(Actions.JOINED, {
          clients: updatedClients,
          admin: admin,
          username: "System",
          socketId: "system"
        });
        
        // console.log(`User ${username} (${socketId}) was kicked from room ${roomId}`);
      } else {
        // console.log(`Unauthorized kick attempt from ${socket.id} in room ${roomId}`);
      }
    });
  });
};

module.exports = socketController;
