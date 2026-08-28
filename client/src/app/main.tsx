/// <reference path="../types/assets.d.ts" />
/// <reference path="../custom.d.ts" />
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "#root" was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
