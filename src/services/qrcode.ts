import axios from "axios";
import { API_BASE_URL } from "./promotion";

export const scanQRCode = async (
  token: string,
  scannedCode: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/scan`,
      { scannedCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
