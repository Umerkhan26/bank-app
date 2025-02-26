import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const campaignsData = [
  {
    id: 1,
    title: "Summer Sale",
    points: "200 points",
    buttonText: "Apply",
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "Winter Special",
    points: "500 points",
    buttonText: "Apply",
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "Back to School",
    points: "300 points",
    buttonText: "Apply",
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    title: "Holiday Deals",
    points: "400 points",
    buttonText: "Apply",
    image: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 5,
    title: "New Year Bash",
    points: "600 points",
    buttonText: "Apply",
    image: "https://picsum.photos/300/200?random=5",
  },
  {
    id: 6,
    title: "Spring Clearance",
    points: "700 points",
    buttonText: "Apply",
    image: "https://picsum.photos/300/200?random=6",
  },
];

const Campaigns: React.FC = () => {
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

  return (
    <CampaignsContainer>
      <CampaignsTitle>Campaigns</CampaignsTitle>
      <StyledSlider {...settings}>
        {campaignsData.map((campaign) => (
          <CampaignCard key={campaign.id}>
            <CampaignImage src={campaign.image} alt={campaign.title} />
            <CampaignContent>
              <CampaignPoints>{campaign.points}</CampaignPoints>
              <CampaignTitle>{campaign.title}</CampaignTitle>
              <ApplyButton>{campaign.buttonText}</ApplyButton>
            </CampaignContent>
          </CampaignCard>
        ))}
      </StyledSlider>
    </CampaignsContainer>
  );
};

export default Campaigns;

const CampaignsContainer = styled.div`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
`;

const CampaignsTitle = styled.h2`
  font-size: 2.5rem;
  color: #1e40af;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 10px;
  }

  .slick-dots {
    bottom: -30px;

    li button:before {
      color: #1e40af;
    }

    li.slick-active button:before {
      color: #1e40af;
    }
  }
`;

const CampaignCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 250px;
  margin: 0 auto;
  margin-bottom: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const CampaignImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const CampaignContent = styled.div`
  padding: 1.5rem;
`;

const CampaignPoints = styled.div`
  font-size: 1.25rem;
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

const CampaignTitle = styled.h3`
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const ApplyButton = styled.button`
  background-color: #1e40af;
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #1d4ed8;
  }
`;
