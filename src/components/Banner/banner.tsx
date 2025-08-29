import { useEffect, useState } from "react";
// import AppStore from "../../assets/appsotre.png";
// import PlayStore from "../../assets/playstore.png";
import {
  BannerContainer,
  // BannerContent,
  // DownloadButtons,
  // DownloadImage,
  // DownloadLink,
} from "./banner.styles";
import { Scanner } from "@yudiel/react-qr-scanner";
import Modal from "../Modal/modal";
import { QrCodeData, QrCodeButton } from "../Header/header.styles"; // ✅ reuse styled components
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

interface BannerProps {
  onScanSuccess: (data: string) => void;
}

const Banner: React.FC<BannerProps> = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScanClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      toast.error("Please log in to use the scanner");
      return;
    }

    if (!isMobileDevice()) {
      toast.error("QR scanning is only available on mobile devices");
      return;
    }

    setIsScanning(true);
  };

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const handleScan = (results: any[]) => {
    if (!results || results.length === 0) return;
    const qrData = results[0]?.rawValue?.trim().replace(/\s+/g, "") || "";
    if (!qrData) return;

    console.log("✅ QR Code Detected:", qrData);
    setQrCodeData(qrData);
    setIsModalOpen(true);
    setIsScanning(false); // close scanner overlay
  };

  const handleSubmit = async () => {
    if (!qrCodeData) return;
    setIsProcessing(true);

    try {
      await onScanSuccess(qrCodeData);
      setIsModalOpen(false);
      setQrCodeData(null);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsScanning(false);
      setIsModalOpen(false);
    };
  }, []);

  return (
    <>
      <BannerContainer onClick={handleScanClick}>
        {/* <ScanIconArea onClick={handleScanClick} /> */}

        {/* <BannerContent>
          <DownloadButtons>
            <DownloadLink
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadImage src={PlayStore} alt="Play Store" />
            </DownloadLink>
            <DownloadLink
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadImage src={AppStore} alt="App Store" />
            </DownloadLink>
          </DownloadButtons>
        </BannerContent> */}
      </BannerContainer>

      {/* Scanner Overlay */}
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Scanner
              onScan={handleScan}
              allowMultiple={false}
              components={{ finder: true }}
              styles={{
                container: { width: "100%", height: "auto" },
                video: { width: "100%", height: "auto", objectFit: "cover" },
              }}
            />
          </div>

          <button
            onClick={() => setIsScanning(false)}
            style={{
              marginTop: "20px",
              padding: "9px 20px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Close Scanner
          </button>

          <p style={{ color: "white", marginTop: "10px" }}>
            Point your camera at a QR code to scan
          </p>
        </div>
      )}

      {/* Modal to confirm QR */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setQrCodeData(null);
          setIsProcessing(false);
        }}
      >
        {qrCodeData ? (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              QR Code Extracted Successfully!
            </p>
            <QrCodeData>{qrCodeData}</QrCodeData>
            {isProcessing ? (
              <div style={{ marginTop: "15px" }}>
                <ClipLoader size={30} color="black" />
                <p style={{ marginTop: "10px" }}>Submitting...</p>
              </div>
            ) : (
              <QrCodeButton
                onClick={handleSubmit}
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
    </>
  );
};

export default Banner;
