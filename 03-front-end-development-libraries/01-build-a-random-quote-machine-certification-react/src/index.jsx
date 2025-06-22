import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RandomQuoteMachine from "./RandomQuoteMachine.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RandomQuoteMachine />
  </StrictMode>
);
