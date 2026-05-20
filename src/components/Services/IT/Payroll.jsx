const whyItems = [
  "End-to-end technology solutions",
  "Custom-built scalable systems",
  "SEO & performance-optimized platforms",
  "Dedicated support & maintenance",
  "Local expertise with global standards",
];

const payrollSolutions = [
  "Salary calculations",
  "Tax & compliance management",
  "Attendance integration",
  "Payslip generation",
  "Employee self-service portal",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Payroll({
  tabText = "Payroll Management Software",
  heroImg = null,
}) {
  return (
    <section className="bg-[#0d0d0d] pt-10">

      {/* Tab — touches left edge */}
      <div className="bg-[#e0e0e0] rounded-tr-[1.8rem] inline-flex items-center justify-center px-8 py-3.5">
        <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">{tabText}</span>
      </div>

      {/* Heading + subtitle */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-4 text-center">
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-2">
          Automated Payroll &amp; HR Solutions
        </h2>
        <p className="text-white text-sm md:text-base">
          Simplify employee salary processing with secure payroll systems
        </p>
      </div>

      {/* Tagline */}
      <div className="max-w-7xl mx-auto px-8 pb-4">
        <p className="text-white text-sm font-medium">
          Build Smarter. Grow Faster. Digitally Transform Today
        </p>
      </div>

      {/* Full-width image */}
      <div className="max-w-7xl mx-auto px-8 pb-10">
        <div className="w-full min-h-64 bg-[#d9d9d9] rounded-2xl overflow-hidden">
          {heroImg && (
            <img src={heroImg} alt="Payroll Software" className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      {/* Two cards */}
      <div className="max-w-7xl mx-auto px-8 pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left — Why GoBright */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <p className="text-white font-bold text-base mb-5">Why choose us GoBright</p>
          <ul className="flex flex-col gap-3 mb-5">
            {whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white text-sm">
                <StarIcon /><span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#cccccc] text-sm leading-relaxed">
            We don&apos;t just develop software — we build digital growth engines.
          </p>
        </div>

        {/* Right — Payroll solutions */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <p className="text-white font-bold text-base mb-5">Our payroll solutions include:</p>
          <ul className="flex flex-col gap-3 mb-5">
            {payrollSolutions.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white text-sm">
                <StarIcon /><span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#cccccc] text-sm leading-relaxed">
            Reduce errors. Save time. Ensure compliance.
          </p>
        </div>

      </div>

      {/* Red divider */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <div className="border-t-2 border-[#e32028]" />
      </div>

    </section>
  );
}
