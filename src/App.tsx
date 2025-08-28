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
import { ToastContainer } from "react-toastify";
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
        // console.log("[APP] Setting up notifications...");
        if ("serviceWorker" in navigator) {
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          // console.log("[APP] Existing service workers:", registrations);
          // Unregister non-FCM service workers
          for (const registration of registrations) {
            if (
              registration.scope !==
              "http://localhost:5173/firebase-cloud-messaging-push-scope"
            ) {
              await registration.unregister();
              // console.log(
              //   "[APP] Unregistered unused service worker:",
              //   registration.scope
              // );
            }
          }
        }

        const token = await requestNotificationPermission();
        if (token) {
          // console.log("[APP] FCM token obtained:", token);
          // toast.success("✅ Push notifications enabled!", {
          //   position: "top-right",
          //   autoClose: 5000,
          // });
        } else {
          // console.warn("[APP] No FCM token obtained");
          // toast.warn("⚠️ Please enable browser notifications.", {
          //   position: "top-right",
          //   autoClose: 5000,
          // });
        }

        onForegroundMessage((payload) => {
          // console.log("[APP] Foreground message received:", payload);
          if (payload.notification) {
            // Use toast for foreground notifications
            // toast.info(
            //   <div>
            //     <strong>
            //       {payload.notification.title || "New Notification"}
            //     </strong>
            //     <p>{payload.notification.body || ""}</p>
            //   </div>,
            //   {
            //     autoClose: 5000,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     position: "top-right",
            //     toastId: payload.messageId, // Prevent duplicates
            //   }
            // );

            // Use Notification API only if permission is granted
            if (Notification.permission === "granted") {
              new Notification(
                payload.notification.title || "New Notification",
                {
                  body: payload.notification.body || "",
                  icon: "/logo192.png",
                }
              );
            } else {
              // console.warn(
              //   "[APP] Notification permission not granted, skipping Notification API"
              // );
            }
          }
        });
      } catch (error) {
        console.error("[APP] Notification setup error:", error);
        // toast.error("❌ Failed to enable push notifications", {
        //   position: "top-right",
        //   autoClose: 5000,
        // });
      }
    };

    setupNotifications();
  }, []);

  return (
    <Router>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </Router>
  );
}

export default App;
