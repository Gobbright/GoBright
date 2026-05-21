import ItHero from "./It_hero";
import Billing from "./Billing";
import Crm from "./Crm";
import Payroll from "./Payroll";
import techImg from "../../../assets/img/services/tech.jpg";
import billingImg from "../../../assets/img/services/printing-technology.jpg 1.png";
import crmImg from "../../../assets/img/whychoose/growth-analytics.jpg";
import payrollImg from "../../../assets/img/whychoose/data-branding.jpg";

export default function IT() {
  return (
    <main className="service-page min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#1b1b1b_0%,#141414_58%,#171717_100%)] text-white">
      <ItHero heroImg={techImg} />
      <Billing heroImg={billingImg} />
      <Crm heroImg={crmImg} />
      <Payroll heroImg={payrollImg} />
    </main>
  );
}
