// import React, { useEffect, useState, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faTimes,
//   faCamera,
//   faBell,
// } from "@fortawesome/free-solid-svg-icons";
// import Login from "../../pages/SignIn/SignIn";
// import Modal from "../Modal/modal";
// import SignUp from "../../pages/SignUp/signup";
// import { Link, useNavigate } from "react-router-dom";
// import jsQR from "jsqr";
// import { scanQRCode } from "../../services/qrcode";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import {
//   logout,
//   setSelectedBrand,
//   updatePoints,
// } from "../../redux/slices/auth";
// import logo from "../../assets/Png/BANKS CURVED LOGO-09.png";

// import {
//   NavContainer,
//   MobileToggleButton,
//   RightActions,
//   NotificationDropdown,
//   NotificationButton,
//   NotificationBadge,
//   ProfileDropdown,
//   ProfileButton,
//   ProfileImage,
//   DropdownMenu,
//   DropdownItem,
//   DropdownFooter,
//   DropdownButton,
//   Button,
//   StoreButton,
//   DropdownItemTime,
//   ProfileFallback,
//   PointsDisplay,
//   QrCodeData,
//   ImagePreview,
//   QrCodeButton,
//   MobileMenuOverlay,
//   MobileMenu,
//   MobileMenuHeader,
//   MobileCloseButton,
//   Logo,
//   ScanButton,
// } from "./header.styles";
// import { getAllBrands } from "../../services/auth";
// import { toast } from "react-toastify";
// import { ClipLoader } from "react-spinners";
// import QrScanner from "./Scanner";
// import { QrReader } from "react-qr-reader";

// interface ScanResult {
//   userPoints: number;
// }

// const Header: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [qrCodeData, setQrCodeData] = useState<string | null>(null);
//   const [scanResult, setScanResult] = useState<ScanResult | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const userId = localStorage.getItem("userId");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [scannerData, setScannerData] = useState<string>("");
//   const [isScannerProcessing, setIsScannerProcessing] = useState(false);
//   const [isExtracting, setIsExtracting] = useState(false);
//   const [extractingMessage, setExtractingMessage] = useState<string>(
//     "Preparing image for scanning..."
//   );
//   const [isScanning, setIsScanning] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [qrValue, setQrValue] = useState("");

//   const [userPointsState, setUserPointsState] = useState<number>(
//     parseInt(localStorage.getItem(`userPoints_${userId}`) || "0", 10)
//   );
//   const [loading, setLoading] = useState(false);
//   const [brands, setBrands] = useState<string[]>([]);
//   const dispatch = useDispatch();
//   const selectedBrand = useSelector(
//     (state: RootState) => state.auth.selectedBrand
//   );
//   const isLoggedIn = useSelector(
//     (state: RootState) => state.auth?.isLoggedIn ?? false
//   );
//   const username =
//     useSelector((state: RootState) => state.auth.username) || "User";
//   const navigate = useNavigate();
//   const userPoints = useSelector((state: RootState) => state.auth.userPoints);
//   console.log("Redux userPoints:", userPoints);

//   const handleUploadClick = () => {
//     if (!isLoggedIn) {
//       setIsModalOpen(true);
//       return;
//     }

//     setSelectedImage(null);
//     setQrCodeData(null);
//     setScanResult(null);
//     setIsProcessing(false);

//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = async (event) => {
//       const file = (event.target as HTMLInputElement).files?.[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = async (e) => {
//           const imageData = e.target?.result as string;
//           setSelectedImage(imageData);
//           setLoading(true);

//           setIsExtracting(true);
//           setExtractingMessage("Preparing image for scanning...");

//           const qrData = await extractQRCode(imageData);
//           setLoading(false);

//           setIsExtracting(false);

