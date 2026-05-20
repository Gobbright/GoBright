import { useState } from "react";
import logo from "./assets/logo.png";

const services = [
   "Branding & Brand identity",
   "Digital Marketing",
   "Tech Solutions",
   "Photography & Videography",
   "Other Services",
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass =
    "text-[#cccccc] no-underline text-[0.95rem] font-medium tracking-wide transition-colors duration-200 hover:text-[#e32028] whitespace-nowrap py-2 md:py-0";

  return (
    <header className="bg-[#0d0d0d] sticky top-0 z-50 border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 h-[70px] flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img src={logo} alt="GoBright" className="h-[70px] w-auto object-contain" />
        </a>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>

        {/* Nav */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-10
          absolute md:static top-[70px] left-0 right-0 md:top-auto
          bg-[#0d0d0d] md:bg-transparent border-t md:border-t-0 border-[#1a1a1a]
          px-8 md:px-0 pb-4 md:pb-0`}
        >
          <a href="/" className={linkClass}>Home</a>
          <a href="/about" className="text-[#e32028] no-underline text-[0.95rem] font-medium tracking-wide whitespace-nowrap py-2 md:py-0">About us</a>

          {/* Services dropdown */}
          <div
            className="relative py-2 md:py-0"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a href="/services" className={`${linkClass} flex items-center gap-1`}>
              Services
              <span className="flex items-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>

            {servicesOpen && (
              <ul className="absolute top-[calc(100%+18px)] left-1/2 -translate-x-1/2 bg-[#161616] border border-[#2a2a2a] rounded-lg py-2 list-none m-0 min-w-[200px] shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                {services.map((s) => (
                  <li key={s}>
                    <a
                      href={`/services/${s.toLowerCase().replace(/ /g, "-")}`}
                      className="block px-5 py-2.5 text-[#cccccc] no-underline text-[0.9rem] transition-colors duration-200 hover:text-[#e32028] hover:bg-[#1f1f1f]"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a href="/industries" className={linkClass}>Industries We Serve</a>
          <a href="/contact" className={linkClass}>Contact us</a>
        </nav>

      </div>
    </header>
  );
}
