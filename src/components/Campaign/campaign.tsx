import React, { useState, useEffect } from "react";
import { fetchCampaigns } from "../../services/campaign";
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
  const [campaigns, setCampaigns] = useState<any[]>([]);
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
      } catch (err: any) {
        setError(err.message || "Something went wrong");
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
    return <div>Error: {error}</div>;
  }

  const campaign = campaigns[0];
  if (!campaign) return <div>No campaigns available.</div>;

  return (
    <CampaignsContainer>
      <CampaignsTitle>Campaigns</CampaignsTitle>
      <CampaignCard
        onClick={() => handleApply(campaign._id || campaign.id)}
        style={{ cursor: "pointer" }}
      >
        <CampaignImage
          src={campaign.image_url || campaign.image}
          alt={campaign.title}
          style={{ height: "auto" }}
        />
        <CampaignContent>
          <CampaignPoints>
            {campaign.points_required || campaign.points} Points
          </CampaignPoints>
          <CampaignTitle>{campaign.title}</CampaignTitle>
          {/* <CampaignDescription>{campaign.description}</CampaignDescription> */}
        </CampaignContent>
      </CampaignCard>
    </CampaignsContainer>
  );
};

export default Campaigns;
