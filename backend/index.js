require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");

const socketController = require("./socketController");
const redis = require("./services/redis");
const { createAdapter } = require("@socket.io/redis-streams-adapter");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3001;

const io = new Server(server, {
  adapter: createAdapter(redis),
});

socketController(io);

// Log Redis connection for main Redis client
redis.on("connect", async () => {
  console.log(`Connected to Redis from ${port}`);
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
