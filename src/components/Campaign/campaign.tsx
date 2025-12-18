import React, { useState, useEffect } from "react";
import { Campaign, fetchCampaigns } from "../../services/campaign";
import { useNavigate } from "react-router-dom";
import {
  CampaignCard,
  CampaignContent,
  CampaignImage,
  CampaignPoints,
  CampaignsContainer,
  CampaignsTitle,
  CampaignTitle,
  ShimmerCard,
  ShimmerWrapper,
} from "./campaign.styles";

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleApply = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load campaigns");
        }
      } finally {
        setLoading(false);
      }
    };

    getCampaigns();
  }, []);

  if (loading) {
    return (
      <ShimmerWrapper>
        {[1, 2, 3].map((i) => (
          <ShimmerCard key={i} />
        ))}
      </ShimmerWrapper>
    );
  }

  if (error) {
    return null;
  }

  if (campaigns.length === 0) {
    return (
      <CampaignsContainer>
        <CampaignsTitle>Campaigns</CampaignsTitle>
        <div
          style={{
            padding: "32px",
            textAlign: "center",
            color: "#888",
            fontSize: "15px",
          }}
        >
          No campaigns available right now.
        </div>
      </CampaignsContainer>
    );
  }

  const campaign = campaigns[0];
  if (!campaign) return <div>No campaigns available.</div>;

  return (
    <CampaignsContainer>
      <CampaignsTitle>Campaigns</CampaignsTitle>
      <CampaignCard
        onClick={() => handleApply(campaign._id || campaign._id)}
        style={{ cursor: "pointer" }}
      >
        <CampaignImage
          src={campaign.image_url || campaign.image_url}
          alt={campaign.title}
          style={{ height: "auto" }}
        />
        <CampaignContent>
          <CampaignPoints>
            {campaign.points_required || campaign.points_required} Points
          </CampaignPoints>
          <CampaignTitle>{campaign.title}</CampaignTitle>
          {/* <CampaignDescription>{campaign.description}</CampaignDescription> */}
        </CampaignContent>
      </CampaignCard>
    </CampaignsContainer>
  );
};

export default Campaigns;
