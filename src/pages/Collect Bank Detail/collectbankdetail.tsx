import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBankPremiumById } from "../../services/bank";
import {
  BankPremiumInfo,
  Container,
  DateRange,
  Description,
  ErrorMessage,
  Image,
  ImageContainer,
  LoadingContainer,
  LoadingSpinner,
  Points,
  Title,
} from "./collectbanksdetail.styles";

const BankPremiumDetail: React.FC = () => {
  const { id } = useParams();
  const [bankPremium, setBankPremium] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBankPremium = async () => {
      try {
        if (!id) return;
        const data = await fetchBankPremiumById(id);
        setBankPremium(data);
      } catch (err: any) {
        setError(err.message || "Failed to load bank premium.");
      } finally {
        setLoading(false);
      }
    };

    getBankPremium();
  }, [id]);

  if (loading)
    return (
      <LoadingContainer>
        <LoadingSpinner />
      </LoadingContainer>
    );

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!bankPremium) return <ErrorMessage>Bank premium not found.</ErrorMessage>;

  return (
    <Container>
      <Title>{bankPremium.title || "No Title Available"}</Title>

      <ImageContainer>
        <Image
          src={bankPremium.image_url || "/default-image.jpg"}
          alt={bankPremium.title || "Bank Premium"}
        />
      </ImageContainer>

      <Description>
        {bankPremium.description || "No description available."}
      </Description>

      <BankPremiumInfo>
        <Points>🔥 Points Required: {bankPremium.points_required || 0}</Points>
        <DateRange>
          📅 Start Date: {new Date(bankPremium.start_date).toLocaleDateString()}
        </DateRange>
        <DateRange>
          ⏳ End Date: {new Date(bankPremium.end_date).toLocaleDateString()}
        </DateRange>
      </BankPremiumInfo>
    </Container>
  );
};

export default BankPremiumDetail;
