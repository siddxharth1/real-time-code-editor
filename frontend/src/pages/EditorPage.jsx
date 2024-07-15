import React, { useEffect, useRef, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import { initSocket } from "../socket";
import { Actions } from "../Action";
import ChatBox from "../components/ChatBox";
import DrawingBoard from "./../components/DrawingBoard";
import {
  Avatar,
  AvatarGroup,
  Button,
  Divider,
  Snippet,
  Tooltip,
} from "@nextui-org/react";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const drawingBoardData = useRef(null);

  const location = useLocation();
  const reactNavigator = useNavigate();

  const { roomId } = useParams();
  console.log(roomId);
  const [clients, setClients] = useState([]);

  const [showDrawingBoard, setShowDrawingBoard] = useState(false);
  const [showDrawingOverlay, setShowDrawingOverlay] = useState(false);

  const handleShowOverlay = () => {
    setShowDrawingOverlay(true);
    setShowDrawingBoard(true);
  };

  const handleShowDrawingBoard = () => {
    setShowDrawingBoard(true);
    setShowDrawingOverlay(false);
  };

  const handleHideCanvas = () => {
    setShowDrawingBoard(false);
  };

  const handleError = (err) => {
    console.error(err);
    reactNavigator("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      socketRef.current.emit(Actions.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(Actions.JOINED, (newClient) => {
        setClients(newClient.clients);
        if (newClient.socketId === socketRef.current.id) {
          return;
        }
        console.log(newClient);
        window.alert(`${newClient.username} joined the room`);

        socketRef.current.emit(Actions.SYNC_CODE, {
          code: codeRef.current,
          newClientSocket: newClient.socketId,
        });
      });

      socketRef.current.on(Actions.DISCONNECTED, (clientDisconnected) => {
        window.alert(`${clientDisconnected.username} left the room`);
        setClients((prev) =>
          prev.filter(
            (client) => client.socketId !== clientDisconnected.socketId
          )
        );
      });
    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(Actions.JOINED);
      socketRef.current.off(Actions.DISCONNECTED);
    };
  }, []);

  const copyRoomIdHandler = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      window.alert("Room id copied to clipboard");
    } catch (error) {
      console.error(error);
    }
  };

  const leaveRoomHandler = () => {
    reactNavigator("/");
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl">Code together</h1>
      <Divider className="my-4" />
      <aside className="">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <p className="font-semibold text-lg">Connected users: </p>
            <div>
              <AvatarGroup max={5}>
                {clients.map((client) => (
                  <>
                    <Tooltip content={client.username}>
                      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                    </Tooltip>
                  </>
                ))}
              </AvatarGroup>
            </div>
          </div>
          <div className="flex gap-3">
            <Snippet symbol="Room id:">{roomId}</Snippet>
            <Button color="danger" onClick={leaveRoomHandler}>
              Leave room
            </Button>
          </div>
        </div>
        {/* <ChatBox
          socketRef={socketRef}
          roomId={roomId}
          username={location.state?.username}
        /> */}
      </aside>
      <main>
        <CodeEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
        />
      </main>
      <div>
        <button onClick={handleShowDrawingBoard}>Show Drawing Board</button>
        <button onClick={handleShowOverlay}>Show OverLay</button>
        <button onClick={handleHideCanvas}>Hide Canvas</button>
        {showDrawingBoard && (
          <DrawingBoard
            drawingBoardData={drawingBoardData}
            showDrawingOverlay={showDrawingOverlay}
          />
        )}
        <button onClick={() => console.log(drawingBoardData.current)}>
          Show drawingBoardData
        </button>
      </div>
    </div>
  );
};

export default EditorPage;
