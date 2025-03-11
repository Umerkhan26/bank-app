import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/home";
import Layout from "../layout";
import Login from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/signup";
import CampaignDetail from "../pages/Campaign Detail/campaindetail";
import PromotionDetail from "../pages/Promotion Detail/promotiondetail";
import BankPremiumDetail from "../pages/Collect Bank Detail/collectbankdetail";
import Store from "../pages/Store/store";
import VerifyEmail from "../pages/Verify Email/verifyemail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/promotion/:id" element={<PromotionDetail />} />
        <Route path="/store/:storeId" element={<Store />} />
        <Route path="/bank-premium/:id" element={<BankPremiumDetail />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/store" element={<Store />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
