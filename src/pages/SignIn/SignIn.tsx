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
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        console.log("[USER_LOGIN] Setting up notifications...");
        if ("serviceWorker" in navigator) {
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          console.log("[USER_LOGIN] Existing service workers:", registrations);
          for (const registration of registrations) {
            if (
              registration.scope !==
              "http://localhost:5173/firebase-cloud-messaging-push-scope"
            ) {
              await registration.unregister();
              console.log(
                "[USER_LOGIN] Unregistered unused service worker:",
                registration.scope
              );
            }
          }
        }

        const token = await requestNotificationPermission();
        if (token) {
          console.log("[USER_LOGIN] FCM token obtained:", token);
          setTokenFound(true);
          // toast.success("Push notifications enabled!");
        } else {
          console.warn("[USER_LOGIN] No FCM token obtained");
          setTokenFound(false);
          toast.warn("Please enable notifications in your browser settings");
        }

        onForegroundMessage((payload) => {
          console.log("[USER_LOGIN] Foreground message received:", payload);
          const { notification: { title, body } = {} } = payload;
          setNotification({
            title: title || "New Notification",
            body: body || "",
          });
          toast.info(
            <div>
              <strong>{title || "New Notification"}</strong>
              <p>{body || ""}</p>
            </div>,
            { autoClose: 5000, closeOnClick: true, pauseOnHover: true }
          );
        });
      } catch (error) {
        console.error("[USER_LOGIN] Notification setup error:", error);
        setTokenFound(false);
        toast.error("Failed to enable push notifications");
      }
    };

    setupNotifications();
  }, []);

  const handleRequestPermission = async () => {
    try {
      const token = await requestNotificationPermission();
      if (token) {
        setTokenFound(true);
        toast.success("Notifications enabled!");
      } else {
        setTokenFound(false);
        toast.warn("Please enable notifications in your browser settings");
      }
    } catch (error) {
      console.error("[USER_LOGIN] Error requesting permission:", error);
      toast.error("Failed to enable notifications");
    }
  };

  const handleFcmToken = async (
    token: string,
    userId: string,
    address: string
  ) => {
    try {
      console.log("[FCM] Starting FCM token registration for user:", userId);
      const fcmToast = toast.loading("Setting up push notifications...");

      const fcmToken = await refreshFcmToken();
      console.log("[FCM] Retrieved FCM token:", fcmToken);

      if (!fcmToken) {
        console.warn("[FCM] No FCM token obtained");
        toast.update(fcmToast, {
          render: "Notifications permission not granted",
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
        throw new Error("Notification permission denied");
      }

      console.log(
        "[FCM] Sending FCM token to server:",
        fcmToken,
        "API_URL:",
        API_BASE_URL
      );
      const response = await axios.put(
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
      console.log("[FCM] Server response:", response.data);

      toast.update(fcmToast, {
        // render: "Push notifications enabled!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      return response.data;
    } catch (error: any) {
      console.error("[FCM] Error updating FCM token:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to enable notifications";
      toast.error(errorMessage, { autoClose: 5000 });
      throw error;
    }
  };

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    setLoading(true);
    console.log("[USER_LOGIN] Login attempt with:", data);

    try {
      const response = await loginUser(data);
      console.log("[USER_LOGIN] Login successful:", response);

      if (response.token) {
        const userId = response.user._id;
        const userPoints = response.user.points ?? 0;

        dispatch(
          login({
            token: response.token,
            userId,
            username: response.user.name,
            userPoints,
          })
        );

        toast.success("Login successful!");
        onClose?.();

        // Store userPoints safely
        localStorage.setItem(`userPoints_${userId}`, userPoints.toString());

        console.log("[USER_LOGIN] Registering FCM token...");
        await handleFcmToken(
          response.token,
          userId,
          response.user.address || ""
        );
      }
    } catch (error: any) {
      console.error("[USER_LOGIN] Login error:", error);
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

        <div className="text-center mb-3">
          {isTokenFound ? (
            <span className="text-success">
              Notification permission enabled 👍
            </span>
          ) : (
            <div>
              <span className="text-warning">
                Need notification permission ❗
              </span>
              <button
                type="button"
                className="btn btn-link"
                onClick={handleRequestPermission}
              >
                Enable Notifications
              </button>
            </div>
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
