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
//         toast.success("Congratulations! You have earned 20 points 🎯");

//         // ✅ Update points
//         const totalPoints = Array.isArray(response.userPoints)
//           ? response.userPoints.reduce(
//               (sum: number, item: { points?: number }) =>
//                 sum + (item.points || 0),
//               0
//             )
//           : response.userPoints;

//         dispatch(updatePoints(totalPoints));
//       } catch (err: any) {
//         console.error("QR Scan API error:", err);

//         // ✅ Handle backend error messages
//         const errorMsg =
//           err?.response?.data?.message ||
//           "Failed to scan QR code. Please try again.";

//         if (errorMsg.includes("already been used")) {
//           toast.error(" This QR Code has already been used.");
//         } else if (errorMsg.includes("already scanned by this user")) {
//           toast.error("⚠️ You have already scanned this QR Code.");
//         } else if (errorMsg.includes("not found")) {
//           toast.error(" Invalid QR Code.");
//         } else {
//           toast.error(errorMsg);
//         }

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
//         style={{
//           background: "transparent",
//           border: "none",
//           outline: "none",
//           padding: 0,
//           margin: 0,
//         }}
//         onMouseDown={(e) => e.preventDefault()}
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
//             display: "block",
//           }}
//         />
//       </button>

//       {/* Scanner overlay */}
//       {openScanner && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "rgba(0,0,0,0.8)",
//             zIndex: 50,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               width: "288px",
//               height: "288px",
//               borderRadius: "10px",
//               overflow: "hidden",
//               backgroundColor: "black",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {/* Only render the QrReader when open */}
//             <QrReader
//               constraints={{ facingMode: "environment" }}
//               onResult={handleResult}
//               containerStyle={{
//                 width: "100%",
//                 height: "100%",
//                 overflow: "hidden",
//                 margin: 0,
//                 padding: 0,
//               }}
//               videoStyle={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: "block",
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default QrScanner;

// import React, { useRef, useState } from "react";
// import { QrReader } from "react-qr-reader";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { scanQRCode } from "../../services/qrcode";
// import { updatePoints } from "../../redux/slices/auth";
// import scan from "../../assets/Png/scan.jpg";
// import Modal from "../Modal/modal"; // Import the Modal component
// import { QrCodeData, QrCodeButton } from "./header.styles"; // Import styled components
// import { ClipLoader } from "react-spinners";

// interface QrScannerProps {
//   onScan?: (data: string) => void; // Optional, for compatibility
//   onError?: (error: any) => void; // Optional, for compatibility
//   onRequireLogin?: () => void;
// }

// const QrScanner: React.FC<QrScannerProps> = ({ onRequireLogin }) => {
//   const [openScanner, setOpenScanner] = useState(false);
//   const [scanned, setScanned] = useState(false);
//   const [qrCodeData, setQrCodeData] = useState<string | null>(null); // Store QR code data
//   const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
//   const [isProcessing, setIsProcessing] = useState(false); // Track submission processing
//   const dispatch = useDispatch();
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const lastScannedRef = useRef<string | null>(null);

//   const handleResult = (result: any, error: any) => {
//     if (result && !scanned) {
//       let qrCodeData = result.getText();

//       // Clean QR data: remove whitespace, newlines, carriage returns
//       qrCodeData = qrCodeData.trim().replace(/\s+/g, "");

//       // Ignore if same QR is detected again
//       if (lastScannedRef.current === qrCodeData) {
//         return;
//       }
//       lastScannedRef.current = qrCodeData;

//       setScanned(true);
//       setQrCodeData(qrCodeData);
//       setIsModalOpen(true);
//       setOpenScanner(false);

//       // ✅ Stop camera tracks immediately
//       const videoEl = document.querySelector("video");
//       if (videoEl && videoEl.srcObject) {
//         const stream = videoEl.srcObject as MediaStream;
//         stream.getTracks().forEach((track) => track.stop());
//         videoEl.srcObject = null;
//       }

