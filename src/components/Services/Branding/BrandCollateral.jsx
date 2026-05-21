import brandingImg from "../../../assets/img/services/branding.jpg";
import businessCardImg from "../../../assets/img/services/brand-collateral/business-card.svg";
import letterheadImg from "../../../assets/img/services/brand-collateral/letterhead.svg";
import envelopeImg from "../../../assets/img/services/brand-collateral/envelope.svg";
import idCardImg from "../../../assets/img/services/brand-collateral/id-card.svg";
import emailSignatureImg from "../../../assets/img/services/brand-collateral/email-signature.svg";
import brochureImg from "../../../assets/img/services/brand-collateral/brochure-profile.svg";
import flyersImg from "../../../assets/img/services/brand-collateral/flyers-pamphlets.svg";
import postersImg from "../../../assets/img/services/brand-collateral/posters-banners.svg";
import catalogueImg from "../../../assets/img/services/brand-collateral/product-catalogue.svg";
import presentationImg from "../../../assets/img/services/brand-collateral/presentation-deck.svg";
import officeBrandingImg from "../../../assets/img/services/brand-collateral/office-branding.svg";
import exhibitionStallImg from "../../../assets/img/services/brand-collateral/exhibition-stall.svg";
import standeeImg from "../../../assets/img/services/brand-collateral/rollup-standee.svg";
import merchandiseImg from "../../../assets/img/services/brand-collateral/corporate-merchandise.svg";
import BrandingForm from "./BrandingForm";

const benefits = [
  "Builds trust",
  "Enhances brand recall",
  "Establishes professional tone",
  "Strengthens customer perception",
];

const services = [
  { title: "Business Card Design", img: businessCardImg },
  { title: "Letterhead Design", img: letterheadImg },
  { title: "Envelope Design", img: envelopeImg },
  { title: "ID Card Design", img: idCardImg },
  { title: "Email Signature Design", img: emailSignatureImg },
];

const marketingMaterials = [
  { title: "Brochure & Company Profile Design", img: brochureImg },
  { title: "Flyers & Pamphlets", img: flyersImg },
  { title: "Posters & Banners", img: postersImg },
  { title: "Product Catalogue", img: catalogueImg },
  { title: "Presentation Deck Design", img: presentationImg },
];

const corporateMaterials = [
  { title: "Office Branding Graphics", img: officeBrandingImg },
  { title: "Exhibition Stall Design", img: exhibitionStallImg },
  { title: "Roll-up Standee Design", img: standeeImg },
  { title: "Corporate Merchandise Design", img: merchandiseImg },
];

const corporateMaterialSpans = [
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2",
];

const growthPoints = [
  "Creates a consistent brand identity",
  "Builds credibility and trust",
  "Improves brand recall value",
  "Supports marketing campaigns",
  "Enhances overall customer experience",
];

function MaterialCard({ title, img, wide = false, className = "" }) {
  return (
    <article
      className={`group relative flex w-full items-end justify-center overflow-hidden rounded-md bg-[#171717] px-4 pb-5 text-center text-xs font-bold text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 ${
        wide ? "min-h-[260px]" : "min-h-[255px] max-w-[260px]"
      } ${className}`}
    >
      <img
        src={img}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
      <h5 className="relative z-10 max-w-[92%] rounded-sm bg-black/35 px-3 py-2 leading-5 backdrop-blur-[2px]">
        {title}
      </h5>
    </article>
  );
}

