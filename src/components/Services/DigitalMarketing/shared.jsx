export const pageBg =
  "bg-[radial-gradient(circle_at_50%_16%,rgba(227,32,40,0.08),transparent_36%),linear-gradient(180deg,#1b1b1b_0%,#141414_58%,#171717_100%)]";

export function SectionLabel({ children, align = "left" }) {
  return (
    <div className={`mb-14 flex w-full ${align === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-[min(360px,82vw)] bg-[#eeeeee] px-10 py-3 text-center text-xl font-extrabold tracking-wide text-[#e32028] ${
          align === "right" ? "rounded-tl-2xl" : "rounded-tr-2xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function StarList({ title, points, children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#202020] p-8 shadow-[0_22px_60px_rgba(0,0,0,0.32)] ${className}`}
    >
      {title && <h3 className="mb-5 text-xl font-extrabold text-white">{title}</h3>}
      <ul className="space-y-4 text-base font-medium text-[#f3f3f3]">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-4">
            <span className="shrink-0 text-xl font-black leading-none text-white">{"\u2605"}</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {children && <div className="mt-6 text-sm leading-6 text-[#f4f4f4]">{children}</div>}
    </div>
  );
}

export function MediaBlock({ className = "", children }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -right-6 top-[-46px] h-[240px] w-[88px] rounded-br-[44px] rounded-tr-[44px] bg-[#e32028]" />
      <div className="relative z-10 flex min-h-[300px] items-center justify-center rounded-lg bg-[#d9d9d9] text-sm font-bold text-black shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
        {children}
      </div>
    </div>
  );
}

export function RedHeading({ children, className = "" }) {
  return (
    <h2 className={`text-center text-3xl font-extrabold leading-tight text-white ${className}`}>
      {children}
    </h2>
  );
}
