import IndustryHero from "./Industry_hero";
import Restaurants from "./Restuarnts";
import Sections from "./Sections";
import EndSection from "./End_section";
import digitalMarketingImg from "../../../assets/img/services/digital-marketing.jpg";
import retailImg from "../../../assets/img/services/branding.jpg";
import restaurantImg from "../../../assets/img/services/photography.jpg";
import educationImg from "../../../assets/img/services/tech.jpg";
import healthcareImg from "../../../assets/img/whychoose/data-branding.jpg";
import realEstateImg from "../../../assets/img/whychoose/growth-analytics.jpg";
import corporateImg from "../../../assets/img/whychoose/performance.jpg";

export default function Industries() {
  const images = {
    // Hero section images
    heroImg: digitalMarketingImg,
    retailImg,
    
    // Restaurant section - Food & Hospitality
    restaurantImg,
    educationImg,
    
    // Healthcare & Medical
    healthcareImg,
    
    // Real Estate & Property
    realEstateImg,
    
    // Corporate & Tech
    corporateImg,
  };

  return (
    <main className="service-page min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#0d0d0d_0%,#141414_58%,#111_100%)] text-white">
      <IndustryHero heroImg={images.heroImg} retailImg={images.retailImg} />
      <Restaurants restaurantImg={images.restaurantImg} educationImg={images.educationImg} />
      <Sections healthcareImg={images.healthcareImg} realEstateImg={images.realEstateImg} corporateImg={images.corporateImg} />
      <EndSection />
    </main>
  );
}
