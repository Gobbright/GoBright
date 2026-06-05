import IndustryHero from "./Industry_hero";
import Restaurants from "./Restuarnts";
import Sections from "./Sections";
import digitalMarketingImg from "../../../assets/img/Industries/img1.png";
import retailImg from "../../../assets/img/Industries/img2.png";
import restaurantImg from "../../../assets/img/Industries/img3.png";
import educationImg from "../../../assets/img/Industries/img4.png";
import healthcareImg from "../../../assets/img/Industries/img5.png";
import realEstateImg from "../../../assets/img/Industries/img6.png";
import corporateImg from "../../../assets/img/Industries/img7.png";

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
    </main>
  );
}
