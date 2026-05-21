import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const navPrimary = [
  { label: "Home",       to: "/"        },
  { label: "Services",   to: "/services" },
  { label: "Contact us", to: "/contact"  },
];
const navSecondary = [
  { label: "About us",             to: "/about"             },
  { label: "Terms and Conditions", to: "/terms-and-conditions" },
  { label: "Privacy Policy",       to: "/privacy-policy"    },
  { label: "Refund Policy",        to: "/refund-policy"     },
];
const servicesList = [
  { label: "Branding & Brand identity",   to: "/services/branding-&-brand-identity"   },
  { label: "Digital Marketing",           to: "/services/digital-marketing"            },
  { label: "Tech Solutions",              to: "/services/tech-solutions"               },
  { label: "Photography & Videography",   to: "/services/photography-&-videography"   },
  { label: "Other Services",              to: "/services/other-services"               },
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ContactEnquiry() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const inputClass = "bg-white border border-[#d8d8d8] rounded-lg px-4 py-2.5 text-[#111] text-sm placeholder-[#8a8a8a] focus:outline-none focus:border-[#e32028] focus:shadow-[0_0_0_3px_rgba(227,32,40,0.12)] transition-all duration-200 w-full";

  return (
    <section className="bg-[#0d0d0d] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left — Location */}
        <div className="flex flex-col gap-7">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[2px] bg-[#e32028]" />
              <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Find Us</span>
            </div>
            <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">
              Visit <span className="text-[#e32028]">GoBright</span>
            </h3>
            <p className="text-[#666] text-sm leading-relaxed max-w-sm">
              We're always happy to meet in person. Come visit us or reach out through any channel below.
            </p>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden border border-[#2a2a2a] w-full h-64 sm:h-72">
            <iframe
              title="GoBright Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9177165443275!2d78.68266737451772!3d10.817608858433841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5d9bcffb7e7%3A0xb301280f35b47dbf!2sGoBright%20%7C%20Branding%20%26%20Digital%20Marketing%20Agency%2C%20Trichy!5e0!3m2!1sen!2sin!4v1779189812320!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* Right — Enquiry Form */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[2px] bg-[#e32028]" />
              <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
            </div>
            <h3 className="text-white text-2xl sm:text-3xl font-bold">
              Send an <span className="text-[#e32028]">Enquiry</span>
            </h3>
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-14 gap-4 bg-[#111] border border-[#2a2a2a] rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-[#e32028]/15 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 16l8 8L26 8" stroke="#e32028" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-white font-bold text-base">Message Sent!</p>
              <p className="text-[#666] text-sm">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4 rounded-2xl bg-white p-5 sm:p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#333] text-xs font-semibold uppercase tracking-wide">Your Name</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="John Doe" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#333] text-xs font-semibold uppercase tracking-wide">Phone</label>
                  <input name="phone" value={form.phone} onChange={handle} required placeholder="+91 98765 43210" className={inputClass} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#333] text-xs font-semibold uppercase tracking-wide">Email</label>
                <input name="email" value={form.email} onChange={handle} required type="email" placeholder="john@example.com" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#333] text-xs font-semibold uppercase tracking-wide">Message</label>
                <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Tell us about your project or requirement..." className={`${inputClass} resize-none`} />
              </div>
              <button
                type="submit"
                className="w-full bg-[#e32028] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#c41c22] transition-all duration-200 shadow-[0_0_20px_rgba(227,32,40,0.3)] hover:shadow-[0_0_30px_rgba(227,32,40,0.5)] mt-1"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const hideContactEnquiry =
    pathname === "/contact" ||
    pathname.startsWith("/services") ||
    pathname === "/industries";

  return (
    <>
    {!hideContactEnquiry && <ContactEnquiry />}
    <footer className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">

        <div className="mb-10">
          <img src={logo} alt="GoBright" className="h-17.5 w-auto object-contain" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shrink-0">
                <PhoneIcon />
              </span>
              <span className="text-[0.95rem] text-[#cccccc]">+91 89255 50774</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shrink-0">
                <MailIcon />
              </span>
              <span className="text-[0.95rem] text-[#cccccc]">gobright.growth@gmail.com</span>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shrink-0 mt-0.5">
                <MapIcon />
              </span>
              <address className="not-italic text-[0.95rem] text-[#cccccc] leading-relaxed">
                GoBright,<br />
                Paradise Towers Complex,<br />
                No. 52/B, First Floor,<br />
                Thennur High Road, TRICHY - 620017.
              </address>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:pl-16">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-1 border-b border-[#2a2a2a] pb-2">Quick Links</h3>
            {navPrimary.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              {navSecondary.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-[#aaaaaa] text-[0.92rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-[0.15em] mb-1 border-b border-[#2a2a2a] pb-2">Our Services</h3>
            {servicesList.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-white text-[0.95rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              >
                {label}
              </Link>
            ))}

            <div className="mt-5">
              <p className="text-[#e32028] font-semibold text-[0.95rem] mb-3">Stay Connected</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <FacebookIcon />, href: "#" },
                  { icon: <InstagramIcon />, href: "#" },
                  { icon: <YoutubeIcon />, href: "#" },
                  { icon: <LinkedInIcon />, href: "#" },
                ].map(({ icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black hover:bg-[#e32028] hover:text-white transition-colors duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-[#2a2a2a] mt-4">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <p className="text-[#888888] text-sm">©Copyrights 2026 GoBright</p>
        </div>
      </div>
    </footer>
    </>
  );
}
