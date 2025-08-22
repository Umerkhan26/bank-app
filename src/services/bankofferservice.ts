import axios from "axios";
import { API_BASE_URL } from "./promotion";

export const getBankOffersData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authorization token is missing");
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/get-bank-offers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bank offers:", error);
    throw error;
  }
};
