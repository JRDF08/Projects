import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/Body/App";
import "./index.css";
import "./components/Footer/Footer.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
