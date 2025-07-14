import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchPromotions } from "../../services/promotion";
import img1 from "./close-up-young-colleagues-having-meeting.jpg";
import { useNavigate } from "react-router-dom";
import { LoadingContainer, LoadingSpinner } from "../Campaign/campaign.styles";
import {
  ApplyButton,
  PromotionCard,
  PromotionContent,
  PromotionDescription,
  PromotionImage,
  PromotionPoints,
  PromotionsContainer,
  PromotionsTitle,
  PromotionTitle,
  StyledSlider,
} from "./promotion.styles";

const UpcomingPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // const handleApply = (promotionId: string) => {
  //   navigate(`/promotion/${promotionId}`);
  // };

  const handleApply = (storeId: string) => {
    if (!storeId) return;
    navigate(`/store/${storeId}`);
  };

  useEffect(() => {
    const getPromotions = async () => {
      try {
        const data = await fetchPromotions();
        console.log("promotionssss", data);
        setPromotions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPromotions();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PromotionsContainer>
      <PromotionsTitle>Upcoming Promotions</PromotionsTitle>
      <StyledSlider {...settings}>
        {promotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            onClick={() => handleApply(promotion.stores[0])}
            style={{ cursor: "pointer" }}
          >
            <PromotionImage
              src={promotion.image_url || img1}
              // src={img1}
              alt={promotion.title || "Promotion Image"}
            />

            <PromotionContent>
              <PromotionPoints>
                {promotion.points_required} Points
                {/* 200 Points */}
              </PromotionPoints>
              <PromotionTitle>{promotion.title}</PromotionTitle>
              <PromotionDescription>
                {promotion.description}
              </PromotionDescription>
              {/* <ApplyButton
                onClick={() => handleApply(promotion._id || promotion.id)}
              >
                {promotion.buttonText || "Apply"}
              </ApplyButton> */}

              <ApplyButton onClick={() => handleApply(promotion.stores[0])}>
                {promotion.buttonText || "Apply"}
              </ApplyButton>
            </PromotionContent>
          </PromotionCard>
        ))}
      </StyledSlider>
    </PromotionsContainer>
  );
};

export default UpcomingPromotions;
