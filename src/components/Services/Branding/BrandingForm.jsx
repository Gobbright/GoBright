const inputClass =
  "h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-sm text-[#333] placeholder-[#aaa] outline-none transition-colors focus:border-[#e32028]";

export default function BrandingForm({ title = "Ready to Grow?", sub = "Your GoBright Growth Partner is Here" }) {
  return (
    <form className="mx-auto w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-[0_12px_50px_rgba(0,0,0,0.18)]">
      <div className="mb-5 text-center">
        <h3 className="text-xl font-extrabold text-[#e32028]">{title}</h3>
        <p className="mt-1 text-sm font-bold text-[#111]">{sub}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input placeholder="Company Name"  className={inputClass} />
        <input placeholder="Customer Name" className={inputClass} />
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <input placeholder="Mobile Number" className={inputClass} />
        <input placeholder="Email"         className={inputClass} />
        <input placeholder="Location"      className={inputClass} />
        <textarea
          placeholder="Requirements"
          className="h-28 w-full resize-none rounded-lg border border-[#e0e0e0] bg-white px-4 py-3 text-sm text-[#333] placeholder-[#aaa] outline-none transition-colors focus:border-[#e32028]"
        />
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          className="rounded-full bg-[#e32028] px-10 py-3 text-sm font-extrabold text-white shadow-[0_6px_24px_rgba(227,32,40,0.4)] transition-all hover:bg-[#c81d24] hover:shadow-[0_8px_32px_rgba(227,32,40,0.55)]"
        >
          Let&apos;s Grow Together
        </button>
      </div>
    </form>
  );
}
