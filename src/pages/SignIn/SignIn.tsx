import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import Input from "../../components/Inputs/input";
import {
  ButtonDiv,
  FooterText,
  FormGroup,
  Label,
  SubmitButton,
  SwitchText,
  Title,
  Underline,
} from "./signin.styles";
import { loginUser } from "../../services/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth";
import Loader from "../../components/Loader/loader";

interface LoginProps {
  onSwitchToSignUp?: () => void;
  onClose?: () => void;
}

interface SignInFormValues {
  email: string;
  password: string;
}

const signInValidationSchema: yup.ObjectSchema<SignInFormValues> = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC<LoginProps> = ({ onSwitchToSignUp, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(signInValidationSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log("Login Successful:", response);

      if (response.token) {
        const userId = response.token;
        const userPoints = response.user.points;
        dispatch(
          login({
            token: response.token,
            userId,
            username: response.user.name,
            userPoints: response.user.points,
          })
        );
        toast.success("Login successful!");
        onClose?.();

        localStorage.setItem(`userPoints_${userId}`, userPoints.toString());
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Title>Sign In</Title>
      <Underline />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>
            Email<span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            placeholder="Enter your email"
            registration={register("email")}
            error={errors.email?.message}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            Password<span className="text-red-500">*</span>
          </Label>
          <Input
            type="password"
            placeholder="Enter your password"
            registration={register("password")}
            error={errors.password?.message}
            isPassword
          />
        </FormGroup>

        <ButtonDiv>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </SubmitButton>
        </ButtonDiv>
      </form>

      <FooterText>
        Don't have an account?{" "}
        <SwitchText onClick={onSwitchToSignUp}>Register Here</SwitchText>
      </FooterText>
    </>
  );
};

export default Login;
