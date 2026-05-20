const healthcareItems = [
  "Medical SEO services",
  "Online reputation management",
  "Appointment booking funnels",
  "Health awareness campaigns",
  "Google ranking optimization",
];

const realEstateItems = [
  "High-conversion landing pages",
  "Real estate Facebook & Instagram ads",
  "Google Search campaigns",
  "Lead automation systems",
  "Property video marketing",
];

const corporateItems = [
  "Branding & brand identity design",
  "Website design & development",
  "Performance marketing campaigns",
  "LinkedIn marketing",
  "Funnel creation & automation",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FeatureCard({ items, footer }) {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6">
      <ul className="flex flex-col gap-3 mb-5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-white text-sm">
            <StarIcon /><span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-[#cccccc] text-sm leading-relaxed">{footer}</p>
    </div>
  );
}

function ImageBlock({ src, alt, accentSide = "right" }) {
  return (
    <div className={`relative ${accentSide === "left" ? "pl-8" : "pr-4"}`}>
      <div
        className={`absolute ${
          accentSide === "left"
            ? "left-0 rounded-r-3xl"
            : "-right-2 rounded-l-3xl"
        } top-6 bottom-6 w-8 bg-[#e32028]`}
      />
      <div className="w-full min-h-52 bg-[#d9d9d9] rounded-2xl overflow-hidden">
        {src && <img src={src} alt={alt} className="w-full h-full object-cover" />}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="max-w-7xl mx-auto px-8 pb-6 text-center">
      <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-3">{title}</h2>
      <p className="text-white text-sm md:text-[0.93rem] leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

export default function Sections({
  healthcareImg = null,
  realEstateImg = null,
  corporateImg = null,
}) {
  return (
    <section className="bg-[#0d0d0d] pt-10">

      {/* ── Healthcare & Clinics ── */}
      <SectionHeader
        title="Healthcare & Clinics"
        subtitle="For hospitals, dental clinics, diagnostic centers, and medical practitioners:"
      />
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <FeatureCard
          items={healthcareItems}
          footer="Build patient trust and increase appointment bookings consistently."
        />
        <ImageBlock src={healthcareImg} alt="Healthcare" accentSide="right" />
      </div>

      {/* ── Real Estate & Builders ── */}
      <SectionHeader
        title="Real Estate & Builders"
        subtitle="We help real estate developers and agents generate quality property leads through:"
      />
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <ImageBlock src={realEstateImg} alt="Real Estate" accentSide="left" />
        <FeatureCard
          items={realEstateItems}
          footer="Target serious buyers — not just inquiries."
        />
      </div>

      {/* ── Corporate & Startups ── */}
      <SectionHeader
        title="Corporate & Startups"
        subtitle="For startups and corporate companies in Trichy:"
      />
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <FeatureCard
          items={corporateItems}
          footer="We position your brand for authority, credibility, and long-term growth."
        />
        <ImageBlock src={corporateImg} alt="Corporate & Startups" accentSide="right" />
      </div>

    </section>
  );
}
