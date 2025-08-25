import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  username: string | null;
  userPoints?: number;
  selectedBrand: string | null;
  city?: string | null;
  country?: string | null;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  username: localStorage.getItem("username"),
  userPoints: parseInt(localStorage.getItem("userPoints") || "0", 10),
  selectedBrand: null,
  city: localStorage.getItem("city"),
  country: localStorage.getItem("country"),
};

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login(
//       state,
//       action: PayloadAction<{
//         token: string;
//         userId: string;
//         username: string;
//         userPoints: number;
//       }>
//     ) {
//       console.log("Updating Redux state with:", action.payload);
//       state.isLoggedIn = true;
//       state.token = action.payload.token;
//       state.userId = action.payload.userId;
//       state.username = action.payload.username;
//       state.userPoints = action.payload.userPoints ?? 0;
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("token", action.payload.token);
//       localStorage.setItem("userId", action.payload.userId);
//       localStorage.setItem("username", action.payload.username);
//       localStorage.setItem(
//         "userPoints",
//         (action.payload.userPoints ?? 0).toString()
//       );
//     },

//     logout(state) {
//       state.isLoggedIn = false;
//       state.token = null;
//       state.userId = null;
//       state.userPoints = 0;
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("username");
//       state.selectedBrand = null;
//     },
//     updatePoints: (state, action: PayloadAction<number | undefined>) => {
//       const points = action.payload ?? 0;
//       state.userPoints = points;
//       localStorage.setItem("userPoints", points.toString());
//     },

//     setSelectedBrand(state, action: PayloadAction<string | null>) {
//       state.selectedBrand = action.payload;
//       if (action.payload) {
//         localStorage.setItem("selectedBrand", action.payload);
//       } else {
//         localStorage.removeItem("selectedBrand");
//       }
//     },
//   },
// });

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
        city?: string;
        country?: string;
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
      if (action.payload.city)
        localStorage.setItem("city", action.payload.city);
      if (action.payload.country)
        localStorage.setItem("country", action.payload.country);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.username = null;
      state.userPoints = 0;
      state.selectedBrand = null;

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("userPoints"); // ✅ clear points
      localStorage.removeItem("selectedBrand");

      localStorage.clear();
    },

    updatePoints: (state, action: PayloadAction<number | undefined>) => {
      const points = action.payload ?? 0;
      state.userPoints = points;
      localStorage.setItem("userPoints", points.toString());
    },

    setSelectedBrand(state, action: PayloadAction<string | null>) {
      state.selectedBrand = action.payload;
      if (action.payload) {
        localStorage.setItem("selectedBrand", action.payload);
      } else {
        localStorage.removeItem("selectedBrand");
      }
    },
  },
});

export const { login, logout, updatePoints, setSelectedBrand } =
  authSlice.actions;
export default authSlice.reducer;
