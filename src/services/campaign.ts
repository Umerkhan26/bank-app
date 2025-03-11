import axios from "axios";
import { API_BASE_URL } from "./promotion";

interface Campaign {
  _id: string;
  title: string;
  description: string;
  image_url?: string;
  startDate: string;
  endDate: string;
}

interface FetchCampaignsResponse {
  campaigns: Campaign[];
}

interface FetchCampaignByIdResponse {
  campaign: Campaign;
}

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    const response = await axios.get<FetchCampaignsResponse>(
      `${API_BASE_URL}/getCampaigns`
    );
    return response.data.campaigns || [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to fetch campaigns");
  }
};

// Fetch campaign by ID
export const fetchCampaignById = async (id: string): Promise<Campaign> => {
  try {
    const response = await axios.get<FetchCampaignByIdResponse>(
      `${API_BASE_URL}/getCampaignsById/${id}`
    );
    console.log("campaignss id", response.data);
    return response.data.campaign;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to fetch campaign");
  }
};

export const redeemCampaign = async (campaignId: string, token: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/redeem`, // Change to match backend route
    { campaignId }, // Send as body
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
