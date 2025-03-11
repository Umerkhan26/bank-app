import styled from "styled-components";
import BannerBackground from "../../assets/option 1.jpg";

export const BannerContainer = styled.div`
  background-image: url(${BannerBackground});
  background-size: cover;
  background-position: center;
  color: #ffffff;
  padding: 6rem 2rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 580px;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: 400px;
    justify-content: center;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    min-height: 300px;
  }
`;

export const BannerContent = styled.div`
  max-width: 800px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const BannerTitle = styled.h1`
  margin-bottom: 200px;
  font-size: 5vw;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 50px;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
`;

export const DownloadButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin-top: -10rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    margin-top: -5rem;
  }
`;

export const DownloadLink = styled.a`
  display: inline-block;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const DownloadImage = styled.img`
  width: 180px;
  height: auto;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    width: 150px;
  }

  @media (max-width: 480px) {
    width: 120px;
  }
`;
