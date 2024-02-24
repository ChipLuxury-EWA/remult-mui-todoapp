import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./redux/store";

import Auth from "./Auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CssBaseline />
        <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
            <Provider store={store}>
                <Auth />
            </Provider>
        </SnackbarProvider>
    </React.StrictMode>
);
