import styled from "styled-components";
import Slider from "react-slick";

export const BankOffersContainer = styled.div`
  padding: 4rem 2rem;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }
`;

export const BankOffersTitle = styled.h2`
  font-size: 2.5rem;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
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

export const BankOfferCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  width: 90%;
  max-width: 1200px;
  margin: 0 auto 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const BankOfferImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

export const BankOfferContent = styled.div`
  // padding: 1.5rem;
`;

export const BankOfferPoints = styled.div`
  font-size: 1.25rem;
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 0.75rem;
  text-align: left;
`;

export const BankOfferTitle = styled.h3`
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 0.7rem;
  font-weight: 600;
  text-align: left;
`;

export const BankOfferDescription = styled.h3`
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
