import { useRef, useState, useEffect } from "react";
import img1  from "../../../assets/img/teams/1.jpeg";
import img2  from "../../../assets/img/teams/2.png";
import img3  from "../../../assets/img/teams/3.jpeg";
import img4  from "../../../assets/img/teams/4.jpeg";
import img5  from "../../../assets/img/teams/5.png";
import img6  from "../../../assets/img/teams/6.png";
import img7  from "../../../assets/img/teams/7.png";
import img8  from "../../../assets/img/teams/8.jpeg";
import img9  from "../../../assets/img/teams/9.jpeg";

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";

/* Exported for TeamPage attendance — keep in sync with employee IDs */
export const members = [
  { id: "GB2026001", name: "Mr. Thanga Durai",    role: "Managing Director (MD)",             img: img1 },
  { id: "GB2026002", name: "Mr. Sridhar",         role: "Executive Director (ED)",            img: img2 },
  { id: "GB2026003", name: "Mr. Dhayala Prakash", role: "Chief Administrative Officer (CAO)", img: img3 },
  { id: "GB2026004", name: "Mrs. Akila",          role: "Administrative Officer (AO)",        img: img4 },
  { id: "GB2026005", name: "Mr. Vignesh",         role: "Senior IT Executive",               img: img5 },
  { id: "GB2026006", name: "Mr. Praveen",         role: "Content Creator",                   img: img6 },
  { id: "GB2026007", name: "Mr. Bala Ganesan",    role: "Content Creator",                   img: img7 },
  { id: "GB2026008", name: "Mr. Fradrick",        role: "Full Stack Developer",              img: img8 },
  { id: "GB2026009", name: "Mr. Anbarasan",       role: "Full Stack Developer",              img: img9 },
];

const STATIC_DISPLAY = members.map(m => ({ name: m.name, role: m.role, img: m.img }));

export default function Team() {
  const [visible, setVisible]         = useState(false);
  const [displayMembers, setDisplay]  = useState(STATIC_DISPLAY);
  const ref = useRef(null);

  useEffect(() => {
    fetch(`${API}/website/team`)
      .then(r => r.json())
      .then(d => {
        if (d.items && d.items.length > 0) {
          setDisplay(d.items.map(m => ({ name: m.name, role: m.role || "", img: m.photo || null })));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team-section" ref={ref} className="bg-[#0d0d0d] py-14 border-t border-[#1a1a1a] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(227,32,40,0.07),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-[-20%] right-[-20%] h-[45%] pointer-events-none"
        style={{ backgroundImage:`linear-gradient(rgba(227,32,40,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.5) 1px,transparent 1px)`, backgroundSize:"50px 50px", transform:"perspective(400px) rotateX(55deg)", transformOrigin:"bottom center", opacity:0.4 }} />
      <div className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle, rgba(227,32,40,0.35) 1.5px, transparent 1.5px)", backgroundSize:"18px 18px" }} />
      <div className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle, rgba(227,32,40,0.35) 1.5px, transparent 1.5px)", backgroundSize:"18px 18px" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-10 md:px-16">
        <div className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
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

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8">
          {displayMembers.map((m, i) => (
            <div key={i} className="group"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s ease ${i * 90}ms` }}>
              <div className="relative rounded-xl overflow-hidden border border-[#2a2a2a] group-hover:border-[#e32028]/60 transition-all duration-400 group-hover:shadow-[0_0_28px_rgba(227,32,40,0.25)]">
                {m.img ? (
                  <img src={m.img} alt={m.name} className="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out" />
                ) : (
                  <div className="w-full aspect-[3/4] bg-[#1e1e1e]" />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e32028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
              <div className="mt-3 text-center">
                <p className="text-white text-sm font-semibold group-hover:text-[#e32028] transition-colors duration-300">{m.name}</p>
                <p className="text-[#888] text-xs mt-1">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
