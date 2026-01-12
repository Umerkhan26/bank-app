// import styled from "styled-components";
// import BannerBackground from "../../assets/Png/Banks Web Banners_433 X 254 Scan and Win.jpg";

// export const BannerContainer = styled.div`
//   background-image: url(${BannerBackground});
//   background-size: 100% auto;
//   background-position: center top;
//   background-repeat: no-repeat;
//   color: #ffffff;
//   width: 100%;
//   min-height: 350px;
//   padding: 2rem 1rem;
//   text-align: left;
//   position: relative;
//   overflow: hidden;
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-end;

//   @media (min-width: 1200px) {
//     background-size: 100% auto;
//     background-position: center top;
//     min-height: 800px;
//     padding: 4rem 2rem;
//     align-items: flex-end;
//   }

//   @media (max-width: 768px) {
//     padding: 1.5rem 0.5rem;
//     min-height: 300px;
//     background-size: 100% auto;
//     background-position: center top;
//   }

//   @media (max-width: 480px) {
//     padding: 1rem 0.5rem;
//     min-height: 250px;
//     background-size: 100% auto;
//     background-position: center top;
//   }
// `;

// export const ScanArea = styled.div`
//   position: absolute;
//   top: 30%;
//   left: 10%;
//   width: 25%;
//   height: 20%;
//   cursor: pointer;
//   z-index: 2;

//   /* Adjust positioning for different screen sizes */
//   @media (max-width: 768px) {
//     top: 25%;
//     left: 8%;
//     width: 30%;
//     height: 22%;
//   }

//   @media (max-width: 480px) {
//     top: 22%;
//     left: 5%;
//     width: 35%;
//     height: 25%;
//   }
// `;

// export const BannerContent = styled.div`
//   max-width: 700px;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-end;
//   height: 100%;
//   padding-bottom: 2rem;
//   padding-left: 2rem;

//   @media (min-width: 1200px) {
//     padding-bottom: 4rem;
//     padding-left: 4rem;
//     margin-top: 40%;
//   }

//   @media (max-width: 768px) {
//     padding-bottom: 1.5rem;
//     padding-left: 1.5rem;
//   }

//   @media (max-width: 480px) {
//     padding-bottom: 1rem;
//     padding-left: 1rem;
//     display: flex;
//     justify-content: center;
//     align-items: flex-end;
//   }
// `;

// export const DownloadButtons = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   align-items: center;
//   justify-content: center;

//   @media (max-width: 1200px) and (min-width: 769px) {
//     gap: 1rem;
//   }

//   @media (max-width: 768px) {
//     flex-direction: row;
//     align-items: center;
//     gap: 0.6rem;
//     margin-bottom: 10px;
//   }

//   @media (max-width: 540px) {
//     gap: 0.3rem;
//     margin-bottom: 0px;
//   }

//   @media (max-width: 480px) {
//     gap: 0.3rem;
//     margin-bottom: 15px;
//   }

//   @media (max-width: 380px) {
//     gap: 0.3rem;
//     margin-bottom: 30px;
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
//   width: 120px;
//   height: auto;
//   border-radius: 0.5rem;

//   @media (min-width: 1200px) {
//     width: 140px;
//   }

//   @media (max-width: 768px) {
//     width: 90px;
//   }

//   @media (max-width: 480px) {
//     width: 70px;
//   }
// `;
import styled from "styled-components";
import BannerBackground from "../../assets/Banks Web Banners_433 X 254 Scan and Win 3.jpg";

export const BannerContainer = styled.div`
  background-image: url(${BannerBackground});
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  color: #ffffff;
  width: 100%;
  cursor: pointer;
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

export const ScanIconArea = styled.div`
  position: absolute;
  /* Adjust these values based on the position of the QR code icon in your banner */
  top: 40%;
  left: 70%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  cursor: pointer;
  z-index: 2;
  border-radius: 50%;

  /* Visual indicator (optional) */
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

  /* Adjust positioning for different screen sizes */
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
