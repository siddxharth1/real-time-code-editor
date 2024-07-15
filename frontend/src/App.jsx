import { Route, Routes } from "react-router-dom";
import "./App.css";
import JoinRoomPage from "./pages/JoinRoomPage";
import EditorPage from "./pages/EditorPage";
import DrawingBoard from "./components/DrawingBoard";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/join" element={<JoinRoomPage />} />
      <Route path="/editor/:roomId" element={<EditorPage />} />
    </Routes>
  );
}

export default App;
