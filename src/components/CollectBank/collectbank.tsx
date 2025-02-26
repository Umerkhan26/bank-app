import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const premiumData = [
  {
    id: 1,
    title: "Premium 1",
    points: "200 points",
    buttonText: "Apply",
  },
  {
    id: 2,
    title: "Premium 2",
    points: "500 points",
    buttonText: "Apply",
  },
  {
    id: 3,
    title: "Premium 3",
    points: "300 points",
    buttonText: "Apply",
  },
  {
    id: 4,
    title: "Premium 4",
    points: "400 points",
    buttonText: "Apply",
  },
  {
    id: 5,
    title: "Premium 5",
    points: "600 points",
    buttonText: "Apply",
  },
  {
    id: 6,
    title: "Premium 6",
    points: "700 points",
    buttonText: "Apply",
  },
];

const CollectBanksPremium: React.FC = () => {
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
    <PremiumContainer>
      <PremiumTitle>Collect Banks Premium</PremiumTitle>

      <StyledSlider {...settings}>
        {premiumData.map((premium) => (
          <PremiumCard key={premium.id}>
            <PremiumPoints>{premium.points}</PremiumPoints>
            <PremiumTitle>{premium.title}</PremiumTitle>
            <ApplyButton>{premium.buttonText}</ApplyButton>
          </PremiumCard>
        ))}
      </StyledSlider>
    </PremiumContainer>
  );
};

export default CollectBanksPremium;

// Styled Components
const PremiumContainer = styled.div`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
`;

const PremiumTitle = styled.h2`
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

const PremiumCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PremiumPoints = styled.div`
  font-size: 1.75rem;
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 1rem;
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
  transition: background-color 0.3s;

  &:hover {
    background-color: #1d4ed8;
  }
`;
