import { MediaBlock, RedHeading, SectionLabel, StarList } from "./shared";
import performanceImg from "../../../assets/img/whychoose/performance.jpg";

const services = [
  "Strategic lead generation campaigns",
  "Meta Ads (Facebook & Instagram Ads)",
  "Google Ads (Search, Display & Remarketing)",
  "Advanced audience targeting & retargeting",
  "Conversion tracking & analytics setup",
  "Landing page optimization",
  "ROI-focused campaign scaling",
  "Conversion tracking & analytics setup",
];

const outcomes = [
  "Generate high-quality, sales-ready leads",
  "Reduce cost per acquisition",
  "Improve conversion rates",
  "Maximize ad spend efficiency",
  "Build a predictable lead generation system",
];

export default function PerformanceMarketing() {
  return (
    <section className="pb-28">
      <SectionLabel>Performance Marketing</SectionLabel>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RedHeading>
          <span className="text-[#e32028]">Best</span> Performance Marketing{" "}
          <span className="text-[#e32028]">
            Agency in Trichy for High-Quality Lead Generation
          </span>
        </RedHeading>
        <div className="mt-12">
          <h3 className="text-xl font-extrabold text-white">
            Our Performance Marketing Approach
          </h3>
          <p className="mt-5 text-base font-medium leading-7 text-white">
            At GoBright, we believe marketing should generate measurable revenue -
            not just likes or impressions. Our performance marketing strategies are
            built to attract the right audience, convert them into qualified leads,
            and directly contribute to your business growth.
          </p>
        </div>
        <MediaBlock className="mt-14" src={performanceImg} alt="Performance marketing analytics" />
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <StarList title="Our performance marketing services include:" points={services}>
            We don't just run advertisements - we create structured marketing funnels
            that move prospects from awareness to enquiry and from enquiry to conversion.
          </StarList>
          <StarList title="Our data-driven campaigns help you:" points={outcomes}>
            GoBright delivers performance marketing solutions that directly strengthen
            your sales pipeline and support long-term business growth.
          </StarList>
        </div>
      </div>
    </section>
  );
}
