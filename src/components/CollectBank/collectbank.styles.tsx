import styled from "styled-components";

export const PremiumContainer = styled.div`
  padding: 1.5rem 1rem;
  background-color: #f8f9fa;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    justify-content: center;
  }
`;

export const PremiumPoints = styled.div`
  font-size: 1.25rem;
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 0.75rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const Title = styled.h3`
  font-size: 2.5rem;
  color: black;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

export const PremiumTitle = styled.h3`
  font-size: 1.25rem;
  color: #374151;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
`;

export const PremiumDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-weight: 400;
  text-align: left;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

export const PremiumListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 0.5rem;
  }
`;

export const PremiumCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: row;
    min-height: auto;
    border-radius: 0.5rem;
  }
`;

export const PremiumImageBox = styled.div`
  height: 200px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;

  @media (max-width: 768px) {
    height: auto;
    width: 120px;
    min-width: 120px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0.5rem;
    padding: 8px;
  }
`;

export const PremiumImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    max-height: 140px;
  }
`;

export const PremiumContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.5rem;
  }
`;

export const ApplyButton = styled.button`
  background-color: black;
  color: #ffffff;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: auto;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
  }
`;

export const ViewMoreButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  position: absolute;
  right: 0;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 768px) {
    position: static;
    display: flex;
    margin-left: auto;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;
