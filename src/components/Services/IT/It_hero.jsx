import amico from "../../../assets/About/amico.png";

const expertiseItems = [
  "E-commerce apps",
  "Service booking apps",
  "Internal business management apps",
  "Enterprise mobility solutions",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function ItHero({
  bannerText = "IT & Technology Solutions Company in Trichy – Web, App & Business Software Experts",
  tabText = "IT & Tech Solutions",
  heroImg = amico,
}) {
  return (
    <section className="bg-[#0d0d0d]">

      {/* Red banner */}
      <div className="bg-[#e32028] py-4 px-6 text-center">
        <p className="text-white font-bold text-base md:text-lg leading-snug">{bannerText}</p>
      </div>

      {/* Tab — touches left edge */}
      <div className="bg-[#e0e0e0] rounded-tr-[1.8rem] inline-flex items-center justify-center px-8 py-3.5 mt-10">
        <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">{tabText}</span>
      </div>

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-6 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
          <span className="text-[#e32028] italic font-semibold">Custom </span>
          <span className="font-bold">IT & Software Development </span>
          <span className="text-[#e32028]">Services for Modern Businesses</span>
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left — description + image */}
        <div className="flex flex-col gap-6">

          {/* Text content */}
          <div>
            <p className="text-[#cccccc] text-sm leading-relaxed mb-4">
              We combine strategy, design, and development to create powerful digital ecosystems
              that improve productivity, customer engagement, and revenue generation.
            </p>
            <p className="text-[#e32028] font-semibold text-sm mb-2">
              Mobile App Development (Android & iOS)
            </p>
            <p className="text-[#cccccc] text-sm leading-relaxed">
              We develop secure and scalable mobile applications tailored to your business needs.
            </p>
          </div>

          {/* Image with red bar on left */}
          <div className="relative flex-1 min-h-72 pl-10">
            <div className="absolute -left-8 top-6 bottom-6 w-16 bg-[#e32028] rounded-r-[50px]" />
            <img
              src={heroImg}
              alt="IT Solutions"
              className="relative z-10 w-full h-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Right — form + expertise card */}
        <div className="flex flex-col gap-6">

          {/* Contact form */}
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

          {/* Expertise card */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <p className="text-white font-bold text-base mb-5">Our expertise includes :</p>
            <ul className="flex flex-col gap-3 mb-4">
              {expertiseItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white text-sm">
                  <StarIcon />{item}
                </li>
              ))}
            </ul>
            <p className="text-[#cccccc] text-sm leading-relaxed">
              We focus on performance, security, and seamless user experience.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
