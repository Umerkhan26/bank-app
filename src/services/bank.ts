import axios from "axios";
import { API_BASE_URL } from "./promotion";

export const fetchBankPremiums = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getBankPremiums`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch bank premiums";
  }
};

export const fetchBankPremiumById = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/getBankPremiumById/${id}`
    );
    return response.data.bankPremium; // Return the bank premium
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch bank premium";
  }
};

export const redeemBankPremium = async (premiumId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found. Please log in.");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/redeemBankPremium/${premiumId}/redeem`,
      { premiumId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("❌ Redeem API error:", err.response || err.message || err);
    throw err;
  }
};
