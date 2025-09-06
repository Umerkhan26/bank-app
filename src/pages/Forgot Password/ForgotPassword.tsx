// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { toast } from "react-toastify";
// import {
//   Title,
//   Underline,
//   FormGroup,
//   Label,
//   Input,
//   ErrorMessage,
//   SubmitButton,
//   ButtonDiv,
//   FooterText,
//   SwitchText,
// } from "../SignUp/signup.styles"; // reuse styles
// import Loader from "../../components/Loader/loader";
// import { sendForgotPasswordOTP } from "../../services/auth"; // API call

// interface ForgotPasswordProps {
//   onClose?: () => void;
//   onSwitchToLogin?: () => void;
// }

// interface FormData {
//   email: string;
// }

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .trim()
//     .email("Invalid email")
//     .required("Email is required"),
// });

// const ForgotPassword: React.FC<ForgotPasswordProps> = ({
//   onSwitchToLogin,
//   onClose,
// }) => {
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({ resolver: yupResolver(schema) });

//   const onSubmit = async (data: FormData) => {
//     setLoading(true);
//     try {
//       const response = await sendForgotPasswordOTP(data.email);
//       toast.success(response.message || "OTP sent successfully!");
//       onSwitchToLogin?.(); // Go back to login
//     } catch (error: any) {
//       toast.error(error.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <Loader />}
//       <Title>Forgot Password</Title>
//       <Underline />
//       <button
//         onClick={onClose}
//         style={{ float: "right", cursor: "pointer" }}
//       ></button>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <FormGroup>
//           <Label>Email*</Label>
//           <Input
//             {...register("email")}
//             type="email"
//             placeholder="Enter your email"
//           />
//           <ErrorMessage>{errors.email?.message}</ErrorMessage>
//         </FormGroup>

//         <ButtonDiv>
//           <SubmitButton type="submit">Send OTP</SubmitButton>
//         </ButtonDiv>
//       </form>

//       <FooterText>
//         Remembered password?{" "}
//         <SwitchText onClick={onSwitchToLogin}>Sign In</SwitchText>
//       </FooterText>
//     </>
//   );
// };

// export default ForgotPassword;

// src/pages/Forgot Password/ForgotPassword.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  Title,
  Underline,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  ButtonDiv,
  FooterText,
  SwitchText,
} from "../SignUp/signup.styles";
import Loader from "../../components/Loader/loader";
import { sendForgotPasswordOTP } from "../../services/auth";
import OTPVerification from "../OTP Verification/OTPVerification";
import ResetPassword from "../ResetPassword/ResetPassword";

interface ForgotPasswordProps {
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
});

type ForgotPasswordStep = "email" | "otp" | "reset";

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSwitchToLogin,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [verifiedOtp, setVerifiedOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await sendForgotPasswordOTP(data.email);
      setEmail(data.email);
      setStep("otp");
      toast.success(response.message || "OTP sent successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await sendForgotPasswordOTP(email);
      toast.success(response.message || "OTP resent successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP");
    }
  };

  const handleVerificationSuccess = (otp: string) => {
    setVerifiedOtp(otp); // ✅ store it
    setStep("reset");
  };

  const handlePasswordReset = () => {
    // toast.success("Password reset successfully!");
    onSwitchToLogin?.();
  };

  return (
    <>
      {loading && <Loader />}

      {step === "email" && (
        <>
          <Title>Forgot Password</Title>
          <Underline />
          <button
            onClick={onClose}
            style={{ float: "right", cursor: "pointer" }}
          ></button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>Email*</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </FormGroup>

            <ButtonDiv>
              <SubmitButton type="submit">Send OTP</SubmitButton>
            </ButtonDiv>
          </form>

          <FooterText>
            Remembered password?{" "}
            <SwitchText onClick={onSwitchToLogin}>Sign In</SwitchText>
          </FooterText>
        </>
      )}

      {step === "otp" && (
        <OTPVerification
          email={email}
          onVerificationSuccess={handleVerificationSuccess}
          onResendOTP={handleResendOTP}
          onSwitchToLogin={onSwitchToLogin}
        />
      )}

      {step === "reset" && (
        <ResetPassword
          email={email}
          otp={verifiedOtp}
          onPasswordReset={handlePasswordReset}
          onSwitchToLogin={onSwitchToLogin}
        />
      )}
    </>
  );
};

export default ForgotPassword;
