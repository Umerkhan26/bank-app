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

// export default App;
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/auth";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import {
  requestNotificationPermission,
  onForegroundMessage,
} from "./utils/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Required for styling

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const userPoints = parseInt(localStorage.getItem("userPoints") || "0", 10);

    if (token && userId && username) {
      dispatch(
        login({
          token,
          userId,
          username,
          userPoints,
        })
      );
    }

    requestNotificationPermission()
      .then((token) => {
        if (token) {
          toast.success("✅ Push notifications enabled!");
        } else {
          toast.warn("⚠️ Please enable browser notifications.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Failed to enable push notifications");
      });

    onForegroundMessage((payload) => {
      console.log("📨 Foreground message:", payload);

      const title =
        payload.notification?.title || payload.data?.title || "New Message";
      const body = payload.notification?.body || payload.data?.body || "";

      // ✅ System-level browser notification
      if (Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/logo192.png",
        });
      }

      // ✅ In-app toast
      toast.info(
        <div>
          <strong>{title}</strong>
          <p>{body}</p>
        </div>,
        {
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    });
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer position="top-right" theme="colored" />
    </>
  );
}

export default App;
