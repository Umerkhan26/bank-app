import React from "react";
import AppStore from "../../assets/appsotre.png";
import PlayStore from "../../assets/playstore.png";
import {
  BannerContainer,
  BannerContent,
  DownloadButtons,
  DownloadImage,
  DownloadLink,
} from "./banner.styles";
const Banner: React.FC = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <DownloadButtons>
          <DownloadLink
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadImage src={PlayStore} alt="Play Store" />
          </DownloadLink>
          <DownloadLink
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadImage src={AppStore} alt="App Store" />
          </DownloadLink>
        </DownloadButtons>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
