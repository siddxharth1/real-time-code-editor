import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server } from "socket.io";
import express from "express";

import socketController from "./socketController.js";
import redis from "./services/redis.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";

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
