import axios from "axios";
import { API_BASE_URL } from "./promotion";

export const fetchAllAdditionalItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllAdditionalItems`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch additional items";
  }
};

export const fetchAdditionalItemById = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getAdditionalItemById/${id}`
    );
    return response.data.data; // Return the additional item data
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch additional item";
  }
};

export const redeemAdditionalItem = async (itemId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found. Please log in.");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/redeemAdditionalItemRedeem/${itemId}`,
      { itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error(
      "❌ Redeem Additional Item API error:",
      err.response || err.message || err
    );
    throw err;
  }
};
