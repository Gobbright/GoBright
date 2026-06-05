import { useEffect, useRef, useState } from "react";
import amico from "../../assets/img/About/img2.png";

const bullets = [
  "Industry behavior",
  "Audience psychology",
  "Competitive landscape",
  "Local market insights (especially Trichy & Tamil Nadu)",
];

const pillars = [
  { label: "Strategy",   desc: "Clear positioning and structured execution planning" },
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
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#111111] py-20 relative overflow-hidden">

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(227,32,40,0.07),transparent_65%)] pointer-events-none" />

      {/* Perspective grid */}
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[45%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(227,32,40,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.5) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">

        {/* Section label */}
        <div
          className="flex items-center justify-center gap-3 mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Who We Are</span>
          <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left - text */}
          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "200ms" }}
          >
            <h2 className="text-[#e32028] font-bold text-3xl mb-5">Who We Are</h2>

            <div className="text-white text-[0.97rem] leading-relaxed mb-6">
              <p>GoBright is more than a marketing agency.</p>
              <p>We are a long-term strategic growth partner</p>
            </div>

            <p className="text-white text-[0.97rem] leading-relaxed mb-7">
              We specialize in intelligent branding, digital transformation, technology
              development, interior branding, and high-impact content production. Every
              solution we create is tailored based on:
            </p>

            {/* Bullets card */}
            <div className="bg-[#1a1a1a] rounded-2xl px-6 py-5 mb-8 border border-[#2a2a2a] hover:border-[#e32028]/30 transition-colors duration-300">
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

            {/* Pillar cards - Home feature card style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {pillars.map(({ label, desc }, i) => (
                <div
                  key={label}
                  className="group bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-2 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(227,32,40,0.12)] cursor-pointer"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(30px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s",
                    transitionDelay: `${400 + i * 120}ms`,
                  }}
                >
                  <p className="text-[#e32028] font-bold text-sm group-hover:text-white transition-colors duration-300">{label}</p>
                  <p className="text-[#888] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <p className="text-white text-[0.97rem] leading-relaxed">
              This integrated 360 degrees approach ensures every project is not just visually
              impressive - but performance-focused and ROI-driven.
            </p>
          </div>

          {/* Right - image */}
          <div
            className="hidden md:flex items-center justify-center transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "350ms" }}
          >
            <img
              src={amico}
              alt="Who We Are"
              className="w-full h-[480px] object-cover rounded-2xl border border-[#2a2a2a] shadow-[0_0_30px_rgba(227,32,40,0.1)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
