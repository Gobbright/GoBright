import { useEffect, useRef, useState } from "react";
import icon1 from "../../../assets/whychoose/icon-1.png";
import icon2 from "../../../assets/whychoose/icon-2.png";
import icon3 from "../../../assets/whychoose/icon-3.png";

const features = [
  {
    title: "Data-Driven Branding",
    desc: "We analyze market trends, customer behavior, and competitors to build branding strategies backed by insights — not assumptions.",
    img: icon1,
    alt: "Data-driven branding icon",
  },
  {
    title: "Performance Marketing",
    desc: "Our digital marketing campaigns are designed to boost visibility, engagement, and conversions across all platforms.",
    img: icon2,
    alt: "Performance marketing icon",
  },
  {
    title: "Business Growth Analytics",
    desc: "We track performance, measure impact, and continuously optimize strategies to ensure long-term brand success.",
    img: icon3,
    alt: "Business growth analytics icon",
  },
];

export default function WhyChoose() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>

      {/* CTA Banner */}
      <section className="bg-[#0d0d0d] py-16 text-center border-t border-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e32028]/5 via-transparent to-[#e32028]/5 pointer-events-none" />
        <div
          className="relative z-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Ready to Scale <span className="text-[#e32028]">Your Brand</span> with GoBright?
          </h2>
          <p className="text-[#666] text-sm mb-8 max-w-md mx-auto">
            Your competitors are already investing in digital. Are you ready to lead?
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#e32028] text-white px-8 py-3 rounded-full font-semibold text-[0.95rem] hover:bg-[#c41c22] transition-colors duration-200 no-underline shadow-[0_0_20px_rgba(227,32,40,0.4)] hover:shadow-[0_0_35px_rgba(227,32,40,0.6)]"
          >
            Start Your Growth Journey
          </a>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#111111] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">

          {/* Heading */}
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "200ms" }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
              <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Why GoBright</span>
              <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            </div>
            <h2 className="text-[#e32028] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Choose GoBright
            </h2>
            <p className="text-[#aaaaaa] text-sm max-w-xl mx-auto leading-relaxed">
              At <span className="text-white font-semibold">GoBright</span>, we blend creativity, strategy, and technology to deliver branding solutions that create lasting impressions and measurable growth.
            </p>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center gap-5 border border-[#2a2a2a] hover:border-[#e32028]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,32,40,0.12)] cursor-pointer"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s",
                  transitionDelay: `${400 + i * 150}ms`,
                }}
              >
                {/* Icon box */}
                <div className="w-20 h-20 rounded-2xl bg-[#222] border border-[#333] group-hover:border-[#e32028]/40 group-hover:bg-[#e32028]/8 flex items-center justify-center transition-all duration-300 p-3">
                  <img
                    src={f.img}
                    alt={f.alt}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-[#e32028] text-base font-bold">{f.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
