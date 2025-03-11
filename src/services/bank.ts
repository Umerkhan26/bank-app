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
