import React, { useEffect, useRef, useState } from "react";
import { Actions } from "../Action";

const ChatBox = ({ socketRef, roomId, username }) => {
  const [showChat, setShowChat] = useState(false);
  const messageRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CHAT, (message) => {
        console.log(message);
        // setMessages([...messages, message]);
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      socketRef.current.off(Actions.CHAT);
    };
  }, [socketRef.current]);

  const handleSendChat = (e) => {
    e.preventDefault();
    socketRef.current.emit(Actions.SEND_CHAT, {
      roomId,
      message: messageRef.current.value,
      username,
    });
    setMessages([...messages, { message: messageRef.current.value, username }]);
    messageRef.current.value = "";
  };
  return (
    <div>
      <h1>ChatBox</h1>
      <button onClick={() => setShowChat(!showChat)}>
        {showChat ? "Hide Chat" : "Show Chat"}
      </button>

      <div>
        {showChat && (
          <div>
            <div>
              {messages.map((msg, index) => {
                return (
                  <div key={index}>
                    <p>
                      {msg.username}: {msg.message}
                    </p>
                  </div>
                );
              })}
            </div>

            <form>
              <input type="text" ref={messageRef} />
              <button type="submit" onClick={handleSendChat}>
                send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
