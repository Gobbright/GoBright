import welcomeKitImg from "../../../assets/img/services/2024-12-10 1.png";
import BrandingForm from "./BrandingForm";

const points = [
  "Office wall branding",
  "Reception area branding",
  "Frosted glass branding",
  "3D acrylic letter signage",
  "Corporate wall graphics",
  "Workspace interior branding",
];

export default function WelcomeKitDesign() {
  return (
    <section className="bg-[#0b0b0b] pb-28">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="mb-10 flex justify-start">
            <div className="relative left-[calc(50%-50vw)] w-[min(370px,86vw)] rounded-tr-2xl bg-[#eeeeee] px-10 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
              Interior & Office Branding
            </div>
          </div>

          <div className="px-6 text-center md:px-8">
            <h2 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Best Office Interior Branding Company in Trichy
            </h2>
            <h3 className="mt-4 text-xl font-extrabold text-white">
              End-to-End Office Branding Execution
            </h3>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-white">
              We are a leading office branding company in Trichy offering
              complete interior branding solutions for corporate offices, IT
              companies, showrooms, educational institutions, and commercial
              spaces.
            </p>
          </div>

          <div className="mt-10 grid items-center gap-8 px-6 md:px-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative">
              <div className="absolute left-[-14px] top-8 h-[240px] w-[64px] rounded-bl-[34px] rounded-tl-[34px] bg-[#e32028]" />
              <img
                src={welcomeKitImg}
                alt="Office interior branding preview"
                className="relative z-10 h-[320px] w-full rounded-md object-cover shadow-[0_22px_60px_rgba(0,0,0,0.4)]"
              />
            </div>

            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h3 className="text-center text-xl font-extrabold text-[#e32028]">
                Our services include:
              </h3>
              <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                {points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="text-xl font-black leading-none text-white">{"\u2605"}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* \u2500\u2500 Enquiry Form \u2500\u2500 */}
          <div className="mt-16 grid gap-12 px-6 md:px-10 items-center lg:grid-cols-[1fr_520px]">
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Brand Your <span className="text-[#e32028]">Office Space?</span>
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#aaa] max-w-md">
                Create a workspace that reflects your brand's values and culture. GoBright delivers end-to-end office interior branding in Trichy.
              </p>
            </div>
            <BrandingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
