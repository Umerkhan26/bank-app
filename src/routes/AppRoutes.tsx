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
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const AppRoutes: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/promotion/:id" element={<PromotionDetail />} />
        <Route path="/store/:storeId" element={<Store />} />
        <Route path="/bank-premium/:id" element={<BankPremiumDetail />} />
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
