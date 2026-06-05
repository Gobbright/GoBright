import { useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo.png";

const services = [
  "Branding & Brand Identity",
  "Digital Marketing",
  "Tech Solutions",
  "Photography & Videography",
  "Other Services",
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const closeTimer = useRef(null);

  const openServices  = () => { clearTimeout(closeTimer.current); setServicesOpen(true); };
  const closeServices = () => { closeTimer.current = setTimeout(() => setServicesOpen(false), 300); };
  const location = useLocation();

  const handleLogoClick = useCallback((e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      document.getElementById("team-section")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  const linkClass = (path) =>
    `no-underline text-[1.05rem] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap py-2 md:py-0 ${
      location.pathname === path ? "text-[#e32028]" : "text-[#cccccc] hover:text-[#e32028]"
    }`;

  return (
    <>
      {/* -- Top Bar -- */}
      <div className="bg-[#0a0a0a] border-b border-[#1e1e1e] min-h-11 flex items-center overflow-hidden">

        {/* Scrolling marquee */}
        <div className="flex-1 overflow-hidden mx-2 sm:mx-3 relative">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-0 whitespace-nowrap">
            {[
              "Branding & Identity",
              "Logo Design",
              "Digital Marketing",
              "Social Media Marketing",
              "SEO Services",
              "Performance Marketing",
              "IT & Tech Solutions",
              "Photography & Videography",
              "Packaging Design",
              "Signage & Printing",
              "Office Branding",
              "Web Development",
              // duplicate for seamless loop
              "Branding & Identity",
              "Logo Design",
              "Digital Marketing",
              "Social Media Marketing",
              "SEO Services",
              "Performance Marketing",
              "IT & Tech Solutions",
              "Photography & Videography",
              "Packaging Design",
              "Signage & Printing",
              "Office Branding",
              "Web Development",
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-3 text-[0.72rem] font-medium">
                <span className="text-[#e32028] text-[10px]">{"\u2605"}</span>
                <span className="text-[#999] pr-3">{item}</span>
              </span>
            ))}
          </div>
        </div>

      </div>

      <header className="bg-[#0d0d0d] sticky top-0 z-50 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-[70px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0" onClick={handleLogoClick}>
            <img src={logo} alt="GoBright logo" className="h-[70px] w-auto object-contain" />
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#cccccc] rounded-sm transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>

          {/* Nav */}
          <nav
            className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center gap-0 md:gap-8
            absolute md:static top-[70px] left-0 right-0 md:top-auto
            bg-[#0d0d0d] md:bg-transparent border-t md:border-t-0 border-[#1a1a1a]
            px-6 md:px-0 pb-4 md:pb-0 z-50`}
          >
            <Link to="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" className={linkClass("/about")} onClick={() => setMenuOpen(false)}>About us</Link>

            {/* Services dropdown */}
            <div
              className="relative py-2 md:py-0"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <Link to="/services" className={`${linkClass("/services")} flex items-center gap-1`}>
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <ul
                className={`absolute top-[calc(100%+18px)] left-1/2 -translate-x-1/2 bg-[#161616] border border-[#2a2a2a] rounded-lg py-2 list-none m-0 min-w-[200px] shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out
                  ${servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
              >
                {services.map((s) => (
                  <li key={s}>
                    <Link
                      to={`/services/${s.toLowerCase().replace(/ /g, "-")}`}
                      className="block px-5 py-2.5 text-[#cccccc] no-underline text-[0.9rem] transition-colors duration-200 hover:text-[#e32028] hover:bg-[#1f1f1f]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/industries" className={linkClass("/industries")} onClick={() => setMenuOpen(false)}>Industries We Serve</Link>
            <Link to="/contact" className={linkClass("/contact")} onClick={() => setMenuOpen(false)}>Contact us</Link>

            {/* Contact button - mobile menu */}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="md:hidden mt-2 w-full bg-[#e32028] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c41c22] transition-colors duration-200 no-underline text-center block"
            >
              Let&apos;s Build Together
            </Link>
          </nav>

          {/* Contact button - desktop */}
          <Link
            to="/contact"
            className="hidden md:flex items-center gap-2 bg-[#e32028] text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-[#c41c22] transition-all duration-200 shadow-[0_0_15px_rgba(227,32,40,0.3)] hover:shadow-[0_0_25px_rgba(227,32,40,0.5)] whitespace-nowrap flex-shrink-0 no-underline"
          >
            Let&apos;s Build Together
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

        </div>
      </header>

    </>
  );
}
