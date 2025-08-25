import axios from "axios";

// export const API_BASE_URL = "http://localhost:3000/api";
export const API_BASE_URL = import.meta.env.VITE_API_URL;

interface Promotion {
  _id: string;
  title: string;
  description: string;
  image_url?: string;
  discount: number;
  startDate: string;
  endDate: string;
}

interface FetchPromotionsResponse {
  promotions: Promotion[];
}

interface FetchPromotionByIdResponse {
  promotion: Promotion;
}

export const fetchPromotions = async (): Promise<Promotion[]> => {
  try {
    const response = await axios.get<FetchPromotionsResponse>(
      `${API_BASE_URL}/getPromotions`
    );
    return response.data.promotions || [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to fetch promotions");
  }
};

// Fetch promotion by ID
export const fetchPromotionById = async (id: string): Promise<Promotion> => {
  try {
    const response = await axios.get<FetchPromotionByIdResponse>(
      `${API_BASE_URL}/getPromotionById/${id}`
    );
    return response.data.promotion;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to fetch promotion");
  }
};
