const { Redis } = require("ioredis");
require("dotenv").config();

const redis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379"
);

module.exports = redis;
