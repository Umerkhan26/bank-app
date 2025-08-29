import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  ReceiptContainer,
  ReceiptTitle,
  ReceiptInfo,
  Label,
  Value,
  DownloadButton,
  BackButton,
} from "./ReceiptPage.styles";
import Modal from "../../components/Modal/PremiumModal";

const ReceiptPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redemptionData = location.state?.redemptionData;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!redemptionData) {
    return <div>No receipt data available.</div>;
  }

  useEffect(() => {
    if (redemptionData) {
      setIsPopupOpen(true);
    }
  }, [redemptionData]);

  const { bankPremium, message, receipt, user, userHistory } = redemptionData;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Redemption Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Message: ${message}`, 20, 40);
    doc.text(`Receipt Code: ${receipt.code}`, 20, 50);
    doc.text(`Status: ${receipt.status}`, 20, 60);
    doc.text(`Premium Title: ${bankPremium.title}`, 20, 70);
    doc.text(`Points Required: ${bankPremium.points_required}`, 20, 80);
    doc.text(`Points Used: ${userHistory.points_used}`, 20, 90);
    doc.text(`Enrolled Users: ${bankPremium.enrolled_users.length}`, 20, 100);
    doc.text(`Total Redemptions: ${bankPremium.redemptions.length}`, 20, 110);
    doc.text(`Brand ID: ${bankPremium.brand}`, 20, 120);
    doc.text(`User: ${user.username}`, 20, 130);
    doc.text(`User ID: ${user.userId}`, 20, 140);
    doc.text(`User Brand ID: ${user.brandId}`, 20, 150);
    doc.text(`Remaining Points: ${user.remaining_brand_points}`, 20, 160);
    doc.text(`Transaction Type: ${userHistory.type}`, 20, 170);
    doc.text(`Description: ${userHistory.description}`, 20, 180);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 190);
    doc.save(`receipt_${receipt.code}.pdf`);
  };

  return (
    <>
      <ReceiptContainer>
        <ReceiptTitle>Redemption Receipt</ReceiptTitle>
        <ReceiptInfo>
          <Label>Message:</Label>
          <Value>{message}</Value>
          <Label>Receipt Code:</Label>
          <Value>{receipt.code}</Value>
          <Label>Status:</Label>
          <Value>{receipt.status}</Value>
          <Label>Premium Title:</Label>
          <Value>{bankPremium.title}</Value>
          <Label>Points Required:</Label>
          <Value>{bankPremium.points_required}</Value>
          <Label>Points Used:</Label>
          <Value>{userHistory.points_used}</Value>
          <Label>Enrolled Users:</Label>
          <Value>{bankPremium.enrolled_users.length}</Value>
          <Label>Total Redemptions:</Label>
          <Value>{bankPremium.redemptions.length}</Value>
          <Label>Brand ID:</Label>
          <Value>{bankPremium.brand}</Value>
          <Label>User:</Label>
          <Value>{user.username}</Value>
          <Label>User ID:</Label>
          <Value>{user.userId}</Value>
          <Label>User Brand ID:</Label>
          <Value>{user.brandId}</Value>
          <Label>Remaining Points:</Label>
          <Value>{user.remaining_brand_points}</Value>
          <Label>Transaction Type:</Label>
          <Value>{userHistory.type}</Value>
          <Label>Description:</Label>
          <Value>{userHistory.description}</Value>
          <Label>Date:</Label>
          <Value>{new Date().toLocaleString()}</Value>
        </ReceiptInfo>
        <DownloadButton onClick={handleDownload}>
          Download Receipt
        </DownloadButton>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </ReceiptContainer>

      <Modal isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <h4 style={{ whiteSpace: "nowrap", marginBottom: "10px" }}>
            ✅ Redeem Successful!
          </h4>

          <p style={{ marginTop: "10px" }}>
            Thank you for redeeming this premium. Please visit{" "}
            <b>Banks Barbados Breweries</b> at <b>Newton Christ Church</b> on
            Tuesday, Wednesday, or Thursday between <b>10 am to 2 pm</b> to
            collect your premium.
          </p>
          <p>
            Please show your receipt code to the team when collecting your item:{" "}
            <b>{receipt.code}</b>
          </p>
          <button
            onClick={() => setIsPopupOpen(false)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ReceiptPage;
