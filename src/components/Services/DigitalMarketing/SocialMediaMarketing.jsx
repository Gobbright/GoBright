import socialImg from "../../../assets/services/Digital-Marketing/GMG 1080 x 1080 1.png";
import LeadForm from "./LeadForm";
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

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <LeadForm />
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -right-7 top-[-48px] h-[250px] w-[92px] rounded-br-[46px] rounded-tr-[46px] bg-[#e32028]" />
            <img
              src={socialImg}
              alt="Social media marketing concept"
              className="relative z-10 aspect-square w-full rounded-sm object-cover object-center shadow-[0_26px_80px_rgba(0,0,0,0.38)]"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
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

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <MediaBlock />
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
