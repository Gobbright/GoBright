import brandingImg from "../../../assets/img/services/Branding-&-brand-identity/corporate branding materials/img4.png";
import ourCollateral1 from "../../../assets/img/services/Branding-&-brand-identity/our brand collateral design serviecs/img1.png";
import ourCollateral2 from "../../../assets/img/services/Branding-&-brand-identity/our brand collateral design serviecs/img2.png";
import ourCollateral3 from "../../../assets/img/services/Branding-&-brand-identity/our brand collateral design serviecs/img3.png";
import ourCollateral4 from "../../../assets/img/services/Branding-&-brand-identity/our brand collateral design serviecs/img4.png";
import ourCollateral5 from "../../../assets/img/services/Branding-&-brand-identity/our brand collateral design serviecs/img5.png";
import corpBrand0 from "../../../assets/img/services/Branding-&-brand-identity/corporate branding materials/img1.png";
import corpBrand1 from "../../../assets/img/services/Branding-&-brand-identity/corporate branding materials/img2.png";
import corpBrand2 from "../../../assets/img/services/Branding-&-brand-identity/corporate branding materials/img3.png";
import corpBrand3 from "../../../assets/img/services/Branding-&-brand-identity/corporate branding materials/img4.png";
import mktPromo1 from "../../../assets/img/services/Branding-&-brand-identity/marketing & promotion materials/img1.png";
import mktPromo2 from "../../../assets/img/services/Branding-&-brand-identity/marketing & promotion materials/img2.png";
import mktPromo3 from "../../../assets/img/services/Branding-&-brand-identity/marketing & promotion materials/img3.png";
import mktPromo4 from "../../../assets/img/services/Branding-&-brand-identity/marketing & promotion materials/img4.png";
import mktPromo5 from "../../../assets/img/services/Branding-&-brand-identity/marketing & promotion materials/img5.png";

const benefits = [
  "Builds trust",
  "Enhances brand recall",
  "Establishes professional tone",
  "Strengthens customer perception",
];

const services = [
  { title: "Business Card Design", img: ourCollateral1 },
  { title: "Letterhead Design", img: ourCollateral2 },
  { title: "Envelope Design", img: ourCollateral3 },
  { title: "ID Card Design", img: ourCollateral4 },
  { title: "Email Signature Design", img: ourCollateral5 },
];

const marketingMaterials = [
  { title: "Brochure & Company Profile Design", img: mktPromo1 },
  { title: "Flyers & Pamphlets", img: mktPromo2 },
  { title: "Posters & Banners", img: mktPromo3 },
  { title: "Product Catalogue", img: mktPromo4 },
  { title: "Presentation Deck Design", img: mktPromo5 },
];

const corporateMaterials = [
  { title: "Office Branding Graphics", img: corpBrand0 },
  { title: "Exhibition Stall Design", img: corpBrand1 },
  { title: "Roll-up Standee Design", img: corpBrand2 },
  { title: "Corporate Merchandise Design", img: corpBrand3 },
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
      className={`group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white
        border-2 border-white hover:border-[#e32028]
        shadow-[0_8px_30px_rgba(255,255,255,0.12),0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.2),0_20px_60px_rgba(227,32,40,0.25)]
        transition-all duration-300 hover:-translate-y-2
        ${wide ? "min-h-[280px]" : "min-h-[270px] max-w-[280px]"} ${className}`}
    >
      {/* Image */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Red top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#e32028] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Title bar - white bg */}
      <div className="bg-white px-4 py-3 text-center border-t-2 border-transparent group-hover:border-[#e32028] transition-colors duration-300">
        <h5 className="text-xs font-bold leading-5 tracking-wide text-[#111]">
          {title}
        </h5>
      </div>
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

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
            {corporateMaterials.map((service) => (
              <MaterialCard
                key={service.title}
                title={service.title}
                img={service.img}
                wide
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

          </div>
        </div>
      </div>
    </section>
  );
}
