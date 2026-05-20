import { useState, useEffect } from "react";

const slides = [
  {
    tag: "Best Branding & Digital Marketing Agency in Trichy",
    headline: (
      <>
        <span className="text-[#e32028]">Best</span> Branding & Digital Marketing<br />
        <span className="text-[#e32028]">Agency in Trichy Driving Global Brand Growth</span>
      </>
    ),
    description:
      "Welcome to GoBright, a creative branding agency dedicated to shaping strong brand identities, impactful digital experiences, and result-driven marketing strategies. We help businesses transform ideas into memorable brands that inspire trust and drive success.",
  },
  {
    tag: "Trichy's Most Trusted Growth Partner",
    headline: (
      <>
        <span className="text-[#e32028]">Empowering</span> Businesses With<br />
        <span className="text-[#e32028]">Bold Ideas & Lasting Impact</span>
      </>
    ),
    description:
      "Whether you're a startup finding your voice or an established brand seeking fresh momentum, GoBright brings the creativity, strategy, and passion to take your business to the next level.",
  },
  {
    tag: "Where Vision Meets Execution",
    headline: (
      <>
        <span className="text-[#e32028]">Your Brand Deserves</span> More Than<br />
        <span className="text-[#e32028]">Just a Logo — It Deserves a Legacy</span>
      </>
    ),
    description:
      "At GoBright, we don't just design — we build brands that speak, connect, and convert. From strategy to storytelling, we craft every detail to position your business as an industry leader.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="bg-[#0d0d0d] flex items-center relative overflow-hidden">
      {/* Red top glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,32,40,0.13),transparent_55%)] pointer-events-none" />
      {/* Red perspective grid */}
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[50%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(227,32,40,0.55) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.55) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.5,
        }}
      />
      <div className="w-full">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="max-w-7xl mx-auto px-8 py-20 w-full text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-20 h-[2px] bg-[#e32028]" />
                <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">
                  {slide.tag}
                </span>
                <span className="w-20 h-[2px] bg-[#e32028]" />
              </div>
              <h1 className="text-white text-[3rem] md:text-[3.25rem] font-bold leading-tight mb-6">
                {slide.headline}
              </h1>
              <p className="text-[#cccccc] text-base md:text-lg max-w-[44rem] mx-auto mb-10 leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/services"
                  className="bg-[#e32028] text-white px-8 py-3 rounded-md font-semibold text-[0.95rem] hover:bg-[#c41c22] transition-colors duration-200 no-underline"
                >
                  Our Services
                </a>
                <a
                  href="/contact"
                  className="border border-[#444] text-[#cccccc] px-8 py-3 rounded-md font-semibold text-[0.95rem] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200 no-underline"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Spacer */}
        <div className="invisible max-w-7xl mx-auto px-8 py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-20 h-[2px]" />
            <span className="text-xs">tag placeholder</span>
            <span className="w-20 h-[2px]" />
          </div>
          <h1 className="text-[3rem] md:text-[3.25rem] font-bold leading-tight mb-6">
            Best Branding & Digital Marketing<br />Agency in Trichy Driving Global Brand Growth
          </h1>
          <p className="text-base md:text-lg max-w-[44rem] mx-auto mb-10 leading-relaxed">
            Welcome to GoBright, a creative branding agency dedicated to shaping strong brand identities,
            impactful digital experiences, and result-driven marketing strategies. We help businesses
            transform ideas into memorable brands that inspire trust and drive success.
          </p>
          <div className="flex gap-4 justify-center">
            <span className="px-8 py-3">placeholder</span>
          </div>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-4 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-[#333] bg-[#0d0d0d]/70 text-[#cccccc] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-[#333] bg-[#0d0d0d]/70 text-[#cccccc] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-8 h-2.5 bg-[#e32028]" : "w-2.5 h-2.5 bg-[#444]"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
