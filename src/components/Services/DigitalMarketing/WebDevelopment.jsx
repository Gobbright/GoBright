import { MediaBlock, RedHeading, SectionLabel, StarList } from "./shared";
import webImg from "../../../assets/img/services/tech.jpg";

const build = [
  "SEO-optimized business websites",
  "Corporate websites for growing brands",
  "E-commerce websites for online sales",
  "High-converting landing pages",
  "Custom web applications",
];

const qualities = [
  "Mobile responsive",
  "Speed optimized",
  "Search engine structured",
  "Conversion-focused",
  "Globally scalable",
];

export default function WebDevelopment() {
  return (
    <section className="pb-28">
      <SectionLabel align="right">Web Development</SectionLabel>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RedHeading>
          <span className="text-[#e32028]">Best</span> Web Design & Development{" "}
          <span className="text-[#e32028]">Company in Trichy for</span>
          <br /> High-Performance Business Websites
        </RedHeading>
        <p className="mt-12 text-base font-medium leading-7 text-white">
          At GoBright, we are a performance-driven web design and development company
          in Trichy helping businesses build high-converting, SEO-optimized, and
          scalable websites. We create strategic digital platforms that not only look
          professional but also generate consistent leads, enquiries, and revenue.
        </p>
        <MediaBlock className="mt-14" src={webImg} alt="Web development workspace" />
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <StarList title="We Build :" points={build} />
          <StarList title="Every Website is :" points={qualities} />
        </div>
        <div className="mx-auto mt-28 h-px max-w-6xl bg-[#e32028]" />
      </div>
    </section>
  );
}
