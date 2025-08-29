

// import React, { useRef, useState } from "react";
// import { QrReader } from "react-qr-reader";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { scanQRCode } from "../../services/qrcode";
// import { updatePoints } from "../../redux/slices/auth";
// import scan from "../../assets/Png/scan.jpg";

// interface QrScannerProps {
//   onScan: (data: string) => void;
//   onError: (error: any) => void;
//   onRequireLogin?: () => void;
// }

// const QrScanner: React.FC<QrScannerProps> = ({ onRequireLogin }) => {
//   const [openScanner, setOpenScanner] = useState(false);
//   const [scanned, setScanned] = useState(false);
//   const dispatch = useDispatch();


//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const lastScannedRef = useRef<string | null>(null); // ✅ store last QR code
//   const handleResult = async (result: any, error: any) => {
//     if (!!result && !scanned) {
//       let qrCodeData = result.getText();

//       // ✅ Clean QR data: remove whitespace, newlines, carriage returns
//       qrCodeData = qrCodeData.trim().replace(/\s+/g, "");

//       // ✅ Ignore if same QR is detected again
//       if (lastScannedRef.current === qrCodeData) {
//         return;
//       }
//       lastScannedRef.current = qrCodeData;

//       setScanned(true); // lock scanning immediately

//       // ✅ Extract last 6 chars safely
//       const lastSixDigits = qrCodeData.slice(-6);

//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");
//       if (!token || !userId) {
//         toast.error("No user information found. Please log in again.");
//         setScanned(false);
//         return;
//       }

//       try {
//         const response = await scanQRCode(token, lastSixDigits);
//         toast.success("QR Code scanned successfully!");

//         // ✅ Update points
//         const totalPoints = Array.isArray(response.userPoints)
//           ? response.userPoints.reduce(
//               (sum: number, item: { points?: number }) =>
//                 sum + (item.points || 0),
//               0
//             )
//           : response.userPoints;

//         dispatch(updatePoints(totalPoints));
//       } catch (err) {
//         console.error("QR Scan API error:", err);
//         toast.error("Failed to scan QR code. Please try again.");
//         setScanned(false);
//       }

//       // ✅ Start 5s cooldown before allowing next scan
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => {
//         setScanned(false);
//         lastScannedRef.current = null;
//       }, 5000);
//     }

//     if (!!error && !scanned) {
//       console.warn("QR error:", error);
//     }
//   };

//   return (
//     <div style={{ border: "none", outline: "none" }}>
//       {/* Camera Icon */}
//       <button
//         onClick={() => {
//           const token = localStorage.getItem("token");
//           const userId = localStorage.getItem("userId");

//           if (!token || !userId) {
//             onRequireLogin?.();
//             return;
//           }
//           setOpenScanner(true);
//           setScanned(false);
//         }}
//         className="text-2xl border-none outline-none focus:outline-none"
//       >
//         <img
//           src={scan}
//           alt="Camera Icon"
//           style={{
//             width: "60px",
//             height: "60px",
//             background: "transparent",
//             border: "none",
//             outline: "none",
//             marginRight: "35px",
//           }}
//         />{" "}
//       </button>
//       {/* Scanner overlay */}
//       {openScanner && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
//           <div className="w-72 h-72 border rounded-lg overflow-hidden">
//             <QrReader
//               constraints={{ facingMode: "environment" }}
//               onResult={handleResult}
//               containerStyle={{ display: "none" }}
//               videoStyle={{ display: "none" }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default QrScanner;
import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { scanQRCode } from "../../services/qrcode";
import { updatePoints } from "../../redux/slices/auth";
import scan from "../../assets/Png/scan.jpg";
import jsQR from "jsqr";

interface QrScannerProps {
  onRequireLogin?: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onRequireLogin }) => {
  const [openScanner, setOpenScanner] = useState(false);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScannedRef = useRef<string | null>(null);

  // ✅ Detect iOS device
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // ✅ Shared logic to send scanned QR to backend
  const processQRCode = async (qrCodeData: string) => {
    qrCodeData = qrCodeData.trim().replace(/\s+/g, "");
    if (lastScannedRef.current === qrCodeData) return;
    lastScannedRef.current = qrCodeData;
    setScanned(true);

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

      const errorMsg =
        err?.response?.data?.message ||
        "Failed to scan QR code. Please try again.";

      if (errorMsg.includes("already been used")) {
        toast.error("❌ This QR Code has already been used.");
      } else if (errorMsg.includes("already scanned by this user")) {
        toast.error("⚠️ You have already scanned this QR Code.");
      } else if (errorMsg.includes("not found")) {
        toast.error("❌ Invalid QR Code.");
      } else {
        toast.error(errorMsg);
      }

      setScanned(false);
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setScanned(false);
      lastScannedRef.current = null;
    }, 5000);
  };

  // ✅ Live scanning (PC/Android)
  const handleResult = (result: any, error: any) => {
    if (!!result && !scanned) {
      processQRCode(result.getText());
    }
    if (!!error && !scanned) {
      console.warn("QR error:", error);
    }
  };

  // ✅ iOS: capture photo and decode
  const handleIOSPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          toast.success("QR Code detected!");
          setTimeout(() => processQRCode(code.data), 1000); // ✅ Auto-submit after 1s
        } else {
          toast.error("No QR Code found in the image.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Camera Icon (One Entry Point) */}
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
      >
        <img src={scan} alt="Camera Icon" style={{ width: "60px" }} />
      </button>

      {/* Overlay */}
      {openScanner && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          {!isIOS ? (
            // ✅ Android/PC: Live stream
            <div className="w-72 h-72 border rounded-lg overflow-hidden">
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={handleResult}
              />
            </div>
          ) : (
            // ✅ iOS: open camera in photo mode (no gallery, no video stream)
            <input
              type="file"
              accept="image/*"
              capture="environment" // forces camera
              style={{ opacity: 0, width: "0%", height: "0%", display:"none" }}
              onChange={handleIOSPhoto}
              autoFocus
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QrScanner;
