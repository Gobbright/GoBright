import { useEffect, useRef, useState } from "react";
import photoImg    from "../../../assets/img/Home/services/services1.png";
import marketingImg from "../../../assets/img/Home/services/services2.png";
import brandingImg  from "../../../assets/img/Home/services/services3.png";
import techImg      from "../../../assets/img/Home/services/services4.png";
import otherImg     from "../../../assets/img/Home/services/services5.png";

const services = [
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
    label: "IT & Tech Solutions",
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
          <p className="text-[#555] text-sm mt-3 max-w-md mx-auto">Everything your brand needs to grow - under one roof.</p>
        </div>

        {/* -- Mobile: 2-column grid -- */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {services.map((s, i) => {
            const isLast = i === services.length - 1;
            return (
              <div
                key={s.label}
                className={`relative rounded-2xl overflow-hidden cursor-pointer h-44 border border-[#2a2a2a]
                  ${isLast ? "col-span-2 max-w-[55%] mx-auto w-full" : ""}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
                }}
              >
                <img src={s.img} alt={s.alt} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <p className="absolute bottom-3 left-0 right-0 text-center text-white font-bold text-xs px-2">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* -- Desktop: Magazine layout -- */}
        <div className="hidden md:flex gap-4" style={{ height: "560px" }}>

          {/* Left — Digital Marketing featured card */}
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group border border-[#2a2a2a] flex-shrink-0"
            style={{
              width: "38%",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <img src={services[1].img} alt={services[1].alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-[#e32028]/0 group-hover:bg-[#e32028]/8 transition-colors duration-400" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#e32028] opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-extrabold text-2xl leading-snug mb-4">{services[1].label}</p>
              <a
                href="/services/digital-marketing"
                className="inline-flex items-center gap-2 bg-[#e32028] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#c41c22] transition-colors duration-200 no-underline"
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right — 2×2 service cards + View All */}
          <div className="flex-1 grid grid-cols-2 grid-rows-[1fr_1fr_52px] gap-4">

            {/* Top 2 + Bottom 2 service cards */}
            {[services[0], services[2], services[3], services[4]].map((s, i) => (
              <div
                key={s.label}
                className="relative rounded-2xl overflow-hidden cursor-pointer group border border-[#2a2a2a]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.7s ease ${(i + 1) * 100}ms, transform 0.7s ease ${(i + 1) * 100}ms`,
                }}
              >
                <img src={s.img} alt={s.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[#e32028]/0 group-hover:bg-[#e32028]/10 transition-colors duration-400" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#e32028] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-0 left-0 right-0 p-4 text-white font-bold text-sm text-center group-hover:text-[#e32028] transition-colors duration-300">{s.label}</p>
              </div>
            ))}

            {/* View All Services — last card, spans full width */}
            <a
              href="/services"
              className="col-span-2 flex items-center justify-center gap-3 rounded-2xl border border-[#e32028]/30 bg-[#111] hover:bg-[#e32028]/8 hover:border-[#e32028]/70 transition-all duration-300 no-underline group"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.7s ease 600ms, background 0.3s ease, border 0.3s ease",
              }}
            >
              <span className="text-[#e32028] font-bold text-base group-hover:tracking-wide transition-all duration-300">View All Services</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#e32028" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

          </div>
        </div>


      </div>
    </section>
  );
}
