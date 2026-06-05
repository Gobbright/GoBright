import { useEffect, useRef, useState } from "react";
import heroImage from "../../assets/img/About/img1.png";
import PageHeroBackdrop from "../PageHeroBackdrop";

export default function HeroSection() {
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
    <section ref={ref} className="bg-[#0d0d0d] pt-10 relative overflow-hidden">
      <PageHeroBackdrop />

      {/* Red banner */}
      <div className="bg-[#e32028] py-4 px-6 text-center relative z-10">
        <p className="text-white font-bold text-lg md:text-xl tracking-wide">
          GoBright - A 360 degrees Brand Growth Company Powered by Infinite Imagination
        </p>
      </div>

      {/* About Us tab */}
      <div className="bg-[#e0e0e0] rounded-tr-[1.8rem] w-56 py-3.5 flex items-center justify-center mt-10 relative z-10">
        <span className="text-[#e32028] font-bold text-xl tracking-wide">About Us</span>
      </div>

      {/* Section label */}
      <div
        className="flex items-center justify-center gap-3 mt-8 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
      >
        <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
        <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Who We Are</span>
        <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left - text */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "150ms" }}
        >
          <div className="flex flex-col gap-5 text-[#cccccc] text-[0.97rem] leading-relaxed">
            <p>
              Based in Trichy,{" "}
              <span className="text-[#e32028] font-semibold">GoBright</span>{" "}
              is a creative branding, digital marketing, and technology solutions
              company dedicated to building powerful, scalable, and future-ready brands.
            </p>
            <p>
              We combine strategy, creativity, and performance to help businesses grow
              with clarity, confidence, and measurable results.
            </p>
            <p>
              From startups to established enterprises, we design structured growth
              systems that increase visibility, generate qualified leads, and create
              sustainable business impact.
            </p>
            <p>We don't just market brands - we build them to lead.</p>
          </div>
        </div>

        {/* Right - image */}
        <div
          className="flex justify-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "300ms" }}
        >
          <img
            src={heroImage}
            alt="GoBright branding"
            className="w-full max-w-md h-72 object-cover rounded-2xl border border-[#2a2a2a] shadow-[0_0_30px_rgba(227,32,40,0.1)]"
          />
        </div>

      </div>
    </section>
  );
}
