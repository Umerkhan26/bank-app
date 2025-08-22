import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCampaignById, redeemCampaign } from "../../services/campaign";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updatePoints } from "../../redux/slices/auth";
import {
  CampaignInfo,
  Container,
  ContentContainer,
  DateRange,
  Description,
  ErrorMessage,
  Image,
  ImageContainer,
  Points,
  QrCodeButton,
  RedeemContainer,
  SectionWrapper,
  Title,
} from "./campaigndetails.styles";
import Login from "../SignIn/SignIn";
import Modal from "../../components/Modal/modal";
import Loader from "../../components/Loader/loader";

const CampaignDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userPoints = useSelector((state: RootState) => state.auth.userPoints);

  useEffect(() => {
    const getCampaign = async () => {
      setLoading(true);
      try {
        if (!id) return;
        const data = await fetchCampaignById(id);
        console.log("campaignbyid", data);
        setCampaign(data);
      } catch (err: any) {
        setError(err.message || "Failed to load campaign.");
      } finally {
        setLoading(false);
      }
    };

    getCampaign();
  }, [id]);

  const handleRedeem = async () => {
    if (!localStorage.getItem("token")) {
      setIsModalOpen(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: Please login first.");
        return;
      }

      const response = await redeemCampaign(id!, token);

      console.log("🎉 Redeem success payload:", response);

      dispatch(updatePoints(response.user?.remaining_points ?? 0));

      toast.success(response.message || "Campaign redeemed successfully!");
    } catch (err: any) {
      // 👇 detailed error logging
      if (err.response) {
        console.error("❌ Redeem error (API):", err.response.data);
      } else {
        console.error("❌ Redeem error (Unexpected):", err.message);
      }

      toast.error(err.response?.data?.message || "Failed to redeem campaign.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!campaign) return <ErrorMessage>Campaign not found.</ErrorMessage>;

  return (
    <Container>
      <Title>{campaign.title || "No Title Available"}</Title>
      <SectionWrapper>
        <ImageContainer>
          <Image
            src={campaign.image_url || "/default-image.jpg"}
            alt={campaign.title || "Campaign"}
          />
        </ImageContainer>
        <ContentContainer>
          <CampaignInfo>
            <Description>
              {campaign.description || "No description available."}
            </Description>
            <Points>🔥 Points Required: {campaign.points_required || 0}</Points>
            <DateRange>
              📅 Start Date:{" "}
              {new Date(campaign.start_date).toLocaleDateString()}
            </DateRange>
            <DateRange>
              ⏳ End Date: {new Date(campaign.end_date).toLocaleDateString()}
            </DateRange>
            <DateRange>💰 Your Points: {userPoints}</DateRange>
          </CampaignInfo>
          <RedeemContainer>
            <QrCodeButton onClick={handleRedeem}>Redeem</QrCodeButton>
          </RedeemContainer>
        </ContentContainer>
      </SectionWrapper>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Login onClose={() => setIsModalOpen(false)} />
      </Modal>
    </Container>
  );
};

export default CampaignDetail;
