import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faTimes } from "@fortawesome/free-solid-svg-icons";
import Login from "../../pages/SignIn/SignIn";
import Modal from "../Modal/modal";
import SignUp from "../../pages/SignUp/signup";
import { Link, useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import { scanQRCode } from "../../services/qrcode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/auth";
import logo from "../../assets/bank_al_falah2.webp";

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
} from "./header.styles";

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
  const userId = localStorage.getItem("userId");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userPointsState, setUserPointsState] = useState<number>(
    parseInt(localStorage.getItem(`userPoints_${userId}`) || "0", 10)
  );

  const dispatch = useDispatch();
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

          const qrData = await extractQRCode(imageData);
          if (qrData) {
            console.log("Extracted QR Code Data:", qrData);
            setQrCodeData(qrData);
            setIsImageModalOpen(true);
          } else {
            alert("No QR code found in the image.");
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const extractQRCode = async (imageSrc: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageSrc;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return resolve(null);

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        const imageData = context.getImageData(0, 0, image.width, image.height);
        const code = jsQR(imageData.data, image.width, image.height);
        if (code) {
          const qrCode = code.data.split("/").pop() || null;
          resolve(qrCode);
        } else {
          resolve(null);
        }
      };

      image.onerror = () => resolve(null);
    });
  };

  useEffect(() => {
    console.log("Updated userPointsState:", userPointsState);
  }, [userPointsState]);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
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

    try {
      const result = await scanQRCode(token, qrCodeData);
      setScanResult(result);

      // setUserPointsState(result.userPoints);
      // localStorage.setItem(
      //   `userPoints_${userId}`,
      //   result.userPoints.toString()
      // );

      alert("QR Code scanned successfully!");
      setIsImageModalOpen(false);
    } catch (error) {
      console.error("Error scanning QR code:", error);
      alert("Failed to scan QR code. Please try again.");
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
    navigate("/store");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <NavContainer>
        <MobileToggleButton onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </MobileToggleButton>

        <Link to="/">
          <img
            src={logo}
            alt="BankApp Logo"
            style={{
              maxHeight: "50px",
              width: "auto",
              marginLeft: "25px",
              cursor: "pointer",
            }}
          />
        </Link>

        <RightActions>
          <StoreButton onClick={handlestoreClick}>Store</StoreButton>
          {!isLoggedIn ? (
            <Button onClick={handleLoginClick}>Login</Button>
          ) : (
            <span>Welcome, {username}!</span>
          )}
          <Button onClick={handleUploadClick}>Upload A Qrcode</Button>
          <PointsDisplay>{userPoints} points</PointsDisplay>

          <NotificationDropdown>
            <NotificationButton>
              <FontAwesomeIcon icon={faBell} />
              <NotificationBadge>1</NotificationBadge>
            </NotificationButton>

            <DropdownMenu>
              <DropdownItem>
                Support Team posted a message in Box set (existing design) $40
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
                  e.currentTarget.nextElementSibling?.removeAttribute("hidden");
                }}
              />
              <ProfileFallback>
                <span>UF</span>
              </ProfileFallback>
            </ProfileButton>

            <DropdownMenu>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
            </DropdownMenu>
          </ProfileDropdown>
        </RightActions>

        <MobileMenuOverlay
          isOpen={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        />
        <MobileMenu isOpen={isMobileMenuOpen}>
          <StoreButton onClick={handlestoreClick}>Store</StoreButton>
          {!isLoggedIn ? (
            <Button onClick={handleLoginClick}>Login</Button>
          ) : (
            <span>Welcome, {username}!</span>
          )}
          <Button onClick={handleUploadClick}>Upload A Qrcode</Button>
          <PointsDisplay>{userPoints} points</PointsDisplay>
        </MobileMenu>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {isLogin ? (
            <Login
              onClose={handleCloseModal}
              onSwitchToSignUp={() => setIsLogin(false)}
            />
          ) : (
            <SignUp
              onClose={handleCloseModal}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </Modal>

        <Modal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
        >
          {qrCodeData ? (
            <div>
              <QrCodeData>{qrCodeData}</QrCodeData>
              <QrCodeButton onClick={handleScanSubmit}>Submit</QrCodeButton>
            </div>
          ) : (
            selectedImage && <ImagePreview src={selectedImage} alt="QR Code" />
          )}
        </Modal>
      </NavContainer>
    </>
  );
};

export default Header;
