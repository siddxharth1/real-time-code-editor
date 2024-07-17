import { Excalidraw } from "@excalidraw/excalidraw";
import { useRef } from "react";

const DrawingBoard = ({ drawingBoardData, showDrawingOverlay }) => {
  const timerRef = useRef(null);
  const handleCanvasChange = (elements, state) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // timerRef.current = setTimeout(() => {
    // drawingBoardData?.current = { elements, state };
    //   console.log("elements", elements);
    //   console.log("state", state);
    // }, 500);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        zIndex: 999,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="h-[100vh]">
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
