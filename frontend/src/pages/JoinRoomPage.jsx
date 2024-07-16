import { Button, Input, Link as NextUILink } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { MagicCard } from "../components/MagicCard";

const JoinRoomPage = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleCreateNewRoom = (e) => {
    // e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    console.log(id);
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    console.log(roomId + " " + username);

    if (!roomId || !username) {
      alert("Please enter a room id and username");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: { username },
    });
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center ">
      <svg
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      >
        <defs>
          <pattern
            id=":r29:"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path d="M.5 20V.5H20" fill="none" stroke-dasharray="0"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#:r29:)"
        ></rect>
      </svg>
      <MagicCard className="p-5 w-fit">
        <div className="w-[80vw] max-w-96">
          <h1 className="text-3xl font-bold">Join Room</h1>
          <p className="text-zinc-400">Join room and code together</p>
          <form action="" className="p-3 flex gap-3 flex-col">
            <div>
              <Input
                variant="faded"
                label="Room Id"
                value={roomId}
                onValueChange={setRoomId}
                isRequired
              />
            </div>
            <div>
              <Input
                variant="faded"
                label="Username"
                value={username}
                onValueChange={setUsername}
                isRequired
              />
            </div>
            <Button
              type="submit"
              variant="ghost"
              color="success"
              size="lg"
              onClick={joinRoomHandler}
            >
              Join Room
            </Button>
            {/* <button type="submit" onClick={joinRoomHandler}>
            Join Room
          </button> */}
            <div>
              <span>Don't have an invite? </span>
              <span
                className="text-blue-600 cursor-pointer hover:text-blue-800 transition-all"
                onClick={handleCreateNewRoom}
              >
                Create a new room
              </span>
            </div>
          </form>
        </div>
      </MagicCard>
    </div>
  );
};

export default JoinRoomPage;
