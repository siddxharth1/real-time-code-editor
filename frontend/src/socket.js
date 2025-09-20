import { io } from "socket.io-client";
/**
 * Initializes and returns a socket.io client instance.
 * Uses Vite environment variable `VITE_BACKEND_URL`.
 */

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(import.meta.env.VITE_BACKEND_URL, options);
};
