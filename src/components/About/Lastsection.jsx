import { useEffect, useRef, useState } from "react";
import amico from "../../assets/img/About/img7.png";

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
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#111111] text-white relative overflow-hidden">

      {/* Perspective grid */}
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[35%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(227,32,40,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.5) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.35,
        }}
      />

      {/* Dot pattern sides */}
      <div className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(227,32,40,0.3) 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }} />
      <div className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(227,32,40,0.3) 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 flex flex-col gap-20">

        {/* -- Mission & Vision -- */}
        <div>
          <div
            className="flex items-center justify-center gap-3 mb-14 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Our Purpose</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Our Mission */}
            <div
              className="group bg-[#1a1a1a] rounded-2xl p-7 flex flex-col gap-5 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,32,40,0.1)] cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s",
                transitionDelay: "200ms",
              }}
            >
              <h2 className="text-[#e32028] font-bold text-2xl">Our Mission</h2>
              <p className="text-[0.95rem] leading-relaxed text-[#cccccc]">
                Our mission is to empower businesses through intelligent branding, creative
                design, digital and traditional promotion, technology development, interior
                branding, and impactful content production - while always putting our family
                first and profit second.
              </p>
              <div className="bg-[#222222] rounded-xl px-5 py-4 border border-[#2e2e2e]">
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
            <div
              className="group bg-[#1a1a1a] rounded-2xl p-7 flex flex-col gap-5 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,32,40,0.1)] cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s",
                transitionDelay: "350ms",
              }}
            >
              <h2 className="text-[#e32028] font-bold text-2xl">Our Vision</h2>
              <p className="text-[0.95rem] leading-relaxed text-[#cccccc]">
                Our vision is to build GoBright into a world-class 360 degrees brand growth company
                powered by Infinite Imagination. We aim to create extraordinary work that
                competes on a global stage and stands alongside the world's leading creative
                and branding agencies.
              </p>
              <div className="bg-[#222222] rounded-xl px-5 py-4 border border-[#2e2e2e]">
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
                We believe global success can be built from anywhere - with imagination,
                integrity, and strong leadership.
              </p>
            </div>
          </div>
        </div>

        {/* -- Why Choose GoBright -- */}
        <div>
          <div
            className="flex items-center justify-center gap-3 mb-14 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "100ms" }}
          >
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Why GoBright</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>

          <h2
            className="text-white font-bold text-2xl sm:text-3xl text-center mb-10 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}
          >
            Why Choose <span className="text-[#e32028]">GoBright</span> in Trichy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* Left - card */}
            <div
              className="group bg-[#1a1a1a] rounded-2xl px-6 py-6 flex flex-col gap-4 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,32,40,0.1)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s",
                transitionDelay: "300ms",
              }}
            >
              <ul className="flex flex-col gap-4">
                {whyBullets.map((b, i) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[0.93rem] text-[#cccccc]"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(20px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      transitionDelay: `${400 + i * 80}ms`,
                    }}
                  >
                    <StarIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[0.93rem] leading-relaxed text-[#cccccc] mt-2">
                We align creativity with business objectives to ensure sustainable growth
                - not short-term hype.
              </p>
            </div>

            {/* Right - image */}
            <div
              className="relative overflow-hidden rounded-2xl min-h-72 border border-[#2a2a2a] hover:border-[#e32028]/40 transition-colors duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s",
                transitionDelay: "450ms",
              }}
            >
              <img
                src={amico}
                alt="Why Choose GoBright"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute right-0 top-6 bottom-6 w-16 bg-[#e32028] rounded-l-[50px] z-10" />
            </div>
          </div>
        </div>

        {/* -- Serving Trichy -- */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "200ms" }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Our Reach</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>
          <h2 className="text-[#e32028] font-bold text-2xl mb-5 text-center">
            Serving Trichy. Building Brands for the World
          </h2>
          <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-[#cccccc] text-center max-w-2xl mx-auto">
            <p>We proudly serve businesses across Trichy, Tamil Nadu, and expanding markets across India.</p>
            <p>Our goal is not just local visibility - but global positioning.</p>
            <p>At GoBright, we transform ideas into brands that lead, inspire, and create lasting impact.</p>
          </div>
        </div>

        {/* -- CTA Banner - Home style -- */}
        <div
          className="bg-[#0d0d0d] py-16 text-center rounded-2xl border border-[#1a1a1a] relative overflow-hidden transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "300ms" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#e32028]/5 via-transparent to-[#e32028]/5 pointer-events-none rounded-2xl" />
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3 relative z-10">
            Let's Build Something <span className="text-[#e32028]">Extraordinary</span>
          </h2>
          <p className="text-[#666] text-sm mb-8 max-w-md mx-auto relative z-10">
            Whether you're launching a new venture, rebranding, or scaling -
            GoBright is ready to partner with you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center relative z-10">
            <a
              href="/contact"
              className="inline-block bg-[#e32028] text-white px-8 py-3 rounded-full font-semibold text-[0.95rem] hover:bg-[#c41c22] transition-colors duration-200 no-underline shadow-[0_0_20px_rgba(227,32,40,0.4)] hover:shadow-[0_0_35px_rgba(227,32,40,0.6)]"
            >
              Start Your Growth Journey
            </a>
            <a
              href="/services"
              className="inline-block border border-[#444] text-[#cccccc] px-8 py-3 rounded-full font-semibold text-[0.95rem] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200 no-underline"
            >
              Explore Services
            </a>
          </div>
          <p className="text-[#555] text-xs mt-6 font-bold relative z-10">
            GoBright - Transforming Ideas into Brands that Lead.
          </p>
        </div>

      </div>
    </section>
  );
}
