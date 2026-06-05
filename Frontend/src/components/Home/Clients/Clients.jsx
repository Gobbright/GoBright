import { useEffect, useRef, useState } from "react";
import c0 from "../../../assets/img/clients/clients.png";
import c1 from "../../../assets/img/clients/clients1.png";
import c2 from "../../../assets/img/clients/clients2.png";
import c3 from "../../../assets/img/clients/clients3.png";
import c4 from "../../../assets/img/clients/clients4.png";
import c5 from "../../../assets/img/clients/clients5.png";
import c6 from "../../../assets/img/clients/clients6.png";
import c7 from "../../../assets/img/clients/clients7.png";

const STATIC_CLIENTS = [
  { img: c0, alt: "Jayaraj - GoBright client"            },
  { img: c1, alt: "Namma Trip - GoBright client"         },
  { img: c2, alt: "Ivory Code - GoBright client"         },
  { img: c3, alt: "GSKT Construction - GoBright client"  },
  { img: c4, alt: "Sri Vel Enterprises - GoBright client"},
  { img: c5, alt: "BrandBox - GoBright client"           },
  { img: c6, alt: "New Client 6 - GoBright client"       },
  { img: c7, alt: "New Client 7 - GoBright client"       },
];

const API = import.meta.env.VITE_ATTENDANCE_API_URL || "http://localhost:5001/api";

function Track({ suffix, items }) {
  const trackItems = [...items, ...items, ...items];
  return (
    <div
      className="flex items-center shrink-0"
      style={{ animation: "clientMarquee 45s linear infinite" }}
    >
      {trackItems.map((client, i) => (
        <div
          key={`${suffix}-${i}`}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 w-42.5 h-22.5 hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer shrink-0 group mr-5"
        >
          {client.img ? (
            <img
              src={client.img}
              alt={client.alt}
              className="max-h-15 max-w-30 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-white font-bold text-sm text-center px-2 opacity-70 group-hover:opacity-100 transition-opacity">{client.alt}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Clients() {
  const [visible, setVisible] = useState(false);
  const [clients, setClients] = useState(STATIC_CLIENTS);
  const ref = useRef(null);

  useEffect(() => {
    fetch(`${API}/website/client`)
      .then(r => r.json())
      .then(d => {
        if (d.items && d.items.length > 0) {
          setClients(d.items.map(c => ({ img: c.logo || null, alt: c.name })));
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
    <section ref={ref} className="bg-[#0d0d0d] py-16 border-t border-[#1a1a1a] overflow-hidden">

      {/* Heading */}
      <div
        className="text-center mb-10 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Trusted By</span>
          <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
        </div>
        <h2 className="text-white text-2xl font-bold">
          Our Esteemed <span className="text-[#e32028]">Clients</span>
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="relative transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transitionDelay: "250ms" }}
      >
        {/* Edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-[#0d0d0d] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-[#0d0d0d] to-transparent pointer-events-none" />

        <div className="flex">
          <Track suffix="a" items={clients} />
          <Track suffix="b" items={clients} />
        </div>
      </div>

      <style>{`
        @keyframes clientMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
