const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing our website or engaging GoBright for any service, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.",
      "GoBright reserves the right to update these terms at any time. Continued use of our services after any change constitutes your acceptance of the new terms.",
    ],
  },
  {
    title: "2. Services Provided",
    content: [
      "GoBright offers branding, digital marketing, IT & technology solutions, photography & videography, packaging design, signage & printing, and office interior branding services.",
      "All services are provided as agreed in the project proposal or service agreement. GoBright reserves the right to modify or discontinue any service without prior notice.",
      "We do not guarantee specific results (such as ranking positions or lead counts) unless explicitly stated in a signed agreement.",
    ],
  },
  {
    title: "3. Payments & Billing",
    content: [
      "All payments must be made as per the schedule outlined in your project proposal or invoice. GoBright typically requires an advance payment before commencing any project.",
      "Final deliverables will be released only upon full payment. Late payments may attract a delay in project delivery.",
      "Prices are subject to change. Any changes will be communicated in advance before commencement of work.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All creative work, designs, strategies, and content produced by GoBright remain the intellectual property of GoBright until full payment is received.",
      "Upon full payment, ownership of the final deliverables is transferred to the client. GoBright retains the right to showcase the work in its portfolio unless otherwise agreed in writing.",
      "Clients must not reproduce, resell, or redistribute GoBright's strategies, processes, or templates without written consent.",
    ],
  },
  {
    title: "5. Client Responsibilities",
    content: [
      "Clients are responsible for providing accurate information, timely feedback, and required materials (logos, images, brand assets) to ensure smooth project execution.",
      "Delays caused by the client (late approvals, incomplete content delivery) may affect project timelines. GoBright will not be held responsible for such delays.",
      "Clients must ensure all content shared with GoBright does not infringe third-party intellectual property rights.",
    ],
  },
  {
    title: "6. Confidentiality",
    content: [
      "GoBright treats all client business information with strict confidentiality. We will not disclose your business data, strategies, or proprietary information to third parties without your written consent.",
      "Clients also agree not to disclose GoBright's internal processes, pricing structures, or methodologies to competitors or third parties.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "GoBright shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.",
      "Our total liability to any client for any claim shall not exceed the total fees paid by that client for the specific service in question.",
      "GoBright is not responsible for third-party platform changes (Meta, Google, Instagram) that may affect campaign performance.",
    ],
  },
  {
    title: "8. Termination",
    content: [
      "Either party may terminate the agreement with 15 days written notice. Work completed up to the termination date will be billed accordingly.",
      "GoBright reserves the right to terminate services immediately in cases of non-payment, abusive conduct, or violation of these terms.",
      "Upon termination, clients will receive all completed deliverables for which payment has been made.",
    ],
  },
  {
    title: "9. Governing Law",
    content: [
      "These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Trichy, Tamil Nadu.",
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "For any questions regarding these Terms and Conditions, please contact us:",
      "Email: gobright.growth@gmail.com",
      "Phone: +91 89255 50774",
      "Address: No. 52/B, First Floor, Paradise Towers Complex, Thennur High Road, Trichy — 620017.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <main className="bg-[#0d0d0d] min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,32,40,0.09),transparent_50%)] pointer-events-none z-0" />

      {/* Red top banner */}
      <div className="bg-[#e32028] py-5 px-6 text-center">
        <p className="text-white font-extrabold text-xl md:text-2xl tracking-wide">
          Terms and Conditions
        </p>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-12 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Terms &amp; <span className="text-[#e32028]">Conditions</span>
        </h1>
        <p className="text-[#666] text-sm">Last updated: May 2026</p>
        <p className="text-[#aaa] text-sm leading-relaxed mt-4 max-w-2xl">
          These Terms and Conditions govern your use of GoBright's website and services.
          Please read them carefully before engaging with us.
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
