<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons";
import Hero from "./components/Home/Hero/Hero";
import Services from "./components/Home/Services/Services";
import WhyChoose from "./components/Home/WhyChoose/WhyChoose";
import Clients from "./components/Home/Clients/Clients";
import Stats from "./components/Home/Stats/Stats";
import Process from "./components/Home/Process/Process";
import Testimonials from "./components/Home/Testimonials/Testimonials";
import FAQ from "./components/Home/FAQ/FAQ";
import Team from "./components/Home/Team/Team";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Branding from "./components/Services/Branding/Branding";
import DigitalMarketing from "./components/Services/DigitalMarketing/DigitalMarketing";
import IT from "./components/Services/IT/IT";
import Photography from "./components/Services/Photography/Photography";
import OtherServices from "./components/Services/others/OtherServices";
import Industries from "./components/Services/Industries/Industries";
import TermsAndConditions from "./components/Legal/TermsAndConditions";
import PrivacyPolicy from "./components/Legal/PrivacyPolicy";
import RefundPolicy from "./components/Legal/RefundPolicy";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <Clients />
      <Stats />
      <Process />
      <Testimonials />
      <Team />
      <FAQ />
=======
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Footer />
>>>>>>> e90e4c5cb95e9dcc16dc973a43ca5db7251d70da
    </>
  );
}

<<<<<<< HEAD
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Branding />} />
        <Route path="/services/branding-&-brand-identity" element={<Branding />} />
        <Route path="/services/branding-&-identity" element={<Branding />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/services/tech-solutions" element={<IT />} />
        <Route path="/services/photography-&-videography" element={<Photography />} />
        <Route path="/services/other-services" element={<OtherServices />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
      <Footer />
      <FloatingButtons />
    </BrowserRouter>
  );
}
=======
export default App;
>>>>>>> e90e4c5cb95e9dcc16dc973a43ca5db7251d70da
