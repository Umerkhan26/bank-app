// // src/components/QrScanner.tsx
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState, useRef } from "react";
// import { QrReader } from "react-qr-reader";
// const QrScanner: React.FC = () => {
//   const [data, setData] = useState<string>("No result");
//   const [scanned, setScanned] = useState<boolean>(false);
//   const scannerRef = useRef<any>(null);
//   const handleResult = (result: any, error: any) => {
//     if (!!result && !scanned) {
//       const text = result.getText();
//       setData(text);
//       setScanned(true); // stop further scans
//     }
//     if (!!error && !scanned) {
//       console.warn(error);
//     }
//   };
//   const resetScanner = () => {
//     setScanned(false);
//     setData("No result");
//   };
//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//           <FontAwesomeIcon icon={faCamera} />
//         <QrReader
//           ref={scannerRef}
//           constraints={{
//             facingMode: "environment",
//           }}
//           onResult={handleResult}
//                 containerStyle={{ display: "none" }} // hides video
//         //   containerStyle={{ width: "100%", height: "100%" }}
//           videoStyle={{ objectFit: "cover" }}
//         />
//       <p className="mt-4 font-mono text-sm">
//         {scanned ? `:white_check_mark: Code: ${data}` : `Scan code:`}
//       </p>
//       {scanned && (
//         <button
//           onClick={resetScanner}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//         >
//           Scan Again
//         </button>
//       )}
//     </div>
//   );
// };
// export default QrScanner;
// src/components/QrScanner.tsx

import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { scanQRCode } from "../../services/qrcode";
import { updatePoints } from "../../redux/slices/auth";
import scan from "../../assets/Png/scan.jpg";

interface QrScannerProps {
  onScan: (data: string) => void;
  onError: (error: any) => void;
  onRequireLogin?: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onRequireLogin }) => {
  const [openScanner, setOpenScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScannedRef = useRef<string | null>(null); // ✅ store last QR code
  const handleResult = async (result: any, error: any) => {
    if (!!result && !scanned) {
      let qrCodeData = result.getText();

      // ✅ Clean QR data: remove whitespace, newlines, carriage returns
      qrCodeData = qrCodeData.trim().replace(/\s+/g, "");

      // ✅ Ignore if same QR is detected again
      if (lastScannedRef.current === qrCodeData) {
        return;
      }
      lastScannedRef.current = qrCodeData;

      setScanned(true); // lock scanning immediately

      // ✅ Extract last 6 chars safely
      const lastSixDigits = qrCodeData.slice(-6);

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        toast.error("No user information found. Please log in again.");
        setScanned(false);
        return;
      }

      try {
        const response = await scanQRCode(token, lastSixDigits);
        toast.success("QR Code scanned successfully!");

        // ✅ Update points
        const totalPoints = Array.isArray(response.userPoints)
          ? response.userPoints.reduce(
              (sum: number, item: { points?: number }) =>
                sum + (item.points || 0),
              0
            )
          : response.userPoints;

        dispatch(updatePoints(totalPoints));
      } catch (err: any) {
        console.error("QR Scan API error:", err);

        // ✅ Handle backend error messages
        const errorMsg =
          err?.response?.data?.message ||
          "Failed to scan QR code. Please try again.";

        if (errorMsg.includes("already been used")) {
          toast.error(" This QR Code has already been used.");
        } else if (errorMsg.includes("already scanned by this user")) {
          toast.error("⚠️ You have already scanned this QR Code.");
        } else if (errorMsg.includes("not found")) {
          toast.error(" Invalid QR Code.");
        } else {
          toast.error(errorMsg);
        }

        setScanned(false);
      }

      // ✅ Start 5s cooldown before allowing next scan
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setScanned(false);
        lastScannedRef.current = null;
      }, 5000);
    }

    if (!!error && !scanned) {
      console.warn("QR error:", error);
    }
  };

  return (
    <div style={{ border: "none", outline: "none" }}>
      {/* Camera Icon */}
      <button
        onClick={() => {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");

          if (!token || !userId) {
            onRequireLogin?.();
            return;
          }
          setOpenScanner(true);
          setScanned(false);
        }}
        className="text-2xl border-none outline-none focus:outline-none"
      >
        <img
          src={scan}
          alt="Camera Icon"
          style={{
            width: "60px",
            height: "60px",
            background: "transparent",
            border: "none",
            outline: "none",
            marginRight: "35px",
          }}
        />{" "}
      </button>
      {/* Scanner overlay */}
      {openScanner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="w-72 h-72 border rounded-lg overflow-hidden">
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={handleResult}
              containerStyle={{ display: "none" }}
              videoStyle={{ display: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default QrScanner;
