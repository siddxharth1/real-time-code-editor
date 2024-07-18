import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { Code_Snippets } from "../constants";
import { Actions } from "../Action";
import CodeOutput from "./CodeOutput";

import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Button } from "@nextui-org/react";
import { RxEnterFullScreen, RxExitFullScreen } from "react-icons/rx";

const CodeEditor = ({ socketRef, roomId, onCodeChange, username }) => {
  const [value, setValue] = useState(null);
  const [language, setLanguage] = useState({
    language: "javascript",
    version: "18.15.0",
  });
  const editorRef = useRef();
  const monacoRef = useRef();
  const [remoteCursors, setRemoteCursors] = useState({});
  const decorationsRef = useRef([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
        if (code === null) return;
        if (code === value) return;
        setValue(code);
      });

      socketRef.current.on(Actions.CURSOR_CHANGE, ({ username, position }) => {
        setRemoteCursors((prev) => ({ ...prev, [username]: position }));
      });
    }

    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
      socketRef.current.off(Actions.CURSOR_CHANGE);
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

  const onLanguageChange = (language) => {
    setLanguage(language);
    setValue(Code_Snippets[language?.language] || "");
  };

  const handleEditorChange = (value, event) => {
    console.log("event", event);
    console.log("value", value);
    onCodeChange(value);

    socketRef.current.emit(Actions.CODE_CHANGE, {
      roomId,
      code: value,
    });
  };

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
  return (
    <div className="border-1 border-zinc-600 rounded-xl bg-neutral-900">
      <div className="p-2 flex justify-between">
        <LanguageSelector
          language={language}
          onLanguageChange={onLanguageChange}
        />
        <div>
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
              defaultValue={Code_Snippets[language?.language]}
              value={value}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
                monacoRef.current = monaco;
                console.log(editor.getValue());
                editor.onDidChangeCursorPosition(handleCursorChange);
              }}
              onChange={handleEditorChange}
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
