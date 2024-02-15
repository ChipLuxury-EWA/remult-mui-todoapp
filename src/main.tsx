import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
