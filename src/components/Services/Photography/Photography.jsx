import PhotoHero from "./Photo_hero";
import VideoGraphy from "./Video_graphy";
import Endcard from "./Endcard";
import photoImg from "../../../assets/img/services/photography.jpg";
import studioImg from "../../../assets/img/services/branding.jpg";
import productionImg from "../../../assets/img/services/digital-marketing.jpg";

export default function Photography() {
  return (
    <main className="service-page min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#1b1b1b_0%,#141414_58%,#171717_100%)] text-white">
      <PhotoHero heroImg={photoImg} productImg={studioImg} corporateImg={productionImg} />
      <VideoGraphy videoImg1={photoImg} videoImg2={productionImg} videoImg3={studioImg} />
      <Endcard supportImg={productionImg} />
    </main>
  );
}
