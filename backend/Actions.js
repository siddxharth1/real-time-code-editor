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
  FILE: {
    ADD: "add-file",
    DELETE: "delete-file",
    RENAME: "rename-file",
    SYNC: "sync-file"
  }
};

module.exports = Actions;
