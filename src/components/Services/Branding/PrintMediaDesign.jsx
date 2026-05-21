import signageImg from "../../../assets/img/services/2024-12-11 1.png";
import BrandingForm from "./BrandingForm";

const signagePoints = [
  "LED sign boards",
  "Glow sign boards",
  "ACP signage boards",
  "3D acrylic letter boards",
  "Outdoor flex boards",
  "Shop name boards",
  "Directional & wayfinding signage",
];

const printingPoints = [
  "Flex banner printing",
  "Vinyl printing",
  "Poster printing",
  "Brochure and flyer printing",
  "Business card printing",
  "Large format printing",
];

export default function PrintMediaDesign() {
  return (
    <section className="bg-[#0b0b0b] pb-28">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="mb-10 flex justify-end">
            <div className="relative left-[calc(50vw-50%)] w-[min(330px,78vw)] rounded-tl-2xl bg-[#eeeeee] px-10 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
              Signage & Printing
            </div>
          </div>

          <div className="px-6 text-center md:px-8">
            <h2 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Best Signage Services in Trichy
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-white">
              Looking for professional signage and printing services in Trichy?
              We provide high-quality indoor and outdoor signage, custom design
              boards, and commercial printing solutions.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="mx-auto w-full max-w-[470px] rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h3 className="text-left text-xl font-extrabold text-[#e32028]">
                Our services include:
              </h3>
              <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                {signagePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="shrink-0 text-xl font-black leading-none text-white">{"\u2605"}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[620px]">
              <div className="absolute -right-4 top-1/2 h-[245px] w-[74px] -translate-y-1/2 rounded-br-[36px] rounded-tr-[36px] bg-[#e32028] max-sm:hidden" />
              <img
                src={signageImg}
                alt="Signage design preview"
                className="relative z-10 aspect-[16/10] w-full rounded-md object-cover shadow-[0_22px_60px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          <div className="px-6 pt-16 text-center md:px-8">
            <h2 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Best Printing Services in Trichy
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-white">
              We offer high-quality digital and large format printing services
              in Trichy for marketing and branding needs.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative hidden min-h-[280px] lg:block">
              <div className="absolute left-0 top-1/2 h-[230px] w-[88px] -translate-y-1/2 rounded-bl-[44px] rounded-tl-[44px] bg-[#e32028]" />
              <div className="absolute left-[88px] right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#e32028] to-transparent" />
            </div>

            <div className="relative mx-auto w-full max-w-[470px] rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h3 className="text-left text-xl font-extrabold text-[#e32028]">
                Our printing services include:
              </h3>
              <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                {printingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="shrink-0 text-xl font-black leading-none text-white">{"\u2605"}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* \u2500\u2500 Enquiry Form \u2500\u2500 */}
          <div className="mt-16 grid gap-12 px-6 md:px-8 items-center lg:grid-cols-[1fr_520px]">
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Need <span className="text-[#e32028]">Signage & Printing</span> Services?
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#aaa] max-w-md">
                From LED sign boards to large format printing \u2014 GoBright delivers high-quality print and signage solutions for your business.
              </p>
            </div>
            <BrandingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
