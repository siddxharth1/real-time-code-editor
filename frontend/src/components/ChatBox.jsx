import React, { useEffect, useRef, useState } from "react";
import { Actions } from "../Action";
import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
} from "@nextui-org/react";
import { PiChatFill } from "react-icons/pi";
import { LuSendHorizonal } from "react-icons/lu";

const ChatBox = ({ socketRef, roomId, username }) => {
  const [showChat, setShowChat] = useState(false);
  const messageRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [toSendMessage, setToSendMessage] = useState("");

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CHAT, (message) => {
        // console.log(message);
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
    if (!toSendMessage) return;
    socketRef.current.emit(Actions.SEND_CHAT, {
      roomId,
      message: toSendMessage,
      username,
    });
    setMessages([...messages, { message: toSendMessage, username }]);
    setToSendMessage("");
  };
  {
    /* <Badge content={1} color="primary">
    <Button className="rounded-full h-24 w-24">Show Chat</Button>
  </Badge> */
  }
  return (
    <div>
      {/* <h1>ChatBox</h1>
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
              <Input
                type="text"
                variant="faded"
                onValueChange={setToSendMessage}
                value={toSendMessage}
                size="lg"
                endContent={
                  <Button
                    type="submit"
                    className="h-9"
                    onClick={handleSendChat}
                  >
                    Send
                  </Button>
                }
              />
            </form>
          </div>
        )}
      </div> */}
      <Popover offset={10}>
        <PopoverTrigger className="absolute bottom-24 right-5">
          <Button
            color="secondary"
            variant="flat"
            className="h-20 border-1 border-purple-800"
            radius="full"
          >
            <Badge content={messages.length} color="primary">
              <PiChatFill size={34} />
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="dark bg-neutral-900 ">
          <div className="py-2 px-1 max-h-[70vh] overflow-auto">
            <h1 className="font-bold text-lg text-white">Chats</h1>
            <div className="mb-2 flex flex-col gap-2">
              {messages.length === 0 && (
                <p className="text-center text-zinc-600">No messages yet</p>
              )}
              {messages.map((msg, index) => {
                return (
                  <div key={index} className="flex gap-2 ">
                    <Avatar size="sm" />
                    <p className="text-white max-w-96 mt-1">
                      {msg.username}: {msg.message}
                    </p>
                  </div>
                );
              })}
            </div>

            <form className="sticky bottom-0">
              <Input
                type="text"
                variant="faded"
                onValueChange={setToSendMessage}
                value={toSendMessage}
                size="lg"
                className="text-white"
                endContent={
                  <Button
                    type="submit"
                    color="success"
                    variant="ghost"
                    className="h-9"
                    onClick={handleSendChat}
                    endContent={<LuSendHorizonal className=" text-9xl" />}
                  >
                    Send
                  </Button>
                }
              />
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatBox;
