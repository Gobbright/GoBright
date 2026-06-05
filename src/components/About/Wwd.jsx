import { useEffect, useRef, useState } from "react";
import Mask from "../../assets/img/About/img5.png";

const bullets = [
  { text: "Brand Strategy & Identity Development", bold: false },
  { text: "Logo Design & Visual Branding",         bold: false },
  { text: "Website Design & Development",          bold: true  },
  { text: "Social Media Marketing",                bold: false },
  { text: "Google & Meta Performance Advertising", bold: false },
  { text: "Marketing Automation & CRM Integration",bold: false },
  { text: "Commercial Photography & Videography",  bold: false },
  { text: "IT & Technology Solutions",             bold: false },
  { text: "Interior & Office Branding",            bold: false },
  { text: "Traditional Marketing & Print Solutions",bold: false },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Wwd() {
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
    <section ref={ref} className="bg-[#0d0d0d] py-20 relative overflow-hidden">

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(227,32,40,0.08),transparent_60%)] pointer-events-none" />

      {/* Perspective grid */}
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[45%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(227,32,40,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.5) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">

        {/* Section label */}
        <div
          className="flex items-center justify-center gap-3 mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">What We Do</span>
          <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

          {/* Left - image */}
          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "200ms" }}
          >
            <img
              src={Mask}
              alt="What We Do"
              className="w-full h-full min-h-[320px] object-cover rounded-2xl border border-[#2a2a2a] shadow-[0_0_30px_rgba(227,32,40,0.1)]"
            />
          </div>

          {/* Right - content */}
          <div
            className="transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "350ms" }}
          >
            <h2 className="text-[#e32028] font-bold text-3xl mb-5">What We Do</h2>

            <p className="text-white text-[0.97rem] leading-relaxed mb-4">
              We provide complete end-to-end brand growth solutions:
            </p>

            <p className="text-white text-[0.97rem] leading-relaxed mb-7">
              We specialize in intelligent branding, digital transformation, technology
              development, interior branding, and high-impact content production. Every
              solution we create is tailored based on:
            </p>

            {/* Bullets as Home-style cards */}
            <div className="bg-[#1a1a1a] rounded-2xl px-6 py-5 mb-6 border border-[#2a2a2a] hover:border-[#e32028]/30 transition-colors duration-300">
              <ul className="flex flex-col gap-4">
                {bullets.map(({ text, bold }, i) => (
                  <li
                    key={text}
                    className="flex items-start gap-3 text-white text-[0.93rem]"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(20px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      transitionDelay: `${500 + i * 60}ms`,
                    }}
                  >
                    <StarIcon />
                    <span className={bold ? "font-bold" : "font-normal"}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-white text-[0.97rem] leading-relaxed">
              Our services empower businesses in Trichy and across India to compete
              confidently in both local and global markets.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
