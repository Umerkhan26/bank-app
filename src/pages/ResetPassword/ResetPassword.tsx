// src/components/ResetPassword/ResetPassword.tsx
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
  SubmitButton,
  ButtonDiv,
  FooterText,
  SwitchText,
} from "../SignUp/signup.styles";
import { resetPassword } from "../../services/auth";
import Input from "../../components/Inputs/input";
import Loader from "../../components/Loader/loader";

interface ResetPasswordProps {
  email: string;
  otp: string;
  onPasswordReset: () => void;
  onSwitchToLogin?: () => void;
}

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword: React.FC<ResetPasswordProps> = ({
  email,
  onPasswordReset,
  onSwitchToLogin,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await resetPassword(email, data.newPassword);
      if (response.message) {
        toast.success(response.message);
      } else {
        toast.success("Password reset successfully!");
      }
      onPasswordReset();
    } catch (error: any) {
      // Only show error toast if there's an actual error
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Title>Reset Password</Title>
      <Underline />
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
        Create a new password for {email}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>New Password*</Label>
          <Input
            type="password"
            placeholder="Enter new password"
            registration={register("newPassword")}
            error={errors.newPassword?.message}
            isPassword
          />
        </FormGroup>

        <FormGroup>
          <Label>Confirm Password*</Label>
          <Input
            type="password"
            placeholder="Confirm new password"
            registration={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            isPassword
          />
        </FormGroup>

        <ButtonDiv>
          <SubmitButton type="submit">Reset Password</SubmitButton>
        </ButtonDiv>
      </form>

      <FooterText>
        <SwitchText onClick={onSwitchToLogin}>Back to Sign In</SwitchText>
      </FooterText>
    </>
  );
};

export default ResetPassword;
