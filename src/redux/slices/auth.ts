import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  username: string | null;
  userPoints?: number;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  username: localStorage.getItem("username"),
  userPoints: parseInt(localStorage.getItem("userPoints") || "0", 10),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        token: string;
        userId: string;
        username: string;
        userPoints: number;
      }>
    ) {
      console.log("Updating Redux state with:", action.payload);
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.userPoints = action.payload.userPoints ?? 0;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem(
        "userPoints",
        (action.payload.userPoints ?? 0).toString()
      );
    },

    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.userPoints = 0;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
    },
    updatePoints: (state, action: PayloadAction<number>) => {
      state.userPoints = action.payload;
      localStorage.setItem("userPoints", action.payload.toString());
    },
  },
});

export const { login, logout, updatePoints } = authSlice.actions;
export default authSlice.reducer;
