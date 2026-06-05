import socialImg from "../../../assets/img/services/service2/img2.png";
import { MediaBlock, RedHeading, SectionLabel, StarList } from "./shared";

const management = [
  "Content calendar planning",
  "Creative post design & captions",
  "Reels & short-form video strategy",
  "Audience engagement & community management",
  "Monthly performance analysis",
];

const ads = [
  "Facebook & Instagram Ads",
  "Lead generation campaigns",
  "Remarketing campaigns",
  "Conversion-focused ad creatives",
  "Sales funnel integration",
];

export default function SocialMediaMarketing() {
  return (
    <section className="pb-28">
      <SectionLabel align="right">Social Media Marketing</SectionLabel>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RedHeading>
          <span className="text-[#e32028]">Best</span> Social Media Marketing{" "}
          <span className="text-[#e32028]">Services in Trichy - Build Brand,</span>
          <br /> Engage Audience & Generate Leads
        </RedHeading>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-extrabold text-[#e32028]">
              Strategic Social Media Management
            </h3>
            <p className="mt-3 max-w-xl text-base font-medium leading-7 text-white">
              We create customized strategies for every business based on industry,
              audience behaviour, and competition.
            </p>
            <StarList title="Our services include:" points={management} className="mt-8" />
          </div>
          <div className="space-y-5 text-base font-medium leading-7 text-white">
            <p>
              At GoBright, we provide result-driven{" "}
              <span className="font-bold text-[#e32028]">Social Media Marketing Services in Trichy</span>{" "}
              that help businesses increase visibility, attract the right audience,
              and convert followers into paying customers.
            </p>
            <p>
              We don't just post content - we build strategic digital growth systems
              combining branding, performance ads, precise targeting, and data-driven
              optimization.
            </p>
            <p>
              Our expertise is proven. In the automobile industry alone, we generated{" "}
              <span className="font-bold text-[#e32028]">6000+ qualified leads through Meta Ads</span>,
              delivering real showroom enquiries and sales-ready prospects.
            </p>
          </div>
        </div>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-[0.78fr_1fr]">
          <MediaBlock compact className="mx-auto w-full max-w-[430px]" src={socialImg} alt="Social media advertising campaign" />
          <div>
            <h3 className="text-xl font-extrabold text-[#e32028]">
              Social Media Advertising & Lead Generation
            </h3>
            <p className="mt-2 text-base font-medium text-white">
              Organic growth is powerful. But paid advertising accelerates results.
            </p>
            <StarList title="We run high-converting:" points={ads} className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
