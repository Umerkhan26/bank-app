// src/components/OTPVerification/OTPVerification.tsx
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  Title,
  Underline,
  FormGroup,
  Label,
  SubmitButton,
  ButtonDiv,
  FooterText,
  SwitchText,
  ErrorMessage,
} from "../SignUp/signup.styles";
import { verifyForgotPasswordOTP } from "../../services/auth";
import Loader from "../../components/Loader/loader";

interface OTPVerificationProps {
  email: string;
  onVerificationSuccess: (userId: string) => void;
  onResendOTP: () => void;
  onSwitchToLogin?: () => void;
}

interface FormData {
  otp: string;
}

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerificationSuccess,
  onResendOTP,
  onSwitchToLogin,
}) => {
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendOTP = () => {
    if (!canResend) return;

    setTimer(60);
    setCanResend(false);
    onResendOTP();
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    // Update the input value
    if (inputRefs.current[index]) {
      inputRefs.current[index]!.value = value;
    }

    // Focus next input if value entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Update form value by combining all inputs
    const otpValue = inputRefs.current
      .map((input) => input?.value || "")
      .join("");
    setValue("otp", otpValue, { shouldValidate: true });
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !inputRefs.current[index]?.value &&
      index > 0
    ) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    const otpValue = inputRefs.current
      .map((input) => input?.value || "")
      .join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyForgotPasswordOTP(email, otpValue);
      toast.success(response.message || "OTP verified successfully!");

      // 🔥 FIX: don't pass response.user.id if it's not guaranteed
      onVerificationSuccess(otpValue);
    } catch (error: any) {
      toast.error(error.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Title>Verify OTP</Title>
      <Underline />
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Enter the 6-digit code sent to {email}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Verification Code*</Label>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  fontSize: "18px",
                  border: errors.otp
                    ? "1px solid #ff4d4f"
                    : "1px solid #d9d9d9",
                  borderRadius: "4px",
                }}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <ErrorMessage>{errors.otp?.message}</ErrorMessage>
        </FormGroup>

        <ButtonDiv>
          <SubmitButton type="submit">Verify OTP</SubmitButton>
        </ButtonDiv>
      </form>

      <FooterText>
        Didn't receive the code?{" "}
        {canResend ? (
          <SwitchText onClick={handleResendOTP}>Resend OTP</SwitchText>
        ) : (
          <span>Resend in {timer}s</span>
        )}
      </FooterText>

      <FooterText>
        <SwitchText onClick={onSwitchToLogin}>Back to Sign In</SwitchText>
      </FooterText>
    </>
  );
};

export default OTPVerification;
