import logoVarients from "../../../assets/img/services/Logo varients 4.png";

const offerPoints = [
  "100% Custom Logo Concepts",
  "Wordmark, Symbol, and Icon Logos",
  "Delivery Formats: PNG, JPG, SVG, PDF",
  "High-Resolution Output",
  "Print and Digital Ready Formats",
  "Multiple Concept Options",
];

const highlights = [
  "Creative and strategic approach",
  "Suitable for startups, SMEs, and corporate brands",
  "High-resolution output",
  "Print and digital friendly formats",
  "Multiple concept options",
];

export default function LogoDesign() {
  return (
    <section className="bg-[#0b0b0b] pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex justify-end">
          <div className="relative left-[calc(50vw-50%)] w-[min(260px,70vw)] rounded-tl-2xl bg-[#eeeeee] px-10 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
            Logo Design
          </div>
        </div>
        <div className="mx-auto max-w-[1080px] max-lg:mx-6">
          <div className="group relative overflow-hidden rounded-2xl border-2 border-white bg-white shadow-[0_8px_30px_rgba(255,255,255,0.12),0_20px_50px_rgba(0,0,0,0.4)] hover:border-[#e32028] hover:shadow-[0_8px_40px_rgba(255,255,255,0.2),0_20px_60px_rgba(227,32,40,0.25)] transition-all duration-300">
            <img src={logoVarients} alt="Logo design variants" className="w-full h-auto object-contain transition duration-500 group-hover:scale-105" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#e32028] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="pt-12 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-[#e32028]">
            Best Logo Design Services in Trichy - Serving Clients Worldwide
          </h2>
          <p className="mt-4 text-xl font-extrabold text-white">
            Custom Logo Design Solutions
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[960px] gap-10 px-6 md:grid-cols-2 lg:px-0">
          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
            <h3 className="text-center text-xl font-extrabold text-white">
              What We Offer
            </h3>
            <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
              {offerPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="text-xl font-black leading-none text-white">{"\u2605"}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
            <h3 className="text-center text-xl font-extrabold text-white">
              Design Highlights
            </h3>
            <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
              {highlights.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="text-xl font-black leading-none text-white">{"\u2605"}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
