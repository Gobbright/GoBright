import packagingImg from "../../../assets/img/services/Packaging 2.png";
import BrandingForm from "./BrandingForm";

const points = [
  "Product packaging design",
  "Box packaging design",
  "Label design",
  "Food packaging design",
  "Cosmetic packaging design",
  "Retail Packaging design",
  "E-Commerce packaging design",
];

export default function PackagingDesign() {
  return (
    <section className="packaging-section bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.24),transparent_36%),linear-gradient(180deg,#1b1b1b_0%,#141414_58%,#171717_100%)] pb-28 opacity-100">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="mb-10 flex justify-start">
            <div className="relative left-[calc(50%-50vw)] w-[min(330px,78vw)] rounded-tr-2xl bg-[#eeeeee] px-10 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
              Packaging Designing
            </div>
          </div>

          <div className="px-6 text-center md:px-8">
            <h2 className="text-3xl font-extrabold leading-tight text-white">
              <span className="text-[#e32028]">Best</span> Packaging{" "}
              <span className="text-[#e32028]">Design</span> Service in trichy
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-white">
              Your product packaging is the first impression of your brand. We
              design custom packaging that communicates quality, trust, and
              uniqueness while standing out on shelves and online marketplaces.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-6xl px-6 md:px-8">
            <img
              src={packagingImg}
              alt="Packaging design preview"
              className="w-full rounded-b-[28px] rounded-t-sm border border-white/35 opacity-100 brightness-125 contrast-110 saturate-125 shadow-[0_30px_95px_rgba(227,32,40,0.25)]"
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-white/20 bg-gradient-to-br from-[#303030] to-[#202020] px-8 py-10 shadow-[0_22px_60px_rgba(0,0,0,0.32)] max-lg:mx-6 md:px-16">
            <h3 className="text-left text-xl font-extrabold text-[#e32028] md:pl-[22%]">
              Our packaging solution include:
            </h3>
            <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3] md:pl-[22%]">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="shrink-0 text-white">{"\u2605"}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Enquiry Form ── */}
          <div className="mt-16 grid gap-12 px-6 md:px-8 items-center lg:grid-cols-[1fr_520px]">
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Looking for Custom <span className="text-[#e32028]">Packaging Design?</span>
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#aaa] max-w-md">
                Make your product stand out on the shelf. GoBright creates packaging that reflects your brand and drives purchase decisions.
              </p>
            </div>
            <BrandingForm />
          </div>

          <div className="mx-auto mt-20 h-px max-w-5xl bg-[#e32028]" />
        </div>
      </div>
    </section>
  );
}
