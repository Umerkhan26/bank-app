import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAdditionalItemById,
  redeemAdditionalItem,
} from "../../services/additionalItems";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updatePoints } from "../../redux/slices/auth";
import {
  Container,
  Title,
  ImageContainer,
  Image,
  Description,
  Points,
  DateRange,
  ErrorMessage,
  RedeemContainer,
  QrCodeButton,
  ShimmerWrapper,
  ShimmerTitle,
  ShimmerImage,
  ShimmerText,
  ShimmerButton,
  ItemInfo,
} from "./additionalItemsDetail.styles";
import Login from "../SignIn/SignIn";
import Modal from "../../components/Modal/modal";
import SignUp from "../SignUp/signup";
import ForgotPassword from "../Forgot Password/ForgotPassword";
import Loader from "../../components/Loader/loader";

const AdditionalItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userPoints = useSelector((state: RootState) => state.auth.userPoints);

  useEffect(() => {
    const getAdditionalItem = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!id) {
          setError("Item ID is required");
          return;
        }
        const itemData = await fetchAdditionalItemById(id);
        setItem(itemData);
      } catch (err: any) {
        console.error("Error fetching additional item:", err);
        setError(err.message || "Failed to load additional item.");
      } finally {
        setLoading(false);
      }
    };

    getAdditionalItem();
  }, [id]);

  const handleRedeem = async () => {
    if (!localStorage.getItem("token")) {
      setIsLoginOpen(true);
      return;
    }

    try {
      setRedeemLoading(true);
      const response = await redeemAdditionalItem(id!);

      // ✅ Correct path (based on your log)
      const updatedPoints = response?.data?.user?.remaining_brand_points;

      if (updatedPoints !== undefined) {
        dispatch(updatePoints(updatedPoints));
        toast.success(
          `✅ Redeemed successfully! Your new points: ${updatedPoints}`
        );
      } else {
        console.warn("⚠️ Could not find updated points in response:", response);
      }
    } catch (err: any) {
      console.error("Redeem failed:", err);
      toast.error(err.message || "Failed to redeem item.");
    } finally {
      setRedeemLoading(false);
    }
  };

  if (redeemLoading) return <Loader />;

  if (loading) {
    return (
      <Container>
        <ShimmerWrapper>
          <ShimmerTitle />
          <ShimmerImage />
          <ShimmerText />
          <ShimmerText />
          <ShimmerButton />
        </ShimmerWrapper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          {error}
          <button
            onClick={() => navigate(-1)}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </ErrorMessage>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container>
        <ErrorMessage>Additional item not found.</ErrorMessage>
      </Container>
    );
  }

  const isItemActive = item.active && new Date(item.end_date) > new Date();
  const hasEnoughPoints = (userPoints ?? 0) >= parseInt(item.points_required);
  const isInStock = item.qty === null || item.qty > 0;

  return (
    <Container>
      <Title>{item.title || "No Title Available"}</Title>
      <ImageContainer>
        <Image
          src={item.image_url || "/default-image.jpg"}
          alt={item.title || "Additional Item"}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-image.jpg";
          }}
        />
      </ImageContainer>

      <Description>
        {item.description || "No description available."}
      </Description>

      <ItemInfo>
        <Points>🔥 Points Required: {item.points_required || 0}</Points>
        <DateRange>
          📅 Start Date: {new Date(item.start_date).toLocaleDateString()}
        </DateRange>
        <DateRange>
          ⏳ End Date: {new Date(item.end_date).toLocaleDateString()}
        </DateRange>
        <DateRange>💰 Your Points: {userPoints}</DateRange>

        {!isItemActive && (
          <div style={{ color: "red", fontWeight: "bold" }}>
            This item is no longer available
          </div>
        )}

        {!isInStock && (
          <div style={{ color: "red", fontWeight: "bold" }}>Out of Stock</div>
        )}

        {!hasEnoughPoints && isItemActive && isInStock && (
          <div style={{ color: "orange", fontWeight: "bold" }}>
            You need more points to redeem this item
          </div>
        )}

        <RedeemContainer>
          {isItemActive && isInStock && hasEnoughPoints ? (
            <>
              <p>Scan to redeem for points</p>
              <QrCodeButton onClick={handleRedeem}>
                {redeemLoading ? "Processing..." : "Redeem"}
              </QrCodeButton>
            </>
          ) : (
            <QrCodeButton
              disabled
              style={{ backgroundColor: "#9ca3af", cursor: "not-allowed" }}
            >
              Cannot Redeem
            </QrCodeButton>
          )}
        </RedeemContainer>
      </ItemInfo>

      {/* Auth Modals */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignUp={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
          onSwitchToForgot={() => {
            setIsLoginOpen(false);
            setIsForgotPasswordOpen(true);
          }}
        />
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUp
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Modal>

      <Modal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      >
        <ForgotPassword
          onClose={() => setIsForgotPasswordOpen(false)}
          onSwitchToLogin={() => {
            setIsForgotPasswordOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Modal>
    </Container>
  );
};

export default AdditionalItemDetail;
