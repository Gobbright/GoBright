import amico from "../../../assets/img/services/service5/img-1.png";
import PageHeroBackdrop from "../../PageHeroBackdrop";
import ServiceLeadForm from "../ServiceLeadForm";

const accessControlItems = [
  "Biometric fingerprint access systems",
  "RFID card access control",
  "Face recognition door access",
  "Multi-door integrated security systems",
  "Time attendance software integration",
];

const benefitItems = [
  "Restrict unauthorized entry",
  "Real-time attendance tracking",
  "Enhanced workplace security",
  "Digital access records & reporting",
  "Reduced internal security risks",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function OtherHeroSection({
  bannerText = "Best Access Control, Networking & CCTV Solutions in Trichy - Smart Security for Businesses & Homes",
  tabText = "Access Control Solutions",
  headingNormal = "Best",
  headingBold = "Access Control",
  headingRed = "System Installation in Trichy",
  description = "Modern businesses require intelligent access management systems to control entry points, protect sensitive areas, and monitor employee attendance. We provide professional access control installation services in Trichy for offices, factories, hospitals, schools, and apartments.",
  heroImg = amico,
}) {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d]">
      <PageHeroBackdrop />

      {/* Red banner */}
      <div className="relative z-10 bg-[#e32028] py-4 px-6 text-center">
        <p className="text-white font-bold text-base md:text-lg leading-snug">{bannerText}</p>
      </div>

      {/* Tab - touches left edge */}
      <div className="relative z-10 bg-[#e0e0e0] rounded-tr-[1.8rem] inline-flex items-center justify-center px-8 py-3.5 mt-10">
        <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">{tabText}</span>
      </div>

      {/* Heading + description */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-8 pb-4 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-3 leading-tight">
          {headingNormal}{" "}
          <span className="font-bold">{headingBold}</span>{" "}
          <span className="text-[#e32028] italic">{headingRed}</span>
        </h1>
        <p className="text-white text-sm md:text-[0.93rem] leading-relaxed max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Two-column: image + form */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

        {/* Left - image with red bar */}
        <div className="relative min-h-80 pl-10">
          <div className="absolute -left-8 top-8 bottom-8 w-16 bg-[#e32028] rounded-r-[50px]" />
          <img src={heroImg} alt={tabText} className="relative z-10 w-full h-full rounded-2xl object-cover" />
        </div>

        {/* Right - service highlights */}
        <ServiceLeadForm service="Other Services" className="w-full" />
      </div>

      {/* Info cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <p className="text-white font-bold text-base mb-5">Access Control Solutions Include</p>
          <ul className="flex flex-col gap-3">
            {accessControlItems.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white text-sm">
                <StarIcon />{item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <p className="text-white font-bold text-base mb-5">Benefits of Installing Access Control Systems</p>
          <ul className="flex flex-col gap-3">
            {benefitItems.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white text-sm">
                <StarIcon />{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
