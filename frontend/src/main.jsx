import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ToastProvider} from "@heroui/toast";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <main className="dark text-foreground bg-neutral-950">
    <NextUIProvider>
      <BrowserRouter>
        <App />
        <ToastProvider />
      </BrowserRouter>
    </NextUIProvider>
  </main>
  // </React.StrictMode>
);
