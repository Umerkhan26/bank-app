import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  sendDeleteAccountOTP,
  verifyDeleteAccountOTP,
} from "../../services/auth";
import { FiMail, FiKey, FiArrowLeft } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout, updatePoints } from "../../redux/slices/auth";
import { ClipLoader } from "react-spinners";
import Input from "../../components/Inputs/input";

const DeleteAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const res = await sendDeleteAccountOTP(email);
      if (res.success) {
        toast.success(res.message);
        setStep("otp");
      } else toast.error(res.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) return;
    setResendLoading(true);
    try {
      const res = await sendDeleteAccountOTP(email);
      if (res.success) toast.success("OTP resent successfully");
      else toast.error(res.message);
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyDeleteAccountOTP(email, otp);
      if (res.success) {
        toast.success(res.message);

        localStorage.clear();

        dispatch(logout());
        dispatch(updatePoints(0));
        navigate("/");
      } else {
        toast.error(res.message);
        setOtp("");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify OTP");
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {loading && (
        <LoaderOverlay>
          <ClipLoader color="#000" size={40} />
        </LoaderOverlay>
      )}
      <BackgroundCircle className="red1" />
      <BackgroundCircle className="red2" />
      <Card>
        <IconWrapper>
          <MdDeleteForever size={50} color="#dc2626" />
        </IconWrapper>
        <Title>{step === "email" ? "Delete Your Account" : "Verify OTP"}</Title>
        <SubText>
          {step === "email"
            ? "Enter your email address below. We’ll send you a 6-digit verification code to confirm your deletion request."
            : `Enter the 6-digit code sent to ${email}.`}
        </SubText>

        {step === "email" ? (
          <Form onSubmit={handleSendOTP}>
            <FieldRow>
              <Label>
                <FiMail size={16} color="#000" /> Email
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </FieldRow>

            <ButtonRow>
              <PrimaryButton type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </PrimaryButton>
            </ButtonRow>
          </Form>
        ) : (
          <Form onSubmit={handleVerifyOTP}>
            <FieldRow>
              <Label>
                <FiKey size={16} color="#dc2626" /> 6-Digit OTP
              </Label>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                placeholder="••••••"
                required
                // style={{ textAlign: "center", fontSize: "1.5rem" }}
              />
            </FieldRow>

            <ButtonRow>
              <PrimaryButton
                type="submit"
                disabled={loading || otp.length !== 6}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={18} />
                ) : (
                  "Confirm & Delete"
                )}
              </PrimaryButton>

              <SecondaryButton
                type="button"
                onClick={handleResendOTP}
                disabled={resendLoading}
              >
                {resendLoading ? (
                  <ClipLoader color="#fff" size={18} />
                ) : (
                  "Resend"
                )}
              </SecondaryButton>

              <BackButton
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                }}
              >
                <FiArrowLeft size={16} /> Back
              </BackButton>
            </ButtonRow>
          </Form>
        )}

        <WarningBox>
          ⚠️ Once confirmed, your account and all data will be permanently
          deleted and <b>cannot be recovered</b>. Please make sure you’ve backed
          up everything important.
        </WarningBox>
      </Card>
    </Wrapper>
  );
};

export default DeleteAccount;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.35;
  z-index: 0;

  &.red1 {
    // background: #fecaca;
    top: -100px;
    left: -100px;
  }
  &.red2 {
    // background: #fca5a5;
    bottom: -100px;
    right: -100px;
  }
`;

const Card = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 450px;
  background: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin: 10px 0;
  @media (max-width: 480px) {
    padding: 25px;
    border-radius: 15px;
  }
`;

const IconWrapper = styled.div`
  background: #fee2e2;
  padding: 20px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SubText = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Form = styled.form`
  margin-top: 30px;
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 90px;

  @media (max-width: 480px) {
    min-width: 0;
    font-size: 0.95rem;
    padding-left: 0;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: nowrap;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease all;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  min-width: 100px;
  text-align: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    justify-content: center; // center text horizontally
    gap: 4px; // reduce gap for smaller screens
    padding: 12px 14px;
    font-size: 0.95rem;
    min-width: 100%;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: black;
  color: white;

  &:hover:not(:disabled) {
    background: #171414ff;
  }
`;

const SecondaryButton = styled(BaseButton)`
  background: #000;
  color: white;

  &:hover:not(:disabled) {
    background: #131313ff;
  }
`;

const BackButton = styled(BaseButton)`
  background: #f3f4f6;
  color: #374151;

  &:hover {
    background: #e5e7eb;
  }
`;

const WarningBox = styled.div`
  margin-top: 30px;
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 14px;
  font-size: 0.9rem;
  line-height: 1.5;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 12px;
  }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
