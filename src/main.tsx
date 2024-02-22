import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";

import Auth from "./Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
      <Auth />
    </SnackbarProvider>
  </React.StrictMode>
);
