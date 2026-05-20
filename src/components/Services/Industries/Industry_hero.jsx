const retailFeatures = [
  "Local SEO in Trichy",
  "Instagram & Facebook marketing",
  "Festival campaign creatives",
  "WhatsApp marketing automation",
  "Performance ads",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function IndustryHero({ heroImg = null, retailImg = null }) {
  return (
    <section className="bg-[#0d0d0d]">

      {/* Red top banner */}
      <div className="bg-[#e32028] py-4 px-6 text-center">
        <p className="text-white font-bold text-base md:text-lg leading-snug">
          Industries We Serve in Trichy | Digital Marketing &amp; Technology Solutions
        </p>
      </div>

      {/* Tab — touches right edge */}
      <div className="flex justify-end mt-10">
        <div className="bg-[#e0e0e0] rounded-tl-[1.8rem] inline-flex items-center justify-center px-8 py-3.5">
          <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">
            Industries We Serve
          </span>
        </div>
      </div>

      {/* Heading + description */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-8 text-center">
        <h1 className="text-white font-bold text-3xl md:text-5xl mb-4 leading-tight">
          <span className="text-[#e32028] italic font-semibold">Best </span>
          Industries We Serve{" "}
          <span className="text-[#e32028]">in Trichy</span>
        </h1>
        <p className="text-[#cccccc] text-sm leading-relaxed max-w-2xl mx-auto">
          At <span className="text-[#e32028] font-semibold">GoBright</span>, we provide
          result-driven digital marketing and technology solutions for multiple industries in
          Trichy and across Tamil Nadu. Our strategies are customized based on industry
          behavior, customer psychology, and market competition.
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

        {/* Right — image with red accents on left */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-4 bottom-16 w-8 bg-[#e32028] rounded-r-3xl" />
          <div className="absolute left-2 top-2 h-10 w-6 bg-[#e32028] rounded-r-2xl" />
          <div className="w-full min-h-72 bg-[#d9d9d9] rounded-2xl overflow-hidden">
            {heroImg && (
              <img src={heroImg} alt="Industries We Serve" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

      </div>

      {/* ── Retail & Clothing Section ── */}
      <div className="max-w-7xl mx-auto px-8 pb-4 text-center">
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-3">
          Retail &amp; Clothing Stores in Trichy
        </h2>
        <p className="text-white text-sm md:text-base max-w-2xl mx-auto">
          We help retail brands, textile shops, and fashion stores increase walk-ins and online sales through:
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">

        {/* Left — image with red left accent */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-6 bottom-6 w-8 bg-[#e32028] rounded-r-3xl" />
          <div className="w-full min-h-52 bg-[#d9d9d9] rounded-2xl overflow-hidden">
            {retailImg && (
              <img src={retailImg} alt="Retail Stores" className="w-full h-full object-cover" />
            )}
          </div>
        </div>

        {/* Right — features card */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <ul className="flex flex-col gap-3 mb-5">
            {retailFeatures.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white text-sm">
                <StarIcon /><span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#cccccc] text-sm leading-relaxed">
            <span className="text-white font-semibold">Perfect for:</span> Saree shops,
            family stores, boutiques, and fashion outlets.
          </p>
        </div>

      </div>

    </section>
  );
}
