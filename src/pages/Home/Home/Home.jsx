import { useEffect } from 'react';
import SuccessStories from '../../../Dashboard/SuccessStories';
import '../../../index.css';
import Banner from '../Banner/Banner';
import CountupSection from './CountupSection';
import FAQSection from './FAQSection/FAQSection';
import HowItWorks from './HowItWorks/HowItWorks';
import MembershipPlans from './MembershipPlans/MembershipPlans';
import PremiumBanner from './PremiumBanner/PremiumBanner';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
const Home = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'Home';
  }, []);
  return (
    <div>
      <div className="">
        <Banner />
      </div>
      <div>
        <PremiumBanner />
      </div>
      <div>
        <HowItWorks></HowItWorks>
      </div>
      <div>
        <WhyChooseUs></WhyChooseUs>
      </div>
      <div>
        <MembershipPlans></MembershipPlans>
      </div>
      <div>
        <FAQSection></FAQSection>
      </div>
      <div>
        <SuccessStories></SuccessStories>
      </div>
      <div>
        <CountupSection></CountupSection>
      </div>
    </div>
  );
};

export default Home;
