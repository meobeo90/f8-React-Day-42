import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    authApi.middleware,
  ],
});

window.store = store;
export { store };
