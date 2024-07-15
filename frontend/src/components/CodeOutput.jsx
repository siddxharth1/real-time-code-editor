import React, { useState } from "react";
import { executeCode } from "../api";

const CodeOutput = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) {
      return;
    }

    try {
      setLoading(true);
      const output = await executeCode(language, sourceCode);
      console.log(output);
      setOutput(output.run.output);
      setError(output.run.stderr ? true : false);
    } catch (error) {
      console.log(error);
      window.alert("Error in running code");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Output</h2>

      {loading ? (
        <button disabled>loading..</button>
      ) : (
        <button onClick={runCode}>Run code</button>
      )}

      {output ? (
        <pre style={{ color: error ? "red" : "black" }}>{output}</pre>
      ) : (
        <div>Click run code to see the output here</div>
      )}
    </div>
  );
};

export default CodeOutput;
