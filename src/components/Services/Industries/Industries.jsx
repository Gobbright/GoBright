import IndustryHero from "./Industry_hero";
import Restaurants from "./Restuarnts";
import Sections from "./Sections";
import EndSection from "./End_section";

export default function Industries() {
  return (
    <main className="service-page min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#0d0d0d_0%,#141414_58%,#111_100%)] text-white">
      <IndustryHero />
      <Restaurants />
      <Sections />
      <EndSection />
    </main>
  );
}
