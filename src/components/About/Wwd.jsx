import Mask from "../../assets/About/amico.png";

const bullets = [
  { text: "Brand Strategy & Identity Development", bold: false },
  { text: "Logo Design & Visual Branding", bold: false },
  { text: "Website Design & Development", bold: true },
  { text: "Social Media Marketing", bold: false },
  { text: "Google & Meta Performance Advertising", bold: false },
  { text: "Marketing Automation & CRM Integration", bold: false },
  { text: "Commercial Photography & Videography", bold: false },
  { text: "IT & Technology Solutions", bold: false },
  { text: "Interior & Office Branding", bold: false },
  { text: "Traditional Marketing & Print Solutions", bold: false },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Wwd() {
  return (
    <section className="bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">

        {/* Left — decorative bar + image */}
        <div className="relative flex">

          {/* Red bar on the left — desktop only */}
          <div className="hidden md:block absolute -left-8 top-8 bottom-8 w-20 bg-[#e32028] rounded-r-[60px]" />

          {/* Image */}
          <img src={Mask} alt="What We Do" className="relative z-10 w-full h-full md:ml-10 rounded-2xl object-cover" />
        </div>

        {/* Right — content */}
        <div>
          <h2 className="text-[#e32028] font-bold text-3xl mb-5">What We Do</h2>

          <p className="text-white text-[0.97rem] leading-relaxed mb-4">
            We provide complete end-to-end brand growth solutions:
          </p>

          <p className="text-white text-[0.97rem] leading-relaxed mb-7">
            We specialize in intelligent branding, digital transformation, technology
            development, interior branding, and high-impact content production. Every
            solution we create is tailored based on:
          </p>

          {/* Dark card with bullets */}
          <div className="bg-[#1a1a1a] rounded-2xl px-6 py-5 mb-6">
            <ul className="flex flex-col gap-4">
              {bullets.map(({ text, bold }) => (
                <li key={text} className="flex items-start gap-3 text-white text-[0.93rem]">
                  <StarIcon />
                  <span className={bold ? "font-bold" : "font-normal"}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-white text-[0.97rem] leading-relaxed">
            Our services empower businesses in Trichy and across India to compete
            confidently in both local and global markets.
          </p>
        </div>

      </div>
    </section>
  );
}
