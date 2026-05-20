import { MediaBlock, RedHeading, SectionLabel, StarList } from "./shared";

const points = [
  "Profile optimization",
  "Authority-driven content strategy",
  "Thought leadership positioning",
  "Video branding concepts",
  "Organic growth techniques",
];

export default function PersonalBranding() {
  return (
    <section className="pb-28">
      <SectionLabel>Personal Branding</SectionLabel>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RedHeading>
          <span className="text-[#e32028]">Best</span> Personal Branding{" "}
          <span className="text-[#e32028]">Services in Trichy for Entrepreneurs & Business Leaders</span>
        </RedHeading>
        <h3 className="mt-8 text-center text-2xl font-extrabold text-white">
          Personal Branding for Entrepreneurs & Business Owners
        </h3>
        <p className="mx-auto mt-5 max-w-3xl text-center text-base font-medium leading-7 text-white">
          Social media is powerful when it builds authority. We help entrepreneurs,
          real estate professionals, automobile dealers, coaches, and business owners
          in Trichy develop strong personal brands that attract trust and inbound leads.
        </p>
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <StarList title="Our personal branding services include:" points={points} />
          <MediaBlock />
        </div>
      </div>
    </section>
  );
}
