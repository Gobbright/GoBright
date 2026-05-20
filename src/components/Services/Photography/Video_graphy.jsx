const corporateVideoItems = [
  "Company profile videos",
  "Brand story films",
  "CEO & leadership message videos",
  "Client testimonial videos",
  "Training & explainer videos",
];

const productVideoItems = [
  "Instagram & Facebook ad creatives",
  "YouTube promotional videos",
  "Product demo videos",
  "Launch campaign videos",
  "Short-form reel & vertical content",
];

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#e32028" className="w-4 h-4 shrink-0 mt-0.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Videography({
  videoImg1 = null,
  videoImg2 = null,
  videoImg3 = null,
}) {
  const galleryImgs = [videoImg1, videoImg2, videoImg3];

  return (
    <section className="bg-[#0d0d0d] pt-10">

      {/* Tab — touches right edge */}
      <div className="flex justify-end">
        <div className="bg-[#e0e0e0] rounded-tl-[1.8rem] inline-flex items-center justify-center px-8 py-3.5">
          <span className="text-[#e32028] font-bold text-xl tracking-wide whitespace-nowrap">Videography</span>
        </div>
      </div>

      {/* Heading + subtitle */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-8 text-center">
        <h2 className="text-white font-bold text-2xl md:text-3xl mb-4">
          <span className="text-[#e32028] italic font-semibold">Commercial </span>
          Videography{" "}
          <span className="text-[#e32028]">&amp; Brand Film Production Company</span>
        </h2>
        <p className="text-[#cccccc] text-sm leading-relaxed max-w-2xl mx-auto">
          Video content dominates digital marketing. Our commercial videography services help
          businesses communicate their story effectively and professionally.
        </p>
      </div>

      {/* Three-column image grid */}
      <div className="max-w-7xl mx-auto px-8 pb-10 grid grid-cols-3 gap-5">
        {galleryImgs.map((src, i) => (
          <div key={i} className="bg-[#d9d9d9] rounded-2xl aspect-[3/4] overflow-hidden">
            {src && <img src={src} alt={`Videography ${i + 1}`} className="w-full h-full object-cover" />}
          </div>
        ))}
      </div>

      {/* Two service cards */}
      <div className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Corporate Video Production */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-[#e32028] font-bold text-base">Corporate Video Production</p>
          <p className="text-[#cccccc] text-sm">
            Build brand authority with high-quality corporate films.
          </p>
          <div className="bg-[#111111] rounded-xl p-5 flex-1">
            <p className="text-white font-bold text-sm mb-4">We create :</p>
            <ul className="flex flex-col gap-3">
              {corporateVideoItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[#cccccc] text-sm">
            Professionally scripted, directed, and edited for impact.
          </p>
        </div>

        {/* Product & Advertisement Video Production */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-[#e32028] font-bold text-base">
            Product &amp; Advertisement Video Production
          </p>
          <p className="text-[#cccccc] text-sm">
            Commercial ad videos optimized for performance marketing campaigns.
          </p>
          <div className="bg-[#111111] rounded-xl p-5 flex-1">
            <p className="text-white font-bold text-sm mb-4">We create :</p>
            <ul className="flex flex-col gap-3">
              {productVideoItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white text-sm">
                  <StarIcon /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[#cccccc] text-sm">
            Our production team understands both cinematography and marketing strategy.
          </p>
        </div>

      </div>

    </section>
  );
}
