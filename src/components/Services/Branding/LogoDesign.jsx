import logoVariants from "../../../assets/services/Logo varients 4.png";
import BrandingForm from "./BrandingForm";

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
        <div className="mx-auto max-w-[1080px] overflow-hidden rounded-br-[32px] bg-[#0d1b2b] shadow-[0_24px_70px_rgba(0,0,0,0.5)] max-lg:mx-6">
          <img
            src={logoVariants}
            alt="Ivory Code logo design variants"
            className="block h-auto w-full"
          />
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

        {/* ── Enquiry Form ── */}
        <div className="mt-16 grid gap-12 px-6 lg:px-0 items-center lg:grid-cols-[1fr_520px]">
          <div>
            <h3 className="text-2xl font-extrabold text-white leading-tight">
              Ready to Design Your <span className="text-[#e32028]">Logo?</span>
            </h3>
            <p className="mt-4 text-base font-medium leading-7 text-[#aaa] max-w-md">
              Let GoBright craft a custom logo that becomes the face of your brand — memorable, timeless, and impactful.
            </p>
          </div>
          <BrandingForm />
        </div>
      </div>
    </section>
  );
}
