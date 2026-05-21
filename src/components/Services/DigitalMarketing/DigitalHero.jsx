import dmImg from "../../../assets/img/services/digital-marketing.jpg";
import LeadForm from "./LeadForm";

const stats = [
  { num: "6000+", label: "Leads Generated" },
  { num: "150+",  label: "Brands Served"   },
  { num: "5+",    label: "Years Expertise"  },
];

const whyPoints = [
  "Proven results — 6000+ qualified leads in the automobile sector alone",
  "Full-funnel strategy from awareness to conversion",
  "Real-time analytics & transparent monthly reporting",
  "Trichy-based team with deep local market expertise",
  "End-to-end execution — no outsourcing, ever",
];

const serviceTags = [
  "Social Media Marketing",
  "Google Ads",
  "SEO Services",
  "Performance Marketing",
  "Personal Branding",
  "Marketing Automation",
  "Web Development",
];

export default function DigitalHero() {
  return (
    <section className="pb-28">
      {/* Red top banner */}
      <div className="bg-[#e32028] px-5 py-6 text-center text-2xl font-extrabold leading-tight text-white md:text-[28px]">
        Best Digital Marketing Company in Trichy — Performance-Driven
        <br className="hidden sm:block" /> & Brand-Focused Growth
      </div>

      <div className="mx-auto max-w-7xl pt-12">
        {/* Section tab — left-aligned, same style as BrandStrategy */}
        <h1 className="relative left-[calc(50%-50vw)] w-[min(390px,88vw)] rounded-tr-2xl bg-[#eeeeee] px-7 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028]">
          Digital Marketing Services
        </h1>

        <div className="grid gap-12 px-6 py-12 md:px-10 lg:grid-cols-[1fr_520px]">

          {/* ── Left column ── */}
          <div className="space-y-8 scroll-fade-left">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold leading-tight text-white">
                Drive Real Business Growth with<br />
                <span className="text-[#e32028]">Data-Driven Digital Marketing</span>
              </h2>
              <p className="mt-5 text-base font-medium leading-7 text-white">
                At GoBright, we deliver performance-focused digital marketing services in Trichy that
                help businesses build visibility, attract qualified leads, and convert them into loyal
                customers. From social media to SEO, every strategy is crafted with one goal —
                your measurable growth.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-5 text-center shadow-[0_22px_60px_rgba(0,0,0,0.32)] hover:border-[#e32028]/40 transition-colors duration-300"
                >
                  <p className="text-[#e32028] text-2xl font-extrabold">{s.num}</p>
                  <p className="text-white text-xs font-medium mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* What we cover */}
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h2 className="text-xl font-extrabold text-[#e32028] mb-4">What We Cover</h2>
              <div className="flex flex-wrap gap-2">
                {serviceTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#111] border border-[#e32028]/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:border-[#e32028]/70 hover:text-[#e32028] transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Why GoBright */}
            <div className="rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)]">
              <h2 className="text-xl font-extrabold text-[#e32028]">
                Why GoBright for Digital Marketing?
              </h2>
              <ul className="mt-5 space-y-4 text-base font-medium text-[#f3f3f3]">
                {whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-white">&#9733;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right column: form + image ── */}
          <aside className="space-y-8 scroll-fade-right">
            <LeadForm />

            <div className="relative w-full max-w-[520px] pr-7">
              <div className="absolute bottom-[-22px] right-0 h-[280px] w-[72px] rounded-br-[34px] bg-[#e32028]" />
              <img
                src={dmImg}
                alt="Digital marketing strategy"
                className="relative z-10 h-[320px] w-full rounded-md object-cover shadow-[0_22px_60px_rgba(0,0,0,0.45)]"
              />
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
