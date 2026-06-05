import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Brands Built",        desc: "Unique identities crafted from scratch"         },
  { value: 300, suffix: "+", label: "Happy Clients",       desc: "Businesses that trust GoBright to grow"         },
  { value: 10,  suffix: "+", label: "Years of Excellence", desc: "A decade of creative & strategic expertise"     },
  { value: 98,  suffix: "%", label: "Client Satisfaction", desc: "Clients who return & refer us to others"        },
];

function Counter({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{count}{suffix}</span>;
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#0d0d0d] py-20 border-t border-[#1a1a1a] overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e32028]/5 via-transparent to-[#e32028]/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(227,32,40,0.08),transparent_65%)] pointer-events-none" />
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">

        {/* Title */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Our Impact</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Numbers That <span className="text-[#e32028]">Speak</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-[#2a2a2a] bg-[#111] hover:border-[#e32028]/50 hover:shadow-[0_0_25px_rgba(227,32,40,0.1)] transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s, box-shadow 0.3s",
                transitionDelay: `${200 + i * 120}ms`,
              }}
            >
              <span className="text-[#e32028] text-4xl sm:text-5xl font-bold mb-2">
                <Counter target={s.value} suffix={s.suffix} active={visible} />
              </span>
              <span className="text-white font-semibold text-sm mb-1">{s.label}</span>
              <span className="text-[#666] text-xs leading-relaxed">{s.desc}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
