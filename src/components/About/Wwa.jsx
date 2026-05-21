// import wwaImg from "../assets/img/wwa.png";
import amico from "../../assets/img/About/amico.png";

const bullets = [
  "Industry behavior",
  "Audience psychology",
  "Competitive landscape",
  "Local market insights (especially Trichy & Tamil Nadu)",
];

const pillars = [
  { label: "Strategy", desc: "Clear positioning and structured execution planning" },
  { label: "Creativity", desc: "Distinctive design and compelling storytelling" },
  { label: "Technology", desc: "Data-driven systems and scalable performance models" },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Wwa() {
  // Professional image for Who We Are section
  const wwaImage = amico;

  return (
    <section className="bg-[#0d0d0d] overflow-hidden relative">

      {/* Red decorative bar */}
      <div className="hidden md:block absolute right-8 top-8 bottom-8 w-24 bg-[#e32028] rounded-[60px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>

          {/* Heading */}
          <h2 className="text-[#e32028] font-bold text-3xl mb-5">Who We Are</h2>

          {/* Intro */}
          <div className="text-white text-[0.97rem] leading-relaxed mb-6">
            <p>GoBright is more than a marketing agency.</p>
            <p>We are a long-term strategic growth partner</p>
          </div>

          <p className="text-white text-[0.97rem] leading-relaxed mb-7">
            We specialize in intelligent branding, digital transformation, technology
            development, interior branding, and high-impact content production. Every
            solution we create is tailored based on:
          </p>

          {/* Dark card */}
          <div className="bg-[#1a1a1a] rounded-2xl px-6 py-5 mb-8">
            <ul className="flex flex-col gap-4 mb-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-white text-[0.95rem]">
                  <StarIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-white text-[0.95rem]">
              Our foundation stands on three powerful pillars:
            </p>
          </div>

          {/* Pillars */}
          <div className="flex flex-col gap-3 mb-8">
            {pillars.map(({ label, desc }) => (
              <p key={label} className="text-white text-[0.97rem] leading-relaxed">
                <span className="font-bold">{label} –</span>{" "}
                <span className="font-normal">{desc}</span>
              </p>
            ))}
          </div>

          {/* Footer text */}
          <p className="text-white text-[0.97rem] leading-relaxed">
            This integrated 360° approach ensures every project is not just visually
            impressive — but performance-focused and ROI-driven.
          </p>
        </div>

        {/* Right — image */}
        <div className="hidden md:flex items-center justify-center pr-32">
          <img src={amico} alt="Who We Are" className="w-full object-contain" />
        </div>

      </div>
    </section>
  );
}
