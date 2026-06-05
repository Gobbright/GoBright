import ServiceLeadForm from "./ServiceLeadForm";

export default function ServiceContactSection({
  service = "",
  title = "Ready to Start Your Project?",
  text = "Share your requirement with GoBright. We will review your goals and suggest the right branding, marketing, technology, or creative solution.",
}) {
  const titleWords = title.trim().split(/\s+/);
  const lastWord = titleWords.pop() || "";
  const firstWords = titleWords.join(" ");

  return (
    <section className="px-6 pb-24 pt-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)] md:text-4xl">
            {firstWords} <span className="text-[#e32028]">{lastWord}</span>
          </h2>
          <div className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-[#e32028] shadow-[0_0_22px_rgba(227,32,40,0.55)]" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-[#f4f4f4]">
            {text}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.4)] scroll-fade-left">
            <iframe
              title="GoBright Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9177165443275!2d78.68266737451772!3d10.817608858433841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5d9bcffb7e7%3A0xb301280f35b47dbf!2sGoBright%20%7C%20Branding%20%26%20Digital%20Marketing%20Agency%2C%20Trichy!5e0!3m2!1sen!2sin!4v1779189812320!5m2!1sen!2sin"
              width="100%"
              height="520"
              style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="scroll-fade-right">
            <ServiceLeadForm service={service} title="Get a Quote" className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
