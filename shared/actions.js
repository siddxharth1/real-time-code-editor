// Shared actions contract used by both backend and frontend (ESM)
// Usage:
// - ESM: import Actions, { Actions as ActionsNamed } from '../shared/actions.js';

export const Actions = {
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
export default Actions;
