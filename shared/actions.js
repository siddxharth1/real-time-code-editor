// Shared actions contract used by both backend (Node.js CJS) and frontend (Vite ESM)
// Export pattern supports:
// - CommonJS: const Actions = require('../shared/actions');
// - ESM via Vite CJS interop: import { Actions } from '@shared/actions';

const Actions = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  CODE_CHANGE: "code-change",
  SYNC_CODE: "sync-code",
  LEAVE: "leave",
  SEND_CHAT: "send-chat",
  CHAT: "chat",
  CURSOR_CHANGE: "cursor-change",
  LANGUAGE_CHANGE: "language-change",
  KICK: "kick",
  KICK_USER: "kick_user",
  KICKED: "kicked",
};

// CommonJS default export
module.exports = Actions;
// Also expose a named export for better ESM interop in bundlers like Vite
module.exports.Actions = Actions;
