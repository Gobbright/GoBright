import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const services = [
  "Branding & Brand identity",
  "Digital Marketing",
  "Tech Solutions",
  "Photography & Videography",
  "Other Services",
];

function EnquiryModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#161616] border border-[#2a2a2a] rounded-2xl w-full max-w-lg shadow-[0_0_60px_rgba(227,32,40,0.15)] animate-[fadeSlideUp_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#2a2a2a]">
          <div>
            <h3 className="text-white text-lg font-bold">Quick Enquiry</h3>
            <p className="text-[#666] text-xs mt-0.5">We'll get back to you within 24 hours</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center text-[#666] hover:border-[#e32028] hover:text-[#e32028] transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-14 gap-4">
            <div className="w-16 h-16 rounded-full bg-[#e32028]/15 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 16l8 8L26 8" stroke="#e32028" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-white font-bold text-base">Enquiry Submitted!</p>
            <p className="text-[#666] text-sm">Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-xs font-semibold uppercase tracking-wide">Your Name</label>
                <input
                  name="name" value={form.name} onChange={handle} required
                  placeholder="John Doe"
                  className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#e32028] transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#888] text-xs font-semibold uppercase tracking-wide">Phone Number</label>
                <input
                  name="phone" value={form.phone} onChange={handle} required
                  placeholder="+91 98765 43210"
                  className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#e32028] transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-xs font-semibold uppercase tracking-wide">Email Address</label>
              <input
                name="email" value={form.email} onChange={handle} required type="email"
                placeholder="john@example.com"
                className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#e32028] transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-xs font-semibold uppercase tracking-wide">Service Interested In</label>
              <select
                name="service" value={form.service} onChange={handle}
                className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#e32028] transition-colors duration-200 text-white"
              >
                <option value="" className="text-[#444]">Select a service</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#888] text-xs font-semibold uppercase tracking-wide">Message</label>
              <textarea
                name="message" value={form.message} onChange={handle} rows={3}
                placeholder="Tell us about your project..."
                className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#e32028] transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e32028] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#c41c22] transition-colors duration-200 shadow-[0_0_20px_rgba(227,32,40,0.3)] hover:shadow-[0_0_30px_rgba(227,32,40,0.5)] mt-1"
            >
              Send Enquiry
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [enquiryOpen, setEnquiryOpen]   = useState(false);
  const closeTimer = useRef(null);

  const openServices  = () => { clearTimeout(closeTimer.current); setServicesOpen(true); };
  const closeServices = () => { closeTimer.current = setTimeout(() => setServicesOpen(false), 300); };
  const location = useLocation();

  const linkClass = (path) =>
    `no-underline text-[0.95rem] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap py-2 md:py-0 ${
      location.pathname === path ? "text-[#e32028]" : "text-[#cccccc] hover:text-[#e32028]"
    }`;

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="bg-[#0a0a0a] border-b border-[#1e1e1e] h-10 flex items-center overflow-hidden">

        {/* Red GoBright label */}
        <div className="shrink-0 bg-[#e32028] h-full flex items-center px-5 gap-2 shadow-[4px_0_16px_rgba(227,32,40,0.4)]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-white text-[0.68rem] font-extrabold uppercase tracking-[0.18em] whitespace-nowrap">GoBright</span>
        </div>

        {/* Scrolling marquee */}
        <div className="flex-1 overflow-hidden mx-3 relative">
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
                <span className="text-[#e32028] text-[10px]">★</span>
                <span className="text-[#999] pr-3">{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right — phone + CTA */}
        <div className="shrink-0 flex items-center gap-3 pr-4 pl-3 border-l border-[#1e1e1e]">
          <a
            href="tel:+918925550774"
            className="hidden sm:flex items-center gap-1.5 text-[#bbb] hover:text-[#e32028] transition-colors duration-200 no-underline text-[0.72rem] font-medium"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            +91 89255 50774
          </a>
          <button
            onClick={() => setEnquiryOpen(true)}
            className="bg-[#e32028] hover:bg-[#c41c22] text-white px-3.5 py-1.5 rounded text-[0.7rem] font-bold transition-all duration-200 shadow-[0_0_10px_rgba(227,32,40,0.35)] hover:shadow-[0_0_18px_rgba(227,32,40,0.6)] whitespace-nowrap"
          >
            Free Enquiry
          </button>
        </div>

      </div>

      <header className="bg-[#0d0d0d] sticky top-0 z-50 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-[70px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
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
            className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-8
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

            {/* Contact button — mobile menu */}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="md:hidden mt-2 w-full bg-[#e32028] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c41c22] transition-colors duration-200 no-underline text-center block"
            >
              Let&apos;s Build Together
            </Link>
          </nav>

          {/* Contact button — desktop */}
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

      {/* Enquiry Modal */}
      {enquiryOpen && <EnquiryModal onClose={() => setEnquiryOpen(false)} />}
    </>
  );
}
