import { Excalidraw } from "@excalidraw/excalidraw";
import { useRef } from "react";

const DrawingBoard = ({ drawingBoardData, showDrawingOverlay }) => {
  const timerRef = useRef(null);
  const handleCanvasChange = (elements, state) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      drawingBoardData.current = { elements, state };
      //   console.log("elements", elements);
      //   console.log("state", state);
    }, 500);
  };

  return (
    <div
      style={{
        width: "100%",
        zIndex: 999,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ height: "96vh" }}>
        <Excalidraw
          initialData={{
            elements: drawingBoardData?.current?.elements,
            appState: {
              ...drawingBoardData?.current?.state,
              theme: "dark",
              viewBackgroundColor: showDrawingOverlay
                ? "transparent"
                : "#ffffff",
            },
          }}
          onChange={handleCanvasChange}
        />
      </div>
    </div>
  );
};

export default DrawingBoard;
