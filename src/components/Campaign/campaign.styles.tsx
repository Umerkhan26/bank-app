// import styled from "styled-components";
// import Slider from "react-slick";

// export const CampaignsContainer = styled.div`
//   padding: 4rem 2rem;
//   background-color: #f8f9fa;
// `;

// export const LoadingContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 50px;
// `;

// export const LoadingSpinner = styled.div`
//   width: 40px;
//   height: 40px;
//   border: 1px solid #f3f4f6;
//   border-top: 3px solid black;
//   border-radius: 50%;
//   animation: spin 1s linear infinite;

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;

// export const CampaignsTitle = styled.h2`
//   font-size: 2.5rem;
//   color: black;
//   margin-bottom: 2rem;
//   text-align: center;
//   font-weight: bold;
// `;

// export const StyledSlider = styled(Slider)`
//   min-height: 300px;
//   .slick-slide {
//     padding: 0 10px;
//   }

//   .slick-dots {
//     bottom: -30px;

//     li button:before {
//       color: #1e40af;
//     }

//     li.slick-active button:before {
//       color: #1e40af;
//     }
//   }
// `;

// // export const CampaignCard = styled.div`
// //   background-color: #ffffff;
// //   border-radius: 1rem;
// //   overflow: hidden;
// //   text-align: center;
// //   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
// //   transition: transform 0.3s ease, box-shadow 0.3s ease;
// //   width: 250px;
// //   margin: 0 auto 10px;
// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
// //   }
// // `;

// export const CampaignCard = styled.div`
//   background-color: #ffffff;
//   border-radius: 1rem;
//   overflow: hidden;
//   text-align: center;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   width: 90%;
//   max-width: 1200x; // <-- Optional max width
//   margin: 0 auto 20px;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
//   }

//   @media (max-width: 768px) {
//     width: 95%; // Better for mobile
//   }
// `;

// export const CampaignImage = styled.img`
//   width: 100%;
//   height: 180px;
//   object-fit: cover;
//   border-top-left-radius: 1rem;
//   border-top-right-radius: 1rem;
// `;

// export const CampaignContent = styled.div`
//   padding: 1.5rem;
// `;

// export const CampaignPoints = styled.div`
//   font-size: 1.25rem;
//   color: #ef4444;
//   font-weight: bold;
//   margin-bottom: 0.75rem;
//   text-align: left;
// `;

// export const CampaignTitle = styled.h3`
//   font-size: 1.5rem;
//   color: #374151;
//   margin-bottom: 0.7rem;
//   font-weight: 600;
//   text-align: left;
// `;

// export const CampaignDescription = styled.h3`
//   font-size: 1.1rem;
//   color: #374151;
//   margin-bottom: 1.5rem;
//   font-weight: 500;
//   text-align: left;
// `;

// export const ApplyButton = styled.button`
//   background-color: black;
//   color: #ffffff;
//   border: none;
//   border-radius: 0.5rem;
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   width: 100%;
//   &:hover {
//     background-color: black;
//   }
// `;

import styled from "styled-components";
import Slider from "react-slick";

export const CampaignsContainer = styled.div`
  padding: 2rem 2rem;
  background-color: #f8f9fa;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #f3f4f6;
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

export const CampaignsTitle = styled.h2`
  font-size: 2.5rem;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
`;

export const StyledSlider = styled(Slider)`
  min-height: 300px;
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

export const CampaignCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  width: 90%;
  max-width: 1200px; // Corrected from 1200x to 1200px
  margin: 0 auto 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 95%; // Better for mobile
  }
`;

export const CampaignImage = styled.img`
  width: 100%;
  height: 100%; // Changed from 180px to 100% to fit fully
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

export const CampaignContent = styled.div`
  padding: 1.5rem;
`;

export const CampaignPoints = styled.div`
  font-size: 1.25rem;
  color: #ef4444;
  font-weight: bold;
  margin-bottom: 0.75rem;
  text-align: left;
`;

export const CampaignTitle = styled.h3`
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 0.7rem;
  font-weight: 600;
  text-align: left;
`;

export const CampaignDescription = styled.h3`
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
    background-color: black;
  }
`;
