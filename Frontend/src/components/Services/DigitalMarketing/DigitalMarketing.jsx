import DigitalHero from "./DigitalHero";
import MarketingAutomation from "./MarketingAutomation";
import PerformanceMarketing from "./PerformanceMarketing";
import PersonalBranding from "./PersonalBranding";
import SeoServices from "./SeoServices";
import SocialMediaMarketing from "./SocialMediaMarketing";
import WebDevelopment from "./WebDevelopment";
import { pageBg } from "./shared";

export default function DigitalMarketing() {
  return (
    <main className={`service-page min-h-screen overflow-hidden ${pageBg} text-white`}>
      <DigitalHero />
      <SocialMediaMarketing />
      <PersonalBranding />
      <PerformanceMarketing />
      <SeoServices />
      <MarketingAutomation />
      <WebDevelopment />
    </main>
  );
}
