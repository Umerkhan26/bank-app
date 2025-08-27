// import styled from "styled-components";
// import BannerBackground from "../../assets/Png/Banks Web Banners_433 X 254 Scan and Win.jpg";

// export const BannerContainer = styled.div`
//   background-image: url(${BannerBackground});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   color: #ffffff;
//   width: 100%;
//   padding: 6rem 2rem;
//   text-align: left;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   min-height: 490px;
//   position: relative; /* Added for better positioning */

//   @media (max-width: 768px) {
//     padding: 4rem 1rem;
//     min-height: 400px;
//     justify-content: center;
//     text-align: center;
//     background-position: top center; /* Better mobile positioning */
//   }

//   @media (max-width: 480px) {
//     padding: 2rem 1rem;
//     min-height: 300px;
//   }
// `;

// export const BannerContent = styled.div`
//   max-width: 700px;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   @media (max-width: 768px) {
//     align-items: center;
//   }
// `;

// export const DownloadButtons = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   align-items: center;
//   margin-top: 2rem; // Reduced from 30rem to a reasonable value

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//     gap: 1rem;
//     margin-top: 1rem; // Adjusted for tablet
//     margin-bottom: 1rem;
//   }

//   @media (max-width: 480px) {
//     margin-top: 1rem; // Removed negative margin, use positive value
//   }
// `;

// export const DownloadLink = styled.a`
//   display: inline-block;
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// export const DownloadImage = styled.img`
//   width: 180px;
//   height: auto;
//   border-radius: 0.5rem;

//   @media (max-width: 768px) {
//     width: 150px;
//   }

//   @media (max-width: 480px) {
//     width: 120px;
//   }
// // `;

// import styled from "styled-components";
// import BannerBackground from "../../assets/Png/Banks Web Banners_433 X 254 Scan and Win.jpg";

// export const BannerContainer = styled.div`
//   background-image: url(${BannerBackground});
//   background-size: 100% auto; /* Ensures the image stretches to full width */
//   background-position: left top; /* Aligns the image from the left top */
//   background-repeat: no-repeat;
//   color: #ffffff;
//   width: 100%;
//   padding: 6rem 2rem;
//   text-align: left;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   min-height: 600px;
//   position: relative;

//   @media (max-width: 768px) {
//     padding: 4rem 1rem;
//     min-height: 400px;
//     justify-content: center;
//     text-align: center;
//     background-size: 100% auto; /* Full width on tablet */
//     background-position: left top;
//   }

//   @media (max-width: 480px) {
//     padding: 2rem 1rem;
//     min-height: 300px;
//     background-size: 100% auto; /* Full width on mobile */
//     background-position: left top;
//   }
// `;

// export const BannerContent = styled.div`
//   max-width: 700px;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;

//   @media (max-width: 768px) {
//     align-items: center;
//   }
// `;

// export const DownloadButtons = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   align-items: center;
//   margin-top: auto;
//   position: absolute;
//   bottom: 1rem;

// @media (max-width: 768px) {
//   flex-direction: column;
//   align-items: center;
//   gap: 1rem;
//   bottom: 1rem;
// }

// @media (max-width: 480px) {
//   bottom: 0.5rem;
// }
// `;

// export const DownloadLink = styled.a`
//   display: inline-block;
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// export const DownloadImage = styled.img`
//   width: 180px;
//   height: auto;
//   border-radius: 0.5rem;

// @media (max-width: 768px) {
//   width: 150px;
// }

// @media (max-width: 480px) {
//   width: 120px;
// }
// `;

import styled from "styled-components";
import BannerBackground from "../../assets/Png/Banks Web Banners_433 X 254 Scan and Win.jpg";

export const BannerContainer = styled.div`
  background-image: url(${BannerBackground});
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  color: #ffffff;
  width: 100%;
  min-height: 350px;
  padding: 2rem 1rem;
  text-align: left;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  @media (min-width: 1200px) {
    background-size: 100% auto;
    background-position: center top;
    min-height: 800px;
    padding: 4rem 2rem;
    align-items: flex-end;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem;
    min-height: 300px;
    background-size: 100% auto;
    background-position: center top;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    min-height: 250px;
    background-size: 100% auto;
    background-position: center top;
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
    gap: 1rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
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
    width: 150px;
  }

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 480px) {
    width: 90px;
  }
`;
