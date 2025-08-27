// import React, { useEffect, useState } from "react";
// import img1 from "../../assets/Png/Banks Web Banners_433 X 254 uPCOMING PROMOTIONS copy.jpg";
// import { useNavigate } from "react-router-dom";
// import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";
// import {
//   ApplyButton,
//   BankOfferCard,
//   BankOfferContent,
//   BankOfferDescription,
//   BankOfferImage,
//   BankOfferPoints,
//   BankOffersContainer,
//   BankOffersTitle,
//   BankOfferTitle,
// } from "./bankOffer.styles";
// import { getBankOffersData } from "../../services/bankofferservice";

// interface BankOffer {
//   _id: string;
//   title: string;
//   description: string;
//   discount: number;
//   validFrom: string;
//   validTo: string;
//   isActive: boolean;
// }

// const BankOffer: React.FC = () => {
//   const [bankOffers, setBankOffers] = useState<BankOffer[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleApply = (offerId: string) => {
//     navigate(`/offer-details/${offerId}`);
//   };

//   useEffect(() => {
//     const getBankOffers = async () => {
//       try {
//         const data = await getBankOffersData();
//         setBankOffers(data.data.filter((offer: BankOffer) => offer.isActive)); // Only active offers
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBankOffers();
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

//   const offer = bankOffers[0]; // Show only the first active bank offer
//   if (!offer) return <div>No bank offers available.</div>;

//   return (
//     <BankOffersContainer>
//       <BankOffersTitle>Upcoming Bank Offer</BankOffersTitle>
//       <BankOfferCard style={{ cursor: "pointer" }}>
//         <BankOfferImage
//           src={img1}
//           alt={offer.title || "Bank Offer Image"}
//           style={{ height: "auto" }}
//         />
//         <BankOfferContent>
//           {/* <BankOfferPoints>{offer.discount}% Discount</BankOfferPoints> */}
//           {/* <BankOfferTitle>{offer.title}</BankOfferTitle> */}
//           {/* <BankOfferDescription>{offer.description}</BankOfferDescription> */}
//           <ApplyButton onClick={() => handleApply(offer._id)}>
//             Apply Now
//           </ApplyButton>
//         </BankOfferContent>
//       </BankOfferCard>
//     </BankOffersContainer>
//   );
// };

// // export default BankOffer;

// import React, { useEffect, useState } from "react";
// import img1 from "../../assets/Png/Banks Web Banners_433 X 254 uPCOMING PROMOTIONS copy.jpg";
// import { useNavigate } from "react-router-dom";
// import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";
// import {
//   BankOfferCard,
//   BankOfferContent,
//   BankOfferImage,
//   BankOffersContainer,
//   BankOffersTitle,
// } from "./bankOffer.styles";
// import { getBankOffersData } from "../../services/bankofferservice";

// interface BankOffer {
//   _id: string;
//   title: string;
//   description: string;
//   discount: number;
//   validFrom: string;
//   validTo: string;
//   isActive: boolean;
// }

// const BankOffer: React.FC = () => {
//   const [bankOffers, setBankOffers] = useState<BankOffer[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleCardClick = (offerId: string) => {
//     navigate(`/offer-details/${offerId}`);
//   };

//   useEffect(() => {
//     const getBankOffers = async () => {
//       try {
//         const data = await getBankOffersData();
//         setBankOffers(data.data.filter((offer: BankOffer) => offer.isActive)); // Only active offers
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBankOffers();
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

//   const offer = bankOffers[0]; // Show only the first active bank offer
//   if (!offer) return <div>No bank offers available.</div>;

//   return (
//     <BankOffersContainer>
//       <BankOffersTitle>Upcoming Bank Offer</BankOffersTitle>
//       <BankOfferCard
//         onClick={() => handleCardClick(offer._id)}
//         style={{ cursor: "pointer" }}
//       >
//         <BankOfferImage
//           src={img1}
//           alt={offer.title || "Bank Offer Image"}
//           style={{ height: "auto" }}
//         />
//         <BankOfferContent>
//           {/* <BankOfferPoints>{offer.discount}% Discount</BankOfferPoints> */}
//           {/* <BankOfferTitle>{offer.title}</BankOfferTitle> */}
//           {/* <BankOfferDescription>{offer.description}</BankOfferDescription> */}
//         </BankOfferContent>
//       </BankOfferCard>
//     </BankOffersContainer>
//   );
// };

// export default BankOffer;

import React from "react";
import img1 from "../../assets/Png/Banks Web Banners_433 X 254 uPCOMING PROMOTIONS copy.jpg";
import { useNavigate } from "react-router-dom";
import {
  BankOfferCard,
  BankOfferContent,
  BankOfferImage,
  BankOffersContainer,
  BankOffersTitle,
} from "./bankOffer.styles";

const BankOffer: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/offer-details/static-offer");
  };

  // ✅ Static offer data
  const offer = {
    _id: "static-1",
    title: "Exclusive Bank Offer",
    description: "Get 20% cashback when you shop with XYZ Bank cards.",
    discount: 20,
    validFrom: "2025-08-01",
    validTo: "2025-09-30",
    isActive: true,
    image_url: img1,
  };

  return (
    <BankOffersContainer>
      <BankOffersTitle>Banks Offer</BankOffersTitle>

      <BankOfferCard onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <BankOfferImage
          src={offer.image_url}
          alt={offer.title}
          style={{ height: "auto" }}
        />
        <BankOfferContent></BankOfferContent>
      </BankOfferCard>
    </BankOffersContainer>
  );
};

export default BankOffer;
