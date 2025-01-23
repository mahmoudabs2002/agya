import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import GlobalState from "./context/GlobelContext.jsx";

import "./index.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <GlobalState>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
      </GlobalState>
    </BrowserRouter>
  </StrictMode>
);
