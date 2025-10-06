import { useEffect, useRef, useState } from "react";
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
import { FiLink } from "react-icons/fi";

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
  Badge,
} from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { addToast } from "@heroui/toast";
import { TbTrash } from "react-icons/tb";
import AddNewFile from "../components/AddNewFile";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const drawingBoardData = useRef(null);

  const [files, setFiles] = useState([])
  const [currFile, setCurrFile] = useState("")
  const [code, setCode] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const location = useLocation();
  const reactNavigator = useNavigate();

  const { roomId } = useParams();
  console.log(roomId);
  const [clients, setClients] = useState([]);

  const [showDrawingBoard, setShowDrawingBoard] = useState(false);
  const [showDrawingOverlay, setShowDrawingOverlay] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);

  const handleShowOverlay = () => {
    setShowDrawingOverlay(true);
    setShowDrawingBoard(true);
  };

  // const handleOpen = (overlay) => {
  //   if (overlay) {
  //     setShowDrawingOverlay(true);
  //   }
  //   onOpen();
  // };
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

  const handleKickUser = (socketId) => {
    if (!isAdmin) return;
    socketRef.current.emit(Actions.KICK_USER, {
      roomId,
      socketId,
    });
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      socketRef.current.emit(Actions.JOIN, {
        roomId,
        username: location.state?.username,
        isCreator: location.state?.isCreator,
        deviceInfo: location.state?.deviceInfo
      });

      socketRef.current.on(Actions.FILE.SYNC, (data) => {
        setFiles(data)
        if (data.length == 0) {
          reactNavigator("/")
          return
        }
        if (currFile == "") {
          setCurrFile(data[0])
          socketRef.current.emit(Actions.FILE.OPEN, {
            file: data[0],
            roomId
          })
        }
      })

      socketRef.current.on(Actions.FILE.OPEN, ({ file, code }) => {
        setCode(code)
        setCurrFile(file)
      })

      socketRef.current.emit(Actions.FILE.SYNC, {
        newClientSocket: socketRef.current.id,
        roomId
      })

      socketRef.current.on(Actions.JOINED, (data) => {
        setClients(data.clients);
        setAdminInfo(data.admin);
        // console.log()
        // Check if current user is admin
        if (data?.admin?.socketId === socketRef.current.id) {
          setIsAdmin(true);
        }

        if (data.socketId === socketRef.current.id) return;

        console.log(data);
        addToast({
          title: `${data.username} joined the room`,
        })

        socketRef.current.emit(Actions.SYNC_CODE, {
          code: codeRef.current,
          newClientSocket: data.socketId,
        });
      });

      socketRef.current.on(Actions.DISCONNECTED, (clientDisconnected) => {
        console.log(clientDisconnected);
        console.log(`${clientDisconnected.username} left the room`);
        setClients((prev) =>
          prev.filter(
            (client) => client.socketId !== clientDisconnected.socketId
          )
        );
      });

      socketRef.current.on(Actions.KICKED, () => {

        addToast({
          title: "You have been kicked from the room by the admin",
          type: "error",
        });
        reactNavigator("/");
      });
    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(Actions.JOINED);
      socketRef.current.off(Actions.DISCONNECTED);
      socketRef.current.off(Actions.KICKED);
      socketRef.current.off(Actions.FILE.SYNC);
    };
  }, []);

  const leaveRoomHandler = () => {
    reactNavigator("/");
  };

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join?roomId=${roomId}`);
    addToast({
      title: "Link copied to clipboard",
      type: "success",
    });
  }

  const handleAddNewFile = (newFile) => {
    setFiles((prev) => [...prev, newFile])
    socketRef.current.emit(Actions.FILE.ADD, { file: newFile, roomId })
  }

  const handleDeleteFile = (file) => {
    setFiles((prev) => prev.filter(val => val != file))
    socketRef.current.emit(Actions.FILE.DELETE, { file, roomId })
    if (Object.keys(files).length == 1) reactNavigator("/")
    if (file == currFile) {
      setCurrFile(files[Object.keys(files)[0]])
    }
  }

  return (
    <div className="px-5 py-3 h-[100vh]">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">CodeBuddies</h1>
        {isAdmin && (
          <div className="flex items-center gap-2">
            <Badge content="Admin" color="primary" />
            {/* Add admin-only controls here */}
          </div>
        )}
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
                  {() => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Connected Users
                      </ModalHeader>
                      <ModalBody>
                        {clients.map((client) => (
                          <div
                            key={client.socketId}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                              <div>
                                <p>{client.username}</p>
                                {adminInfo?.socketId === client.socketId && (
                                  <Badge content="Admin" color="primary" variant="flat" size="sm" />
                                )}
                              </div>
                            </div>
                            {isAdmin && client.socketId !== socketRef.current.id && (
                              <Button
                                color="danger"
                                size="sm"
                                variant="flat"
                                onClick={() => handleKickUser(client.socketId)}
                              >
                                Kick
                              </Button>
                            )}
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
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" onClick={onOpen} />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </div>
          </div>
          <div className="flex gap-3">
            <Snippet symbol="Room id:">{roomId}</Snippet>
            <Button onClick={handleLinkCopy} isIconOnly>
              <FiLink />
            </Button>
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
      <main className="flex gap-3 h-[85vh]">
        <div className="flex flex-col border-r border-zinc-600 pr-3 min-w-[15vw] text-center">
          <AddNewFile action={handleAddNewFile} />
          {
            files.map((file) => (
              <div key={file} className={`m-0 flex items-center justify-between cursor-pointer ${file === currFile ? "bg-white/20" : "bg-white/10"} p-2 rounded hover:bg-white/20 transition-colors duration-300`} onClick={() => {
                socketRef.current.emit(Actions.FILE.OPEN, {
                  file,
                  roomId
                })
              }}>
                {file}
                <TbTrash onClick={() => handleDeleteFile(file)} className="hover:bg-red-50 text-red-400 p-1 rounded transition-colors size-6" />
              </div>
            ))
          }
        </div>
        <CodeEditor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => (codeRef.current = code)}
          username={location.state?.username}
          currFile={currFile}
          defaultValue={code || ""}
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
