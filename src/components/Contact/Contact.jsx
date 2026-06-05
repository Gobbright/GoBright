import { useState, useEffect } from "react";
import PageHeroBackdrop from "../PageHeroBackdrop";
import { sendContactLead, validateLead } from "../../lib/contactApi";

const INITIAL_FORM = { name: "", email: "", phone: "", service: "", message: "" };
const SERVICES = [
  "Branding & Brand Identity",
  "Digital Marketing",
  "Tech Solutions",
  "Photography & Videography",
  "Other Services",
];

const inputBase =
  "bg-white border rounded-xl px-4 py-3 text-[#111] text-sm placeholder-[#8a8a8a] focus:outline-none transition-colors duration-200 w-full";
const inputNormal = `${inputBase} border-[#d8d8d8] focus:border-[#e32028]`;
const inputError  = `${inputBase} border-[#e32028]/70 focus:border-[#e32028]`;

const contactInfo = [
  {
    label: "Phone",
    value: "+91 89255 50774",
    href: "tel:+918925550774",
    icon: (
      <svg viewBox="0 0 24 24" fill="#e32028" className="w-5 h-5">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
      </svg>
    ),
  },
  {
    label: "Secondary Phone",
    value: "+91 84382 49257",
    href: "tel:+918438249257",
    icon: (
      <svg viewBox="0 0 24 24" fill="#e32028" className="w-5 h-5">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "info.gobrightglobal@gmail.com",
    href: "mailto:info.gobrightglobal@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="#e32028" className="w-5 h-5">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    label: "Email 2",
    value: "gobright.growth@gmail.com",
    href: "mailto:gobright.growth@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="#e32028" className="w-5 h-5">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "No. 52/B, First Floor, Paradise Towers, Thennur High Road, Trichy - 620017",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="#e32028" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  // Auto-reset button to idle 3s after success
  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(t);
  }, [status]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateLead(form, { requireService: true, requireMessage: true });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await sendContactLead(form);
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setServerError(err.message || "Unable to send email. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <main className="bg-[#0d0d0d] min-h-screen">

      {/* -- Hero -- */}
      <section className="py-24 text-center relative overflow-hidden scroll-fade-up">
        <PageHeroBackdrop gridHeight="50%" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#e32028]/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,32,40,0.12),transparent_55%)] pointer-events-none" />
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
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-12 h-[2px] bg-[#e32028]" />
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
            <span className="w-12 h-[2px] bg-[#e32028]" />
          </div>
          <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
            Contact <span className="text-[#e32028]">Us</span>
          </h1>
          <p className="text-[#aaa] text-base leading-relaxed">
            Have a project in mind? We'd love to hear from you. Let's build something great together.
          </p>
        </div>
      </section>

      {/* -- Contact info + Form -- */}
      <section className="pb-16 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 pt-16">

          {/* Left - contact info */}
          <div className="flex flex-col gap-6 scroll-fade-left">
            <div>
              <h2 className="text-white text-2xl font-bold mb-2">Let's <span className="text-[#e32028]">Talk</span></h2>
              <p className="text-[#666] text-sm leading-relaxed">
                We're always happy to connect. Reach out through any channel - we'll get back to you within 24 hours.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-start gap-4 bg-[#111] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#e32028]/50 transition-all duration-300 no-underline group hover:shadow-[0_0_20px_rgba(227,32,40,0.08)]"
                >
                  <span className="w-10 h-10 rounded-full bg-[#e32028]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e32028]/20 transition-colors duration-200">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-[#555] text-xs uppercase tracking-wide mb-1">{c.label}</p>
                    <p className="text-[#ccc] text-sm group-hover:text-[#e32028] transition-colors duration-200">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-[#555] text-xs uppercase tracking-[0.18em] mb-4">Follow Us</p>
              <div className="flex items-center gap-3">

                {/* Instagram */}
                <a href="https://www.instagram.com/gobright.growth" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center text-white hover:border-[#e32028]/60 hover:text-[#e32028] hover:bg-[#e32028]/8 hover:shadow-[0_0_16px_rgba(227,32,40,0.2)] transition-all duration-300"
                  aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/gobright.growth" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center text-white hover:border-[#e32028]/60 hover:text-[#e32028] hover:bg-[#e32028]/8 hover:shadow-[0_0_16px_rgba(227,32,40,0.2)] transition-all duration-300"
                  aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/gobright-growth" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center text-white hover:border-[#e32028]/60 hover:text-[#e32028] hover:bg-[#e32028]/8 hover:shadow-[0_0_16px_rgba(227,32,40,0.2)] transition-all duration-300"
                  aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@gobright.growth" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center text-white hover:border-[#e32028]/60 hover:text-[#e32028] hover:bg-[#e32028]/8 hover:shadow-[0_0_16px_rgba(227,32,40,0.2)] transition-all duration-300"
                  aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#111"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/918925550774" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center text-white hover:border-[#e32028]/60 hover:text-[#e32028] hover:bg-[#e32028]/8 hover:shadow-[0_0_16px_rgba(227,32,40,0.2)] transition-all duration-300"
                  aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </a>

              </div>
            </div>

          </div>

          {/* Right - Form */}
          <div className="scroll-fade-right">
            <h2 className="text-white text-2xl font-bold mb-6">Send a <span className="text-[#e32028]">Message</span></h2>

            <form
              onSubmit={submit}
              noValidate
              className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-8"
            >

              {/* Server error banner */}
              {status === "error" && serverError && (
                <div className="flex items-start gap-3 bg-[#e32028]/10 border border-[#e32028]/40 rounded-xl px-4 py-3 animate-fade-up">
                  <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 mt-0.5 flex-shrink-0">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="text-[#e32028] text-sm">{serverError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#555] text-xs uppercase tracking-wide">Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    placeholder="John Doe"
                    className={errors.name ? inputError : inputNormal}
                  />
                  {errors.name && <p className="text-[#e32028] text-xs mt-0.5">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#555] text-xs uppercase tracking-wide">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handle}
                    placeholder="+91 98765 43210"
                    className={errors.phone ? inputError : inputNormal}
                  />
                  {errors.phone && <p className="text-[#e32028] text-xs mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#555] text-xs uppercase tracking-wide">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handle}
                  type="email"
                  placeholder="john@example.com"
                  className={errors.email ? inputError : inputNormal}
                />
                {errors.email && <p className="text-[#e32028] text-xs mt-0.5">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#555] text-xs uppercase tracking-wide">Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handle}
                  className={errors.service ? inputError : inputNormal}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-[#e32028] text-xs mt-0.5">{errors.service}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#555] text-xs uppercase tracking-wide">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  rows={5}
                  placeholder="Tell us about your project..."
                  className={`${errors.message ? inputError : inputNormal} resize-none`}
                />
                {errors.message && <p className="text-[#e32028] text-xs mt-0.5">{errors.message}</p>}
              </div>

              {/* -- Submit Button - 4 states -- */}
              {status === "success" ? (
                <button
                  type="button"
                  disabled
                  className="w-full bg-[#16a34a] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 animate-glow-green transition-all duration-300 cursor-default"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 animate-scale-in">
                    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)"/>
                    <path d="M7 12l4 4 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Completed
                </button>
              ) : status === "error" ? (
                <button
                  type="submit"
                  className="w-full bg-[#e32028] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 animate-glow-error transition-all duration-200 hover:bg-[#c41c22]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.15)"/>
                    <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                  Try Again
                </button>
              ) : status === "sending" ? (
                <button
                  type="button"
                  disabled
                  className="w-full bg-[#e32028] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 opacity-70 cursor-not-allowed shadow-[0_0_20px_rgba(227,32,40,0.3)]"
                >
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Sending...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#e32028] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#c41c22] transition-all duration-200 shadow-[0_0_20px_rgba(227,32,40,0.3)] hover:shadow-[0_0_35px_rgba(227,32,40,0.55)] animate-glow-pulse flex items-center justify-center gap-2"
                >
                  Send Message
                </button>
              )}

            </form>
          </div>

        </div>
      </section>

      {/* -- Full-width Map -- */}
      <section className="w-full scroll-fade-up">
        <div className="border-t border-[#1a1a1a]">
          <iframe
            title="GoBright Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9177165443275!2d78.68266737451772!3d10.817608858433841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5d9bcffb7e7%3A0xb301280f35b47dbf!2sGoBright%20%7C%20Branding%20%26%20Digital%20Marketing%20Agency%2C%20Trichy!5e0!3m2!1sen!2sin!4v1779189812320!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </main>
  );
}
