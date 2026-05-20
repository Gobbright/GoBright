const sections = [
  {
    title: "1. Overview",
    content: [
      "GoBright is a creative branding, digital marketing, and technology solutions company based in Trichy, Tamil Nadu. As a service-based business, our refund policy reflects the nature of the work we undertake — which involves significant time, creativity, and resources from our team.",
      "Please read this Refund Policy carefully before engaging our services. By making a payment to GoBright, you agree to the terms outlined in this policy.",
    ],
  },
  {
    title: "2. Advance Payment & Project Initiation",
    content: [
      "GoBright requires an advance payment (typically 50%–100% depending on the project scope) before commencing any work.",
      "This advance payment covers initial research, planning, strategy, and resource allocation.",
      "Advance payments are non-refundable once project work has commenced.",
    ],
  },
  {
    title: "3. Non-Refundable Services",
    content: [
      "The following services are strictly non-refundable once work has begun:",
      "• Brand Strategy & Positioning",
      "• Logo Design & Brand Identity Development",
      "• Social Media Marketing Campaigns (once campaigns are live)",
      "• Google Ads & Meta Ads (once ad spend has been utilized)",
      "• SEO Services (after the first month of work)",
      "• Photography & Videography (after shoot completion)",
      "• Website Design & Development (after design approval)",
      "• Printing, Signage & Packaging (once production has started)",
      "• Interior & Office Branding (once installation has begun)",
    ],
  },
  {
    title: "4. Refund Eligibility",
    content: [
      "A refund may be considered only in the following circumstances:",
      "• GoBright is unable to deliver the agreed service due to circumstances entirely within our control.",
      "• A project is cancelled before any work has commenced and before resources have been allocated.",
      "• A duplicate payment has been made by the client in error.",
      "Refund requests must be submitted in writing to gobright.growth@gmail.com within 7 days of the triggering event.",
    ],
  },
  {
    title: "5. Cancellation Policy",
    content: [
      "If a client wishes to cancel a project mid-way, the following applies:",
      "• All work completed up to the cancellation date will be billed at the agreed rate.",
      "• If the advance paid is less than the value of work completed, the client will be invoiced for the difference.",
      "• If the advance paid exceeds the value of work completed, a partial refund may be issued at GoBright's discretion.",
      "• Cancellation must be communicated in writing with at least 15 days' notice.",
    ],
  },
  {
    title: "6. Revision & Dissatisfaction Policy",
    content: [
      "GoBright offers a defined number of revisions as specified in the project proposal. Dissatisfaction with creative direction is not grounds for a refund if the deliverables align with the agreed brief.",
      "If you are unhappy with the work, we encourage open communication and will make every reasonable effort to address your concerns within the agreed revision scope.",
    ],
  },
  {
    title: "7. Digital Marketing & Ad Spend",
    content: [
      "Ad spend (Meta Ads, Google Ads) paid directly to advertising platforms is non-refundable. GoBright does not control platform refund policies.",
      "Service fees paid to GoBright for managing campaigns are non-refundable once the campaign management period has commenced.",
    ],
  },
  {
    title: "8. Refund Processing",
    content: [
      "Approved refunds will be processed within 7–14 business days via the original payment method or bank transfer.",
      "GoBright will not be responsible for any delays caused by banks or payment gateways.",
    ],
  },
  {
    title: "9. Dispute Resolution",
    content: [
      "In the event of a dispute, both parties agree to first attempt resolution through direct communication.",
      "If resolution cannot be reached, the matter shall be subject to arbitration under Indian law, with jurisdiction in Trichy, Tamil Nadu.",
    ],
  },
  {
    title: "10. Contact Us",
    content: [
      "For any refund-related queries, please contact us:",
      "Email: gobright.growth@gmail.com",
      "Phone: +91 89255 50774",
      "Address: No. 52/B, First Floor, Paradise Towers Complex, Thennur High Road, Trichy — 620017.",
    ],
  },
];

export default function RefundPolicy() {
  return (
    <main className="bg-[#0d0d0d] min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,32,40,0.09),transparent_50%)] pointer-events-none z-0" />

      {/* Red top banner */}
      <div className="bg-[#e32028] py-5 px-6 text-center">
        <p className="text-white font-extrabold text-xl md:text-2xl tracking-wide">
          Refund Policy
        </p>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-12 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Refund <span className="text-[#e32028]">Policy</span>
        </h1>
        <p className="text-[#666] text-sm">Last updated: May 2026</p>
        <p className="text-[#aaa] text-sm leading-relaxed mt-4 max-w-2xl">
          We believe in transparent and fair business practices. Please read this policy
          before engaging GoBright for any service.
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
