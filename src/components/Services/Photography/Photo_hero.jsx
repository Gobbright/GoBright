const productImageItems = [
  "Amazon & Flipkart listings",
  "Shopify & WooCommerce stores",
  "Instagram & Facebook ads",
  "Print catalogues & brochures",
  "Website hero banners",
];

const weProvideItems = [
  "White background product shoots",
  "Lifestyle & contextual photography",
  "360-degree product photography",
  "Creative concept shoots",
  "High-resolution retouched images",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const corporateItems = [
  "Office environment shoots",
  "Leadership & executive portraits",
  "Team photography",
  "Manufacturing & industrial operations",
  "Corporate events & conferences",
];

export default function PhotoHero({
  tabText = "Photography",
  heroImg = null,
  productImg = null,
  corporateImg = null,
}) {
  return (
    <section className="bg-[#0d0d0d]">

      {/* Red top banner */}
      <div className="bg-[#e32028] py-4 px-6 text-center">
        <p className="text-white font-bold text-base md:text-lg leading-snug">
          Best Commercial Photography &amp; Videography Services
          <br className="hidden md:block" /> in Trichy for Brands &amp; Businesses
        </p>
      </div>

      {/* Tab — touches left edge */}
      <div className="bg-[#e0e0e0] rounded-tr-[1.8rem] inline-flex items-center justify-center px-8 py-3.5 mt-10">
        <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">{tabText}</span>
      </div>

      {/* Heading + description */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-8 text-center">
        <h1 className="text-white font-bold text-3xl md:text-5xl mb-4 leading-tight">
          <span className="text-[#e32028] italic font-semibold">Professional Commercial </span>
          Photography{" "}
          <span className="text-[#e32028]">Services in Trichy</span>
        </h1>
        <p className="text-[#cccccc] text-sm leading-relaxed max-w-2xl mx-auto">
          At GoBright, we are a leading commercial photography and videography company in
          Trichy helping brands create powerful visual content that increases engagement,
          builds authority, and drives sales.
        </p>
      </div>

      {/* Two-column: form left, image right */}
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left — contact form */}
        <div className="rounded-2xl bg-white p-7 shadow-[0_12px_50px_rgba(0,0,0,0.18)] flex flex-col gap-3">
          <div className="text-center mb-2">
            <p className="font-extrabold text-xl text-[#e32028]">Ready to Grow?</p>
            <p className="text-sm font-bold text-[#111] mt-1">Your GoBright Growth Partner is Here.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Company Name"  className="h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-sm text-[#333] placeholder-[#aaa] outline-none focus:border-[#e32028] transition-colors" />
            <input type="text" placeholder="Customer Name" className="h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-sm text-[#333] placeholder-[#aaa] outline-none focus:border-[#e32028] transition-colors" />
          </div>
          <input type="tel"   placeholder="Mobile Number" className="h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-sm text-[#333] placeholder-[#aaa] outline-none focus:border-[#e32028] transition-colors" />
          <input type="email" placeholder="Email"         className="h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-sm text-[#333] placeholder-[#aaa] outline-none focus:border-[#e32028] transition-colors" />
          <input type="text"  placeholder="Location"      className="h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-sm text-[#333] placeholder-[#aaa] outline-none focus:border-[#e32028] transition-colors" />
          <textarea placeholder="Requirements" rows={4} className="w-full rounded-lg border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-[#333] placeholder-[#aaa] outline-none focus:border-[#e32028] transition-colors resize-none" />
          <div className="flex justify-center mt-1">
            <button type="submit" className="rounded-full bg-[#e32028] px-10 py-3 text-sm font-extrabold text-white shadow-[0_6px_24px_rgba(227,32,40,0.4)] hover:bg-[#c81d24] hover:shadow-[0_8px_32px_rgba(227,32,40,0.55)] transition-all duration-200">
              Let&apos;s Grow Together
            </button>
          </div>
        </div>

        {/* Right — image with red accents on right */}
        <div className="relative pr-4">
          <div className="w-full min-h-72 bg-[#d9d9d9] rounded-2xl overflow-hidden">
            {heroImg && (
              <img src={heroImg} alt="Photography Services" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="absolute -right-2 top-8 bottom-8 w-8 bg-[#e32028] rounded-l-3xl" />
          <div className="absolute -right-1 bottom-4 h-10 w-6 bg-[#e32028] rounded-l-2xl" />
        </div>

      </div>

      {/* ── Product Photography Section ── */}
      <div className="max-w-7xl mx-auto px-8 pb-6">
        <h2 className="text-[#e32028] font-bold text-xl md:text-2xl mb-6">
          Product Photography for E-Commerce &amp; Advertising
        </h2>

        {/* Full-width image */}
        <div className="w-full min-h-64 bg-[#d9d9d9] rounded-2xl overflow-hidden mb-8">
          {productImg && (
            <img src={productImg} alt="Product Photography" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <p className="text-white font-bold text-base mb-5">High-conversion product images for:</p>
            <ul className="flex flex-col gap-3">
              {productImageItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <p className="text-white font-bold text-base mb-5">We provide:</p>
            <ul className="flex flex-col gap-3">
              {weProvideItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Corporate & Industrial Photography Section ── */}
      <div className="max-w-7xl mx-auto px-8 pb-14">
        <h2 className="text-white font-bold text-xl md:text-2xl text-center mb-8">
          Corporate &amp; Industrial Photography
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left — image with red left accent */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-6 bottom-6 w-8 bg-[#e32028] rounded-r-3xl" />
            <div className="w-full min-h-64 bg-[#d9d9d9] rounded-2xl overflow-hidden">
              {corporateImg && (
                <img src={corporateImg} alt="Corporate Photography" className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          {/* Right — label + card */}
          <div className="flex flex-col gap-4">
            <p className="text-[#e32028] font-bold text-base md:text-lg">
              Professional visuals that build brand credibility :
            </p>
            <div className="bg-[#1a1a1a] rounded-2xl p-6">
              <p className="text-white font-bold text-base mb-5">We cover :</p>
              <ul className="flex flex-col gap-3 mb-5">
                {corporateItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white text-sm">
                    <StarIcon /><span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#cccccc] text-sm leading-relaxed">
                Strong corporate imagery enhances brand trust and improves marketing performance.
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
