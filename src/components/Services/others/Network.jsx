import cctv from "../../../assets/services/other-services.jpg";

const solutionItems = [
  "HD & 4K CCTV cameras",
  "IP camera installation",
  "Dome & bullet cameras",
  "Night vision & infrared cameras",
  "PTZ (Pan-Tilt-Zoom) cameras",
  "NVR & DVR setup",
  "Remote mobile viewing setup",
];

const whyItems = [
  "24/7 security monitoring",
  "Theft & crime prevention",
  "Evidence recording & backup",
  "Remote access from mobile",
  "Insurance & compliance support",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Network({
  tabText = "Networking & CCTV Solution",
  heading = "CCTV Camera Installation Services in Trichy",
  subtitle = "We provide professional CCTV installation in Trichy for commercial, industrial, and residential properties with advanced monitoring capabilities.",
  heroImg = cctv,
}) {
  return (
    <section className="bg-[#0d0d0d] pt-10">

      {/* Tab — touches right edge */}
      <div className="flex justify-end">
        <div className="bg-[#e0e0e0] rounded-tl-[1.8rem] px-8 py-3.5 flex items-center justify-center">
          <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">{tabText}</span>
        </div>
      </div>

      {/* Heading + subtitle */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-6 text-center">
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-3">{heading}</h2>
        <p className="text-white text-sm md:text-[0.93rem] leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Two-column: cards left, image right */}
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Left — two stacked cards */}
        <div className="flex flex-col gap-5">
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <p className="text-white font-bold text-base mb-5">Our CCTV Surveillance Solutions Include</p>
            <ul className="flex flex-col gap-3">
              {solutionItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-6">
            <p className="text-white font-bold text-base mb-5">Why Your Business Needs CCTV Surveillance</p>
            <ul className="flex flex-col gap-3 mb-4">
              {whyItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[#cccccc] text-sm leading-relaxed">
              We install CCTV systems for shops, warehouses, corporate offices, apartments, factories, and commercial buildings across Trichy.
            </p>
          </div>
        </div>

        {/* Right — single image */}
        <div className="w-full h-full min-h-80">
          <img src={heroImg} alt="CCTV cameras" className="w-full h-full object-cover rounded-2xl" />
        </div>
      </div>

      {/* ── Business Networking Section ── */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-4 text-center">
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-3">
          Business Networking & IT Infrastructure Solutions in Trichy
        </h2>
        <p className="text-white text-sm md:text-[0.93rem] leading-relaxed max-w-2xl mx-auto">
          A stable and secure network infrastructure is the backbone of every modern organization.
          We provide structured networking solutions in Trichy that ensure high-speed connectivity,
          secure data transfer, and uninterrupted operations.
        </p>
      </div>

      {/* Two cards side by side */}
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] rounded-2xl p-6 text-center">
          <p className="text-white font-bold text-base mb-5">Our Networking Services Include</p>
          <div className="flex justify-center">
            <ul className="flex flex-col gap-3">
              {[
                { text: "LAN & WAN configuration", bold: false },
                { text: "Structured cabling installation", bold: false },
                { text: "WiFi setup & enterprise configuration", bold: true },
                { text: "Router & managed switch setup", bold: false },
                { text: "Firewall configuration & network security", bold: false },
                { text: "Server rack installation", bold: false },
                { text: "Complete office IT infrastructure planning", bold: false },
              ].map(({ text, bold }) => (
                <li key={text} className="flex items-center gap-3 text-white text-sm">
                  <StarIcon />
                  <span className={bold ? "font-bold" : ""}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-6 text-center">
          <p className="text-white font-bold text-base mb-5">Benefits of Professional Network Setup</p>
          <div className="flex justify-center">
            <ul className="flex flex-col gap-3">
              {[
                { text: "Faster data transmission", bold: false },
                { text: "Stable internet connectivity", bold: false },
                { text: "Secure internal communication", bold: true },
                { text: "Scalable business infrastructure", bold: false },
                { text: "Minimal downtime & maintenance", bold: false },
              ].map(({ text, bold }) => (
                <li key={text} className="flex items-center gap-3 text-white text-sm">
                  <StarIcon />
                  <span className={bold ? "font-bold" : ""}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Why Choose section ── */}
      <div className="max-w-7xl mx-auto px-8 pb-4 text-center">
        <h2 className="text-[#e32028] font-bold text-2xl md:text-3xl mb-6">
          Why Choose Our Security & Networking Services in Trichy?
        </h2>
        <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <p className="text-white font-bold text-base mb-5">Benefits of Professional Network Setup</p>
          <div className="flex justify-center mb-5">
            <ul className="flex flex-col gap-3">
              {[
                { text: "Experienced certified technicians", bold: false },
                { text: "Branded surveillance equipment", bold: false },
                { text: "Customized site-based security planning", bold: true },
                { text: "On-time professional installation", bold: false },
                { text: "AMC & maintenance support", bold: false },
                { text: "Affordable and scalable solutions", bold: false },
              ].map(({ text, bold }) => (
                <li key={text} className="flex items-center gap-3 text-white text-sm">
                  <StarIcon />
                  <span className={bold ? "font-bold" : ""}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[#cccccc] text-sm leading-relaxed">
            We focus on long-term reliability, technical precision, and business-grade security infrastructure.
          </p>
        </div>
      </div>

      {/* Red divider line */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">
        <div className="border-t-2 border-[#e32028]" />
      </div>

    </section>
  );
}
