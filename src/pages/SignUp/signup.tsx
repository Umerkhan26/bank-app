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
  SubmitButton,
  SwitchText,
  Title,
  Underline,
} from "./signup.styles";
import Loader from "../../components/Loader/loader";
import VerifyCode from "../VerifyCode/VerifyCode";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// ✅ Import VerifyCode component

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
  parish: string;
  date_of_birth: string;
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .transform((value) => (value ? value.replace(/\s+/g, " ").trim() : ""))
    .required("First name is required")
    .matches(
      /^(?! )[A-Za-z]+(?:[ '’\-\.][A-Za-z]+)*-?$/,
      "Please enter a valid name"
    ),

  lastName: yup
    .string()
    .transform((value) => (value ? value.replace(/\s+/g, " ").trim() : ""))
    .required("Last name is required")
    .matches(
      /^(?! )[A-Za-z]+(?:[ '’\-\.][A-Za-z]+)*-?$/,
      "Please enter a valid last name"
    ),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  date_of_birth: yup
    .string()
    .required("Date of birth is required")
    .test(
      "is-valid-date",
      "Invalid date",
      (value) => !isNaN(Date.parse(value!))
    )
    .test("not-future", "Date of birth cannot be in the future", (value) => {
      return new Date(value!) <= new Date();
    }),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  parish: yup.string().required("Parish is required"),
});

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin, onClose }) => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { firstName, lastName, email, password, parish, date_of_birth } =
        data;
      const userData = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        parish,
        date_of_birth,
        is_over_18: true,
      };

      await registerUser(userData);
      toast.success("Registration successful! Please verify your email.");
      setRegisteredEmail(email);
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
        <VerifyCode
          email={registeredEmail}
          onVerified={() => {
            toast.success("Your account has been verified!");
            onSwitchToLogin?.();
          }}
        />
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
              <Label>Parish*</Label>
              <select
                {...register("parish")}
                defaultValue="Saint Peter"
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="Saint Michael">Saint Michael</option>
                <option value="Saint Peter">Saint Peter</option>
                <option value="Saint Philip">Saint Philip</option>
                <option value="Saint James">Saint James</option>
                <option value="Saint John">Saint John</option>
                <option value="Saint Joseph">Saint Joseph</option>
                <option value="Saint Lucy">Saint Lucy</option>
                <option value="Christ Church">Christ Church</option>
                <option value="Saint Andrew">Saint Andrew</option>
                <option value="Saint George">Saint George</option>
                <option value="Saint James">Saint James</option>
                <option value="Saint Thomas">Saint Thomas </option>
              </select>

              <ErrorMessage>{errors.parish?.message}</ErrorMessage>
            </FormGroup>

            <FormGroup>
              <Label>Date of Birth*</Label>
              <Input
                {...register("date_of_birth")}
                type="date"
                placeholder="Enter your date of birth"
              />
              <ErrorMessage>{errors.date_of_birth?.message}</ErrorMessage>
            </FormGroup>

            <FormGroup style={{ position: "relative" }}>
              <Label>Password*</Label>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              {/* Eye toggle */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-10%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </FormGroup>

            {/* Confirm Password */}
            <FormGroup style={{ position: "relative" }}>
              <Label>Confirm Password*</Label>
              <Input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-10%)",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
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
