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
  refreshFcmToken,
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

  useEffect(() => {
    console.log("[LOGIN] Setting up notifications...");

    const setupNotifications = async () => {
      try {
        console.log("[LOGIN] Checking service worker support...");
        if ("serviceWorker" in navigator) {
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          console.log("[LOGIN] Existing service workers:", registrations);
        }

        console.log("[LOGIN] Requesting notification permission...");
        const token = await requestNotificationPermission();
        setTokenFound(!!token);

        if (!token) {
          console.warn(
            "[LOGIN] No FCM token due to permission denial or error"
          );
          toast.warn(
            "Please enable notifications in your browser settings to receive push notifications",
            {
              autoClose: 5000,
            }
          );
        } else {
          console.log("[LOGIN] Setting up foreground message handler...");
          onForegroundMessage((payload) => {
            console.log("[LOGIN] Foreground message received:", payload);

            if (payload.notification) {
              new Notification(
                payload.notification.title || "New Notification",
                {
                  body: payload.notification.body,
                  icon: "/logo192.png",
                }
              );
            }

            toast.info(
              <div>
                <strong>
                  {payload.notification?.title || "New Notification"}
                </strong>
                <p>{payload.notification?.body || ""}</p>
              </div>,
              {
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
          });
        }
      } catch (error) {
        console.error("[LOGIN] Notification setup error:", error);
        setTokenFound(false);
        toast.error("Failed to set up notifications", { autoClose: 5000 });
      }
    };

    setupNotifications();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    setLoading(true);
    console.log("[LOGIN] Login attempt with:", data);

    try {
      const response = await loginUser(data);
      console.log("[LOGIN] Login successful:", response);

      if (response.token) {
        const userId = response.user._id; // Fix: Use response.user._id instead of response.token
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

        // Register FCM token
        console.log("[LOGIN] Registering FCM token...");
        await handleFcmToken(
          response.token,
          userId,
          response.user.address || ""
        );
      }
    } catch (error) {
      console.error("[LOGIN] Login error:", error);
      toast.error("Login failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleFcmToken = async (
    token: string,
    userId: string,
    address?: string // Make address optional
  ) => {
    try {
      console.log("[LOGIN] Handling FCM token registration...");
      const fcmToast = toast.loading("Setting up push notifications...");

      const fcmToken = await refreshFcmToken();
      if (!fcmToken) {
        console.warn("[LOGIN] No FCM token obtained");
        toast.update(fcmToast, {
          render: "Notifications permission not granted",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      console.log("[LOGIN] Updating FCM token on server...");
      toast.update(fcmToast, {
        render: "Registering device for notifications...",
        type: "info",
        isLoading: true,
      });

      const payload = { fcmToken };
      if (address) payload.address = address; // Only include address if it exists

      const response = await axios.put(
        `${API_BASE_URL}/user/${userId}/fcm-token`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("[LOGIN] FCM token update response:", response.data);
      toast.update(fcmToast, {
        render: "Push notifications enabled!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      return response.data;
    } catch (error: any) {
      console.error("[LOGIN] FCM token registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to enable notifications";
      toast.error(errorMessage, { autoClose: 5000 });
      throw error;
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
