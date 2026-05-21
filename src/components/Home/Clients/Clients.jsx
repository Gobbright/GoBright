import c0 from "../../../assets/img/clients/clients.png";
import c1 from "../../../assets/img/clients/clients1.webp";
import c2 from "../../../assets/img/clients/clients2.png";
import c3 from "../../../assets/img/clients/clients3.png";
import c4 from "../../../assets/img/clients/clients4.png";
import c5 from "../../../assets/img/clients/clients5.png";

const clients = [
  { img: c0, alt: "Jayaraj — GoBright client"            },
  { img: c1, alt: "Namma Trip — GoBright client"         },
  { img: c2, alt: "Ivory Code — GoBright client"         },
  { img: c3, alt: "GSKT Construction — GoBright client"  },
  { img: c4, alt: "Sri Vel Enterprises — GoBright client"},
  { img: c5, alt: "BrandBox — GoBright client"           },
];

export default function Clients() {
  const doubled = [...clients, ...clients]; // doubled for infinite marquee

  return (
    <section className="bg-[#0d0d0d] py-16 border-t border-[#1a1a1a] overflow-hidden">

      <h2 className="text-white text-2xl font-bold text-center mb-10">
        Our Esteemed <span className="text-[#e32028]">Clients</span>
      </h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0d0d0d] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0d0d0d] to-transparent pointer-events-none" />

        <div
          className="flex gap-5 items-center"
          style={{ width: "max-content", animation: "marquee 25s linear infinite" }}
        >
          {doubled.map((client, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl flex items-center justify-center px-6 py-4 min-w-[150px] h-[90px] hover:border-[#e32028]/50 transition-all duration-300 cursor-pointer flex-shrink-0 group"
            >
              <img
                src={client.img}
                alt={client.alt}
                className="max-h-[60px] max-w-[120px] object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
