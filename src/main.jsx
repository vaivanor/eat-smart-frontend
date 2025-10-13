import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./styles/index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./store/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
