import { MediaBlock, RedHeading, SectionLabel, StarList } from "./shared";
import seoImg from "../../../assets/img/whychoose/growth-analytics.jpg";

const seoPoints = [
  "Comprehensive keyword research & global competitor analysis",
  "On-page SEO optimization (meta tags, content structure, internal linking)",
  "Technical SEO (site speed optimization, mobile responsiveness, crawlability & indexing improvements)",
  "High-authority backlink building & digital PR strategies",
  "International SEO & multi-location targeting",
  "SEO-optimized content marketing & blog strategy",
  "Advanced analytics, tracking & performance monitoring",
];

export default function SeoServices() {
  return (
    <section className="pb-28">
      <SectionLabel align="right">SEO Services</SectionLabel>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RedHeading>
          <span className="text-[#e32028]">Best SEO Services in Trichy - Rank Higher</span>{" "}
          on Google & Drive Organic Traffic
        </RedHeading>
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.95fr_1fr]">
          <MediaBlock src={seoImg} alt="SEO growth analytics" />
          <div>
            <h3 className="text-xl font-extrabold text-white">
              Trusted Interior Company Serving Trichy
            </h3>
            <p className="mt-6 text-base font-medium leading-7 text-white">
              At GoBright, we deliver strategic and result-oriented SEO services
              designed to improve your search engine visibility, increase organic
              traffic, and generate consistent enquiries.
            </p>
            <p className="mt-5 text-base font-medium leading-7 text-white">
              Our focus is simple - sustainable rankings, scalable organic growth,
              and measurable business impact.
            </p>
          </div>
        </div>
        <StarList title="Our SEO Services include :" points={seoPoints} className="mt-16">
          We follow ethical, white-hat SEO practices aligned with Google's latest
          algorithm updates. Instead of chasing short-term ranking spikes, we build
          strong SEO foundations that help businesses rank across competitive global markets.
        </StarList>
      </div>
    </section>
  );
}
