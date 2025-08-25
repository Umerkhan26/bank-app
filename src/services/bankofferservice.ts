import axios from "axios";
import { API_BASE_URL } from "./promotion";

export const getBankOffersData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-bank-offers`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching bank offers:", error);
    throw error;
  }
};
