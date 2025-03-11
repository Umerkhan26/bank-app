import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCampaigns } from "../../services/campaign";
import campaignImage from "./campaign-toolkit01.png";
import { useNavigate } from "react-router-dom";
import {
  ApplyButton,
  CampaignCard,
  CampaignContent,
  CampaignImage,
  CampaignPoints,
  CampaignsContainer,
  CampaignsTitle,
  CampaignTitle,
  LoadingContainer,
  LoadingSpinner,
  StyledSlider,
} from "./campaign.styles";

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleApply = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        console.log("Campaignsss", data);
        setCampaigns(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCampaigns();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <CampaignsContainer>
      <CampaignsTitle>Campaigns</CampaignsTitle>
      <StyledSlider {...settings}>
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id || campaign.id}>
            <CampaignImage
              // src={campaign.image_url || campaign.image}
              src={campaignImage}
              alt={campaign.title}
            />
            <CampaignContent>
              <CampaignPoints>
                {/* {campaign.points_required || campaign.points} Points */}
                100 Points
              </CampaignPoints>
              {/* <CampaignTitle>{campaign.title}</CampaignTitle> */}
              <CampaignTitle>START A WORKPLACE CAMPAIGN</CampaignTitle>
              <ApplyButton
                onClick={() => handleApply(campaign._id || campaign.id)}
              >
                {campaign.buttonText || "Apply"}
              </ApplyButton>
            </CampaignContent>
          </CampaignCard>
        ))}
      </StyledSlider>
    </CampaignsContainer>
  );
};

export default Campaigns;
