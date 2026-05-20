import ItHero from "./It_hero";
import Billing from "./Billing";
import Crm from "./Crm";
import Payroll from "./Payroll";

export default function IT() {
  return (
    <main className="service-page min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#1b1b1b_0%,#141414_58%,#171717_100%)] text-white">
      <ItHero />
      <Billing />
      <Crm />
      <Payroll />
    </main>
  );
}
