import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "What is branding and why is it important?",
    a: (<><span className="text-[#e32028] font-semibold">Branding</span> is the process of creating a strong, unique identity for your business in the minds of your customers. It goes beyond logos and colors — it defines how people feel, think, and trust your brand. Strong branding builds credibility, recognition, emotional connection, and long-term business growth.</>),
  },
  {
    q: "How long does the branding process take?",
    a: "The branding timeline depends on the project scope. A basic brand identity may take 2–4 weeks, while a complete brand transformation can take 6–10 weeks. At GoBright, we focus on quality, clarity, and long-term impact rather than rushing the process.",
  },
  {
    q: "What makes GoBright different from other branding companies?",
    a: (<><span className="text-[#e32028] font-semibold">GoBright</span> is driven by Infinite Imagination. We don't follow templates — we create brand identities from scratch, rooted in strategy, creativity, and purpose. Our family-first culture, multi-disciplinary expertise, and obsession with quality help us deliver branding that stands out, connects emotionally, and performs commercially.</>),
  },
  {
    q: "Do you provide brand guidelines?",
    a: "Yes, GoBright provides a comprehensive Brand Guidelines Document that includes logo usage, colors, typography, tone of voice, visual rules, and brand applications. This ensures consistency across all platforms and future brand communication.",
  },
  {
    q: "What are the key elements of a successful brand?",
    a: (<ul className="list-disc list-inside space-y-1.5">
      <li>Clear brand strategy & positioning</li>
      <li>Strong logo and visual identity</li>
      <li>Consistent messaging and tone of voice</li>
      <li>Emotional connection with the audience</li>
      <li>Seamless experience across all touchpoints</li>
      <li className="list-none text-[#666] mt-2">GoBright ensures all these elements work together as one powerful brand system.</li>
    </ul>),
  },
  {
    q: "What is the difference between branding and marketing?",
    a: "Branding defines who you are; marketing communicates that identity to the world. Branding is the foundation, while marketing is the promotion. Without strong branding, marketing efforts become weak and inconsistent. GoBright helps you build both on a solid strategic base.",
  },
  {
    q: "What does a branding agency like GoBright do?",
    a: (<>As a full-service branding agency, <span className="text-[#e32028] font-semibold">GoBright</span> helps businesses define who they are, how they communicate, and how they are perceived. Our services include brand strategy, logo design, visual identity, digital branding, signage, internal branding, content creation, and complete brand execution across online and offline platforms.</>),
  },
  {
    q: "How do I choose the right branding agency?",
    a: "Choose a branding agency that understands your vision, thinks strategically, and creates original work — not generic designs. Look for clarity, creativity, experience, and long-term thinking. GoBright partners with you as a brand-building ally, not just a service provider.",
  },
  {
    q: "Why do I need a professional branding company?",
    a: "Professional branding builds trust, attracts the right customers, and positions your business above competitors. A branding company like GoBright brings strategic thinking, creative expertise, and execution excellence — saving you time, money, and costly trial-and-error.",
  },
  {
    q: "Is GoBright suitable for startups and growing businesses?",
    a: "Absolutely. We work with startups, SMEs, and established brands. Whether you're launching a new brand or transforming an existing one, GoBright scales its approach to match your business stage and growth goals.",
  },
  {
    q: "What types of branding services does GoBright offer?",
    a: (<>
      <p className="font-semibold text-white mb-2">We offer end-to-end branding solutions including:</p>
      <ul className="list-disc list-inside space-y-1.5">
        <li>Brand strategy & consulting</li>
        <li>Logo & identity design</li>
        <li>Digital & social media branding</li>
        <li>Website branding & UI design</li>
        <li>LED signage, acrylic boards & printing</li>
        <li>Interior & architectural branding</li>
        <li>Product, modelling & commercial photoshoots</li>
        <li>Content creation & brand videos</li>
      </ul>
    </>),
  },
  {
    q: "How can I start a branding project with GoBright?",
    a: "You can start by contacting us for a brand consultation. We'll understand your business, goals, challenges, and vision — then craft a branding solution powered by Infinite Imagination.",
  },
  {
    q: "Do you work with clients outside Trichy?",
    a: (<>Yes! While we are based in <span className="text-[#e32028] font-semibold">Trichy, Tamil Nadu</span>, we work with clients across India and internationally. Our digital-first workflow allows us to collaborate seamlessly with brands anywhere in the world.</>),
  },
  {
    q: "What is the cost of branding services at GoBright?",
    a: "Branding investment varies based on scope, complexity, and deliverables. We offer packages for startups, growing businesses, and enterprise brands. Contact us for a customized quote tailored to your specific needs and budget.",
  },
  {
    q: "Can GoBright redesign my existing brand?",
    a: (<>Absolutely. <span className="text-[#e32028] font-semibold">Brand revamps</span> are one of our specialties. We audit your existing brand, identify gaps, and craft a refreshed identity that retains your brand equity while modernizing your look, feel, and positioning.</>),
  },
  {
    q: "How does GoBright ensure brand consistency?",
    a: "We deliver detailed brand guidelines, templates, and asset libraries so your team can apply your brand consistently across every touchpoint — from social media to signage, packaging to presentations.",
  },
];

function FAQItem({ faq, index, visible }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div
        className={`rounded-xl overflow-hidden border transition-all duration-300 ${
          open ? "border-[#e32028]/50 shadow-[0_0_20px_rgba(227,32,40,0.1)]" : "border-[#2a2a2a] hover:border-[#e32028]/30"
        } bg-[#161616]`}
      >
        {/* Question */}
        <button
          className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
          onClick={() => setOpen(!open)}
        >
          <span className={`text-sm font-semibold leading-snug transition-colors duration-300 ${open ? "text-[#e32028]" : "text-white group-hover:text-[#e32028]"}`}>
            {faq.q}
          </span>
          <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open ? "bg-[#e32028] border-[#e32028] rotate-180" : "border-[#444] group-hover:border-[#e32028]"
          }`}>
            {open
              ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              : <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            }
          </span>
        </button>

        {/* Answer */}
        <div
          className={`transition-all duration-400 overflow-hidden ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-5 pb-5 text-[#999] text-sm leading-relaxed border-t border-[#2a2a2a] pt-4">
            {faq.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const left  = faqs.filter((_, i) => i % 2 === 0);
  const right = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-20 overflow-hidden">

      {/* Glow orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#e32028]/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-[#e32028]/6 blur-[100px] pointer-events-none" />

      {/* Red perspective grid */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: "-20%", right: "-20%", height: "55%",
          backgroundImage: `linear-gradient(rgba(227,32,40,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(227,32,40,0.6) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.55,
          pointerEvents: "none",
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
            <span className="text-[#e32028] text-xs font-semibold tracking-[0.2em] uppercase">FAQ</span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#e32028]" />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Frequently Asked <span className="text-[#e32028]">Questions</span>
          </h2>
          <p className="text-[#666] text-sm max-w-md mx-auto leading-relaxed">
            Everything you need to know about branding and working with GoBright.
          </p>
        </div>

        {/* Mobile: single column / Desktop: two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {left.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i * 2} visible={visible} />
            ))}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-4">
            {right.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i * 2 + 1} visible={visible} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="text-center mt-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "800ms" }}
        >
          <p className="text-[#666] text-sm mb-4">Still have questions? We're happy to help.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#e32028] text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-[#c41c22] transition-all duration-200 no-underline shadow-[0_0_20px_rgba(227,32,40,0.3)] hover:shadow-[0_0_30px_rgba(227,32,40,0.5)]"
          >
            Talk to Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
