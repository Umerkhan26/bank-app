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

// export default BankOffer;

import React, { useEffect, useState } from "react";
import img1 from "../../assets/Png/Banks Web Banners_433 X 254 uPCOMING PROMOTIONS copy.jpg";
import { useNavigate } from "react-router-dom";
import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";
import {
  BankOfferCard,
  BankOfferContent,
  BankOfferImage,
  BankOffersContainer,
  BankOffersTitle,
} from "./bankOffer.styles";
import { getBankOffersData } from "../../services/bankofferservice";

interface BankOffer {
  _id: string;
  title: string;
  description: string;
  discount: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

const BankOffer: React.FC = () => {
  const [bankOffers, setBankOffers] = useState<BankOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (offerId: string) => {
    navigate(`/offer-details/${offerId}`);
  };

  useEffect(() => {
    const getBankOffers = async () => {
      try {
        const data = await getBankOffersData();
        setBankOffers(data.data.filter((offer: BankOffer) => offer.isActive)); // Only active offers
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBankOffers();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const offer = bankOffers[0]; // Show only the first active bank offer
  if (!offer) return <div>No bank offers available.</div>;

  return (
    <BankOffersContainer>
      <BankOffersTitle>Upcoming Bank Offer</BankOffersTitle>
      <BankOfferCard
        onClick={() => handleCardClick(offer._id)}
        style={{ cursor: "pointer" }}
      >
        <BankOfferImage
          src={img1}
          alt={offer.title || "Bank Offer Image"}
          style={{ height: "auto" }}
        />
        <BankOfferContent>
          {/* <BankOfferPoints>{offer.discount}% Discount</BankOfferPoints> */}
          {/* <BankOfferTitle>{offer.title}</BankOfferTitle> */}
          {/* <BankOfferDescription>{offer.description}</BankOfferDescription> */}
        </BankOfferContent>
      </BankOfferCard>
    </BankOffersContainer>
  );
};

export default BankOffer;
