// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchBankPremiumById, redeemBankPremium } from "../../services/bank";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { updatePoints } from "../../redux/slices/auth";
// import {
//   BankPremiumInfo,
//   Container,
//   DateRange,
//   Description,
//   ErrorMessage,
//   Image,
//   ImageContainer,
//   Points,
//   Title,
//   RedeemContainer,
//   QrCodeButton,
// } from "./collectbanksdetail.styles";
// import Login from "../SignIn/SignIn";
// import Modal from "../../components/Modal/modal";
// import Loader from "../../components/Loader/loader";

// const BankPremiumDetail: React.FC = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [bankPremium, setBankPremium] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const userPoints = useSelector((state: RootState) => state.auth.userPoints);

//   useEffect(() => {
//     const getBankPremium = async () => {
//       setLoading(true);
//       try {
//         if (!id) return;
//         const data = await fetchBankPremiumById(id);
//         setBankPremium(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load bank premium.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBankPremium();
//   }, [id]);

//   const handleRedeem = async () => {
//     if (!localStorage.getItem("token")) {
//       setIsModalOpen(true);
//       return;
//     }

//     try {
//       console.log("🔄 Starting redeem process for premiumId:", id);

//       const response = await redeemBankPremium(id!);

//       console.log("🎉 Redeem success payload:", response);

//       dispatch(
//         updatePoints([{ points: response.user.remaining_brand_points }])
//       );

//       toast.success(`✅ Redeemed successfully! Code: ${response.receipt.code}`);
//     } catch (err: any) {
//       console.error("⚠️ Redeem failed:", err);

//       toast.error(
//         err.response?.data?.message ||
//           err.message ||
//           "❌ Failed to redeem premium."
//       );
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage>{error}</ErrorMessage>;
//   if (!bankPremium) return <ErrorMessage>Bank premium not found.</ErrorMessage>;

//   return (
//     <Container>
//       <Title>{bankPremium.title || "No Title Available"}</Title>
//       <ImageContainer>
//         <Image
//           src={bankPremium.image_url || "/default-image.jpg"}
//           alt={bankPremium.title || "Bank Premium"}
//         />
//       </ImageContainer>

//       <Description>
//         {bankPremium.description || "No description available."}
//       </Description>

//       <BankPremiumInfo>
//         <Points>🔥 Points Required: {bankPremium.points_required || 0}</Points>
//         <DateRange>
//           📅 Start Date: {new Date(bankPremium.start_date).toLocaleDateString()}
//         </DateRange>
//         <DateRange>
//           ⏳ End Date: {new Date(bankPremium.end_date).toLocaleDateString()}
//         </DateRange>
//         <DateRange>💰 Your Points: {userPoints}</DateRange>
//         {/* ✅ Redeem Button */}
//         <RedeemContainer>
//           <QrCodeButton onClick={handleRedeem}>Redeem</QrCodeButton>
//         </RedeemContainer>
//       </BankPremiumInfo>

//       {/* ✅ Login Modal if not logged in */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <Login onClose={() => setIsModalOpen(false)} />
//       </Modal>
//     </Container>
//   );
// };

// export default BankPremiumDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate
// import { fetchBankPremiumById, redeemBankPremium } from "../../services/bank";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { updatePoints } from "../../redux/slices/auth";
// import {
//   BankPremiumInfo,
//   Container,
//   DateRange,
//   Description,
//   ErrorMessage,
//   Image,
//   ImageContainer,
//   Points,
//   Title,
//   RedeemContainer,
//   QrCodeButton,
// } from "./collectbanksdetail.styles";
// import Login from "../SignIn/SignIn";
// import Modal from "../../components/Modal/modal";
// import Loader from "../../components/Loader/loader";

// const BankPremiumDetail: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate(); // Initialize navigate
//   const dispatch = useDispatch();
//   const [bankPremium, setBankPremium] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const userPoints = useSelector((state: RootState) => state.auth.userPoints);

//   useEffect(() => {
//     const getBankPremium = async () => {
//       setLoading(true);
//       try {
//         if (!id) return;
//         const data = await fetchBankPremiumById(id);
//         setBankPremium(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load bank premium.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBankPremium();
//   }, [id]);

