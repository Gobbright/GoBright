import BrandStrategy from "./BrandStrategy";
import LogoDesign from "./LogoDesign";
import BrandCollateral from "./BrandCollateral";
import BrandIdentityIntro from "./BrandIdentityIntro";
import BrandGuideline from "./BrandGuideline";
import RebrandingSolution from "./RebrandingSolution";
import WelcomeKitDesign from "./WelcomeKitDesign";
import PackagingDesign from "./PackagingDesign";
import PrintMediaDesign from "./PrintMediaDesign";

export default function Branding() {
  return (
    <main className="service-page min-h-[calc(100vh-70px)] overflow-hidden bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#1b1b1b_0%,#141414_58%,#171717_100%)] text-white">
      <BrandStrategy />
      <LogoDesign />
      <BrandCollateral />
      <BrandIdentityIntro />
      <BrandGuideline />
      <RebrandingSolution />
      <WelcomeKitDesign />
      <PrintMediaDesign />
      <PackagingDesign />
    </main>
  );
}
