import { MediaBlock, RedHeading, SectionLabel, StarList } from "./shared";

const workflows = [
  "Capture and organize leads automatically from multiple channels",
  "Trigger personalized email, SMS, and WhatsApp follow-ups",
  "Track user behavior across websites, landing pages, and campaigns",
  "Segment audiences based on engagement and intent",
  "Nurture prospects through structured sales funnels",
  "Score and qualify leads for faster sales conversion",
];

const solutions = [
  "Faster response times",
  "Improved lead conversion rates",
  "Better customer journey experience",
  "Reduce manual effort",
  "Scalable marketing & sales operations",
];

export default function MarketingAutomation() {
  return (
    <section className="pb-28">
      <SectionLabel>Marketing Automation</SectionLabel>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RedHeading>
          <span className="text-[#e32028]">Best</span> Marketing Automation{" "}
          <span className="text-[#e32028]">Services in Trichy for Scalable Business Growth</span>
        </RedHeading>
        <p className="mx-auto mt-8 max-w-4xl text-center text-base font-medium leading-7 text-white">
          In today's fast-moving digital environment, manual follow-ups and scattered
          communication systems slow down growth and lead to missed opportunities.
        </p>
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-extrabold text-white">
              Marketing Automation & Revenue Growth Strategies
            </h3>
            <p className="mt-6 text-base font-medium leading-7 text-white">
              At GoBright, we implement advanced marketing automation systems that
              streamline your sales process, improve customer engagement, and create
              predictable revenue flow.
            </p>
          </div>
          <MediaBlock />
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <StarList title="We build intelligent automation workflows that :" points={workflows}>
            By integrating CRM platforms, marketing funnels, ad systems, and analytics
            tools, we create a centralized ecosystem where every lead is tracked,
            nurtured, and optimized for conversion.
          </StarList>
          <StarList title="Our automation solution ensure:" points={solutions}>
            With GoBright's marketing automation framework, your business operates
            24/7 - turning visitors into leads and leads into customers with precision
            and consistency.
          </StarList>
        </div>
      </div>
    </section>
  );
}