//       // Start 5s cooldown
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => {
//         setScanned(false);
//         lastScannedRef.current = null;
//       }, 5000);
//     }
//   };

//   const handleScanSubmit = async () => {
//     if (!qrCodeData) {
//       toast.error("No QR code data to submit.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");
//     if (!token || !userId) {
//       toast.error("No user information found. Please log in again.");
//       setIsModalOpen(false);
//       setScanned(false);
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       // Extract last 6 digits for submission (consistent with original logic)
//       const lastSixDigits = qrCodeData.slice(-6);
//       const response = await scanQRCode(token, lastSixDigits);
//       toast.success("Congratulations! You have earned 20 points 🎯");

//       // Update points
//       const totalPoints = Array.isArray(response.userPoints)
//         ? response.userPoints.reduce(
//             (sum: number, item: { points?: number }) =>
//               sum + (item.points || 0),
//             0
//           )
//         : response.userPoints;

//       dispatch(updatePoints(totalPoints));
//       setIsModalOpen(false); // Close modal on success
//     } catch (err: any) {
//       console.error("QR Scan API error:", err);
//       const errorMsg =
//         err?.response?.data?.message ||
//         "Failed to scan QR code. Please try again.";

//       if (errorMsg.includes("already been used")) {
//         toast.error("This QR Code has already been used.");
//       } else if (errorMsg.includes("already scanned by this user")) {
//         toast.error("⚠️ You have already scanned this QR Code.");
//       } else if (errorMsg.includes("not found")) {
//         toast.error("Invalid QR Code.");
//       } else {
//         toast.error(errorMsg);
//       }
//     } finally {
//       setIsProcessing(false);
//       setScanned(false);
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
//         style={{
//           background: "transparent",
//           border: "none",
//           outline: "none",
//           padding: 0,
//           margin: 0,
//         }}
//         onMouseDown={(e) => e.preventDefault()}
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
//             display: "block",
//           }}
//         />
//       </button>

//       {/* Scanner overlay */}
//       {openScanner && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "rgba(0,0,0,0.8)",
//             zIndex: 50,
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               width: "288px",
//               height: "288px",
//               borderRadius: "10px",
//               overflow: "hidden",
//               backgroundColor: "black",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <QrReader
//               constraints={{ facingMode: "environment" }}
//               onResult={handleResult}
//               containerStyle={{
//                 width: "100%",
//                 height: "100%",
//                 overflow: "hidden",
//                 margin: 0,
//                 padding: 0,
//               }}
//               videoStyle={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 display: "block",
//               }}
//             />
//           </div>
//           <button
//             onClick={() => {
//               setOpenScanner(false);
//               setScanned(false);
//             }}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               padding: "10px",
//               background: "red",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Close
//           </button>
//         </div>
//       )}

//       {/* Modal for displaying QR code data */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setQrCodeData(null);
//           setIsProcessing(false);
//           setScanned(false);
//         }}
//       >
//         {qrCodeData ? (
//           <div style={{ textAlign: "center", padding: "10px" }}>
//             <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
//               QR Code Extracted Successfully!
//             </p>
//             <QrCodeData>{qrCodeData}</QrCodeData>
//             {isProcessing ? (
//               <div style={{ marginTop: "15px" }}>
//                 <ClipLoader size={30} color="black" />
//                 <p style={{ marginTop: "10px" }}>Submitting to server...</p>
//               </div>
//             ) : (
//               <QrCodeButton
//                 onClick={handleScanSubmit}
//                 disabled={isProcessing}
//                 style={{ marginTop: "15px" }}
//               >
//                 Submit QR Code
//               </QrCodeButton>
//             )}
//           </div>
//         ) : (
//           <p style={{ textAlign: "center", color: "red" }}>
//             No QR code detected.
//           </p>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default QrScanner;

import React, { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { scanQRCode } from "../../services/qrcode";
import { updatePoints } from "../../redux/slices/auth";
import scan from "../../assets/Png/scan.jpg";
import Modal from "../Modal/modal";
import { QrCodeData, QrCodeButton } from "./header.styles";
import { ClipLoader } from "react-spinners";

interface QrScannerProps {
  onRequireLogin?: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onRequireLogin }) => {
  const [openScanner, setOpenScanner] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  const lastScannedRef = useRef<string | null>(null);

  const handleScan = (results: any[]) => {
    if (!results || results.length === 0 || scanned) return;

    let qrData = results[0]?.rawValue || "";
    qrData = qrData.trim().replace(/\s+/g, "");

    if (!qrData || lastScannedRef.current === qrData) return;
    lastScannedRef.current = qrData;

    setQrCodeData(qrData);
    setIsModalOpen(true);
    setOpenScanner(false);
    setScanned(true);

    setTimeout(() => {
      setScanned(false);
      lastScannedRef.current = null;
    }, 5000);
  };

  const handleScanSubmit = async () => {
    if (!qrCodeData) {
      toast.error("No QR code data to submit.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("No user information found. Please log in again.");
      setIsModalOpen(false);
      setScanned(false);
      return;
    }

    setIsProcessing(true);
    try {
      const lastSixDigits = qrCodeData.slice(-6);
      const response = await scanQRCode(token, lastSixDigits);
      toast.success("🎯 Congratulations! You have earned 20 points!");

      const totalPoints = Array.isArray(response.userPoints)
        ? response.userPoints.reduce(
            (sum: number, item: { points?: number }) =>
              sum + (item.points || 0),
            0
          )
        : response.userPoints;

      dispatch(updatePoints(totalPoints));
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("QR Scan API error:", err);

      const errorMsg =
        err?.response?.data?.message || "Failed to scan QR code.";
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
      setScanned(false);
    }
  };

  return (
    <div>
      {/* Camera Icon Button */}
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
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <img
          src={scan}
          alt="Camera Icon"
          style={{
            width: "70px",
            height: "70px",
            marginRight: "35px",
            marginTop: "10px",
            display: "block",
          }}
        />
      </button>

      {/* Scanner Overlay */}
      {openScanner && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "288px",
              height: "288px",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "black",
            }}
          >
            <Scanner
              onScan={handleScan}
              allowMultiple={false}
              components={{
                finder: true,
              }}
              styles={{
                container: { width: "100%", height: "100%" },
                video: { width: "100%", height: "100%", objectFit: "cover" },
              }}
            />
          </div>
          <button
            onClick={() => {
              setOpenScanner(false);
              setScanned(false);
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setQrCodeData(null);
          setIsProcessing(false);
          setScanned(false);
        }}
      >
        {qrCodeData ? (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              QR Code Extracted Successfully!
            </p>
            <QrCodeData>
              {qrCodeData.length > 6 ? `${qrCodeData.slice(-6)}` : qrCodeData}
            </QrCodeData>
            {isProcessing ? (
              <div style={{ marginTop: "15px" }}>
                <ClipLoader size={30} color="black" />
                <p style={{ marginTop: "10px" }}>Submitting to server...</p>
              </div>
            ) : (
              <QrCodeButton
                onClick={handleScanSubmit}
                disabled={isProcessing}
                style={{ marginTop: "15px" }}
              >
                Submit QR Code
              </QrCodeButton>
            )}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "red" }}>
            No QR code detected.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default QrScanner;