//   const handleRedeem = async () => {
//     if (!localStorage.getItem("token")) {
//       setIsModalOpen(true);
//       return;
//     }

//     try {
//       console.log("🔄 Starting redeem process for premiumId:", id);
//       const response = await redeemBankPremium(id!);
//       console.log("🎉 Redeem success payload:", response);

//       dispatch(updatePoints(response.user?.remaining_brand_points ?? 0));
//       toast.success(`✅ Redeemed successfully! Code: ${response.receipt.code}`);

//       // Navigate to receipt page with response data
//       navigate("/receipt", { state: { redemptionData: response } });
//     } catch (err: any) {
//       console.error("⚠️ Redeem failed:", err);
//       toast.error(
//         err.response?.data?.message ||
//           err.message ||
//           "❌ Failed to redeem premium."
//       );
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage>{error}</ErrorMessage>;
//   if (!bankPremium) return <ErrorMessage>Bank premium not found.</ErrorMessage>;

//   return (
//     <Container>
//       <Title>{bankPremium.title || "No Title Available"}</Title>
//       <ImageContainer>
//         <Image
//           src={bankPremium.image_url || "/default-image.jpg"}
//           alt={bankPremium.title || "Bank Premium"}
//         />
//       </ImageContainer>

//       <Description>
//         {bankPremium.description || "No description available."}
//       </Description>

//       <BankPremiumInfo>
//         <Points>🔥 Points Required: {bankPremium.points_required || 0}</Points>
//         <DateRange>
//           📅 Start Date: {new Date(bankPremium.start_date).toLocaleDateString()}
//         </DateRange>
//         <DateRange>
//           ⏳ End Date: {new Date(bankPremium.end_date).toLocaleDateString()}
//         </DateRange>
//         <DateRange>💰 Your Points: {userPoints}</DateRange>
//         <RedeemContainer>
//           <QrCodeButton onClick={handleRedeem}>Redeem</QrCodeButton>
//         </RedeemContainer>
//       </BankPremiumInfo>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <Login onClose={() => setIsModalOpen(false)} />
//       </Modal>
//     </Container>
//   );
// };

// export default BankPremiumDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchBankPremiumById, redeemBankPremium } from "../../services/bank";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { updatePoints } from "../../redux/slices/auth";
// import {
//   BankPremiumInfo,
//   Container,
//   DateRange,
//   Description,
//   ErrorMessage,
//   Image,
//   ImageContainer,
//   Points,
//   Title,
//   RedeemContainer,
//   QrCodeButton,
// } from "./collectbanksdetail.styles";
// import Login from "../SignIn/SignIn";
// import Modal from "../../components/Modal/modal";
// import Loader from "../../components/Loader/loader";
// import SignUp from "../SignUp/signup";

// const BankPremiumDetail: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [bankPremium, setBankPremium] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ two states instead of one
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isSignUpOpen, setIsSignUpOpen] = useState(false);

//   const [error, setError] = useState<string | null>(null);
//   const userPoints = useSelector((state: RootState) => state.auth.userPoints);

//   useEffect(() => {
//     const getBankPremium = async () => {
//       setLoading(true);
//       try {
//         if (!id) return;
//         const data = await fetchBankPremiumById(id);
//         setBankPremium(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to load bank premium.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBankPremium();
//   }, [id]);

//   const handleRedeem = async () => {
//     if (!localStorage.getItem("token")) {
//       setIsLoginOpen(true);
//       return;
//     }

//     try {
//       const response = await redeemBankPremium(id!);
//       dispatch(updatePoints(response.user?.remaining_total_brand_points ?? 0));

//       toast.success(`✅ Redeemed successfully! Code: ${response.receipt.code}`);

//       navigate("/receipt", { state: { redemptionData: response } });
//     } catch (err: any) {
//       console.error("⚠️ Redeem failed:", err);
//       toast.error(
//         err.response?.data?.error || err.message || "Failed to redeem premium."
//       );
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage>{error}</ErrorMessage>;
//   if (!bankPremium) return <ErrorMessage>Bank premium not found.</ErrorMessage>;

