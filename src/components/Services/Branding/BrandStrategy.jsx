import brandingImg from "../../../assets/img/services/1 21.png";
import BrandingForm from "./BrandingForm";

const strategyPoints = [
  "Brand Research & Market Analysis - Understanding your audience, competitors, and market trends",
  "Brand Purpose & Values - Defining your brand's mission, beliefs, and promise",
  "Unique Value Proposition - Highlighting what makes your brand different",
  "Brand Positioning Statement - Creating a clear and strong brand identity",
  "Brand Messaging & Tone of Voice - Consistent communication across all channels",
];

const whyPoints = [
  "Builds trust and credibility",
  "Creates emotional connection with customers",
  "Helps your brand stand out in competitive markets",
  "Improves brand recognition and loyalty",
  "Supports long-term business growth",
];

export default function BrandStrategy() {
  const inputClass =
    "h-12 w-full rounded-md border border-[#d8d8d8] bg-white px-4 text-sm font-medium text-[#222] outline-none transition placeholder:text-[#8a8a8a] focus:border-[#e32028] focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,32,40,0.12)]";

  return (
    <section className="bg-[#0b0b0b] pb-28">
      <div className="bg-[#e32028] px-5 py-6 text-center text-2xl font-extrabold leading-tight text-white sm:px-8 md:text-[28px]">
        Best Branding & Brand Identity services in Trichy - Serving Clients
        Worldwide
      </div>

      <div className="mx-auto max-w-7xl pt-12">
        <h1 className="relative left-[calc(50%-50vw)] w-[min(390px,88vw)] rounded-tr-2xl bg-[#eeeeee] px-7 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
          Brand Strategy & Positioning
        </h1>

        <div className="grid gap-12 px-6 py-12 md:px-10 lg:grid-cols-[1fr_520px]">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-white">
                Build a Clear, Powerful, and Memorable Brand
              </h2>
              <p className="mt-5 text-base font-medium leading-7 text-white">
                Our brand strategy and positioning services help businesses
                define who they are, what they stand for, and how they are
                perceived in the market. We create strong brand foundations
                that differentiate you from competitors and connect emotionally
                with your target audience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white">
                What is Brand Strategy and Positioning?
              </h2>
              <p className="mt-4 text-base font-medium leading-7 text-white">
                Brand strategy and positioning is the process of shaping your
                brand&apos;s identity, voice, and value in the minds of
                customers. It ensures your brand communicates a clear message,
                builds trust, and stays consistent across all platforms.
              </p>
            </div>

            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h2 className="text-xl font-extrabold text-[#e32028]">
                Our Brand Strategy Services Include
              </h2>
              <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                {strategyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-white">
                      {"\u2605"}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h2 className="text-xl font-extrabold text-[#e32028]">
                Why Brand Positioning Matters
              </h2>
              <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                {whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-white">
                      {"\u2605"}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-8">
            <BrandingForm />

            <div className="relative mx-auto w-full max-w-[520px] pr-7">
              <div className="absolute bottom-[-22px] right-0 h-[310px] w-[72px] rounded-br-[34px] bg-[#e32028]" />
              <img
                src={brandingImg}
                alt="Brand strategy chess visual"
                className="relative z-10 h-[360px] w-full rounded-md object-cover object-[78%_50%] shadow-[0_22px_60px_rgba(0,0,0,0.45)]"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
