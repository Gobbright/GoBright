import rebrandingImg from "../../../assets/services/Untitled-3 3.png";
import BrandingForm from "./BrandingForm";

const rebrandingPoints = [
  "Brand Audit & Analysis - Evaluating your current brand performance",
  "Brand Strategy Redefinition - Clarifying vision, values, and positioning",
  "Visual Identity Redesign - Logo, colors, typography, and design elements",
  "Brand Messaging Update - Clear, consistent, and engaging communication",
  "Brand Guideline Creation - Ensuring consistency across all platforms",
];

export default function RebrandingSolution() {
  return (
    <section className="bg-[#0b0b0b] pb-28">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="mb-10 flex justify-end">
            <div className="relative left-[calc(50vw-50%)] w-[min(330px,78vw)] rounded-tl-2xl bg-[#eeeeee] px-10 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
              Rebranding Solution
            </div>
          </div>

          <div className="px-6 text-center md:px-8">
            <h2 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Best Rebranding Company in Trichy
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-white">
              We are one of the leading rebranding agencies in Trichy offering
              complete brand transformation services for startups, SMEs,
              corporate offices, retail stores, and commercial businesses.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-[1060px] overflow-hidden rounded-tl-[36px] rounded-br-[8px] shadow-[0_22px_60px_rgba(0,0,0,0.4)] max-lg:mx-6">
            <img
              src={rebrandingImg}
              alt="Namma Trip rebranding design preview"
              className="block w-full"
            />
          </div>

          <div className="mx-auto mt-10 max-w-[860px] rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)] max-lg:mx-6">
            <h3 className="text-left text-xl font-extrabold text-[#e32028]">
              Our rebranding services in Trichy include:
            </h3>
            <ul className="mt-5 max-w-[720px] space-y-4 text-base font-medium text-[#f3f3f3]">
              {rebrandingPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="text-xl font-black leading-none text-white">{"\u2605"}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* \u2500\u2500 Enquiry Form \u2500\u2500 */}
          <div className="mt-16 grid gap-12 px-6 md:px-8 items-center lg:grid-cols-[1fr_520px]">
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Time for a <span className="text-[#e32028]">Rebrand?</span>
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#aaa] max-w-md">
                Transform your brand identity and reconnect with your audience. GoBright handles the full rebranding journey from strategy to execution.
              </p>
            </div>
            <BrandingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
