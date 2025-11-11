import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import Login from "../../pages/SignIn/SignIn";
import Modal from "../Modal/modal";
import SignUp from "../../pages/SignUp/signup";
import { Link, useNavigate } from "react-router-dom";
import { scanQRCode } from "../../services/qrcode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Html5Qrcode } from "html5-qrcode";
import {
  logout,
  setSelectedBrand,
  updatePoints,
} from "../../redux/slices/auth";
import logo from "../../assets/Png/BANKS CURVED LOGO-09.png";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
  QrCodeButton,
  MobileMenuOverlay,
  MobileMenu,
  MobileMenuHeader,
  MobileCloseButton,
  Logo,
  ScanButton,
  MobileMenuItem,
  MobileUploadButton,
} from "./header.styles";
import { getAllBrands } from "../../services/auth";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import QrScanner from "./Scanner";
import ForgotPassword from "../../pages/Forgot Password/ForgotPassword";
import jsQR from "jsqr";

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
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

  // Function to create a cropped image from the canvas
  const getCroppedImg = (
    image: HTMLImageElement,
    crop: Crop
  ): Promise<string> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    ctx.save();

    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // Draw the image
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          resolve(URL.createObjectURL(blob));
        },
        "image/jpeg",
        1
      );
    });
  };

  const handleUploadClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    setSelectedImage(null);
    setQrCodeData(null);
    setScanResult(null);
    setIsProcessing(false);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setCroppedImage(null);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Check file size (limit to 5MB)
        if (file.size > 50 * 1024 * 1024) {
          toast.error("Please select an image smaller than 50MB");
          return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
          const imageData = e.target?.result as string;
          setSelectedImage(imageData);
          setIsImageModalOpen(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleCropComplete = async (crop: Crop) => {
    setCompletedCrop(crop);

    if (imgRef.current && crop.width && crop.height) {
      try {
        const croppedImageUrl = await getCroppedImg(imgRef.current, crop);
        setCroppedImage(croppedImageUrl);
      } catch (error) {
        console.error("Error cropping image:", error);
        toast.error("Error cropping image. Please try again.");
      }
    }
  };

  const handleScanCroppedImage = async () => {
    if (!croppedImage) {
      toast.error("Please crop the image first");
      return;
    }

    setIsExtracting(true);
    setExtractingMessage("Scanning for QR code...");

    try {
      const qrData = await extractQRCode(croppedImage);

      if (qrData) {
        setQrCodeData(qrData);
        toast.success("QR code detected!");
      } else {
        setQrCodeData(null);
        toast.error("No QR code found in the cropped image.");
      }
    } catch (error) {
      console.error("Error extracting QR code:", error);
      toast.error("Error processing image. Please try again.");
    } finally {
      setIsExtracting(false);
    }
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
    try {
      const file = await fetch(imageSrc)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new File([blob], "qrcode.jpg", { type: blob.type || "image/jpeg" })
        );

      // Create a temporary container for the scanner
      const tempContainer = document.createElement("div");
      tempContainer.id = "temp-qr-scanner";
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      document.body.appendChild(tempContainer);

      // Initialize the scanner
      const html5Qrcode = new Html5Qrcode("temp-qr-scanner");

      // Scan the image file
      const result = await html5Qrcode.scanFile(file, true);

      // Clean up
      document.body.removeChild(tempContainer);

      return getLastSegment(result);
    } catch (error) {
      // Clean up any existing temporary container
      const existingContainer = document.getElementById("temp-qr-scanner");
      if (existingContainer) {
        document.body.removeChild(existingContainer);
      }

      // Fall back to the original jsQR implementation
      return await extractQRCodeWithJsQR(imageSrc);
    }
  };

  // Fallback implementation using jsQR
  const extractQRCodeWithJsQR = async (
    imageSrc: string
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageSrc;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
          console.error("Failed to get 2D canvas context");
          return resolve(null);
        }

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        // Try multiple approaches
        const approaches = [
          () => tryDirectScan(context, image.width, image.height),
          () => tryWithPreprocessing(context, image.width, image.height),
          () => tryMultipleScales(context, image.width, image.height),
          () => tryROIs(context, image.width, image.height),
        ];

        // Try each approach sequentially
        const tryApproach = async (index: number): Promise<string | null> => {
          if (index >= approaches.length) return null;

          try {
            const result = await approaches[index]();
            if (result) return result;
            return tryApproach(index + 1);
          } catch (error) {
            console.error(`Approach ${index} failed:`, error);
            return tryApproach(index + 1);
          }
        };

        tryApproach(0).then(resolve);
      };

      image.onerror = () => {
        console.error("Failed to load image");
        resolve(null);
      };
    });
  };

  const tryDirectScan = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): string | null => {
    const imageData = context.getImageData(0, 0, width, height);
    const code = jsQR(imageData.data, width, height);
    return code ? getLastSegment(code.data) : null;
  };

  const tryWithPreprocessing = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): string | null => {
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");
    if (!tempContext) return null;

    tempCanvas.width = width;
    tempCanvas.height = height;

    // Apply preprocessing
    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Apply contrast enhancement
    const factor = 1.3;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = clamp((data[i] - 128) * factor + 128);
      data[i + 1] = clamp((data[i + 1] - 128) * factor + 128);
      data[i + 2] = clamp((data[i + 2] - 128) * factor + 128);
    }

    tempContext.putImageData(imageData, 0, 0);
    const processedImageData = tempContext.getImageData(0, 0, width, height);
    const code = jsQR(processedImageData.data, width, height);

    return code ? getLastSegment(code.data) : null;
  };

  const tryMultipleScales = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): string | null => {
    const scales = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0];

    for (const scale of scales) {
      const scaledWidth = Math.floor(width * scale);
      const scaledHeight = Math.floor(height * scale);

      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");
      if (!tempContext) continue;

      tempCanvas.width = scaledWidth;
      tempCanvas.height = scaledHeight;

      tempContext.drawImage(context.canvas, 0, 0, scaledWidth, scaledHeight);
      const imageData = tempContext.getImageData(
        0,
        0,
        scaledWidth,
        scaledHeight
      );
      const code = jsQR(imageData.data, scaledWidth, scaledHeight);

      if (code) {
        return getLastSegment(code.data);
      }
    }

    return null;
  };

  const tryROIs = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): string | null => {
    // Try different regions of interest
    const rois = [
      { x: 0, y: 0, width: width, height: height }, // Full image
      {
        x: width * 0.1,
        y: height * 0.1,
        width: width * 0.8,
        height: height * 0.8,
      }, // Center
      { x: 0, y: 0, width: width * 0.5, height: height * 0.5 }, // Top-left
      { x: width * 0.5, y: 0, width: width * 0.5, height: height * 0.5 }, // Top-right
      { x: 0, y: height * 0.5, width: width * 0.5, height: height * 0.5 }, // Bottom-left
      {
        x: width * 0.5,
        y: height * 0.5,
        width: width * 0.5,
        height: height * 0.5,
      }, // Bottom-right
    ];

    for (const roi of rois) {
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");
      if (!tempContext) continue;

      tempCanvas.width = roi.width;
      tempCanvas.height = roi.height;

      tempContext.drawImage(
        context.canvas,
        roi.x,
        roi.y,
        roi.width,
        roi.height,
        0,
        0,
        roi.width,
        roi.height
      );

      const imageData = tempContext.getImageData(0, 0, roi.width, roi.height);
      const code = jsQR(imageData.data, roi.width, roi.height);

      if (code) {
        return getLastSegment(code.data);
      }
    }

    return null;
  };

  // Keep your existing helper functions
  const clamp = (value: number): number => Math.max(0, Math.min(255, value));
  const getLastSegment = (data: string | undefined | null): string | null => {
    if (!data) return null;
    return data.trim().split("/").pop() || null;
  };

  useEffect(() => {}, [userPointsState]);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

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

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    // Add body scroll lock
    if (!isMobileMenuOpen) {
      // Opening menu: Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed"; // Prevents iOS bounce
      document.body.style.width = "100%"; // Prevents layout shift
    } else {
      // Closing menu: Restore body scroll
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        toggleMobileMenu(); // This will unlock body
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

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
        <MobileUploadButton onClick={handleUploadClick}>
          <span>Upload Qrcode</span>
        </MobileUploadButton>

        <MobileToggleButton onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </MobileToggleButton>
        {/* 
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
        </RightActions> */}

        <RightActions>
          {/* Rest of the right-side controls */}
          {isLoggedIn ? (
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
            </>
          ) : (
            <Button onClick={handleLoginClick}>Login</Button>
          )}

          <ProfileDropdown>
            <ProfileButton>
              <ProfileImage
                src="https://www.gravatar.com/avatar/9095632f1181c0f40a37d853f66cfc40?s=100&d=404&r=g"
                alt="Profile"
                onError={(e) => {
                  e.currentTarget.hidden = true;
                  e.currentTarget.nextElementSibling?.removeAttribute("hidden");
                }}
              />
              <ProfileFallback>
                <span>{getInitials(username)}</span>
              </ProfileFallback>
            </ProfileButton>

            <DropdownMenu>
              {/* Always show delete account */}
              {/* <DropdownItem onClick={() => navigate("/delete-account")}>
                Delete Account
              </DropdownItem> */}

              {isLoggedIn ? (
                <>
                  <DropdownItem>
                    <Link
                      to="/profile/user-history"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
                </>
              ) : (
                <DropdownItem onClick={handleLoginClick}>Login</DropdownItem>
              )}
            </DropdownMenu>
          </ProfileDropdown>
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
          {/* 
          <MobileMenuItem to="/delete-account" onClick={toggleMobileMenu}>
            Delete Account
          </MobileMenuItem> */}
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
            setCrop(undefined);
            setCompletedCrop(undefined);
            setCroppedImage(null);
          }}
        >
          <div style={{ width: "85%", maxWidth: "450px", margin: "0 auto" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "15px" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  Extracting QR code from image...
                </p>
                <ClipLoader size={30} color="black" />
              </div>
            ) : qrCodeData ? (
              <div style={{ textAlign: "center", padding: "15px" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    fontSize: "14px",
                  }}
                >
                  QR Code Extracted Successfully!
                </p>
                <QrCodeData style={{ fontSize: "12px", padding: "8px" }}>
                  {qrCodeData}
                </QrCodeData>
                {isProcessing ? (
                  <div style={{ marginTop: "15px" }}>
                    <ClipLoader size={25} color="black" />
                    <p style={{ marginTop: "8px", fontSize: "12px" }}>
                      Submitting to server...
                    </p>
                  </div>
                ) : (
                  <QrCodeButton
                    onClick={handleScanSubmit}
                    disabled={isProcessing}
                    style={{
                      marginTop: "12px",
                      padding: "8px 16px",
                      fontSize: "12px",
                    }}
                  >
                    Submit QR Code
                  </QrCodeButton>
                )}
              </div>
            ) : (
              selectedImage && (
                <div
                  style={{
                    textAlign: "center",
                    maxWidth: "100%",
                    padding: "10px",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <p
                      style={{
                        marginBottom: "8px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Crop the QR Code from your image
                    </p>
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={handleCropComplete}
                      aspect={1}
                      style={{ maxWidth: "100%" }}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={selectedImage}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "40vh",
                          objectFit: "contain",
                        }}
                        onLoad={() => {
                          // Set an initial crop when image loads
                          if (imgRef.current) {
                            const { width, height } = imgRef.current;
                            const size = Math.min(width, height) * 0.7;
                            setCrop({
                              unit: "px",
                              width: size,
                              height: size,
                              x: (width - size) / 2,
                              y: (height - size) / 2,
                            });
                          }
                        }}
                      />
                    </ReactCrop>
                  </div>

                  {completedCrop && croppedImage && (
                    <div style={{ marginBottom: "12px" }}>
                      <p
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                          fontSize: "12px",
                        }}
                      >
                        Cropped Preview:
                      </p>
                      <img
                        src={croppedImage}
                        alt="Cropped QR Code"
                        style={{
                          maxWidth: "120px",
                          maxHeight: "120px",
                          border: "1px solid #ccc",
                          marginBottom: "8px",
                        }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <QrCodeButton
                      onClick={handleScanCroppedImage}
                      disabled={!croppedImage || isExtracting}
                      style={{ padding: "6px 12px", fontSize: "12px" }}
                    >
                      {isExtracting ? "Scanning..." : "Scan Cropped Image"}
                    </QrCodeButton>
                  </div>
                </div>
              )
            )}
          </div>
        </Modal>
      </NavContainer>
    </>
  );
};

export default Header;
