import amico from "../../assets/img/About/amico.png";

export default function HeroSection() {
  // Professional hero image for About section
  const heroImage = amico;

  return (
    <section className="bg-[#0d0d0d] pt-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,32,40,0.11),transparent_55%)] pointer-events-none" />
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%] h-[40%] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(227,32,40,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.5) 1px,transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.4,
        }}
      />

      {/* Red banner */}
      <div className="bg-[#e32028] py-4 px-6 text-center">
        <p className="text-white font-bold text-lg md:text-xl tracking-wide">
          GoBright – A 360° Brand Growth Company Powered by Infinite Imagination
        </p>
      </div>

      {/* About Us tab — outside padded container to touch left edge */}
      <div className="bg-[#e0e0e0] rounded-tr-[1.8rem] w-56 py-3.5 flex items-center justify-center mt-10">
        <span className="text-[#e32028] font-bold text-xl tracking-wide">About Us</span>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left — text */}
        <div>
          <div className="flex flex-col gap-5 text-[#cccccc] text-[0.97rem] leading-relaxed">
            <p>
              Based in Trichy,{" "}
              <span className="text-[#e32028] font-semibold">GoBright</span>{" "}
              is a creative branding, digital marketing, and technology solutions
              company dedicated to building powerful, scalable, and future-ready brands.
            </p>
            <p>
              We combine strategy, creativity, and performance to help businesses grow
              with clarity, confidence, and measurable results.
            </p>
            <p>
              From startups to established enterprises, we design structured growth
              systems that increase visibility, generate qualified leads, and create
              sustainable business impact.
            </p>
            <p>We don't just market brands — we build them to lead.</p>
          </div>
        </div>

        {/* Right — illustration */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="GoBright team illustration"
            className="w-full max-w-md object-contain"
          />
        </div>

      </div>
    </section>
  );
}
