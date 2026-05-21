import guidelineImg from "../../../assets/img/services/Untitled-2 2.png";
import BrandingForm from "./BrandingForm";

const guidelinePoints = [
  "Logo Usage Rules - Correct logo sizes, spacing, and variations",
  "Color Palette - Primary and secondary brand colors",
  "Typography - Approved fonts and text hierarchy",
  "Brand Voice & Tone - Communication style and messaging",
  "Visual Elements - Icons, imagery, and design patterns",
  "Dos and Don'ts - Clear examples for correct brand usage",
];

const importancePoints = [
  "Ensure consistency across all marketing materials",
  "Strengthen brand recognition and trust",
  "Save time for designers and teams",
  "Maintain a professional and unified brand image",
  "Support long-term brand growth",
];

export default function BrandGuideline() {
  return (
    <section className="bg-[#0b0b0b] pb-28">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="mb-10 flex justify-start">
            <div className="relative left-[calc(50%-50vw)] w-[min(280px,72vw)] rounded-tr-2xl bg-[#eeeeee] px-10 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
              Brand Guideline
            </div>
          </div>

          <div className="grid items-center gap-12 px-6 md:px-10 lg:grid-cols-[1fr_560px]">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold leading-tight text-[#e32028]">
                  Maintain Consistency and Clarity Across Your Brand
                </h2>
                <p className="mt-5 text-base font-medium leading-7 text-white">
                  Our Brand Guidelines service helps businesses maintain a
                  consistent and professional brand identity across all
                  touchpoints. We create clear, easy-to-use guidelines that
                  ensure your brand looks, feels, and sounds the same
                  everywhere.
                </p>
              </div>

              <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
                <h3 className="text-xl font-extrabold text-[#e32028]">
                  What Are Brand Guidelines?
                </h3>
                <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                  {guidelinePoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-xl font-black leading-none text-white">{"\u2605"}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
                <h3 className="text-xl font-extrabold text-[#e32028]">
                  Why Brand Guidelines Are Important
                </h3>
                <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                  {importancePoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-xl font-black leading-none text-white">{"\u2605"}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="absolute right-[-30px] top-[-44px] h-[560px] w-[88px] rounded-br-[42px] rounded-tr-[42px] bg-[#e32028]" />
              <img
                src={guidelineImg}
                alt="Brand guideline design preview"
                className="relative z-10 w-full rounded-md shadow-[0_22px_60px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {/* ── Enquiry Form ── */}
          <div className="mt-16 grid gap-12 px-6 md:px-10 items-center lg:grid-cols-[1fr_520px]">
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Want a <span className="text-[#e32028]">Brand Guideline</span> Document?
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#aaa] max-w-md">
                Ensure your brand stays consistent everywhere. Let GoBright build a complete brand guideline tailored to your identity.
              </p>
            </div>
            <BrandingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
