import heroBg from "../assets/img/About/img8.png";

export default function PageHeroBackdrop({ gridHeight = "40%", imageOpacity = 0.1 }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ opacity: imageOpacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(227,32,40,0.11),transparent_55%)]" />
      <div
        className="absolute bottom-0 left-[-20%] right-[-20%]"
        style={{
          height: gridHeight,
          backgroundImage:
            "linear-gradient(rgba(227,32,40,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(227,32,40,0.5) 1px,transparent 1px)",
          backgroundSize: "50px 50px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "bottom center",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
