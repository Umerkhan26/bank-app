import axios from "axios";
import { API_BASE_URL } from "./promotion";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    points: number;
    address?: string;
  };
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  is_over_18: boolean;
}

interface RegisterResponse {
  message: string;
  user: {
    name: string;
    email: string;
  };
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to log in";
  }
};

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    console.log("Sending Data to API:", data);

    const response = await axios.post(`${API_BASE_URL}/register`, data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("response from regis", response.data);
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error);

    const message = error.response?.data?.message || "Registration failed";
    throw new Error(message); // ✅ always throw an Error object
  }
};

export const verifyEmail = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify-email/${token}`);
    return response.data;
  } catch (error: any) {
    console.error("Email Verification Error:", error.response?.data || error);
    throw error.response?.data?.message || "Email verification failed.";
  }
};

export const fetchUserHistory = async (userId: string): Promise<any[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized. Please log in.");

    const response = await axios.get(
      `${API_BASE_URL}/userHistoryByUserId/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.userHistory || [];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user history."
    );
  }
};

export const getAllBrands = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllBrands`);
    return response.data.brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const verifyEmailCode = async (code: string) => {
  const response = await axios.get(`${API_BASE_URL}/verify-email/${code}`);
  return response.data;
};
