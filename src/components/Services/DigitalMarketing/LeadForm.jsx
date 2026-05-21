import { useEffect, useState } from "react";
import { getSubmitLabel, sendContactLead, validateLead } from "../../../lib/contactApi";

const INITIAL_FORM = {
  company: "",
  name: "",
  phone: "",
  email: "",
  location: "",
  message: "",
  service: "Digital Marketing",
};

const inputClass =
  "h-12 w-full rounded-lg border border-[#e0e0e0] bg-white px-4 text-sm text-[#333] placeholder-[#aaa] outline-none transition-colors focus:border-[#e32028]";
const errorClass = "border-[#e32028]";

export default function LeadForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateLead(form, {
      requireCompany: true,
      requireService: false,
      requireLocation: true,
      requireMessage: true,
    });
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await sendContactLead(form);
      setForm(INITIAL_FORM);
      setStatus("success");
    } catch (err) {
      setServerError(err.message || "Email send failed. Please try again.");
      setStatus("error");
    }
  };

  const fieldClass = (name) => `${inputClass} ${errors[name] ? errorClass : ""}`;

  return (
    <form onSubmit={submit} noValidate className="w-full rounded-2xl bg-white p-7 shadow-[0_12px_50px_rgba(0,0,0,0.18)]">
      <div className="mb-5 text-center">
        <h3 className="text-xl font-extrabold text-[#e32028]">Ready to Grow?</h3>
        <p className="mt-1 text-sm font-bold text-[#111]">Your GoBright Growth Partner is Here.</p>
      </div>

      {serverError && <p className="mb-3 rounded-lg bg-[#e32028]/10 px-3 py-2 text-sm font-semibold text-[#e32028]">{serverError}</p>}

      <div className="grid grid-cols-2 gap-3">
        <input name="company" value={form.company} onChange={handle} placeholder="Company Name" className={fieldClass("company")} />
        <input name="name" value={form.name} onChange={handle} placeholder="Customer Name" className={fieldClass("name")} />
      </div>
      {errors.company && <p className="mt-1 text-xs font-semibold text-[#e32028]">{errors.company}</p>}
      {errors.name && <p className="mt-1 text-xs font-semibold text-[#e32028]">{errors.name}</p>}

      <div className="mt-3 flex flex-col gap-3">
        <input name="phone" value={form.phone} onChange={handle} placeholder="Mobile Number" className={fieldClass("phone")} />
        {errors.phone && <p className="-mt-2 text-xs font-semibold text-[#e32028]">{errors.phone}</p>}
        <input name="email" value={form.email} onChange={handle} type="email" placeholder="Email" className={fieldClass("email")} />
        {errors.email && <p className="-mt-2 text-xs font-semibold text-[#e32028]">{errors.email}</p>}
        <input name="location" value={form.location} onChange={handle} placeholder="Location" className={fieldClass("location")} />
        {errors.location && <p className="-mt-2 text-xs font-semibold text-[#e32028]">{errors.location}</p>}
        <textarea
          name="message"
          value={form.message}
          onChange={handle}
          placeholder="Requirements"
          className={`h-28 w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm text-[#333] placeholder-[#aaa] outline-none transition-colors focus:border-[#e32028] ${
            errors.message ? "border-[#e32028]" : "border-[#e0e0e0]"
          }`}
        />
        {errors.message && <p className="-mt-2 text-xs font-semibold text-[#e32028]">{errors.message}</p>}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="submit"
          disabled={status === "sending" || status === "success"}
          className={`rounded-full px-10 py-3 text-sm font-extrabold text-white shadow-[0_6px_24px_rgba(227,32,40,0.4)] transition-all ${
            status === "success" ? "bg-[#16a34a]" : "bg-[#e32028] hover:bg-[#c81d24] hover:shadow-[0_8px_32px_rgba(227,32,40,0.55)]"
          } ${status === "sending" ? "cursor-not-allowed opacity-70" : ""}`}
        >
          {getSubmitLabel(status, "Let's Grow Together")}
        </button>
      </div>
    </form>
  );
}
