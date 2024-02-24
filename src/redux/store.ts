import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true,
});

export default store;
