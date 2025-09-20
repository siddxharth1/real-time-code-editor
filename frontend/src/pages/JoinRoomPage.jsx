import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { MagicCard } from "../components/joinRoomPage/MagicCard";

const JoinRoomPage = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isNewRoom, setIsNewRoom] = useState(false);
  // http://localhost:5173/join?roomId=fbcd8a69-c0c1-4d1c-85fe-e5723a7295ea
  // add this roomId in a const variable

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("roomId");
    if (roomId) {
      setRoomId(roomId);
    }
  }, [])


  const navigate = useNavigate();

  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };
  };

  const handleCreateNewRoom = () => {
    const id = uuidV4();
    setRoomId(id);
    setIsNewRoom(true);
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();

    if (!roomId || !username) {
      alert("Please enter a room id and username");
      return;
    }

    const isCreator = isNewRoom;
    const deviceInfo = isCreator ? getDeviceInfo() : null;

    navigate(`/editor/${roomId}`, {
      state: { 
        username,
        isCreator,
        deviceInfo
      },
    });
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center ">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
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
            <path d="M.5 20V.5H20" fill="none" strokeDasharray="0"></path>
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
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
              <span>Don&apos;t have an invite? </span>
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