export default function BrandCollateral() {
  return (
    <section className="bg-[#0b0b0b] pb-28">
      <div className="mx-auto max-w-7xl">
        <div>
          <div className="px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Best Brand Collateral Design Services in Trichy
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-white">
              At GoBright, we craft strategic brand materials that strengthen
              your visual identity across both print and digital platforms.
              Whether your brand looks unified at every touchpoint.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-extrabold text-[#e32028]">
              What is Brand Collateral?
            </h3>
            <p className="mt-5 text-base font-medium leading-7 text-white">
              Brand collateral refers to all branded materials used to promote,
              represent, and support your business. These assets enable
              consistent brand communication across customer interactions -
              from corporate meetings to large-scale marketing campaigns.
            </p>
          </div>

          <div className="mt-12 grid items-center gap-8 md:grid-cols-[1fr_1fr]">
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h4 className="text-xl font-extrabold text-white">
                Well-designed brand collateral
              </h4>
              <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="text-xl font-black leading-none text-white">{"\u2605"}</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-[#f4f4f4]">
                Consistency in design creates consistency in brand recognition.
              </p>
            </div>

            <div className="relative min-h-[260px]">
              <div className="absolute right-0 top-[-34px] h-[150px] w-[82px] rounded-br-[34px] rounded-tr-[34px] bg-[#e32028]" />
              <img
                src={brandingImg}
                alt="Brand collateral preview"
                className="relative z-10 h-[250px] w-full rounded-md object-cover shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>

          <div className="pt-16 text-center">
            <h3 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Our Brand Collateral Design Services in Trichy
            </h3>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-white">
              We design high-quality, strategic offline brand materials tailored
              to your brand identity and business goals.
            </p>
            <h4 className="mt-8 text-xl font-extrabold text-white">
              Corporate Stationery Design
            </h4>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-white">
              Professional stationery reinforces brand credibility in every
              business interaction.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 justify-items-center gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <MaterialCard key={service.title} title={service.title} img={service.img} />
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 justify-items-center gap-x-16 gap-y-12 sm:grid-cols-2">
            {services.slice(3).map((service) => (
              <MaterialCard key={service.title} title={service.title} img={service.img} />
            ))}
          </div>

          <div className="pt-20 text-center">
            <h3 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Marketing & Promotional Materials
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-white">
              Creative and conversion-focused promotional assets designed to
              attract, engage, and influence customers.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 justify-items-center gap-x-16 gap-y-12 sm:grid-cols-2">
            {marketingMaterials.slice(0, 2).map((service) => (
              <MaterialCard key={service.title} title={service.title} img={service.img} />
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 justify-items-center gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {marketingMaterials.slice(2).map((service) => (
              <MaterialCard key={service.title} title={service.title} img={service.img} />
            ))}
          </div>

          <div className="pt-20 text-center">
            <h3 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Corporate Branding Materials
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-white">
              Strengthen your brand presence across office environments,
              exhibitions, and events.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-5">
            {corporateMaterials.map((service, index) => (
              <MaterialCard
                key={service.title}
                title={service.title}
                img={service.img}
                wide
                className={corporateMaterialSpans[index]}
              />
            ))}
          </div>

          <div className="pt-20 text-center">
            <h3 className="text-3xl font-extrabold leading-tight text-[#e32028]">
              Why Brand Collateral is Important for Business Growth?
            </h3>
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
            <h4 className="text-left text-xl font-extrabold text-[#e32028] md:pl-[22%]">
              Our branding services in Trichy include:
            </h4>
            <ul className="mt-5 max-w-[520px] space-y-4 text-base font-medium text-[#f3f3f3] md:pl-[22%]">
              {growthPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="shrink-0 text-xl font-black leading-none text-white">{"\u2605"}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-sm leading-6 text-[#f4f4f4]">
              Strong visual consistency leads to stronger market positioning.
            </p>
          </div>

          {/* ── Enquiry Form ── */}
          <div className="mt-16 grid gap-12 items-center lg:grid-cols-[1fr_520px]">
            <div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Need Brand <span className="text-[#e32028]">Collateral</span> Design?
              </h3>
              <p className="mt-4 text-base font-medium leading-7 text-[#aaa] max-w-md">
                Get professionally designed business cards, brochures, banners, and more — all aligned to your brand identity.
              </p>
            </div>
            <BrandingForm />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
