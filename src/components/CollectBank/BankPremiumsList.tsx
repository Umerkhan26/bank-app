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
  PremiumImageBox,
  ShimmerWrapper,
  ShimmerCard,
  ShimmerImage,
  ShimmerText,
} from "./collectbank.styles";

interface BankPremium {
  _id: string;
  id: string;
  title: string;
  image_url: string;
  points_required: number;
  buttonText?: string;
  description: string;
  qty?: number | null;
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
      <PremiumContainer>
        <Title>All Bank Premiums</Title>
        <ShimmerWrapper>
          {[...Array(6)].map((_, index) => (
            <ShimmerCard key={index}>
              <ShimmerImage />
              <ShimmerText width="60%" />
              <ShimmerText width="80%" />
              <ShimmerText width="40%" />
              <ShimmerText width="70%" />
            </ShimmerCard>
          ))}
        </ShimmerWrapper>
      </PremiumContainer>
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
            <PremiumImageBox>
              <PremiumImage src={premium.image_url} alt={premium.title} />
            </PremiumImageBox>
            <PremiumContent>
              <PremiumPoints>{premium.points_required} points</PremiumPoints>
              <PremiumTitle>{premium.title}</PremiumTitle>
              <PremiumDescription>{premium.description}</PremiumDescription>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Qty: {premium.qty ?? "Unlimited"}
              </div>
              {premium.qty === 0 ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                  Out of Stock
                </div>
              ) : (
                <ApplyButton
                  onClick={() => handleApply(premium._id || premium.id)}
                >
                  {premium.buttonText || "Redeem"}
                </ApplyButton>
              )}
            </PremiumContent>
          </PremiumCard>
        ))}
      </PremiumListContainer>
    </PremiumContainer>
  );
};

export default BankPremiumsList;
