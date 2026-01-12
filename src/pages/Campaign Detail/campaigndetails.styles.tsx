import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 2rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  gap: 3rem;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5rem;
  padding-right: 5rem;

  @media (max-width: 1024px) {
    gap: 2rem;
    padding: 0 3rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  max-width: 500px;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const Description = styled.p`
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const CampaignInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
`;

export const Points = styled.p`
  font-size: 1.75rem;
  font-weight: 500;
  color: #d97706;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const DateRange = styled.p`
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  margin-top: 50px;
`;

export const RedeemContainer = styled.div`
  display: flex;
  flex-direction: column; /* stack vertically */
  align-items: center; /* center horizontally */
  justify-content: center;
  text-align: center;
  margin-bottom: -1rem;
  p {
    margin-bottom: 20px;
    margin-top: -15px;
    font-size: 1rem;
    font-weight: 500;
    color: #374151;
  }
`;

export const QrCodeButton = styled.button`
  background: black;
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 12px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 12px 20px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 10px 15px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #f3f4f6;
  border-top: 3px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
