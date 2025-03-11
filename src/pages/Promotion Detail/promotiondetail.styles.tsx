import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const Description = styled.p`
  font-size: 1.3rem;
  color: #4b5563;
  text-align: center;
  max-width: 900px;
  margin: 2rem auto;
  line-height: 1.6;
`;

export const PromotionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Points = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #d97706;
`;

export const DateRange = styled.p`
  font-size: 1.1rem;
  color: #374151;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
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

export const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #1e40af;
`;
