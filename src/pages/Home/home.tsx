import Banner from "../../components/Banner/banner";
import Campaigns from "../../components/Campaign/campaign";
import CollectBanksPremium from "../../components/CollectBank/collectbank";
import Header from "../../components/Header/header";
import UpcomingPromotions from "../../components/Promotion/prmotion";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Banner />
      <Campaigns />
      <UpcomingPromotions />
      <CollectBanksPremium />
    </>
  );
};

export default Home;
