import React, { useEffect, useState } from "react";
import { fetchAllAdditionalItems } from "../../services/additionalItems";
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
} from "../../components/AdditionalItems/additionalItems.styles";

interface AdditionalItem {
  _id: string;
  id: string;
  title: string;
  image_url: string;
  points_required: string;
  buttonText?: string;
  description: string;
  qty?: number | null;
}

const AdditionalItemsList: React.FC = () => {
  const [itemsData, setItemsData] = useState<AdditionalItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleApply = (id: string) => {
    navigate(`/additional-item/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllAdditionalItems();
        const items = response.data || [];
        setItemsData(items);
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
        <Title>All Additional Items</Title>
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
      <Title>All Additional Items</Title>
      <PremiumListContainer>
        {itemsData.map((item) => (
          <PremiumCard key={item._id}>
            <PremiumImageBox>
              <PremiumImage src={item.image_url} alt={item.title} />
            </PremiumImageBox>
            <PremiumContent>
              <PremiumPoints>{item.points_required} points</PremiumPoints>
              <PremiumTitle>{item.title}</PremiumTitle>
              <PremiumDescription>{item.description}</PremiumDescription>
              <div
                style={{
                  marginBottom: "10px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Qty: {item.qty ?? "Unlimited"}
              </div>
              {item.qty === 0 ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                  Out of Stock
                </div>
              ) : (
                <ApplyButton onClick={() => handleApply(item._id || item.id)}>
                  {item.buttonText || "Redeem"}
                </ApplyButton>
              )}
            </PremiumContent>
          </PremiumCard>
        ))}
      </PremiumListContainer>
    </PremiumContainer>
  );
};

export default AdditionalItemsList;
