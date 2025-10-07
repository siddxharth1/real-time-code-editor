import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { Actions } from "../Action";
import CodeOutput from "./CodeOutput";

import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Button } from "@nextui-org/react";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";
import { IoCodeDownloadOutline } from "react-icons/io5";

const CodeEditor = ({ socketRef, roomId, onCodeChange, username, currFile, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const [language, setLanguage] = useState({
    language: "javascript",
    version: "18.15.0",
  });
  const editorRef = useRef();
  const monacoRef = useRef();
  const [remoteCursors, setRemoteCursors] = useState({});
  const decorationsRef = useRef([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const currFileRef = useRef(currFile);
  const valueRef = useRef(value);

  useEffect(() => { currFileRef.current = currFile; }, [currFile]);
  useEffect(() => { valueRef.current = value; }, [value]);

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue, currFile])

  console.log(currFile, "currFile in editor")

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CODE_CHANGE, ({ code, file }) => {
        console.log("CODE CHANGE Incoming", currFile);
        if (code === null) return;
        if (code === valueRef.current) return;
        if (file !== currFileRef.current) return;
        setValue(code);
      });

      socketRef.current.on(Actions.CURSOR_CHANGE, ({ username, position }) => {
        setRemoteCursors((prev) => ({ ...prev, [username]: position }));
      });

      socketRef.current.on(Actions.LANGUAGE_CHANGE, ({ language }) => {
        setLanguage(language);
        // setValue(Code_Snippets[language?.language] || "");
      });

      socketRef.current.emit(Actions.FILE.SYNC, {
        newClientSocket: socketRef.current.id,
        roomId
      })

    }

    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
      socketRef.current.off(Actions.CURSOR_CHANGE);
      socketRef.current.off(Actions.LANGUAGE_CHANGE);
    };
  }, [socketRef.current]);

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const editor = editorRef.current;
      const monaco = monacoRef.current;

      const newDecorations = Object.keys(remoteCursors).map((username) => {
        const position = remoteCursors[username];
        console.log(
          `Adding decoration for ${username} at line ${position.lineNumber}, column ${position.column}`
        );
        return {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          options: {
            className: " border-l-2 border-red-700 h-full",
            title: username,
          },
        };
      });

      decorationsRef.current = editor.deltaDecorations(
        decorationsRef.current,
        newDecorations
      );
    }
  }, [remoteCursors]);

  useEffect(() => {
    if (!socketRef.current) return;
    if (!currFile) return; // don't emit if file is empty

    const id = setTimeout(() => {
      onCodeChange(value);
      // double-check current file ref before emitting
      const current = currFileRef.current;
      if (!current) return;
      socketRef.current.emit(Actions.CODE_CHANGE, {
        roomId,
        code: value,
        file: current,
      });
    }, 300);

    return () => clearTimeout(id);
  }, [value, currFile, roomId, onCodeChange, socketRef]);

  const onLanguageChange = (language) => {
    setLanguage(language);
    socketRef.current.emit(Actions.LANGUAGE_CHANGE, {
      roomId,
      language,
    });
  };

  // const handleEditorChange = (value, event) => {
  //   console.log("event", event);
  //   console.log("value", value);
  //   onCodeChange(value);

  //   socketRef.current.emit(Actions.CODE_CHANGE, {
  //     roomId,
  //     code: value,
  //   });
  // };

  const handleCursorChange = (e) => {
    const position = editorRef.current.getPosition();
    console.log(`Line: ${position.lineNumber}, Column: ${position.column}`);
    socketRef.current.emit(Actions.CURSOR_CHANGE, {
      roomId,
      username: username,
      position,
    });
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const [sizes, setSizes] = useState([400, "30%", "auto"]);

  const handleDownloadCode = () => {
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.txt";
    a.click();
  }
  return (
    <div className="border-1 border-zinc-600 rounded-xl bg-neutral-900 w-full">
      <div className="p-2 flex justify-between">
        <LanguageSelector
          language={language}
          onLanguageChange={onLanguageChange}
        />
        <div>
          <Button isIconOnly
            onClick={handleDownloadCode}
          >
            <IoCodeDownloadOutline />
          </Button>
          <Button isIconOnly onClick={handleFullScreen}>
            {isFullScreen ? <RxExitFullScreen /> : <RxEnterFullScreen />}
          </Button>
        </div>
      </div>
      <div className="h-[70vh]">
        <SplitPane split="horizontal" sizes={sizes} onChange={setSizes}>
          <Pane minSize={200}>
            <Editor
              height="80vh"
              theme="vs-dark"
              language={language?.language}
              defaultValue={value}
              value={value}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
                monacoRef.current = monaco;
                editor.onDidChangeCursorPosition(handleCursorChange);
              }}
              // onChange={handleEditorChange}
              onChange={(value, event) => {
                setValue(value);
              }}
            />
          </Pane>
          <Pane minSize={50}>
            <div className="border-t-2 border-zinc-500 px-3 py-2">
              <CodeOutput editorRef={editorRef} language={language} />
            </div>
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
};

export default CodeEditor;
