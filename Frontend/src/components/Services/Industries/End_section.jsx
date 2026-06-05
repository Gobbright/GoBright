const whyItems = [
  "Industry-specific strategies",
  "Deep local market expertise",
  "ROI-focused campaigns",
  "Creative + performance-driven team",
  "End-to-end digital solutions",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function EndSection() {
  return (
    <section className="bg-[#0d0d0d] pt-10 pb-8">

      <div className="max-w-7xl mx-auto px-8">

        {/* Why Choose GoBright */}
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-6">
          Why Choose GoBright in Trichy?
        </h2>
        <ul className="flex flex-col gap-3 mb-5">
          {whyItems.map((item) => (
            <li key={item} className="flex items-center gap-3 text-white text-sm">
              <StarIcon /><span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-white text-sm leading-relaxed mb-14">
          We understand the <span className="font-bold">Trichy customer mindset</span> and
          build campaigns that convert into real revenue.
        </p>

        {/* CTA block */}
        <div className="text-center mb-12">
          <h3 className="text-[#e32028] font-bold text-xl md:text-2xl mb-4">
            Looking for Digital Marketing Services in Trichy?
          </h3>
          <p className="text-white text-sm leading-relaxed max-w-xl mx-auto mb-8">
            No matter your industry, GoBright helps you build brand visibility, generate
            high-quality leads, and scale revenue with proven digital systems.
          </p>
          <button className="px-8 py-3 rounded-full bg-[#e32028] text-white font-semibold text-sm border-2 border-[#f87171] hover:bg-[#c41e24] transition-colors duration-200">
            Contact GoBright today
          </button>
        </div>

        {/* Red divider */}
        <div className="border-t-2 border-[#e32028]" />

      </div>

    </section>
  );
}
