import PhotoHero from "./Photo_hero";
import VideoGraphy from "./Video_graphy";
import Endcard from "./Endcard";
import photoHeroImg from "../../../assets/img/services/service-4/img-1.png";
import productImg from "../../../assets/img/services/service-4/img-2.png";
import corporateImg from "../../../assets/img/services/service-4/img-3.png";
import videoImg1 from "../../../assets/img/services/service-4/img-4.png";
import videoImg2 from "../../../assets/img/services/service-4/img-5.png";
import videoImg3 from "../../../assets/img/services/service-4/img-6.png";
import supportImg from "../../../assets/img/services/service-4/img-7.png";

export default function Photography() {
  return (
    <main className="service-page min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#1b1b1b_0%,#141414_58%,#171717_100%)] text-white">
      <PhotoHero heroImg={photoHeroImg} productImg={productImg} corporateImg={corporateImg} />
      <VideoGraphy videoImg1={videoImg1} videoImg2={videoImg2} videoImg3={videoImg3} />
      <Endcard supportImg={supportImg} />
    </main>
  );
}
