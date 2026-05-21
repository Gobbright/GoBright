import amico from "../../assets/img/About/amico.png";

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const missionBeliefs = [
  "True success is built on strong values",
  "Collaboration creates sustainable growth",
  "Long-term relationships matter more than short-term gains",
  "Family First. Profit Second. Purpose Always.",
];

const visionBullets = [
  "Build globally competitive brands from Trichy",
  "Deliver international-standard creative excellence",
  "Develop scalable, performance-driven growth systems",
  "Foster a culture where our team grows together",
];

const whyBullets = [
  "Industry-specific growth strategies SEO services",
  "Deep understanding of Trichy market behavior",
  "ROI-focused performance campaigns",
  "Transparent reporting with measurable metrics",
  "Creative + technical expert team",
  "Long-term partnership approach",
];

export default function Lastsection() {
  return (
    <section className="bg-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex flex-col gap-16">

        {/* ── Mission & Vision ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Our Mission */}
          <div className="bg-[#161616] rounded-2xl p-7 flex flex-col gap-5">
            <h2 className="text-[#e32028] font-bold text-2xl">Our Mission</h2>
            <p className="text-[0.95rem] leading-relaxed text-[#cccccc]">
              Our mission is to empower businesses through intelligent branding, creative
              design, digital and traditional promotion, technology development, interior
              branding, and impactful content production — while always putting our family
              first and profit second.
            </p>
            <div className="bg-[#222222] rounded-xl px-5 py-4">
              <p className="font-semibold text-sm mb-3">We believe:</p>
              <ul className="flex flex-col gap-3">
                {missionBeliefs.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[0.9rem] text-[#cccccc]">
                    <StarIcon />
                    <span className={b.includes("Family First") ? "font-bold text-white" : ""}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[0.95rem] leading-relaxed text-[#cccccc]">
              Creating global success through Infinite Imagination and a family-first culture.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-[#161616] rounded-2xl p-7 flex flex-col gap-5">
            <h2 className="text-[#e32028] font-bold text-2xl">Our Vision</h2>
            <p className="text-[0.95rem] leading-relaxed text-[#cccccc]">
              Our vision is to build GoBright into a world-class 360° brand growth company
              powered by Infinite Imagination. We aim to create extraordinary work that
              competes on a global stage and stands alongside the world's leading creative
              and branding agencies.
            </p>
            <div className="bg-[#222222] rounded-xl px-5 py-4">
              <ul className="flex flex-col gap-3">
                {visionBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[0.9rem] text-[#cccccc]">
                    <StarIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[0.95rem] leading-relaxed text-[#cccccc]">
              We believe global success can be built from anywhere — with imagination,
              integrity, and strong leadership.
            </p>
          </div>
        </div>

        {/* ── Why Choose GoBright in Trichy ── */}
        <div>
          <h2 className="text-[#e32028] font-bold text-2xl mb-8">Why Choose GoBright in Trichy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* Left — card */}
            <div className="bg-[#161616] rounded-2xl px-6 py-6 flex flex-col gap-4">
              <ul className="flex flex-col gap-4">
                {whyBullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[0.93rem] text-[#cccccc]">
                    <StarIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[0.93rem] leading-relaxed text-[#cccccc] mt-2">
                We align creativity with business objectives to ensure sustainable growth
                — not short-term hype.
              </p>
            </div>

            {/* Right — image + red bar */}
            <div className="relative overflow-hidden rounded-2xl min-h-72">
              <img
                src={amico}
                alt="Why Choose GoBright"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute right-0 top-6 bottom-6 w-16 bg-[#e32028] rounded-l-[50px] z-10" />
            </div>
          </div>
        </div>

        {/* ── Serving Trichy ── */}
        <div>
          <h2 className="text-[#e32028] font-bold text-2xl mb-5">
            Serving Trichy. Building Brands for the World
          </h2>
          <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-[#cccccc]">
            <p>We proudly serve businesses across Trichy, Tamil Nadu, and expanding markets across India.</p>
            <p>Our goal is not just local visibility — but global positioning.</p>
            <p>At GoBright, we transform ideas into brands that lead, inspire, and create lasting impact.</p>
          </div>
        </div>

        {/* ── Let's Build Something Extraordinary ── */}
        <div className="pb-8 border-b border-[#2a2a2a]">
          <h2 className="text-[#e32028] font-bold text-2xl mb-5">
            Let's Build Something Extraordinary
          </h2>
          <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-[#cccccc] max-w-lg">
            <p>
              Whether you're launching a new venture, rebranding your business, or scaling
              operations, GoBright is ready to partner with you.
            </p>
            <p>Together, let's build a brand that stands out — and stands strong.</p>
            <p className="font-bold text-white">GoBright – Transforming Ideas into Brands that Lead.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
