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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const drawingBoardData = useRef(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleOpen = (overlay) => {
    if (overlay) {
      setShowDrawingOverlay(true);
    }
    onOpen();
  };
  // const handleHideCanvas = () => {
  //   setShowDrawingOverlay(false);
  // };

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

  const leaveRoomHandler = () => {
    reactNavigator("/");
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="px-5 py-3 h-[100vh]">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Code together</h1>
        <div className="flex gap-5">
          <Button onPress={handleShowOverlay}>Overlay</Button>
          <Button onPress={handleShowDrawingBoard}>Draw Board</Button>
        </div>
      </div>
      <Divider className="my-3" />
      <aside className="my-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <p className="font-semibold text-lg">Connected users: </p>
            <div>
              <Modal
                className="dark text-white"
                size={"sm"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Connected Users
                      </ModalHeader>
                      <ModalBody>
                        {clients.map((client) => (
                          <div
                            key={client.socketId}
                            className="flex items-center gap-3"
                          >
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                            <p>{client.username}</p>
                          </div>
                        ))}
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
              <AvatarGroup
                max={3}
                renderCount={(count) => (
                  <Button isIconOnly radius="full" onPress={onOpen}>
                    {count}
                  </Button>
                )}
              >
                {clients.map((client) => (
                  <Tooltip content={client.username} key={client.username}>
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  </Tooltip>
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
        <ChatBox
          socketRef={socketRef}
          roomId={roomId}
          username={location.state?.username}
        />
      </aside>
      <main>
        <CodeEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
        />
      </main>

      <div>
        {showDrawingBoard && (
          <Button
            className="z-[9999] absolute top-4 right-28 border border-red-600"
            isIconOnly
            variant="light"
            color="danger"
            onClick={handleHideCanvas}
            radius="full"
          >
            <IoClose />
          </Button>
        )}
        <AnimatePresence>
          {showDrawingBoard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} // Adjust duration as needed
            >
              <DrawingBoard
                drawingBoardData={drawingBoardData}
                showDrawingOverlay={showDrawingOverlay}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* <button onClick={() => console.log(drawingBoardData.current)}>
          Show drawingBoardData
        </button> */}
      </div>
    </div>
  );
};

export default EditorPage;
