import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  exp: number;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  username: string | null;
  userPoints: number;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  token: localStorage.getItem("token"),
  userId: null,
  username: localStorage.getItem("username"),
  userPoints: parseInt(localStorage.getItem("userPoints") || "0", 10),
};

// Decode token to get userId
if (initialState.token) {
  try {
    const decoded = jwtDecode<DecodedToken>(initialState.token);
    initialState.userId = decoded.userId;
  } catch (error) {
    console.error("Invalid token", error);
    initialState.token = null;
    localStorage.removeItem("token");
  }
}
