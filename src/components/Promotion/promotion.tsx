// import React, { useEffect, useState } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { fetchPromotions } from "../../services/promotion";
// import img1 from "./close-up-young-colleagues-having-meeting.jpg";
// import { useNavigate } from "react-router-dom";
// import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";
// import {
//   ApplyButton,
//   PromotionCard,
//   PromotionContent,
//   PromotionDescription,
//   PromotionImage,
//   PromotionPoints,
//   PromotionsContainer,
//   PromotionsTitle,
//   PromotionTitle,
//   StyledSlider,
// } from "./promotion.styles";

// const UpcomingPromotions: React.FC = () => {
//   const [promotions, setPromotions] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // const handleApply = (promotionId: string) => {
//   //   navigate(`/promotion/${promotionId}`);
//   // };

//   const handleApply = (storeId: string) => {
//     if (!storeId) return;
//     navigate(`/store/${storeId}`);
//   };

//   useEffect(() => {
//     const getPromotions = async () => {
//       try {
//         const data = await fetchPromotions();
//         console.log("promotionssss", data);
//         setPromotions(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPromotions();
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   if (loading) {
//     <LoadingContainer>
//       <LoadingSpinner />
//     </LoadingContainer>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <PromotionsContainer>
//       <PromotionsTitle>Upcoming Promotions</PromotionsTitle>
//       <StyledSlider {...settings}>
//         {promotions.map((promotion) => (
//           <PromotionCard
//             key={promotion.id}
//             onClick={() => handleApply(promotion.stores[0])}
//             style={{ cursor: "pointer" }}
//           >
//             <PromotionImage
//               src={promotion.image_url || img1}
//               // src={img1}
//               alt={promotion.title || "Promotion Image"}
//             />

//             <PromotionContent>
//               <PromotionPoints>
//                 {promotion.points_required} Points
//                 {/* 200 Points */}
//               </PromotionPoints>
//               <PromotionTitle>{promotion.title}</PromotionTitle>
//               <PromotionDescription>
//                 {promotion.description}
//               </PromotionDescription>
//               {/* <ApplyButton
//                 onClick={() => handleApply(promotion._id || promotion.id)}
//               >
//                 {promotion.buttonText || "Apply"}
//               </ApplyButton> */}

//               <ApplyButton onClick={() => handleApply(promotion.stores[0])}>
//                 {promotion.buttonText || "Apply"}
//               </ApplyButton>
//             </PromotionContent>
//           </PromotionCard>
//         ))}
//       </StyledSlider>
//     </PromotionsContainer>
//   );
// };

// export default UpcomingPromotions;

// import React, { useEffect, useState } from "react";
// import { fetchPromotions } from "../../services/promotion";
// import img1 from "./close-up-young-colleagues-having-meeting.jpg";
// import { useNavigate } from "react-router-dom";
// import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";
// import {
//   ApplyButton,
//   PromotionCard,
//   PromotionContent,
//   PromotionDescription,
//   PromotionImage,
//   PromotionPoints,
//   PromotionsContainer,
//   PromotionsTitle,
//   PromotionTitle,
//   Title,
// } from "./promotion.styles";

// const UpcomingPromotions: React.FC = () => {
//   const [promotions, setPromotions] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleApply = (storeId: string) => {
//     if (!storeId) return;
//     navigate(`/store/${storeId}`);
//   };

//   useEffect(() => {
//     const getPromotions = async () => {
//       try {
//         const data = await fetchPromotions();
//         setPromotions(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPromotions();
//   }, []);

//   if (loading) {
//     return (
//       <LoadingContainer>
//         <LoadingSpinner />
//       </LoadingContainer>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const promotion = promotions[0]; // Show only the first promotion
//   if (!promotion) return <div>No promotions available.</div>;

//   return (
//     <PromotionsContainer>
//       <Title>WHAT'S ON!</Title>
//       <PromotionsTitle>Upcoming Promotion</PromotionsTitle>
//       <PromotionCard style={{ cursor: "pointer" }}>
//         <PromotionImage
//           src={promotion.image_url || img1}
//           alt={promotion.title || "Promotion Image"}
//           style={{ height: "auto" }} // Removed fixed height to allow full fit
//         />
//         <PromotionContent>
//           <PromotionPoints>{promotion.points_required} Points</PromotionPoints>
//           <PromotionTitle>{promotion.title}</PromotionTitle>
//           <PromotionDescription>{promotion.description}</PromotionDescription>
//           <ApplyButton onClick={() => handleApply(promotion.stores[0])}>
//             {promotion.buttonText || "Apply Now"}
//           </ApplyButton>
//         </PromotionContent>
//       </PromotionCard>
//     </PromotionsContainer>
//   );
// };

// export default UpcomingPromotions;

// import React, { useEffect, useState } from "react";
// import { fetchPromotions } from "../../services/promotion";
// import img1 from "./close-up-young-colleagues-having-meeting.jpg";
// import { useNavigate } from "react-router-dom";
// import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";
// import {
//   PromotionCard,
//   PromotionContent,
//   PromotionDescription,
//   PromotionImage,
//   PromotionPoints,
//   PromotionsContainer,
//   PromotionsTitle,
//   PromotionTitle,
//   Title,
// } from "./promotion.styles";

// const UpcomingPromotions: React.FC = () => {
//   const [promotions, setPromotions] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // const handleNavigate = (storeId: string) => {
//   //   if (!storeId) return;
//   //   navigate(`/store/${storeId}`);
//   // };

//   const handleNavigate = () => {
//     navigate("/no-promotion");
//   };

//   useEffect(() => {
//     const getPromotions = async () => {
//       try {
//         const data = await fetchPromotions();
//         setPromotions(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPromotions();
//   }, []);

//   if (loading) {
//     return (
//       <LoadingContainer>
//         <LoadingSpinner />
//       </LoadingContainer>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const promotion = promotions[0]; // Show only the first promotion
//   if (!promotion) return <div>No promotions available.</div>;

//   return (
//     <PromotionsContainer>
//       <Title>WHAT'S ON!</Title>
//       <PromotionsTitle>Upcoming Promotion</PromotionsTitle>
//       {/* <PromotionCard
//         onClick={() => handleNavigate(promotion.stores?.[0])}
//         style={{ cursor: "pointer" }}
//       >
//         <PromotionImage
//           src={promotion.image_url || img1}
//           alt={promotion.title || "Promotion Image"}
//           style={{ height: "auto" }}
//         />
//         <PromotionContent>
//           <PromotionPoints>{promotion.points_required} Points</PromotionPoints>
//           <PromotionTitle>{promotion.title}</PromotionTitle>
//           <PromotionDescription>{promotion.description}</PromotionDescription>
//         </PromotionContent>
//       </PromotionCard> */}

//       <PromotionCard onClick={handleNavigate} style={{ cursor: "pointer" }}>
//         <PromotionImage
//           src={promotion.image_url || img1}
//           alt={promotion.title || "Promotion Image"}
//           style={{ height: "auto" }}
//         />
//         <PromotionContent>
//           <PromotionPoints>{promotion.points_required} Points</PromotionPoints>
//           <PromotionTitle>{promotion.title}</PromotionTitle>
//           <PromotionDescription>{promotion.description}</PromotionDescription>
//         </PromotionContent>
//       </PromotionCard>
//     </PromotionsContainer>
//   );
// };

// export default UpcomingPromotions;

import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/Png/Banks Web Banners_433 X 254 BanksΓÇÖ Offers.jpg";
import {
  PromotionCard,
  PromotionContent,
  PromotionImage,
  PromotionsContainer,
  PromotionsTitle,
  Title,
} from "./promotion.styles";

const UpcomingPromotions: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/no-promotion");
  };

  // ✅ Static promotion data
  const promotion = {
    image_url: img1,
    points_required: 50,
    title: "Special Summer Offer",
    description: "Enjoy exclusive discounts on our summer collection!",
  };

  return (
    <PromotionsContainer>
      <Title>WHAT'S ON!</Title>
      <PromotionsTitle>Upcoming Promotions</PromotionsTitle>

      <PromotionCard onClick={handleNavigate} style={{ cursor: "pointer" }}>
        <PromotionImage
          src={promotion.image_url}
          alt={promotion.title}
          style={{ height: "auto" }}
        />
        <PromotionContent></PromotionContent>
      </PromotionCard>
    </PromotionsContainer>
  );
};

export default UpcomingPromotions;
