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

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchCampaignById, redeemCampaign } from "../../services/campaign";
// import { Message } from "../SignUp/signup.styles";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { updatePoints } from "../../redux/slices/auth";
// import {
//   CampaignInfo,
//   Container,
//   ContentContainer,
//   DateRange,
//   Description,
//   ErrorMessage,
//   Image,
//   ImageContainer,
//   LoadingContainer,
//   LoadingSpinner,
//   Points,
//   QrCodeButton,
//   RedeemContainer,
//   SectionWrapper,
//   Title,
// } from "./campaigndetails.styles";

// const CampaignDetail: React.FC = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [campaign, setCampaign] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [redeemMessage, setRedeemMessage] = useState<string | null>(null);
//   const userPoints = useSelector((state: RootState) => state.auth.userPoints);

//   useEffect(() => {
//     const getCampaign = async () => {
//       try {
//         if (!id) return;
//         const data = await fetchCampaignById(id);
//         setCampaign(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load campaign.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getCampaign();
//   }, [id]);

//   const handleRedeem = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Unauthorized: Please login first.");
//         return;
//       }

//       const response = await redeemCampaign(id!, token);
//       dispatch(updatePoints(response.user.remaining_points));
//       setRedeemMessage(response);
//       toast.success(response.message || "Campaign redeemed successfully!");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Failed to redeem campaign.");
//     }
//   };

//   if (loading)
//     return (
//       <LoadingContainer>
//         <LoadingSpinner />
//       </LoadingContainer>
//     );

//   if (error) return <ErrorMessage>{error}</ErrorMessage>;
//   if (!campaign) return <ErrorMessage>Campaign not found.</ErrorMessage>;

//   return (
//     <Container>
//       <Title>{campaign.title || "No Title Available"}</Title>
//       <SectionWrapper>
//         <ImageContainer>
//           <Image
//             src={campaign.image_url || "/default-image.jpg"}
//             alt={campaign.title || "Campaign"}
//           />
//         </ImageContainer>
//         <ContentContainer>
//           <CampaignInfo>
//             <Description>
//               {campaign.description || "No description available."}
//             </Description>
//             <Points>🔥 Points Required: {campaign.points_required || 0}</Points>
//             <DateRange>
//               📅 Start Date:{" "}
//               {new Date(campaign.start_date).toLocaleDateString()}
//             </DateRange>
//             <DateRange>
//               ⏳ End Date: {new Date(campaign.end_date).toLocaleDateString()}
//             </DateRange>
//             <DateRange>💰 Your Points: {userPoints}</DateRange>
//           </CampaignInfo>
//           <RedeemContainer>
//             <QrCodeButton onClick={handleRedeem}>Redeem</QrCodeButton>
//             {redeemMessage && <Message>{redeemMessage}</Message>}
//           </RedeemContainer>
//         </ContentContainer>
//       </SectionWrapper>
//     </Container>
//   );
// };

// export default CampaignDetail;
