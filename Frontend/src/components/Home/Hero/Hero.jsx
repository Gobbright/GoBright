import { useState, useEffect } from "react";
import b1 from "../../../assets/img/Banner/B1.png";
import b2 from "../../../assets/img/Banner/B2.png";
import b3 from "../../../assets/img/Banner/B3.png";

const slides = [
  {
    image: b1,
    tag: "Best Branding & Digital Marketing Agency in Trichy",
    headline: (
      <>
        <span className="text-[#e32028]">Best</span> Branding &amp; Digital Marketing{" "}
        <span className="text-[#e32028]">Agency in Trichy Driving Global Brand Growth</span>
      </>
    ),
    description:
      "Welcome to GoBright, a creative branding agency dedicated to shaping strong brand identities, impactful digital experiences, and result-driven marketing strategies. We help businesses transform ideas into memorable brands that inspire trust and drive success.",
  },
  {
    image: b2,
    tag: "Trichy's Most Trusted Growth Partner",
    headline: (
      <>
        <span className="text-[#e32028]">Empowering</span> Businesses With{" "}
        <span className="text-[#e32028]">Bold Ideas &amp; Lasting Impact</span>
      </>
    ),
    description:
      "Whether you're a startup finding your voice or an established brand seeking fresh momentum, GoBright brings the creativity, strategy, and passion to take your business to the next level.",
  },
  {
    image: b3,
    tag: "Where Vision Meets Execution",
    headline: (
      <>
        <span className="text-[#e32028]">Your Brand Deserves</span> More Than{" "}
        <span className="text-[#e32028]">Just a Logo - It Deserves a Legacy</span>
      </>
    ),
    description:
      "At GoBright, we don't just design - we build brands that speak, connect, and convert. From strategy to storytelling, we craft every detail to position your business as an industry leader.",
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
    <section className="bg-[#0d0d0d] relative overflow-hidden min-h-[100svh] md:min-h-[88vh]">

      {/* Background images */}
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.image}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority={i === 0 ? "high" : "auto"}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700
            object-cover object-[62%_center] contrast-[1.08] saturate-[1.08]
            md:object-contain md:object-right md:contrast-[1.12] md:saturate-[1.1]
            ${i === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Keep the mobile copy readable without hiding the banner artwork. */}
      <div className="absolute inset-0 bg-linear-to-b from-[#0d0d0d]/25 via-[#0d0d0d]/55 to-[#0d0d0d]/85 md:hidden pointer-events-none" />

      {/* Desktop: left-to-right gradient */}
      <div className="absolute inset-0 hidden md:block bg-linear-to-r from-[#0d0d0d] from-35% via-[#0d0d0d]/65 via-52% to-transparent pointer-events-none" />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#0d0d0d]/80 to-transparent pointer-events-none" />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#0d0d0d]/80 to-transparent pointer-events-none" />

      {/* Perspective grid */}
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[35%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(227,32,40,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.4) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.35,
        }}
      />

      {/* Slide content */}
      <div className="relative z-10 flex items-center min-h-[100svh] md:min-h-[88vh]">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-8 py-28 md:py-24">
          <div className="relative min-h-64 w-full md:w-[50%]">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col justify-center transition-opacity duration-700 ${
                  i === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Tag */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 sm:w-12 h-0.5 bg-[#e32028] shrink-0" />
                  <span className="text-[#e32028] text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.15em] uppercase leading-snug">
                    {slide.tag}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-white text-[1.7rem] sm:text-[2.1rem] md:text-[2.6rem] font-bold leading-tight mb-4">
                  {slide.headline}
                </h1>

                {/* Description */}
                <p className="text-[#aaaaaa] text-[0.85rem] sm:text-[0.9rem] md:text-[0.97rem] leading-relaxed mb-7 max-w-xl">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/services"
                    className="bg-[#e32028] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:bg-[#c41c22] transition-colors duration-200 no-underline"
                  >
                    Our Services
                  </a>
                  <a
                    href="/contact"
                    className="border border-[#555] text-[#cccccc] px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-semibold text-[0.85rem] sm:text-[0.92rem] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200 no-underline"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#333] bg-black/50 text-[#cccccc] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200"
        aria-label="Previous slide"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#333] bg-black/50 text-[#cccccc] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200"
        aria-label="Next slide"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-7 h-2 bg-[#e32028]" : "w-2 h-2 bg-[#555]"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
