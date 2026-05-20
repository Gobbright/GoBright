import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    desc: "We dive deep into your business, audience, competitors, and goals. This research-first approach ensures every creative decision is backed by real insight — not guesswork.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="12" cy="12" r="8" stroke="#e32028" strokeWidth="2"/>
        <path d="M18 18l5 5" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 12h6M12 9v6" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Brand Concept & Design",
    desc: "Our designers craft multiple creative directions tailored to your brand personality. From logo concepts to full visual systems — every pixel has a purpose.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L14 6l10 14H4z" stroke="#e32028" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="14" cy="12" r="2" fill="#e32028"/>
        <path d="M8 20h12" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Review & Refinement",
    desc: "We present the concepts, gather your feedback, and refine until it's perfect. Collaboration is at the heart of everything we do — your vision, our craft.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 14l6 6L23 8" stroke="#e32028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="11" stroke="#e32028" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Delivery & Launch",
    desc: "We deliver all brand assets in every format you need — print, digital, social. Complete brand guidelines included so your team can maintain consistency going forward.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v14M14 4l-5 5M14 4l5 5" stroke="#e32028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 18v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4" stroke="#e32028" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "05",
    title: "Growth & Support",
    desc: "Our relationship doesn't end at delivery. We offer ongoing support, brand management, and marketing services to help your brand grow and evolve over time.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20l5-5 4 4 5-7 6 8" stroke="#e32028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8l4 0 0 4" stroke="#e32028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Process() {
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
    <section ref={ref} className="relative bg-[#111111] py-20 overflow-hidden">
      {/* Red glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(227,32,40,0.1),transparent_60%)] pointer-events-none" />
      {/* Red perspective grid */}
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[50%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(227,32,40,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.5) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.45,
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        {/* Title */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">How We Work</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Our Creative <span className="text-[#e32028]">Process</span>
          </h2>
          <p className="text-[#666] text-sm max-w-md mx-auto leading-relaxed">
            A proven 5-step process that takes your brand from idea to impact — with clarity, creativity, and precision at every stage.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e32028]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="group flex flex-col items-center text-center md:items-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: `${200 + i * 150}ms`,
                }}
              >
                {/* Number circle */}
                <div className="relative w-20 h-20 rounded-full border-2 border-[#2a2a2a] bg-[#0d0d0d] flex flex-col items-center justify-center mb-5 group-hover:border-[#e32028] group-hover:shadow-[0_0_20px_rgba(227,32,40,0.3)] transition-all duration-300 z-10">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e32028] text-white text-[0.6rem] font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-[#e32028] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[#666] text-xs leading-relaxed max-w-[180px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
