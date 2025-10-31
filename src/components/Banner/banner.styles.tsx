import styled, { css, keyframes } from "styled-components";
import BannerBackground from "../../assets/Banks Web Banners_433 X 254 Scan and Win 3.jpg";

export const BannerContainer = styled.div<{ windowWidth: number }>`
  background-image: url(${BannerBackground});
  background-repeat: no-repeat;
  color: #ffffff;
  width: 100%;
  cursor: pointer;
  text-align: left;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  /* For large screens: full width with correct aspect ratio */
  @media (min-width: 1025px) {
    background-size: 100% auto;
    background-position: center top;
    height: ${(props) => {
      const aspectRatio = 230 / 433;
      return `calc(${props.windowWidth}px * ${aspectRatio})`;
    }};
    padding: 4rem 2rem;
  }

  /* For medium screens (768px to 1024px) */
  @media (min-width: 768px) and (max-width: 1024px) {
    background-size: contain;
    background-position: center top;
    height: ${(props) => {
      const aspectRatio = 230 / 433;
      return `calc(${props.windowWidth}px * ${aspectRatio})`;
    }};
    padding: 2rem 1rem;
  }

  /* For mobile screens */
  @media (max-width: 767px) {
    background-size: contain;
    background-position: center top;
    height: ${(props) => {
      const aspectRatio = 230 / 433;
      return `calc(${props.windowWidth}px * ${aspectRatio})`;
    }};
    padding: 1.5rem 0.5rem;
  }

  /* Add background color to fill empty space if needed */
  background-color: #f0f0f0;
`;

// Rest of the styled components remain the same
export const ScanIconArea = styled.div`
  position: absolute;
  top: 40%;
  left: 70%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;

  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    top: 38%;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    top: 35%;
  }
`;

export const BannerContent = styled.div`
  max-width: 700px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 2rem;
  padding-left: 2rem;

  @media (min-width: 1200px) {
    padding-bottom: 4rem;
    padding-left: 4rem;
    margin-top: 40%;
  }

  @media (max-width: 768px) {
    padding-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  @media (max-width: 480px) {
    padding-bottom: 1rem;
    padding-left: 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`;

export const DownloadButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) and (min-width: 769px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 10px;
  }

  @media (max-width: 540px) {
    gap: 0.3rem;
    margin-bottom: 0px;
  }

  @media (max-width: 480px) {
    gap: 0.3rem;
    margin-bottom: 10px;
  }

  @media (max-width: 380px) {
    gap: 0.3rem;
    margin-bottom: 30px;
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
  width: 120px;
  height: auto;
  border-radius: 0.5rem;

  @media (min-width: 1200px) {
    width: 140px;
  }

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 480px) {
    width: 90px;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

export const ShimmerBanner = styled.div`
  width: 100%;
  height: calc(
    100vw * 230 / 433
  ); /* maintains same aspect ratio as BannerContainer */
  border-radius: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  ${css`
    animation: ${shimmer} 1.5s infinite linear;
  `};
`;
