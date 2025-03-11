import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPromotionById } from "../../services/promotion";
import {
  Container,
  Title,
  ImageContainer,
  Image,
  Description,
  PromotionInfo,
  Points,
  DateRange,
  ErrorMessage,
  LoadingContainer,
  LoadingSpinner,
} from "./promotiondetail.styles";

const PromotionDetail: React.FC = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPromotion = async () => {
      try {
        if (!id) return;
        const data = await fetchPromotionById(id);
        setPromotion(data);
      } catch (err: any) {
        setError(err.message || "Failed to load promotion.");
      } finally {
        setLoading(false);
      }
    };

    getPromotion();
  }, [id]);

  if (loading)
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!promotion) return <ErrorMessage>Promotion not found.</ErrorMessage>;

  return (
    <Container>
      <Title>{promotion.title || "No Title Available"}</Title>

      <ImageContainer>
        <Image
          src={promotion.image_url || "/default-image.jpg"}
          alt={promotion.title || "Promotion"}
        />
      </ImageContainer>

      <Description>
        {promotion.description || "No description available."}
      </Description>

      <PromotionInfo>
        <Points>🔥 Points Required: {promotion.points_required || 0}</Points>
        <DateRange>
          📅 Start Date: {new Date(promotion.start_date).toLocaleDateString()}
        </DateRange>
        <DateRange>
          ⏳ End Date: {new Date(promotion.end_date).toLocaleDateString()}
        </DateRange>
      </PromotionInfo>
      {/* <QrCodeButton>Submit</QrCodeButton> */}
    </Container>
  );
};

export default PromotionDetail;
