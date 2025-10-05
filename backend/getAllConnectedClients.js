import redis from "./services/redis.js";

const getUsernameFromSocketId = async (socketId) => {
  return await redis.hget("userToUsernameMap", socketId);
};

const getAllConnectedClients = async (roomId, io) => {
  // const socketIds = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
  const socketIds = await redis.smembers(`rooms:${roomId}`);
  // console.log(socketIds);

  const clients = await Promise.all(
    socketIds.map(async (socketId) => {
      const username = await getUsernameFromSocketId(socketId);
      return {
        socketId,
        // username: userSocketMap[socketId],
        username: username,
      };
    })
  );
  // console.log(clients);
  return clients;
};

export default getAllConnectedClients;
