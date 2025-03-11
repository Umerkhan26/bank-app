import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/auth";
import { toast, ToastContainer } from "react-toastify";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      handleEmailVerification(token);
    } else {
      toast.error("Invalid verification link.");
      setLoading(false);
    }
  }, [token]);

  const handleEmailVerification = async (token: string) => {
    try {
      await verifyEmail(token);
      toast.success("Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/"), 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Verification failed: ${error.message}`);
      } else {
        // toast.error("Verification failed. Token may be invalid or expired.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <ToastContainer />
      {loading ? (
        <p>Verifying your email...</p>
      ) : (
        <p>Check the notification above.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
