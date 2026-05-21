import { useEffect, useRef, useState } from "react";
import brandingImg from "../../../assets/img/services/branding.jpg";
import marketingImg from "../../../assets/img/services/digital-marketing.jpg";
import techImg from "../../../assets/img/services/tech.jpg";
import photoImg from "../../../assets/img/services/photography.jpg";
import otherImg from "../../../assets/img/services/other-services.jpg";

const services = [
  {
    label: "Branding & Identity",
    desc: "Build a brand that speaks before you do",
    alt: "Branding and brand identity design service",
    img: brandingImg,
    gradient: "from-[#e32028]/20 to-[#e32028]/5",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 6L6 16v16l18 10 18-10V16L24 6z" stroke="#e32028" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M24 6v36M6 16l18 10 18-10" stroke="#e32028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="26" r="4" fill="#e32028" fillOpacity="0.3" stroke="#e32028" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Digital Marketing",
    desc: "Reach the right audience at the right time",
    alt: "Digital marketing strategy and campaigns",
    img: marketingImg,
    gradient: "from-[#e32028]/20 to-[#e32028]/5",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="#e32028" strokeWidth="2"/>
        <path d="M14 24h20M24 14v20" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 17l14 14M31 17L17 31" stroke="#e32028" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
        <circle cx="24" cy="24" r="5" fill="#e32028" fillOpacity="0.2" stroke="#e32028" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "IT & Tech Solution",
    desc: "Smart tech that powers your business growth",
    alt: "IT and technology solutions for business",
    img: techImg,
    gradient: "from-[#e32028]/20 to-[#e32028]/5",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="36" height="24" rx="3" stroke="#e32028" strokeWidth="2"/>
        <path d="M16 42h16M24 34v8" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 22l5 5 10-10" stroke="#e32028" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Photography & Videography",
    desc: "Visual stories that captivate and convert",
    alt: "Professional photography and videography",
    img: photoImg,
    gradient: "from-[#e32028]/20 to-[#e32028]/5",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="14" width="32" height="24" rx="3" stroke="#e32028" strokeWidth="2"/>
        <circle cx="20" cy="26" r="7" stroke="#e32028" strokeWidth="2"/>
        <circle cx="20" cy="26" r="3" fill="#e32028" fillOpacity="0.3" stroke="#e32028" strokeWidth="1.5"/>
        <path d="M36 20l8-5v22l-8-5V20z" stroke="#e32028" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 18h4" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Other Services",
    desc: "Tailored solutions for every business need",
    alt: "Other creative business services",
    img: otherImg,
    gradient: "from-[#e32028]/20 to-[#e32028]/5",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4l5.5 10h11l-9 8.5 3.5 11L24 28l-11 5.5 3.5-11L7.5 14H18.5L24 4z" stroke="#e32028" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="24" cy="20" r="4" fill="#e32028" fillOpacity="0.2" stroke="#e32028" strokeWidth="1.5"/>
        <path d="M24 34v10M18 40h12" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
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
    <section ref={ref} className="relative bg-[#0a0a0a] py-20 overflow-hidden">

      {/* Red perspective grid */}
      <div
        style={{
          position: "absolute", bottom: 0, left: "-20%", right: "-20%", height: "60%",
          backgroundImage: `linear-gradient(rgba(227,32,40,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.8) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.7, pointerEvents: "none",
        }}
      />

      {/* Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#e32028]/8 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">

        {/* Title */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">What We Do</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Services We <span className="text-[#e32028]">Provide</span>
          </h2>
          <p className="text-[#555] text-sm mt-3 max-w-md mx-auto">Everything your brand needs to grow — under one roof.</p>
        </div>

        {/* Cards */}
        <div className="flex items-end justify-center gap-4 flex-wrap md:flex-nowrap">
          {services.map((s, i) => {
            const isCenter = i === 2;
            const isHovered = hovered === i;
            return (
              <div
                key={s.label}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex-shrink-0 cursor-pointer transition-all duration-400"
                style={{
                  width: isCenter ? "210px" : "178px",
                  height: isCenter ? "330px" : "280px",
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? isHovered ? "scale(1.1) translateY(-8px)" : "scale(1) translateY(0)"
                    : "translateY(50px)",
                  transition: "opacity 0.6s ease, transform 0.35s ease, box-shadow 0.35s ease",
                  transitionDelay: visible ? `${i * 100}ms` : "0ms",
                  borderRadius: "20px",
                  boxShadow: isHovered ? "0 0 35px rgba(227,32,40,0.4), 0 20px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
                  zIndex: isHovered ? 20 : isCenter ? 10 : 5,
                }}
              >
                {/* Card bg */}
                <div className={`absolute inset-0 rounded-[20px] bg-gradient-to-b ${s.gradient} border ${isHovered ? "border-[#e32028]/60" : "border-[#2a2a2a]"} transition-colors duration-300`} />
                <div className="absolute inset-0 rounded-[20px] bg-[#161616]/90" />

                {/* Red top line */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] bg-[#e32028] rounded-full transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-30"}`} />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-between p-6 text-center">
                  {/* Image with red/gray treatment */}
                  <div
                    className="w-full rounded-xl overflow-hidden"
                    style={{ height: isCenter ? "158px" : "136px" }}
                  >
                    <img
                      src={s.img}
                      alt={s.alt}
                      className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                      style={{
                        filter: isHovered
                          ? "grayscale(20%) sepia(60%) saturate(200%) hue-rotate(320deg) brightness(0.8)"
                          : "grayscale(80%) sepia(30%) saturate(120%) brightness(0.6)",
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div>
                    <p className={`font-bold text-sm leading-snug mb-2 transition-colors duration-300 ${isHovered ? "text-[#e32028]" : "text-white"}`}>
                      {s.label}
                    </p>
                    <p className={`text-[0.7rem] leading-relaxed transition-all duration-300 ${isHovered ? "text-[#aaa] opacity-100" : "text-[#555] opacity-0 md:opacity-100"}`}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div
          className="text-center mt-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "600ms" }}
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 border border-[#e32028] text-[#e32028] px-7 py-2.5 rounded-md text-sm font-semibold hover:bg-[#e32028] hover:text-white transition-all duration-200 no-underline group"
          >
            View All Services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
