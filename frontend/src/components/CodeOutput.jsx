import { useState } from "react";
import { executeCode } from "../api";
import { Button } from "@nextui-org/react";
import {addToast} from "@heroui/toast";

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
      addToast({
        title: "Error in running code",
        description: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="font-semibold text-xl">Output</h2>
        <Button
          size="sm"
          isLoading={loading}
          onClick={runCode}
          color="success"
          spinner={
            <svg
              className="animate-spin h-3 w-3 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
        >
          {loading ? "Running" : "Run Code"}
        </Button>
      </div>

      {output ? (
        <pre
          className="overflow-auto h-28"
          style={{ color: error ? "red" : "white" }}
        >
          {output}
        </pre>
      ) : (
        <div>Click run code to see the output here</div>
      )}
    </div>
  );
};

export default CodeOutput;
