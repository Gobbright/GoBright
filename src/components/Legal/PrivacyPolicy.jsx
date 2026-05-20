const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "When you visit our website or fill out an enquiry form, we may collect the following information: your name, company name, email address, phone number, location, and project requirements.",
      "We may also collect non-personal data such as browser type, IP address, pages visited, and time spent on our website through cookies and analytics tools.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use the information collected to respond to your enquiries and provide the services you have requested.",
      "Your contact details may be used to send you project updates, invoices, or relevant service information.",
      "We may use your data to improve our website, analyse traffic patterns, and enhance user experience.",
      "We will never sell, rent, or trade your personal information to third parties for marketing purposes.",
    ],
  },
  {
    title: "3. Data Sharing",
    content: [
      "GoBright does not share your personal information with third parties except in the following circumstances:",
      "• With service providers who assist us in running our business (e.g., email platforms, analytics tools) — bound by confidentiality agreements.",
      "• When required by law or government authorities.",
      "• With your explicit consent.",
    ],
  },
  {
    title: "4. Cookies & Tracking",
    content: [
      "Our website uses cookies to enhance your browsing experience and collect analytical data. Cookies are small text files stored on your device.",
      "You can choose to disable cookies through your browser settings. However, disabling cookies may affect the functionality of certain parts of our website.",
      "We use tools like Google Analytics to understand visitor behaviour and improve our website content.",
    ],
  },
  {
    title: "5. Data Security",
    content: [
      "GoBright takes the security of your personal information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorized access, alteration, or disclosure.",
      "While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.",
      "Client project data is retained for a minimum of 2 years for record-keeping and support purposes.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "You have the right to access the personal information we hold about you.",
      "You may request correction or deletion of your personal data by contacting us.",
      "You may opt out of marketing communications at any time by replying 'Unsubscribe' or contacting us directly.",
    ],
  },
  {
    title: "8. Third-Party Links",
    content: [
      "Our website may contain links to third-party websites. GoBright is not responsible for the privacy practices of those websites. We encourage you to review their privacy policies before sharing any information.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: [
      "GoBright reserves the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date.",
      "We encourage you to review this policy periodically to stay informed about how we protect your information.",
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:",
      "Email: gobright.growth@gmail.com",
      "Phone: +91 89255 50774",
      "Address: No. 52/B, First Floor, Paradise Towers Complex, Thennur High Road, Trichy — 620017.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="bg-[#0d0d0d] min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,32,40,0.09),transparent_50%)] pointer-events-none z-0" />

      {/* Red top banner */}
      <div className="bg-[#e32028] py-5 px-6 text-center">
        <p className="text-white font-extrabold text-xl md:text-2xl tracking-wide">
          Privacy Policy
        </p>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-12 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Privacy <span className="text-[#e32028]">Policy</span>
        </h1>
        <p className="text-[#666] text-sm">Last updated: May 2026</p>
        <p className="text-[#aaa] text-sm leading-relaxed mt-4 max-w-2xl">
          At GoBright, we are committed to protecting your privacy. This policy explains how
          we collect, use, and safeguard your personal information.
        </p>
        <div className="mt-6 h-[2px] bg-gradient-to-r from-[#e32028] via-[#e32028]/40 to-transparent" />
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-6 pb-20">
        {sections.map((s) => (
          <div key={s.title} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 sm:p-8">
            <h2 className="text-[#e32028] font-bold text-lg mb-4">{s.title}</h2>
            <div className="flex flex-col gap-3">
              {s.content.map((para, i) => (
                <p key={i} className="text-[#bbb] text-sm leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
