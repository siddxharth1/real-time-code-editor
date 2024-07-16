import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { Code_Snippets } from "../constants";
import { Actions } from "../Action";
import CodeOutput from "./CodeOutput";

import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

const CodeEditor = ({ socketRef, roomId, onCodeChange }) => {
  const [value, setValue] = useState(null);
  const [language, setLanguage] = useState({
    language: "javascript",
    version: "18.15.0",
  });
  const editorRef = useRef();

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
        if (code === null) return;
        if (code === value) return;
        setValue(code);
      });
    }

    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
    };
  }, [socketRef.current]);

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

  // function handleEditorChange(value, event) {
  //   console.log("event", event);
  //   console.log("value", value);
  //   onCodeChange(value);
  //   socketRef.current.emit(Actions.CODE_CHANGE, {
  //     roomId,
  //     code: value,
  //   });
  // }
  const [sizes, setSizes] = useState([400, "30%", "auto"]);
  return (
    <div className="border-1 border-zinc-600 rounded-xl bg-neutral-900">
      <LanguageSelector
        language={language}
        onLanguageChange={onLanguageChange}
      />
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
                console.log(editor.getValue());
              }}
              // ref={editorRef}
              forwardRef={editorRef}
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
