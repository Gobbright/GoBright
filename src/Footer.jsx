import logo from "./assets/img/logo.png";

const navPrimary = ["Home", "Services", "Contact us"];
const navSecondary = ["About us", "Terms and Conditions", "Privacy Policy", "Refund Policy"];
const servicesList = [
  "Branding & Brand identity",
  "Digital Marketing",
  "Tech Solutions",
  "Photography & Videography",
  "Other Services",
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.44 7.63 11.22-.1-.97-.2-2.46.04-3.52.22-.96 1.46-6.17 1.46-6.17s-.37-.75-.37-1.85c0-1.74 1.01-3.04 2.26-3.04 1.07 0 1.58.8 1.58 1.76 0 1.07-.68 2.68-1.04 4.17-.3 1.24.62 2.26 1.84 2.26 2.2 0 3.9-2.33 3.9-5.68 0-2.97-2.14-5.05-5.18-5.05-3.53 0-5.6 2.65-5.6 5.38 0 1.07.41 2.21.93 2.84a.37.37 0 0 1 .08.36c-.1.39-.31 1.24-.35 1.41-.06.23-.2.28-.45.17-1.65-.77-2.68-3.19-2.68-5.13 0-4.18 3.04-8.02 8.77-8.02 4.6 0 8.18 3.28 8.18 7.66 0 4.57-2.88 8.24-6.87 8.24-1.34 0-2.61-.7-3.04-1.52l-.83 3.08c-.3 1.15-1.1 2.6-1.64 3.48.65.2 1.34.3 2.04.3 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-8">

        {/* Logo row */}
        <div className="mb-10">
          <img src={logo} alt="GoBright" className="h-17.5 w-auto object-contain" />
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1 — Contact */}
          <div className="flex flex-col gap-7">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shrink-0">
                <PhoneIcon />
              </span>
              <span className="text-[0.95rem] text-[#cccccc]">+91 89255 50774</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shrink-0">
                <MailIcon />
              </span>
              <span className="text-[0.95rem] text-[#cccccc]">gobright.growth@gmail.com</span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shrink-0 mt-0.5">
                <MapIcon />
              </span>
              <address className="not-italic text-[0.95rem] text-[#cccccc] leading-relaxed">
                GoBright,<br />
                Paradise Towers Complex,<br />
                No. 52/B, First Floor,<br />
                Thennur High Road, TRICHY - 620017.
              </address>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-3 md:pl-16">
            {navPrimary.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-white font-semibold text-[1rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              >
                {item}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              {navSecondary.map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-[#aaaaaa] text-[0.92rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 — Services + Social */}
          <div className="flex flex-col gap-3">
            {servicesList.map((s) => (
              <a
                key={s}
                href={`/services/${s.toLowerCase().replace(/ /g, "-")}`}
                className="text-white text-[0.95rem] hover:text-[#e32028] transition-colors duration-200 no-underline"
              >
                {s}
              </a>
            ))}

            {/* Stay Connected */}
            <div className="mt-5">
              <p className="text-[#e32028] font-semibold text-[0.95rem] mb-3">Stay Connected</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <FacebookIcon />, href: "#" },
                  { icon: <InstagramIcon />, href: "#" },
                  { icon: <PinterestIcon />, href: "#" },
                  { icon: <LinkedInIcon />, href: "#" },
                ].map(({ icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black hover:bg-[#e32028] hover:text-white transition-colors duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2a2a2a] mt-4">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <p className="text-[#888888] text-sm">©Copyrights 2026 GoBright</p>
        </div>
      </div>
    </footer>
  );
}
