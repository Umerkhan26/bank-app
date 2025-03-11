import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../../services/auth";
import { toast, ToastContainer } from "react-toastify";
import {
  ButtonDiv,
  ErrorMessage,
  FooterText,
  FormGroup,
  Input,
  Label,
  Message,
  SubmitButton,
  SwitchText,
  Title,
  Underline,
} from "./signup.styles";
import Loader from "../../components/Loader/loader";

interface SignUpProps {
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin, onClose }) => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { firstName, lastName, email, password } = data;
      const userData = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        date_of_birth: "2000-01-01",
        is_over_18: true,
      };

      await registerUser(userData);
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      setRegistrationSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      {registrationSuccess ? (
        <Message>
          Registration successful! Please check your email to verify your
          account.
        </Message>
      ) : (
        <>
          <Title>Sign Up</Title>
          <Underline />
          <button
            onClick={onClose}
            style={{ float: "right", cursor: "pointer" }}
          ></button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>First Name*</Label>
              <Input
                {...register("firstName")}
                placeholder="Enter your first name"
              />
              <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label>Last Name*</Label>
              <Input
                {...register("lastName")}
                placeholder="Enter your last name"
              />
              <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label>Email*</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label>Password*</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password*</Label>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm your password"
              />
              <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            </FormGroup>

            <ButtonDiv>
              <SubmitButton type="submit">Sign Up</SubmitButton>
            </ButtonDiv>
          </form>

          <FooterText>
            Already have an account?{" "}
            <SwitchText onClick={onSwitchToLogin}>Sign In</SwitchText>
          </FooterText>
        </>
      )}
    </>
  );
};

export default SignUp;
