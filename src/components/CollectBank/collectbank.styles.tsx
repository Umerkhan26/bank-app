import styled from "styled-components";
import Slider from "react-slick";

export const PremiumContainer = styled.div`
  padding: 2rem 2rem;
  background-color: #f8f9fa;
  margin-bottom: 30px;
`;

export const PremiumListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledSlider = styled(Slider)`
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

export const PremiumCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 340px;
  max-width: 100%;
  margin: 0 auto 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%; /* full width on mobile */
  }
`;

export const PremiumImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

export const PremiumContent = styled.div`
  padding: 1.5rem;
`;

export const PremiumPoints = styled.div`
  font-size: 1.25rem;
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 0.75rem;
  text-align: left;
`;

export const Title = styled.h3`
  font-size: 2.5rem;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
`;

export const PremiumTitle = styled.h3`
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 0.7rem;
  font-weight: 600;
  text-align: left;
`;

export const PremiumDescription = styled.h3`
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: left;
`;

export const ApplyButton = styled.button`
  background-color: black;
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
    background-color: #000;
  }
`;
