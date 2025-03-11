import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal";
import authReducer from "./slices/auth";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
