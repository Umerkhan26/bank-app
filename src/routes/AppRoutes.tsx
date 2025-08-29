import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/home";
import Layout from "../layout";
import CampaignDetail from "../pages/Campaign Detail/campaindetail";
import PromotionDetail from "../pages/Promotion Detail/promotiondetail";
import BankPremiumDetail from "../pages/Collect Bank Detail/collectbankdetail";
import Store from "../pages/Store/store";
import VerifyEmail from "../pages/Verify Email/verifyemail";
import ProfileMenu from "../pages/Profile/profile";
import UserHistory from "../components/User History/userhistory";
import ReceiptPage from "../pages/Collect Bank Detail/ReceiptPage";
import OfferDetails from "../components/Bank Offer/OfferDetails";
import BankPremiumsList from "../components/CollectBank/BankPremiumsList";
import NoPromotion from "../components/Promotion/NoPromotion";
import Privacy from "../components/privacyandPolicy/Privacy";
import TermsConditions from "../components/Terms/TermsConditions";
import FAQ from "../components/Faq/Faq";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/faq" element={<FAQ />} />

        <Route index element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/promotion/:id" element={<PromotionDetail />} />
        <Route path="/store/:storeId" element={<Store />} />
        <Route path="/bank-premium/:id" element={<BankPremiumDetail />} />
        <Route path="/receipt" element={<ReceiptPage />} />
        <Route path="/offer-details/:offerId" element={<OfferDetails />} />
        <Route path="/bank-premiums-list" element={<BankPremiumsList />} />
        <Route path="/no-promotion" element={<NoPromotion />} />
        {/* <Route path="/register" element={<SignUp />} /> */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/store" element={<Store />} />
        <Route path="/profile" element={<ProfileMenu />}>
          <Route path="user-history" element={<UserHistory />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
