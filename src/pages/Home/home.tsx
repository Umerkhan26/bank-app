import { toast } from "react-toastify";
import BankOffer from "../../components/Bank Offer/BankOffer";
import Banner from "../../components/Banner/banner";
// import CampaignSteps from "../../components/Campaign Steps/campaignstep";
import Campaigns from "../../components/Campaign/campaign";
import CollectBanksPremium from "../../components/CollectBank/collectbank";
import UpcomingPromotions from "../../components/Promotion/promotion";
import { scanQRCode } from "../../services/qrcode";
import { useDispatch } from "react-redux";
import { updatePoints } from "../../redux/slices/auth";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const handleScanSuccess = async (qrData: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in again");
        return;
      }

      // Extract last 6 digits as before
      const lastSixDigits = qrData.trim().replace(/\s+/g, "").slice(-6);

      const result = await scanQRCode(token, lastSixDigits);
      toast.success("Congratulations! You have earned 20 points 🎯");

      // Update points in Redux store
      const totalPoints = Array.isArray(result.userPoints)
        ? result.userPoints.reduce(
            (sum: number, item: { points?: number }) =>
              sum + (item.points || 0),
            0
          )
        : result.userPoints;

      dispatch(updatePoints(totalPoints));

      console.log("Scan result:", result);
    } catch (err: any) {
      console.error("QR Scan API error:", err);

      const errorMsg =
        err?.response?.data?.message || "Failed to scan QR code.";
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <Banner onScanSuccess={handleScanSuccess} />
      {/* <CampaignSteps /> */}
      <Campaigns />
      <CollectBanksPremium />
      <UpcomingPromotions />
      <BankOffer />
    </>
  );
};

export default Home;
