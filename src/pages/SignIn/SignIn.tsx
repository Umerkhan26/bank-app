// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { toast } from "react-toastify"; // Import Toast
// import "react-toastify/dist/ReactToastify.css"; // Import CSS
// import Input from "../../components/Inputs/input";
// import {
//   ButtonDiv,
//   FooterText,
//   FormGroup,
//   Label,
//   SubmitButton,
//   SwitchText,
//   Title,
//   Underline,
// } from "./signin.styles";
// import { loginUser } from "../../services/auth";
// import { useDispatch } from "react-redux";
// import { login } from "../../redux/slices/auth";
// import Loader from "../../components/Loader/loader";

// interface LoginProps {
//   onSwitchToSignUp?: () => void;
//   onClose?: () => void;
// }

// interface SignInFormValues {
//   email: string;
//   password: string;
// }

// const signInValidationSchema: yup.ObjectSchema<SignInFormValues> = yup.object({
//   email: yup
//     .string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
// });

// const Login: React.FC<LoginProps> = ({ onSwitchToSignUp, onClose }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormValues>({
//     resolver: yupResolver(signInValidationSchema),
//     mode: "onChange",
//   });

//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
//     setLoading(true);
//     try {
//       const response = await loginUser(data);
//       console.log("Login Successful:", response);

//       if (response.token) {
//         const userId = response.token;
//         const userPoints = response.user.points;
//         dispatch(
//           login({
//             token: response.token,
//             userId,
//             username: response.user.name,
//             userPoints: response.user.points,
//           })
//         );
//         toast.success("Login successful!");
//         onClose?.();

//         localStorage.setItem(`userPoints_${userId}`, userPoints.toString());
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       toast.error("Login failed! Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <Loader />}
//       <Title>Sign In</Title>
//       <Underline />

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <FormGroup>
//           <Label>
//             Email<span className="text-red-500">*</span>
//           </Label>
//           <Input
//             type="email"
//             placeholder="Enter your email"
//             registration={register("email")}
//             error={errors.email?.message}
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>
//             Password<span className="text-red-500">*</span>
//           </Label>
//           <Input
//             type="password"
//             placeholder="Enter your password"
//             registration={register("password")}
//             error={errors.password?.message}
//             isPassword
//           />
//         </FormGroup>

//         <ButtonDiv>
//           <SubmitButton type="submit" disabled={loading}>
//             {loading ? "Signing In..." : "Sign In"}
//           </SubmitButton>
//         </ButtonDiv>
//       </form>

//       <FooterText>
//         Don't have an account?{" "}
//         <SwitchText onClick={onSwitchToSignUp}>Register Here</SwitchText>
//       </FooterText>
//     </>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import { API_BASE_URL } from "../../services/promotion";
import axios from "axios";
import {
  onForegroundMessage,
  requestNotificationPermission,
} from "../../utils/firebase";

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
  const [isTokenFound, setTokenFound] = useState(false); // Track notification permission

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log("Login Successful:", response);

      if (response.token) {
        const userId = response.token; // Assuming token is used as userId for simplicity
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

        // Register FCM token with backend
        await handleFcmToken(
          response.token,
          userId,
          response.user.address || ""
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleFcmToken = async (
    token: string,
    userId: string,
    address: string
  ) => {
    try {
      const fcmToast = toast.loading("Setting up push notifications...");
      const fcmToken = await requestNotificationPermission();

      if (!fcmToken) {
        toast.update(fcmToast, {
          render: "Notifications permission not granted",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
        setTokenFound(false);
        throw new Error("Notification permission denied");
      }

      toast.update(fcmToast, {
        render: "Registering device for notifications...",
        type: "info",
        isLoading: true,
      });

      await axios.put(
        `${API_BASE_URL}/user/${userId}/fcm-token`,
        { fcmToken, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      toast.update(fcmToast, {
        render: "Push notifications enabled!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setTokenFound(true);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to enable notifications";
      toast.error(errorMessage, { autoClose: 5000 });
      setTokenFound(false);
      throw error;
    }
  };

  // Handle notification permission and foreground messages
  useEffect(() => {
    requestNotificationPermission()
      .then((token) => {
        if (token) setTokenFound(true);
        else setTokenFound(false);
      })
      .catch((error) => {
        console.error("Error requesting notification permission:", error);
        setTokenFound(false);
      });

    onForegroundMessage((payload) => {
      console.log("Foreground message received:", payload);
      const { notification: { title, body } = {} } = payload;
      toast.info(
        <div>
          <strong>{title || "New Notification"}</strong>
          <p>{body || ""}</p>
        </div>,
        {
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    });
  }, []);

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

        {/* Display notification permission status */}
        <div className="text-center mb-3">
          {isTokenFound ? (
            <span className="text-success">
              Notification permission enabled 👍
            </span>
          ) : (
            <span className="text-warning">
              Need notification permission ❗
            </span>
          )}
        </div>

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
