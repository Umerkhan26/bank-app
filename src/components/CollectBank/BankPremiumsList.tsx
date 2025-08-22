import React, { useEffect, useState } from "react";
import { fetchBankPremiums } from "../../services/bank";
import { useNavigate } from "react-router-dom";
import {
  PremiumContainer,
  PremiumListContainer,
  PremiumCard,
  PremiumImage,
  PremiumContent,
  PremiumPoints,
  Title,
  PremiumTitle,
  ApplyButton,
  PremiumDescription,
} from "./collectbank.styles";
import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";

interface BankPremium {
  _id: string;
  id: string;
  title: string;
  image_url: string;
  points_required: number;
  buttonText?: string;
  description: string;
}

const BankPremiumsList: React.FC = () => {
  const [premiumData, setPremiumData] = useState<BankPremium[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleApply = (id: string) => {
    navigate(`/bank-premium/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBankPremiums();
        const bankPremiums = response.bankPremiums || [];
        setPremiumData(bankPremiums);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <PremiumContainer>
      <Title>All Bank Premiums</Title>
      <PremiumListContainer>
        {premiumData.map((premium) => (
          <PremiumCard key={premium._id}>
            <PremiumImage src={premium.image_url} alt={premium.title} />
            <PremiumContent>
              <PremiumPoints>{premium.points_required} points</PremiumPoints>
              <PremiumTitle>{premium.title}</PremiumTitle>
              <PremiumDescription>{premium.description}</PremiumDescription>
              <ApplyButton
                onClick={() => handleApply(premium._id || premium.id)}
              >
                {premium.buttonText || "Apply"}
              </ApplyButton>
            </PremiumContent>
          </PremiumCard>
        ))}
      </PremiumListContainer>
    </PremiumContainer>
  );
};

export default BankPremiumsList;
