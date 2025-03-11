import axios from "axios";
import { API_BASE_URL } from "./promotion";

export const getStores = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getStore`);

    console.log("Raw API Response:", response.data); // Debugging

    // Ensure the response contains a `stores` array
    if (!response.data?.stores || !Array.isArray(response.data.stores)) {
      throw new Error("Invalid API response format");
    }

    // Format the stores data
    const formattedStores = response.data.stores.map((store: any) => ({
      id: store._id,
      name: store.storeName || "Unknown Store",
      latitude: store.location?.latitude ?? null,
      longitude: store.location?.longitude ?? null,
    }));

    console.log("Formatted Stores:", formattedStores);
    return formattedStores;
  } catch (error: any) {
    console.error(
      "Error fetching stores:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch stores");
  }
};
