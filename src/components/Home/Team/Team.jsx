import { useRef, useState, useEffect } from "react";

// Replace src with actual images when ready — 10 members, 5 per row × 2 rows
const members = [
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
  { name: "Team Member", role: "Designation", img: null },
];

function AvatarPlaceholder() {
  return (
    <div className="w-full aspect-[3/4] bg-[#1e1e1e] flex flex-col items-center justify-end pb-5 gap-2">
      {/* Circle head */}
      <div className="w-20 h-20 rounded-full bg-[#2a2a2a] border-2 border-[#333] flex items-center justify-center mb-1">
        <svg viewBox="0 0 24 24" fill="#444" className="w-10 h-10">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12z"/>
        </svg>
      </div>
      {/* Body silhouette */}
      <div className="w-24 h-12 rounded-t-full bg-[#2a2a2a]" />
    </div>
  );
}

export default function Team() {
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
    <section ref={ref} className="bg-[#0d0d0d] py-20 border-t border-[#1a1a1a] overflow-hidden relative">

      {/* Red glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(227,32,40,0.07),transparent_65%)] pointer-events-none" />
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
      {/* Decorative dot patterns on sides */}
      <div
        className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(227,32,40,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(227,32,40,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-10 md:px-16">

        {/* Heading */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">The People</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Our <span className="text-[#e32028]">Team</span>
          </h2>
          <p className="text-[#555] text-sm mt-3">Meet the talented people behind GoBright</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {members.map((m, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s ease ${i * 90}ms`,
              }}
            >
              {/* Photo card */}
              <div className="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
                {m.img ? (
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out"
                  />
                ) : (
                  <AvatarPlaceholder />
                )}

                {/* Hover red overlay strip at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>

              {/* Name & role */}
              <div className="mt-3 text-center">
                <p className="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">{m.name}</p>
                <p className="text-[#555] text-xs mt-0.5">{m.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