//           if (qrData) {
//             console.log("Extracted QR Code Data:", qrData);
//             setQrCodeData(qrData);
//             setIsImageModalOpen(true);
//           } else {
//             setQrCodeData(null);
//             setIsImageModalOpen(true);
//             toast.error("No QR code found in the image.");
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   const handleScanClick = () => {
//     if (!isLoggedIn) {
//       setIsModalOpen(true);
//       return;
//     }
//     setShowScanner(true);
//     setScannerData("");
//   };

//   // Add this function to handle QR scan results
//   const handleScanResult = (result: any, error: any) => {
//     if (!!result && !isScannerProcessing) {
//       const text = result.getText();
//       setScannerData(text);
//       setIsScannerProcessing(true);

//       // Process the scanned QR code
//       processScannedQRCode(text);
//     }

//     if (!!error) {
//       console.warn("QR Scan Error:", error);
//     }
//   };

//   // Add this function to process the scanned QR code
//   const processScannedQRCode = async (qrData: string) => {
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       toast.error("No user information found. Please log in again.");
//       setShowScanner(false);
//       return;
//     }

//     try {
//       const result = await scanQRCode(token, qrData);
//       toast.success("QR Code scanned successfully!");

//       const totalPoints = Array.isArray(result.userPoints)
//         ? result.userPoints.reduce(
//             (sum: number, item: { points?: number }) =>
//               sum + (item.points || 0),
//             0
//           )
//         : result.userPoints;

//       dispatch(updatePoints(totalPoints));
//     } catch (error) {
//       console.error("Error scanning QR code:", error);
//       toast.error("Failed to scan QR code. Please try again.");
//     } finally {
//       setIsScannerProcessing(false);
//       setShowScanner(false);
//     }
//   };

//   const resetScanner = () => {
//     setScannerData("");
//     setIsScannerProcessing(false);
//     setShowScanner(false);
//   };

//   const setupCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: { facingMode: "environment" } })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//           requestAnimationFrame(tick);
//         }
//       })
//       .catch((err) => {
//         console.error("Error accessing camera:", err);
//         setIsScanning(false);
//         toast.error("Failed to access camera.");
//       });
//   };

//   const tick = () => {
//     if (!isScanning) return;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");

//     if (video && canvas && ctx && video.readyState === video.HAVE_ENOUGH_DATA) {
//       canvas.height = video.videoHeight;
//       canvas.width = video.videoWidth;
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const code = jsQR(imageData.data, imageData.width, imageData.height, {
//         inversionAttempts: "dontInvert",
//       });

//       if (code) {
//         console.log("✅ QR Code Detected:", code.data);
//         // Optionally stop scanning after detection
//         // stopCamera();
//       }
//     }

//     requestAnimationFrame(tick);
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getTracks().forEach((track) => track.stop());
//       setIsScanning(false);
//     }
//   };

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const data = await getAllBrands();
//         setBrands(data);
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//       }
//     };
//     fetchBrands();
//   }, []);

//   const extractQRCode = async (imageSrc: string): Promise<string | null> => {
//     return new Promise((resolve) => {
//       const image = new Image();
//       image.crossOrigin = "Anonymous";
//       image.src = imageSrc;

//       const getLastSegment = (
//         data: string | undefined | null
//       ): string | null => {
//         if (!data) return null;
//         return data.trim().split("/").pop() || null;
//       };

//       image.onload = () => {
//         if (image.width <= 0 || image.height <= 0) {
//           console.error(
//             `Invalid image dimensions: width=${image.width}, height=${image.height}`
//           );
//           return resolve(null);
//         }

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         if (!context) {
//           console.error("Failed to get 2D canvas context");
//           return resolve(null);
//         }

//         canvas.width = image.width;
//         canvas.height = image.height;

//         try {
//           context.drawImage(image, 0, 0, image.width, image.height);
//         } catch (e) {
//           console.error("Error drawing image on canvas:", e);
//           return resolve(null);
//         }

//         let imageData;
//         try {
//           imageData = context.getImageData(0, 0, image.width, image.height);
//         } catch (e) {
//           console.error("Error getting image data:", e);
//           return resolve(null);
//         }

//         if (
//           !imageData.data ||
//           imageData.data.length !== image.width * image.height * 4
//         ) {
//           console.error(
//             `Invalid ImageData: length=${imageData.data.length}, expected=${
//               image.width * image.height * 4
//             }`
//           );
//           return resolve(null);
//         }

//         try {
//           const code = jsQR(imageData.data, image.width, image.height);
//           if (code) return resolve(getLastSegment(code.data));
//         } catch (e) {
//           console.error("jsQR error on original image:", e);
//         }

//         const preprocessingMethods = [
//           applyContrastEnhancement,
//           applyBinarization,
//           applySharpening,
//           applyHistogramEqualization,
//         ];

//         for (const method of preprocessingMethods) {
//           try {
//             const processedImageData = method(
//               context,
//               image.width,
//               image.height
//             );
//             if (
//               !processedImageData.data ||
//               processedImageData.data.length !== image.width * image.height * 4
//             ) {
//               console.warn(`Invalid processed ImageData from ${method.name}`);
//               continue;
//             }
//             const code = jsQR(
//               processedImageData.data,
//               image.width,
//               processedImageData.height
//             );
//             if (code) return resolve(getLastSegment(code.data));
//           } catch (e) {
//             console.error(`Error in preprocessing method ${method.name}:`, e);
//           }
//         }

//         const roiSizes = [0.3, 0.5, 0.7];
//         for (const size of roiSizes) {
//           try {
//             const qrCode = tryMultipleROIs(
//               context,
//               image.width,
//               image.height,
//               size
//             );
//             if (qrCode) return resolve(getLastSegment(qrCode));
//           } catch (e) {
//             console.error(`Error in tryMultipleROIs with size ${size}:`, e);
//           }
//         }

//         const scales = [0.5, 1.0, 1.5, 2.0];
//         for (const scale of scales) {
//           try {
//             const qrCode = tryScaling(
//               context,
//               image.width,
//               image.height,
//               scale
//             );
//             if (qrCode) return resolve(getLastSegment(qrCode));
//           } catch (e) {
//             console.error(`Error in tryScaling with scale ${scale}:`, e);
//           }
//         }

//         console.warn("All QR code detection strategies failed");
//         resolve(null);
//       };

//       image.onerror = () => {
//         console.error(
//           `Failed to load image from ${imageSrc}. Check CORS headers or URL validity.`
//         );
//         resolve(null);
//       };
//     });
//   };

//   const applyContrastEnhancement = (
//     context: CanvasRenderingContext2D,
//     width: number,
//     height: number
//   ): ImageData => {
//     const imageData = context.getImageData(0, 0, width, height);
//     const data = imageData.data;

//     let total = 0;
//     for (let i = 0; i < data.length; i += 4) {
//       total += (data[i] + data[i + 1] + data[i + 2]) / 3;
//     }
//     const avg = total / (data.length / 4);

//     const factor = (259 * (128 + 50)) / (255 * (259 - 50));
//     for (let i = 0; i < data.length; i += 4) {
//       data[i] = clamp(factor * (data[i] - avg) + avg);
//       data[i + 1] = clamp(factor * (data[i + 1] - avg) + avg);
//       data[i + 2] = clamp(factor * (data[i + 2] - avg) + avg);
//     }

//     return imageData;
//   };

//   const applyBinarization = (
//     context: CanvasRenderingContext2D,
//     width: number,
//     height: number
//   ): ImageData => {
//     const imageData = context.getImageData(0, 0, width, height);
//     const data = imageData.data;

//     const threshold = calculateOtsuThreshold(imageData);

//     for (let i = 0; i < data.length; i += 4) {
//       const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
//       const value = brightness > threshold ? 255 : 0;
//       data[i] = value;
//       data[i + 1] = value;
//       data[i + 2] = value;
//     }

//     return imageData;
//   };

//   const applySharpening = (
//     context: CanvasRenderingContext2D,
//     width: number,
//     height: number
//   ): ImageData => {
//     const imageData = context.getImageData(0, 0, width, height);
//     const output = context.createImageData(width, height);
//     const kernel = [
//       [0, -1, 0],
//       [-1, 5, -1],
//       [0, -1, 0],
//     ];

//     applyConvolutionFilter(imageData, output, kernel);
//     return output;
//   };

//   const applyHistogramEqualization = (
//     context: CanvasRenderingContext2D,
//     width: number,
//     height: number
//   ): ImageData => {
//     const imageData = context.getImageData(0, 0, width, height);
//     const data = imageData.data;

//     const histogram = new Array(256).fill(0);
//     for (let i = 0; i < data.length; i += 4) {
//       const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
//       histogram[brightness]++;
//     }

//     const cdf = new Array(256);
//     cdf[0] = histogram[0];
//     for (let i = 1; i < 256; i++) {
//       cdf[i] = cdf[i - 1] + histogram[i];
//     }

//     const cdfMin = Math.min(...cdf.filter((val) => val > 0));
//     const totalPixels = width * height;

//     for (let i = 0; i < data.length; i += 4) {
//       const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
//       const newValue = Math.floor(
//         ((cdf[brightness] - cdfMin) / (totalPixels - cdfMin)) * 255
//       );
//       data[i] = newValue;
//       data[i + 1] = newValue;
//       data[i + 2] = newValue;
//     }

//     return imageData;
//   };

//   const clamp = (value: number): number => {
//     return Math.max(0, Math.min(255, value));
//   };

//   const calculateOtsuThreshold = (imageData: ImageData): number => {
//     const data = imageData.data;
//     const histogram = new Array(256).fill(0);

//     for (let i = 0; i < data.length; i += 4) {
//       const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
//       histogram[brightness]++;
//     }

//     const total = imageData.width * imageData.height;

//     let sum = 0;
//     for (let i = 0; i < 256; i++) sum += i * histogram[i];

//     let sumB = 0;
//     let wB = 0;
//     let wF = 0;
//     let maxVariance = 0;
//     let threshold = 0;

//     for (let i = 0; i < 256; i++) {
//       wB += histogram[i];
//       if (wB === 0) continue;

//       wF = total - wB;
//       if (wF === 0) break;

//       sumB += i * histogram[i];

//       const mB = sumB / wB;
//       const mF = (sum - sumB) / wF;

//       const variance = wB * wF * (mB - mF) * (mB - mF);
//       if (variance > maxVariance) {
//         maxVariance = variance;
//         threshold = i;
//       }
//     }

//     return threshold;
//   };

//   const applyConvolutionFilter = (
//     input: ImageData,
//     output: ImageData,
//     kernel: number[][]
//   ) => {
//     const width = input.width;
//     const height = input.height;
//     const inputData = input.data;
//     const outputData = output.data;
//     const kernelSize = kernel.length;
//     const kernelRadius = Math.floor(kernelSize / 2);

//     for (let y = 0; y < height; y++) {
//       for (let x = 0; x < width; x++) {
//         let r = 0,
//           g = 0,
//           b = 0;

//         for (let ky = 0; ky < kernelSize; ky++) {
//           for (let kx = 0; kx < kernelSize; kx++) {
//             const pixelX = x + kx - kernelRadius;
//             const pixelY = y + ky - kernelRadius;

//             if (
//               pixelX >= 0 &&
//               pixelX < width &&
//               pixelY >= 0 &&
//               pixelY < height
//             ) {
//               const idx = (pixelY * width + pixelX) * 4;
//               const weight = kernel[ky][kx];

//               r += inputData[idx] * weight;
//               g += inputData[idx + 1] * weight;
//               b += inputData[idx + 2] * weight;
//             }
//           }
//         }

//         const idx = (y * width + x) * 4;
//         outputData[idx] = clamp(r);
//         outputData[idx + 1] = clamp(g);
//         outputData[idx + 2] = clamp(b);
//         outputData[idx + 3] = inputData[idx + 3];
//       }
//     }
//   };

//   const tryMultipleROIs = (
//     context: CanvasRenderingContext2D,
//     width: number,
//     height: number,
//     sizeFactor: number
//   ): string | null => {
//     const roiSize = Math.min(width, height) * sizeFactor;
//     const positions = [
//       { x: width / 2 - roiSize / 2, y: height / 2 - roiSize / 2 },
//       { x: 0, y: 0 },
//       { x: width - roiSize, y: 0 },
//       { x: 0, y: height - roiSize },
//       { x: width - roiSize, y: height - roiSize },
//     ];

//     for (const pos of positions) {
//       const roiCanvas = document.createElement("canvas");
//       const roiContext = roiCanvas.getContext("2d");
//       if (!roiContext) continue;

//       roiCanvas.width = roiSize;
//       roiCanvas.height = roiSize;

//       roiContext.drawImage(
//         context.canvas,
//         pos.x,
//         pos.y,
//         roiSize,
//         roiSize,
//         0,
//         0,
//         roiSize,
//         roiSize
//       );

//       const roiImageData = roiContext.getImageData(0, 0, roiSize, roiSize);
//       const code = jsQR(roiImageData.data, roiSize, roiSize);

//       if (code) {
//         let qrCode = code.data.split("/").pop() || null;
//         if (qrCode) qrCode = qrCode.trim();
//         return qrCode;
//       }
//     }

//     return null;
//   };

//   const tryScaling = (
//     context: CanvasRenderingContext2D,
//     width: number,
//     height: number,
//     scale: number
//   ): string | null => {
//     const newWidth = Math.floor(width * scale);
//     const newHeight = Math.floor(height * scale);

//     const scaledCanvas = document.createElement("canvas");
//     const scaledContext = scaledCanvas.getContext("2d");
//     if (!scaledContext) return null;

//     scaledCanvas.width = newWidth;
//     scaledCanvas.height = newHeight;

//     scaledContext.drawImage(context.canvas, 0, 0, newWidth, newHeight);

//     const scaledImageData = scaledContext.getImageData(
//       0,
//       0,
//       newWidth,
//       newHeight
//     );
//     const code = jsQR(scaledImageData.data, newWidth, newHeight);

//     if (code) {
//       let qrCode = code.data.split("/").pop() || null;
//       if (qrCode) qrCode = qrCode.trim();
//       return qrCode;
//     }

//     return null;
//   };

//   useEffect(() => {
//     console.log("Updated userPointsState:", userPointsState);
//   }, [userPointsState]);

//   const handleLoginClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     navigate("/");
//   };

//   const handleLogout = () => {
//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       localStorage.removeItem(`userPoints_${userId}`);
//     }

//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     dispatch(logout());
//     dispatch(updatePoints(0));
//   };

//   const handleScanSubmit = async () => {
//     if (!qrCodeData) {
//       alert("No QR code data to submit.");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     if (!token || !userId) {
//       alert("No user information found. Please log in again.");
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       const result = await scanQRCode(token, qrCodeData);
//       setScanResult(result);
//       console.log("qrcode data", result);

//       toast.success("QR Code scanned successfully!");
//       setIsImageModalOpen(false);
//       const totalPoints = Array.isArray(result.userPoints)
//         ? result.userPoints.reduce(
//             (sum: number, item: { points?: number }) =>
//               sum + (item.points || 0),
//             0
//           )
//         : result.userPoints;

//       dispatch(updatePoints(totalPoints));
//     } catch (error) {
//       console.error("Error scanning QR code:", error);
//       toast.error("Failed to scan QR code. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   useEffect(() => {
//     const updatedPoints = parseInt(
//       localStorage.getItem(`userPoints_${userId}`) || "0",
//       10
//     );
//     setUserPointsState(updatedPoints);
//   }, [scanResult]);

//   const handlestoreClick = () => {
//     if (!isLoggedIn) {
//       toast.error("You are not logged in");
//       return;
//     }
//     navigate("/store");
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <>
//       {isExtracting && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             background: "rgba(0,0,0,0.85)",
//             color: "white",
//             padding: "20px 25px",
//             borderRadius: "10px",
//             zIndex: 9999,
//             boxShadow: "0 2px 15px rgba(0,0,0,0.4)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "15px",
//             minWidth: "250px",
//             textAlign: "center",
//           }}
//         >
//           <ClipLoader size={35} color="white" />
//           <span style={{ fontSize: "16px", fontWeight: "500" }}>
//             {extractingMessage}
//           </span>
//         </div>
//       )}

//       {isScanning && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             background: "rgba(0,0,0,0.8)",
//             zIndex: 9999,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <video ref={videoRef} style={{ width: "100%", height: "100%" }} />
//           <canvas ref={canvasRef} style={{ display: "none" }} />
//           <button
//             onClick={stopCamera}
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
//             Stop
//           </button>
//         </div>
//       )}

//       {showScanner && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.8)",
//             zIndex: 10000,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               width: "100%",
//               maxWidth: "500px",
//               backgroundColor: "white",
//               borderRadius: "12px",
//               padding: "20px",
//               textAlign: "center",
//             }}
//           >
//             <h2 style={{ marginBottom: "20px" }}>Scan QR Code</h2>

//             <div
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 backgroundColor: "#f0f0f0",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 marginBottom: "20px",
//                 position: "relative",
//               }}
//             >
//               <QrReader
//                 constraints={{ facingMode: "environment" }}
//                 onResult={handleScanResult}
//                 containerStyle={{ width: "100%", height: "100%" }}
//                 videoStyle={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />

//               {/* Scanner overlay frame */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   width: "200px",
//                   height: "200px",
//                   border: "2px solid #4CAF50",
//                   borderRadius: "8px",
//                   boxShadow: "0 0 0 4000px rgba(0, 0, 0, 0.3)",
//                 }}
//               />
//             </div>

//             {scannerData && (
//               <div
//                 style={{
//                   marginBottom: "20px",
//                   padding: "10px",
//                   backgroundColor: "#e8f5e9",
//                   borderRadius: "6px",
//                 }}
//               >
//                 <p>QR Code detected: {scannerData}</p>
//                 {isScannerProcessing && (
//                   <div style={{ marginTop: "10px" }}>
//                     <ClipLoader size={20} color="#4CAF50" />
//                     <span style={{ marginLeft: "10px" }}>Processing...</span>
//                   </div>
//                 )}
//               </div>
//             )}

//             <div
//               style={{ display: "flex", gap: "10px", justifyContent: "center" }}
//             >
//               <Button
//                 onClick={resetScanner}
//                 style={{
//                   backgroundColor: "#f44336",
//                   color: "white",
//                   padding: "10px 20px",
//                   borderRadius: "6px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       <NavContainer>
//         <MobileToggleButton onClick={toggleMobileMenu}>
//           <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
//         </MobileToggleButton>
//         <Link to="/">
//           <Logo src={logo} alt="BankApp Logo" />
//         </Link>
//         <ScanButton onClick={handleScanClick}>
//           <FontAwesomeIcon icon={faCamera} />
//         </ScanButton>
//         <RightActions>
//           {!isLoggedIn ? (
//             <Button onClick={handleLoginClick}>Login</Button>
//           ) : (
//             <>
//               <StoreButton onClick={handlestoreClick}>Store</StoreButton>
//               <span>Welcome, {username}!</span>
//               <Button onClick={handleUploadClick}>Upload A Qrcode</Button>
//               <PointsDisplay>{userPoints} points</PointsDisplay>

//               <select
//                 style={{
//                   padding: "6px 10px",
//                   borderRadius: "6px",
//                   border: "1px solid #ccc",
//                   marginLeft: "15px",
//                   cursor: "pointer",
//                 }}
//                 value={selectedBrand || ""}
//                 onChange={(e) => {
//                   const brandId = e.target.value;
//                   dispatch(setSelectedBrand(brandId));
//                   setSelectedBrand(brandId);
//                 }}
//               >
//                 <option value="" disabled>
//                   Select Brand
//                 </option>
//                 {brands.map((brand: any, index: number) => (
//                   <option key={brand._id || index} value={brand._id}>
//                     {brand.brandName}
//                   </option>
//                 ))}
//               </select>

//               <NotificationDropdown>
//                 <NotificationButton>
//                   <FontAwesomeIcon icon={faBell} />

//                   <NotificationBadge>1</NotificationBadge>
//                 </NotificationButton>
//                 <DropdownMenu>
//                   <DropdownItem>
//                     Support Team posted a message...
//                     <DropdownItemTime>2 weeks ago</DropdownItemTime>
//                   </DropdownItem>
//                   <DropdownFooter>
//                     <DropdownButton>Show all</DropdownButton>
//                     <DropdownButton>Mark all as read</DropdownButton>
//                   </DropdownFooter>
//                 </DropdownMenu>
//               </NotificationDropdown>

//               <ProfileDropdown>
//                 <ProfileButton>
//                   <ProfileImage
//                     src="https://www.gravatar.com/avatar/9095632f1181c0f40a37d853f66cfc40?s=100&d=404&r=g"
//                     alt="Umar Faiz"
//                     onError={(e) => {
//                       e.currentTarget.hidden = true;
//                       e.currentTarget.nextElementSibling?.removeAttribute(
//                         "hidden"
//                       );
//                     }}
//                   />
//                   <ProfileFallback>
//                     <span>UF</span>
//                   </ProfileFallback>
//                 </ProfileButton>
//                 <DropdownMenu>
//                   <DropdownItem>
//                     <Link to="/profile/user-history">Profile</Link>
//                   </DropdownItem>
//                   <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
//                 </DropdownMenu>
//               </ProfileDropdown>
//             </>
//           )}
//         </RightActions>

//         <MobileMenuOverlay
//           isOpen={isMobileMenuOpen}
//           onClick={toggleMobileMenu}
//         />

//         <MobileMenu isOpen={isMobileMenuOpen}>
//           <MobileMenuHeader>
//             <h3>Menu</h3>
//             <MobileCloseButton onClick={toggleMobileMenu}>
//               <FontAwesomeIcon icon={faTimes} />
//             </MobileCloseButton>
//           </MobileMenuHeader>

//           <StoreButton
//             onClick={() => {
//               handlestoreClick();
//               toggleMobileMenu();
//             }}
//           >
//             Store
//           </StoreButton>

//           {!isLoggedIn ? (
//             <Button
//               onClick={() => {
//                 handleLoginClick();
//                 toggleMobileMenu();
//               }}
//             >
//               Login
//             </Button>
//           ) : (
//             <>
//               <span>Welcome, {username}!</span>

//               <PointsDisplay>{userPoints} points</PointsDisplay>

//               <Link
//                 to="/profile/user-history"
//                 onClick={toggleMobileMenu}
//                 style={{
//                   display: "block",
//                   padding: "8px 0",
//                   fontWeight: "500",
//                   color: "black",
//                   textDecoration: "none",
//                 }}
//               >
//                 Profile
//               </Link>
//               <Button
//                 onClick={() => {
//                   handleLogout();
//                   toggleMobileMenu();
//                 }}
//               >
//                 Sign out
//               </Button>
//             </>
//           )}
//         </MobileMenu>

//         <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//           {isLogin ? (
//             <Login
//               onClose={handleCloseModal}
//               onSwitchToSignUp={() => setIsLogin(false)}
//             />
//           ) : (
//             <SignUp
//               onClose={handleCloseModal}
//               onSwitchToLogin={() => setIsLogin(true)}
//             />
//           )}
//         </Modal>
//         <Modal
//           isOpen={isImageModalOpen}
//           onClose={() => {
//             setIsImageModalOpen(false);
//             setIsProcessing(false);
//             setLoading(false);
//             stopCamera();
//           }}
//         >
//           {loading ? (
//             <div style={{ textAlign: "center", padding: "10px" }}>
//               <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
//                 Extracting QR code from image...
//               </p>
//               <ClipLoader size={40} color="black" />
//             </div>
//           ) : qrCodeData ? (
//             <div style={{ textAlign: "center", padding: "10px" }}>
//               <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
//                 QR Code Extracted Successfully!
//               </p>
//               <QrCodeData>{qrCodeData}</QrCodeData>
//               {isProcessing ? (
//                 <div style={{ marginTop: "15px" }}>
//                   <ClipLoader size={30} color="black" />
//                   <p style={{ marginTop: "10px" }}>Submitting to server...</p>
//                 </div>
//               ) : (
//                 <QrCodeButton
//                   onClick={handleScanSubmit}
//                   disabled={isProcessing}
//                   style={{ marginTop: "15px" }}
//                 >
//                   Submit QR Code
//                 </QrCodeButton>
//               )}
//             </div>
//           ) : (
//             selectedImage && (
//               <div style={{ textAlign: "center" }}>
//                 <ImagePreview src={selectedImage} alt="QR Code" />
//                 <p style={{ marginTop: "10px", color: "red" }}>
//                   No QR code found in this image.
//                 </p>
//               </div>
//             )
//           )}
//         </Modal>
//       </NavContainer>
//     </>
//   );
// };

// export default Header;

import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import Login from "../../pages/SignIn/SignIn";
import Modal from "../Modal/modal";
import SignUp from "../../pages/SignUp/signup";
import { Link, useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import { scanQRCode } from "../../services/qrcode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  logout,
  setSelectedBrand,
  updatePoints,
} from "../../redux/slices/auth";
import logo from "../../assets/Png/BANKS CURVED LOGO-09.png";

import {
  NavContainer,
  MobileToggleButton,
  RightActions,
  NotificationDropdown,
  NotificationButton,
  NotificationBadge,
  ProfileDropdown,
  ProfileButton,
  ProfileImage,
  DropdownMenu,
  DropdownItem,
  DropdownFooter,
  DropdownButton,
  Button,
  StoreButton,
  DropdownItemTime,
  ProfileFallback,
  PointsDisplay,
  QrCodeData,
  ImagePreview,
  QrCodeButton,
  MobileMenuOverlay,
  MobileMenu,
  MobileMenuHeader,
  MobileCloseButton,
  Logo,
  ScanButton,
  MobileMenuItem,
} from "./header.styles";
import { getAllBrands } from "../../services/auth";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import QrScanner from "./Scanner";
import ForgotPassword from "../../pages/Forgot Password/ForgotPassword";

interface ScanResult {
  userPoints: number;
}

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const userId = localStorage.getItem("userId");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);

  const [extractingMessage, setExtractingMessage] = useState<string>(
    "Preparing image for scanning..."
  );
  const [isScanning, setIsScanning] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [userPointsState, setUserPointsState] = useState<number>(
    parseInt(localStorage.getItem(`userPoints_${userId}`) || "0", 10)
  );
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const dispatch = useDispatch();
  const selectedBrand = useSelector(
    (state: RootState) => state.auth.selectedBrand
  );
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.isLoggedIn ?? false
  );
  const username =
    useSelector((state: RootState) => state.auth.username) || "User";
  const navigate = useNavigate();
  const userPoints = useSelector((state: RootState) => state.auth.userPoints);
  console.log("Redux userPoints:", userPoints);

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    setSelectedImage(null);
    setQrCodeData(null);
    setScanResult(null);
    setIsProcessing(false);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const imageData = e.target?.result as string;
          setSelectedImage(imageData);
          setLoading(true);

          setIsExtracting(true);
          setExtractingMessage("Preparing image for scanning...");

          const qrData = await extractQRCode(imageData);
          setLoading(false);

          setIsExtracting(false);

          if (qrData) {
            console.log("Extracted QR Code Data:", qrData);
            setQrCodeData(qrData);
            setIsImageModalOpen(true);
          } else {
            setQrCodeData(null);
            setIsImageModalOpen(true);
            toast.error("No QR code found in the image.");
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsScanning(false);
    }
  };

  const getInitials = (name: string): string => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getAllBrands();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const extractQRCode = async (imageSrc: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageSrc;

      const getLastSegment = (
        data: string | undefined | null
      ): string | null => {
        if (!data) return null;
        return data.trim().split("/").pop() || null;
      };

      image.onload = () => {
        if (image.width <= 0 || image.height <= 0) {
          console.error(
            `Invalid image dimensions: width=${image.width}, height=${image.height}`
          );
          return resolve(null);
        }

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
          console.error("Failed to get 2D canvas context");
          return resolve(null);
        }

        canvas.width = image.width;
        canvas.height = image.height;

        try {
          context.drawImage(image, 0, 0, image.width, image.height);
        } catch (e) {
          console.error("Error drawing image on canvas:", e);
          return resolve(null);
        }

        let imageData;
        try {
          imageData = context.getImageData(0, 0, image.width, image.height);
        } catch (e) {
          console.error("Error getting image data:", e);
          return resolve(null);
        }

        if (
          !imageData.data ||
          imageData.data.length !== image.width * image.height * 4
        ) {
          console.error(
            `Invalid ImageData: length=${imageData.data.length}, expected=${
              image.width * image.height * 4
            }`
          );
          return resolve(null);
        }

        try {
          const code = jsQR(imageData.data, image.width, image.height);
          if (code) return resolve(getLastSegment(code.data));
        } catch (e) {
          console.error("jsQR error on original image:", e);
        }

        const preprocessingMethods = [
          applyContrastEnhancement,
          applyBinarization,
          applySharpening,
          applyHistogramEqualization,
        ];

        for (const method of preprocessingMethods) {
          try {
            const processedImageData = method(
              context,
              image.width,
              image.height
            );
            if (
              !processedImageData.data ||
              processedImageData.data.length !== image.width * image.height * 4
            ) {
              console.warn(`Invalid processed ImageData from ${method.name}`);
              continue;
            }
            const code = jsQR(
              processedImageData.data,
              image.width,
              processedImageData.height
            );
            if (code) return resolve(getLastSegment(code.data));
          } catch (e) {
            console.error(`Error in preprocessing method ${method.name}:`, e);
          }
        }

        const roiSizes = [0.3, 0.5, 0.7];
        for (const size of roiSizes) {
          try {
            const qrCode = tryMultipleROIs(
              context,
              image.width,
              image.height,
              size
            );
            if (qrCode) return resolve(getLastSegment(qrCode));
          } catch (e) {
            console.error(`Error in tryMultipleROIs with size ${size}:`, e);
          }
        }

        const scales = [0.5, 1.0, 1.5, 2.0];
        for (const scale of scales) {
          try {
            const qrCode = tryScaling(
              context,
              image.width,
              image.height,
              scale
            );
            if (qrCode) return resolve(getLastSegment(qrCode));
          } catch (e) {
            console.error(`Error in tryScaling with scale ${scale}:`, e);
          }
        }

        console.warn("All QR code detection strategies failed");
        resolve(null);
      };

      image.onerror = () => {
        console.error(
          `Failed to load image from ${imageSrc}. Check CORS headers or URL validity.`
        );
        resolve(null);
      };
    });
  };

  const applyContrastEnhancement = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): ImageData => {
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    let total = 0;
    for (let i = 0; i < data.length; i += 4) {
      total += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    const avg = total / (data.length / 4);

    const factor = (259 * (128 + 50)) / (255 * (259 - 50));
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp(factor * (data[i] - avg) + avg);
      data[i + 1] = clamp(factor * (data[i + 1] - avg) + avg);
      data[i + 2] = clamp(factor * (data[i + 2] - avg) + avg);
    }

    return imageData;
  };

  const applyBinarization = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): ImageData => {
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    const threshold = calculateOtsuThreshold(imageData);

    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const value = brightness > threshold ? 255 : 0;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
    }

    return imageData;
  };

  const applySharpening = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): ImageData => {
    const imageData = context.getImageData(0, 0, width, height);
    const output = context.createImageData(width, height);
    const kernel = [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ];

    applyConvolutionFilter(imageData, output, kernel);
    return output;
  };

  const applyHistogramEqualization = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): ImageData => {
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    const histogram = new Array(256).fill(0);
    for (let i = 0; i < data.length; i += 4) {
      const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
      histogram[brightness]++;
    }

    const cdf = new Array(256);
    cdf[0] = histogram[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + histogram[i];
    }

    const cdfMin = Math.min(...cdf.filter((val) => val > 0));
    const totalPixels = width * height;

    for (let i = 0; i < data.length; i += 4) {
      const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
      const newValue = Math.floor(
        ((cdf[brightness] - cdfMin) / (totalPixels - cdfMin)) * 255
      );
      data[i] = newValue;
      data[i + 1] = newValue;
      data[i + 2] = newValue;
    }

    return imageData;
  };

  const clamp = (value: number): number => {
    return Math.max(0, Math.min(255, value));
  };

  const calculateOtsuThreshold = (imageData: ImageData): number => {
    const data = imageData.data;
    const histogram = new Array(256).fill(0);

    for (let i = 0; i < data.length; i += 4) {
      const brightness = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
      histogram[brightness]++;
    }

    const total = imageData.width * imageData.height;

    let sum = 0;
    for (let i = 0; i < 256; i++) sum += i * histogram[i];

    let sumB = 0;
    let wB = 0;
    let wF = 0;
    let maxVariance = 0;
    let threshold = 0;

    for (let i = 0; i < 256; i++) {
      wB += histogram[i];
      if (wB === 0) continue;

      wF = total - wB;
      if (wF === 0) break;

      sumB += i * histogram[i];

      const mB = sumB / wB;
      const mF = (sum - sumB) / wF;

      const variance = wB * wF * (mB - mF) * (mB - mF);
      if (variance > maxVariance) {
        maxVariance = variance;
        threshold = i;
      }
    }

    return threshold;
  };

  const applyConvolutionFilter = (
    input: ImageData,
    output: ImageData,
    kernel: number[][]
  ) => {
    const width = input.width;
    const height = input.height;
    const inputData = input.data;
    const outputData = output.data;
    const kernelSize = kernel.length;
    const kernelRadius = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0;

        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const pixelX = x + kx - kernelRadius;
            const pixelY = y + ky - kernelRadius;

            if (
              pixelX >= 0 &&
              pixelX < width &&
              pixelY >= 0 &&
              pixelY < height
            ) {
              const idx = (pixelY * width + pixelX) * 4;
              const weight = kernel[ky][kx];

              r += inputData[idx] * weight;
              g += inputData[idx + 1] * weight;
              b += inputData[idx + 2] * weight;
            }
          }
        }

        const idx = (y * width + x) * 4;
        outputData[idx] = clamp(r);
        outputData[idx + 1] = clamp(g);
        outputData[idx + 2] = clamp(b);
        outputData[idx + 3] = inputData[idx + 3];
      }
    }
  };

  const tryMultipleROIs = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    sizeFactor: number
  ): string | null => {
    const roiSize = Math.min(width, height) * sizeFactor;
    const positions = [
      { x: width / 2 - roiSize / 2, y: height / 2 - roiSize / 2 },
      { x: 0, y: 0 },
      { x: width - roiSize, y: 0 },
      { x: 0, y: height - roiSize },
      { x: width - roiSize, y: height - roiSize },
    ];

    for (const pos of positions) {
      const roiCanvas = document.createElement("canvas");
      const roiContext = roiCanvas.getContext("2d");
      if (!roiContext) continue;

      roiCanvas.width = roiSize;
      roiCanvas.height = roiSize;

      roiContext.drawImage(
        context.canvas,
        pos.x,
        pos.y,
        roiSize,
        roiSize,
        0,
        0,
        roiSize,
        roiSize
      );

      const roiImageData = roiContext.getImageData(0, 0, roiSize, roiSize);
      const code = jsQR(roiImageData.data, roiSize, roiSize);

      if (code) {
        let qrCode = code.data.split("/").pop() || null;
        if (qrCode) qrCode = qrCode.trim();
        return qrCode;
      }
    }

    return null;
  };

  const tryScaling = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    scale: number
  ): string | null => {
    const newWidth = Math.floor(width * scale);
    const newHeight = Math.floor(height * scale);

    const scaledCanvas = document.createElement("canvas");
    const scaledContext = scaledCanvas.getContext("2d");
    if (!scaledContext) return null;

    scaledCanvas.width = newWidth;
    scaledCanvas.height = newHeight;

    scaledContext.drawImage(context.canvas, 0, 0, newWidth, newHeight);

    const scaledImageData = scaledContext.getImageData(
      0,
      0,
      newWidth,
      newHeight
    );
    const code = jsQR(scaledImageData.data, newWidth, newHeight);

    if (code) {
      let qrCode = code.data.split("/").pop() || null;
      if (qrCode) qrCode = qrCode.trim();
      return qrCode;
    }

    return null;
  };

  useEffect(() => {
    console.log("Updated userPointsState:", userPointsState);
  }, [userPointsState]);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   navigate("/");
  // };

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.removeItem(`userPoints_${userId}`);
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logout());
    dispatch(updatePoints(0));
  };

  const handleScanSubmit = async () => {
    if (!qrCodeData) {
      alert("No QR code data to submit.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("No user information found. Please log in again.");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await scanQRCode(token, qrCodeData);
      setScanResult(result);
      console.log("qrcode data", result);

      toast.success("Congratulations! You have earned 20 points 🎯");

      setIsImageModalOpen(false);
      const totalPoints = Array.isArray(result.userPoints)
        ? result.userPoints.reduce(
            (sum: number, item: { points?: number }) =>
              sum + (item.points || 0),
            0
          )
        : result.userPoints;

      dispatch(updatePoints(totalPoints));
    } catch (err: any) {
      console.error("Error scanning QR code:", err);

      const errorMsg =
        err?.response?.data?.message ||
        "Failed to scan QR code. Please try again.";

      if (errorMsg.includes("already been used")) {
        toast.error("This QR Code has already been used.");
      } else if (errorMsg.includes("already scanned by this user")) {
        toast.error("⚠️ You have already scanned this QR Code.");
      } else if (errorMsg.includes("not found")) {
        toast.error("Invalid QR Code.");
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const updatedPoints = parseInt(
      localStorage.getItem(`userPoints_${userId}`) || "0",
      10
    );
    setUserPointsState(updatedPoints);
  }, [scanResult]);

  const handlestoreClick = () => {
    if (!isLoggedIn) {
      toast.error("You are not logged in");
      return;
    }
    navigate("/store");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {isExtracting && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: "20px 25px",
            borderRadius: "10px",
            zIndex: 9999,
            boxShadow: "0 2px 15px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            minWidth: "250px",
            textAlign: "center",
          }}
        >
          <ClipLoader size={35} color="white" />
          <span style={{ fontSize: "16px", fontWeight: "500" }}>
            {extractingMessage}
          </span>
        </div>
      )}

      {isScanning && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <video ref={videoRef} style={{ width: "100%", height: "100%" }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <button
            onClick={stopCamera}
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
            Stop
          </button>
        </div>
      )}

      <NavContainer>
        <Link to="/">
          <Logo src={logo} alt="BankApp Logo" />
        </Link>

        <ScanButton>
          <QrScanner onRequireLogin={() => setIsModalOpen(true)} />
        </ScanButton>

        <MobileToggleButton onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </MobileToggleButton>

        <RightActions>
          {!isLoggedIn ? (
            <Button onClick={handleLoginClick}>Login</Button>
          ) : (
            <>
              <StoreButton onClick={handlestoreClick}>Store</StoreButton>
              <span>Welcome, {username}!</span>
              <Button onClick={handleUploadClick}>Upload A Qrcode</Button>
              <PointsDisplay>{userPoints} points</PointsDisplay>

              <select
                style={{
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginLeft: "15px",
                  cursor: "pointer",
                }}
                value={selectedBrand || ""}
                onChange={(e) => {
                  const brandId = e.target.value;
                  dispatch(setSelectedBrand(brandId));
                  setSelectedBrand(brandId);
                }}
              >
                <option value="" disabled>
                  Select Brand
                </option>
                {brands.map((brand: any, index: number) => (
                  <option key={brand._id || index} value={brand._id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>

              <NotificationDropdown>
                <NotificationButton>
                  <FontAwesomeIcon icon={faBell} />

                  <NotificationBadge>1</NotificationBadge>
                </NotificationButton>
                <DropdownMenu>
                  <DropdownItem>
                    Support Team posted a message...
                    <DropdownItemTime>2 weeks ago</DropdownItemTime>
                  </DropdownItem>
                  <DropdownFooter>
                    <DropdownButton>Show all</DropdownButton>
                    <DropdownButton>Mark all as read</DropdownButton>
                  </DropdownFooter>
                </DropdownMenu>
              </NotificationDropdown>

              <ProfileDropdown>
                <ProfileButton>
                  <ProfileImage
                    src="https://www.gravatar.com/avatar/9095632f1181c0f40a37d853f66cfc40?s=100&d=404&r=g"
                    alt="Umar Faiz"
                    onError={(e) => {
                      e.currentTarget.hidden = true;
                      e.currentTarget.nextElementSibling?.removeAttribute(
                        "hidden"
                      );
                    }}
                  />
                  <ProfileFallback>
                    <span>{getInitials(username)}</span>
                  </ProfileFallback>
                </ProfileButton>
                <DropdownMenu>
                  <DropdownItem>
                    <Link to="/profile/user-history">Profile</Link>
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
                </DropdownMenu>
              </ProfileDropdown>
            </>
          )}
        </RightActions>

        <MobileMenuOverlay
          isOpen={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        />

        <MobileMenu isOpen={isMobileMenuOpen}>
          <MobileMenuHeader>
            <h3>Menu</h3>
            <MobileCloseButton onClick={toggleMobileMenu}>
              <FontAwesomeIcon icon={faTimes} />
            </MobileCloseButton>
          </MobileMenuHeader>

          <StoreButton
            onClick={() => {
              handlestoreClick();
              toggleMobileMenu();
            }}
          >
            Store
          </StoreButton>

          {!isLoggedIn ? (
            <Button
              onClick={() => {
                handleLoginClick();
                toggleMobileMenu();
              }}
            >
              Login
            </Button>
          ) : (
            <>
              <span>Welcome, {username}!</span>
              <PointsDisplay>{userPoints} points</PointsDisplay>
              <MobileMenuItem
                to="/profile/user-history"
                onClick={toggleMobileMenu}
              >
                Profile
              </MobileMenuItem>
              <Button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
              >
                Sign out
              </Button>
            </>
          )}

          {/* Static footer links */}
          <MobileMenuItem to="/faq" onClick={toggleMobileMenu}>
            FAQ
          </MobileMenuItem>
          <MobileMenuItem to="/terms-conditions" onClick={toggleMobileMenu}>
            Terms
          </MobileMenuItem>
          <MobileMenuItem to="/privacy" onClick={toggleMobileMenu}>
            Privacy
          </MobileMenuItem>
        </MobileMenu>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {isLogin && !isForgotPassword ? (
            <Login
              onSwitchToSignUp={() => {
                setIsLogin(false);
                setIsForgotPassword(false);
              }}
              onSwitchToForgot={() => {
                setIsForgotPassword(true);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          ) : !isLogin && !isForgotPassword ? (
            <SignUp
              onSwitchToLogin={() => {
                setIsLogin(true);
                setIsForgotPassword(false);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          ) : (
            <ForgotPassword
              onSwitchToLogin={() => {
                setIsLogin(true);
                setIsForgotPassword(false);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </Modal>
        <Modal
          isOpen={isImageModalOpen}
          onClose={() => {
            setIsImageModalOpen(false);
            setIsProcessing(false);
            setLoading(false);
            stopCamera();
          }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "10px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Extracting QR code from image...
              </p>
              <ClipLoader size={40} color="black" />
            </div>
          ) : qrCodeData ? (
            <div style={{ textAlign: "center", padding: "10px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                QR Code Extracted Successfully!
              </p>
              <QrCodeData>{qrCodeData}</QrCodeData>
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
            selectedImage && (
              <div style={{ textAlign: "center" }}>
                <ImagePreview src={selectedImage} alt="QR Code" />
                <p style={{ marginTop: "10px", color: "red" }}>
                  No QR code found in this image.
                </p>
              </div>
            )
          )}
        </Modal>
      </NavContainer>
    </>
  );
};

export default Header;
