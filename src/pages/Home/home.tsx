import Banner from "../../components/Banner/banner";
import CampaignSteps from "../../components/Campaign Steps/campaignstep";
import Campaigns from "../../components/Campaign/campaign";
import CollectBanksPremium from "../../components/CollectBank/collectbank";
import UpcomingPromotions from "../../components/Promotion/promotion";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <CampaignSteps />
      <Campaigns />
      <UpcomingPromotions />
      <CollectBanksPremium />
    </>
  );
};

export default Home;
