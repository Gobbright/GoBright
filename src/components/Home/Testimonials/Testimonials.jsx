import { useState, useEffect, useRef } from "react";

const testimonials = [
  { name: "Ramesh Kumar",  role: "Founder, Jayaraj Enterprises", rating: 5, review: "GoBright completely transformed how our brand is perceived. The team understood our legacy and modernized our identity without losing what makes us unique. Exceptional work from start to finish." },
  { name: "Priya Nair",   role: "CEO, Namma Trip",              rating: 5, review: "Working with GoBright was a game-changer for us. Our digital presence went from invisible to impactful within weeks. Their creativity, strategy, and attention to detail is unmatched in Trichy." },
  { name: "Arun Selvam",  role: "Director, Ivory Code",         rating: 5, review: "The GoBright team delivered a brand identity that truly reflects who we are as a tech company. Clean, modern, and powerful. We've received so many compliments from our clients since the rebrand." },
  { name: "Karthik Rajan",role: "MD, GSKT Construction",        rating: 5, review: "From brand strategy to signage installation, GoBright handled everything professionally. Our new brand image has significantly improved client trust and project conversions." },
  { name: "Deepa Mohan",  role: "Owner, Sri Vel Enterprises",   rating: 5, review: "I was skeptical about investing in branding, but GoBright proved its worth within the first month. Our social media engagement tripled and inquiries have been consistent ever since." },
  { name: "Vijay Anand",  role: "Startup Founder, Trichy",      rating: 5, review: "GoBright didn't just design a logo — they built an entire brand system for us. The guidelines, assets, and strategy they provided set us up for long-term success. Highly recommended!" },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#e32028">
          <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1L1 5.3l4.2-.7L7 1z"/>
        </svg>
      ))}
    </div>
  );
}

function ArrowBtn({ dir, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 rounded-full border border-[#333] bg-[#111] flex items-center justify-center text-[#aaa] hover:border-[#e32028] hover:text-[#e32028] hover:shadow-[0_0_15px_rgba(227,32,40,0.3)] transition-all duration-200"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {dir === "left"
          ? <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const total = testimonials.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goNext(), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
    setAnimDir("left");
    setTimeout(() => { setCurrent(c => (c + 1) % total); setAnimDir(null); }, 300);
  };

  const goPrev = () => {
    setAnimDir("right");
    setTimeout(() => { setCurrent(c => (c - 1 + total) % total); setAnimDir(null); }, 300);
  };

  const getCards = () => [
    testimonials[current % total],
    testimonials[(current + 1) % total],
    testimonials[(current + 2) % total],
  ];

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-20 overflow-hidden border-t border-[#1a1a1a]">

      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#e32028]/6 blur-[80px] pointer-events-none" />
      {/* Red perspective grid */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">

        {/* Title */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Client Love</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            What Our <span className="text-[#e32028]">Clients Say</span>
          </h2>
          <p className="text-[#666] text-sm max-w-md mx-auto">
            Real stories from real businesses that grew with GoBright.
          </p>
        </div>

        {/* Cards */}
        <div
          className="overflow-hidden"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s ease, transform 0.7s ease", transitionDelay: "200ms" }}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-300"
            style={{
              opacity: animDir ? 0 : 1,
              transform: animDir === "left" ? "translateX(-30px)" : animDir === "right" ? "translateX(30px)" : "translateX(0)",
            }}
          >
            {getCards().map((t, i) => (
              <div
                key={`${current}-${i}`}
                className={`bg-[#161616] border rounded-2xl p-6 flex flex-col gap-4
                  ${i === 1 ? "border-[#e32028]/50 shadow-[0_0_25px_rgba(227,32,40,0.12)]" : "border-[#2a2a2a]"}
                  ${i === 2 ? "hidden md:flex" : ""}
                  ${i === 0 ? "hidden sm:flex" : ""}
                `}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z" fill="#e32028" fillOpacity="0.3"/>
                </svg>
                <p className="text-[#aaa] text-sm leading-relaxed flex-1">"{t.review}"</p>
                <div className="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                  <Stars count={t.rating} />
                  <span className="text-white font-bold text-sm mt-1">{t.name}</span>
                  <span className="text-[#666] text-xs">{t.role}</span>
                </div>
              </div>
            ))}

            {/* Mobile single card */}
            <div
              className="sm:hidden bg-[#161616] border border-[#e32028]/50 shadow-[0_0_25px_rgba(227,32,40,0.12)] rounded-2xl p-6 flex flex-col gap-4"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 20c0-5.5 3-10 9-12l1.5 2.5C13 12 11.5 14 11 16h4v8H6v-4zm15 0c0-5.5 3-10 9-12l1.5 2.5C28 12 26.5 14 26 16h4v8H21v-4z" fill="#e32028" fillOpacity="0.3"/>
              </svg>
              <p className="text-[#aaa] text-sm leading-relaxed flex-1">"{testimonials[current].review}"</p>
              <div className="flex flex-col gap-1 border-t border-[#2a2a2a] pt-4">
                <Stars count={testimonials[current].rating} />
                <span className="text-white font-bold text-sm mt-1">{testimonials[current].name}</span>
                <span className="text-[#666] text-xs">{testimonials[current].role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls — arrows + dots */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <ArrowBtn dir="left" onClick={goPrev} />

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-8 h-2 bg-[#e32028]" : "w-2 h-2 bg-[#333] hover:bg-[#555]"
                }`}
              />
            ))}
          </div>

          <ArrowBtn dir="right" onClick={goNext} />
        </div>

      </div>
    </section>
  );
}
