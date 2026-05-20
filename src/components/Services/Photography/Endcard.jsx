const whyFeatures = [
  "Advanced 4K & cinematic camera equipment",
  "Drone videography available",
  "Professional lighting & studio setup",
  "Creative direction & script support",
  "SEO & marketing-focused content planning",
  "Fast turnaround & professional delivery",
];

const industryItems = [
  "E-Commerce Brands",
  "D2C Product Companies",
  "Real Estate Developers",
  "Manufacturing & Industrial Businesses",
  "IT & Technology Companies",
  "Hospitality & Healthcare Brands",
  "Corporate Enterprises",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Endcard({ supportImg = null }) {
  return (
    <section className="bg-[#0d0d0d] pt-10">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-8 leading-snug">
          <span className="text-[#e32028]">Why We Are One of the Best Commercial </span>
          <span className="text-white">Photography &amp; </span>
          <span className="text-white">Videography </span>
          <span className="text-[#e32028]">Companies in Trichy</span>
        </h2>

        {/* Feature list card */}
        <div className="bg-[#1a1a1a] rounded-2xl px-10 py-7 mb-10">
          <ul className="flex flex-col gap-3 mb-5">
            {whyFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white text-sm">
                <StarIcon /><span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-[#cccccc] text-sm leading-relaxed">
            We combine creativity, storytelling, and marketing psychology to create
            performance-driven visual assets.
          </p>
        </div>

        {/* Bottom row: industries card + image with red accent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-10">

          {/* Left — industries card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <p className="text-white font-bold text-base mb-5">
              Our commercial production services support :
            </p>
            <ul className="flex flex-col gap-3">
              {industryItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — image with red accent on right */}
          <div className="relative pr-4">
            <div className="w-full min-h-64 bg-[#d9d9d9] rounded-2xl overflow-hidden">
              {supportImg && (
                <img src={supportImg} alt="Production Services" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="absolute -right-2 top-8 bottom-8 w-8 bg-[#e32028] rounded-l-3xl" />
            <div className="absolute -right-1 bottom-4 h-10 w-6 bg-[#e32028] rounded-l-2xl" />
          </div>

        </div>

        {/* Red divider */}
        <div className="border-t-2 border-[#e32028] pb-8" />

      </div>

    </section>
  );
}
