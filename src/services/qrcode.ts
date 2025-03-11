import axios from "axios";
import { API_BASE_URL } from "./promotion";

export const scanQRCode = async (
  token: string,
  scannedCode: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/scan`, // Your API endpoint for scanning QR codes
      { scannedCode }, // Request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    return response.data; // Return the response data
  } catch (error: any) {
    console.error("QR Code Scan Error:", error.response?.data || error);
    throw error.response?.data?.message || "QR code scan failed.";
  }
};