//   return (
//     <Container>
//       <Title>{bankPremium.title || "No Title Available"}</Title>
//       <ImageContainer>
//         <Image
//           src={bankPremium.image_url || "/default-image.jpg"}
//           alt={bankPremium.title || "Bank Premium"}
//         />
//       </ImageContainer>

//       <Description>
//         {bankPremium.description || "No description available."}
//       </Description>

//       <BankPremiumInfo>
//         <Points>🔥 Points Required: {bankPremium.points_required || 0}</Points>
//         {/* <DateRange>
//           📅 Start Date: {new Date(bankPremium.start_date).toLocaleDateString()}
//         </DateRange> */}
//         {/* <DateRange>
//           ⏳ End Date: {new Date(bankPremium.end_date).toLocaleDateString()}
//         </DateRange> */}
//         <DateRange>💰 Your Points: {userPoints}</DateRange>
//         <RedeemContainer>
//           <p>Scan your crown to redeem for points</p>
//           <QrCodeButton onClick={handleRedeem}>Redeem</QrCodeButton>
//         </RedeemContainer>
//       </BankPremiumInfo>

//       {/* ✅ Login Modal */}
//       <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
//         <Login
//           onClose={() => setIsLoginOpen(false)}
//           onSwitchToSignUp={() => {
//             setIsLoginOpen(false);
//             setIsSignUpOpen(true);
//           }}
//         />
//       </Modal>

//       {/* ✅ SignUp Modal */}
//       <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
//         <SignUp
//           onClose={() => setIsSignUpOpen(false)}
//           onSwitchToLogin={() => {
//             setIsSignUpOpen(false);
//             setIsLoginOpen(true);
//           }}
//         />
//       </Modal>
//     </Container>
//   );
// };

// export default BankPremiumDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBankPremiumById, redeemBankPremium } from "../../services/bank";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updatePoints } from "../../redux/slices/auth";
import {
  BankPremiumInfo,
  Container,
  DateRange,
  Description,
  ErrorMessage,
  Image,
  ImageContainer,
  Points,
  Title,
  RedeemContainer,
  QrCodeButton,
  ShimmerWrapper,
  ShimmerTitle,
  ShimmerImage,
  ShimmerText,
  ShimmerButton,
} from "./collectbanksdetail.styles";
import Login from "../SignIn/SignIn";
import Modal from "../../components/Modal/modal";
// import Loader from "../../components/Loader/loader";
import SignUp from "../SignUp/signup";
import ForgotPassword from "../Forgot Password/ForgotPassword";
const BankPremiumDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bankPremium, setBankPremium] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ three states for all auth modals
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // Add forgot password state

  const [error, setError] = useState<string | null>(null);
  const userPoints = useSelector((state: RootState) => state.auth.userPoints);

  useEffect(() => {
    const getBankPremium = async () => {
      setLoading(true);
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

  const handleRedeem = async () => {
    if (!localStorage.getItem("token")) {
      setIsLoginOpen(true);
      return;
    }

    try {
      const response = await redeemBankPremium(id!);
      dispatch(updatePoints(response.user?.remaining_total_brand_points ?? 0));

      toast.success(`✅ Redeemed successfully! Code: ${response.receipt.code}`);

      navigate("/receipt", { state: { redemptionData: response } });
    } catch (err: any) {
      console.error("⚠️ Redeem failed:", err);
      toast.error(
        err.response?.data?.error || err.message || "Failed to redeem premium."
      );
    }
  };

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
        {/* <DateRange>
          📅 Start Date: {new Date(bankPremium.start_date).toLocaleDateString()}
        </DateRange> */}
        {/* <DateRange>
          ⏳ End Date: {new Date(bankPremium.end_date).toLocaleDateString()}
        </DateRange> */}
        <DateRange>💰 Your Points: {userPoints}</DateRange>
        <RedeemContainer>
          <p>Scan your crown to redeem for points</p>
          <QrCodeButton onClick={handleRedeem}>Redeem</QrCodeButton>
        </RedeemContainer>
      </BankPremiumInfo>

      {/* ✅ Login Modal */}
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

      {/* ✅ SignUp Modal */}
      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUp
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </Modal>

      {/* ✅ Forgot Password Modal */}
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

export default BankPremiumDetail;
