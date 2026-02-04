import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AppRouter } from "./routes";
import { AuthProvider } from "./providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
