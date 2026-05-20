const restaurantServices = [
  "Google Business Profile optimization",
  "Local SEO for restaurants in Trichy",
  "Instagram Reels & food content marketing",
  "Facebook & Instagram ads targeting nearby customers",
  "Festival & seasonal offer campaigns",
  "WhatsApp marketing for repeat customers",
  "Online reputation management",
];

const educationFeatures = [
  "Admission lead generation campaigns",
  "High-converting landing page design",
  "Facebook & Google Ads",
  "Branding & trust building strategies",
  "Parent-targeted advertising",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Restaurants({ restaurantImg = null, educationImg = null }) {
  return (
    <section className="bg-[#0d0d0d] pt-10">

      {/* ── Restaurants Section ── */}
      <div className="max-w-7xl mx-auto px-8 pb-6 text-center">
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-3">
          Restaurants &amp; Food Businesses in Trichy – Digital Marketing Services
        </h2>
        <p className="text-white text-sm md:text-[0.93rem] leading-relaxed max-w-2xl mx-auto">
          We help restaurants, cafes, bakeries, ice cream parlours, and cloud kitchens in Trichy
          grow their local brand presence and increase daily walk-ins with strategic digital
          marketing solutions.
        </p>
      </div>

      {/* Two-column: left cards, right image */}
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Left — services card + strategy block */}
        <div className="flex flex-col gap-6">

          {/* Services card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <p className="text-white font-bold text-base mb-5">
              Our restaurant marketing services include:
            </p>
            <ul className="flex flex-col gap-3">
              {restaurantServices.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategy block */}
          <div className="px-1">
            <p className="text-white font-bold text-base mb-3">
              Our Strategy for Restaurant Growth
            </p>
            <p className="text-[#cccccc] text-sm mb-3">Our focus is simple and result-driven:</p>
            <p className="text-white text-sm font-semibold mb-3">
              Increase visibility → Attract nearby customers → Convert into loyal repeat buyers
            </p>
            <p className="text-[#cccccc] text-sm leading-relaxed mb-3">
              We don&apos;t just run ads — we build strong local restaurant brands that dominate their area.
            </p>
            <p className="text-[#cccccc] text-sm leading-relaxed">
              Position your restaurant as a top local brand in Trichy with structured digital
              marketing strategies designed for consistent growth.
            </p>
          </div>

        </div>

        {/* Right — image with red accent on right */}
        <div className="relative pr-4">
          <div className="w-full min-h-120 bg-[#d9d9d9] rounded-2xl overflow-hidden">
            {restaurantImg && (
              <img src={restaurantImg} alt="Restaurant Marketing" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="absolute -right-2 top-8 bottom-8 w-8 bg-[#e32028] rounded-l-3xl" />
        </div>

      </div>

      {/* ── Educational Institutions Section ── */}
      <div className="max-w-7xl mx-auto px-8 pb-6 text-center">
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-3">
          Educational Institutions &amp; Coaching Centers
        </h2>
        <p className="text-white text-sm md:text-[0.93rem] leading-relaxed max-w-2xl mx-auto">
          We support schools, colleges, tuition centers, and training institutes with:
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">

        {/* Left — image with red left accent */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-6 bottom-6 w-8 bg-[#e32028] rounded-r-3xl" />
          <div className="w-full min-h-52 bg-[#d9d9d9] rounded-2xl overflow-hidden">
            {educationImg && (
              <img src={educationImg} alt="Educational Institutions" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* Right — features card */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <ul className="flex flex-col gap-3 mb-5">
            {educationFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white text-sm">
                <StarIcon /><span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#cccccc] text-sm leading-relaxed font-semibold">
            Increase admissions with structured digital funnels.
          </p>
        </div>

      </div>

    </section>
  );
}
