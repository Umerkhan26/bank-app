// src/components/Auth/VerifyCode.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  ButtonDiv,
  ErrorMessage,
  FormGroup,
  Input,
  Label,
  SubmitButton,
  Title,
  Underline,
} from "../SignUp/signup.styles";
import Loader from "../../components/Loader/loader";
import { verifyEmailCode } from "../../services/auth";

interface VerifyCodeProps {
  email: string;
  onVerified: () => void;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ email, onVerified }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      toast.error("Please enter the verification code.");
      return;
    }
    setLoading(true);
    try {
      const data = await verifyEmailCode(code); // ✅ use service
      toast.success(data.message || "Email verified successfully!");
      onVerified();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Title>Email Verification</Title>
      <Underline />
      <p style={{ fontSize: "14px", marginBottom: "15px" }}>
        A verification code has been sent to <b>{email}</b>. Please enter it
        below to verify your account.
      </p>

      <FormGroup>
        <Label>Verification Code*</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter the 6-digit code"
        />
        <ErrorMessage></ErrorMessage>
      </FormGroup>

      <ButtonDiv>
        <SubmitButton onClick={handleVerify}>Verify</SubmitButton>
      </ButtonDiv>
    </>
  );
};

export default VerifyCode;
