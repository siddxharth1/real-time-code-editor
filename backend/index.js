const Actions = require("./Actions");

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const userSocketMap = {};
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(Actions.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log(clients);

    //sending the message to each client individually
    clients.forEach((client) => {
      io.to(client.socketId).emit(Actions.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });

    //attempting to broadcast a message to all clients in the room except the sender
    // socket.in(roomId).emit(Actions.JOINED, {
    //   clients: getAllConnectedClients(roomId),
    //   username,
    //   socketId: socket.id,
    // });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(Actions.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
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
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
