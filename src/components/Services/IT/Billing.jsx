const billingFeatures = [
  "GST-ready billing",
  "Inventory management",
  "Barcode integration",
  "Real-time reports",
  "Multi-user access",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Billing({
  tabText = "Billing Software",
  heroImg = null,
}) {
  return (
    <section className="bg-[#0d0d0d] pt-10">

      {/* Tab — touches right edge */}
      <div className="flex justify-end">
        <div className="bg-[#e0e0e0] rounded-tl-[1.8rem] inline-flex items-center justify-center px-8 py-3.5">
          <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">{tabText}</span>
        </div>
      </div>

      {/* Heading + subtitle */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-6 text-center">
        <h2 className="text-white font-bold text-2xl md:text-3xl mb-3">
          <span className="text-[#e32028] italic font-semibold">Best </span>
          Billing Software{" "}
          <span className="text-[#e32028]">Development</span>
        </h2>
        <p className="text-white font-semibold text-sm md:text-base mb-2">
          Simplified Billing for Retail &amp; Businesses
        </p>
        <p className="text-[#cccccc] text-sm leading-relaxed max-w-xl mx-auto">
          We develop user-friendly billing software designed for accuracy and compliance.
        </p>
      </div>

      {/* Two-column: image left, features card right */}
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left — image with red accent on far left */}
        <div className="relative">
          {/* Red rounded accent peeking from left edge */}
          <div className="absolute -left-4 top-6 bottom-6 w-10 bg-[#e32028] rounded-r-4xl" />
          <div className="w-full min-h-64 bg-[#d9d9d9] rounded-2xl overflow-hidden">
            {heroImg && (
              <img src={heroImg} alt="Billing Software" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* Right — features card */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <p className="text-white font-bold text-base mb-5">Features include:</p>
          <ul className="flex flex-col gap-3 mb-5">
            {billingFeatures.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white text-sm">
                <StarIcon /><span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#cccccc] text-sm leading-relaxed">
            Perfect for retail stores, wholesalers, and service providers.
          </p>
        </div>

      </div>

    </section>
  );
}
