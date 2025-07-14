// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "./redux/slices/auth";
// import AppRoutes from "./routes/AppRoutes";
// import { BrowserRouter as Router } from "react-router-dom";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Restore auth state from localStorage on every app load
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
//     const username = localStorage.getItem("username");
//     const userPoints = parseInt(localStorage.getItem("userPoints") || "0", 10);

//     if (token && userId && username) {
//       dispatch(
//         login({
//           token,
//           userId,
//           username,
//           userPoints,
//         })
//       );
//     }
//   }, [dispatch]);

//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// export default App;import React, { useEffect } from "react";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import {
  requestNotificationPermission,
  onForegroundMessage,
} from "./utils/firebase";
import { logout } from "./redux/slices/auth";

// Axios response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        console.log("[APP] Setting up notifications...");
        if ("serviceWorker" in navigator) {
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          console.log("[APP] Existing service workers:", registrations);
        }

        const token = await requestNotificationPermission();
        if (token) {
          console.log("[APP] FCM token obtained:", token);
          toast.success("✅ Push notifications enabled!");
        } else {
          console.warn("[APP] No FCM token obtained");
          toast.warn("⚠️ Please enable browser notifications.");
        }

        onForegroundMessage(async (payload) => {
          console.log("[APP] Foreground message received:", payload);
          try {
            const permission = await Notification.requestPermission();
            if (permission === "granted" && payload.notification) {
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
          } catch (error) {
            console.error("[APP] Error displaying notification:", error);
          }
        });
      } catch (error) {
        console.error("[APP] Notification setup error:", error);
        toast.error("❌ Failed to enable push notifications");
      }
    };

    setupNotifications();
  }, []);

  return (
    <Router>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
