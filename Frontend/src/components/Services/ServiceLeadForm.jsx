import { useEffect, useState } from "react";
import { sendContactLead, validateLead } from "../../lib/contactApi";

const SERVICES = [
  "Branding & Brand Identity",
  "Digital Marketing",
  "Tech Solutions",
  "Photography & Videography",
  "Other Services",
];

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#111] placeholder-[#8a8a8a] outline-none transition-colors duration-200";
const inputNormal = `${inputBase} border-[#d8d8d8] focus:border-[#e32028]`;
const inputError = `${inputBase} border-[#e32028]/70 focus:border-[#e32028]`;

export default function ServiceLeadForm({
  service = "",
  title = "Send a Message",
  className = "",
}) {
  const titleParts = title.trim().split(/\s+/);
  const titleLast = titleParts.pop() || "";
  const titleFirst = titleParts.join(" ");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setForm((prev) => ({ ...prev, service }));
  }, [service]);

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
      requireService: true,
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
      setStatus("success");
      setForm({ name: "", phone: "", email: "", service, message: "" });
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Unable to send email. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={submit}
      noValidate
      className={`animate-fade-right rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-md md:p-6 ${className}`}
    >
      <h3 className="mb-4 text-center text-xl font-extrabold text-[#111]">
        {titleFirst} <span className="text-[#e32028]">{titleLast}</span>
      </h3>

      {status === "error" && serverError && (
        <div className="mb-4 rounded-xl border border-[#e32028]/40 bg-[#e32028]/10 px-4 py-3 text-sm text-[#e32028] animate-fade-up">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Your Name"
            className={errors.name ? inputError : inputNormal}
          />
          {errors.name && <p className="mt-1 text-xs text-[#e32028]">{errors.name}</p>}
        </div>
        <div>
          <input
            name="phone"
            value={form.phone}
            onChange={handle}
            placeholder="Phone"
            className={errors.phone ? inputError : inputNormal}
          />
          {errors.phone && <p className="mt-1 text-xs text-[#e32028]">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-3">
        <input
          name="email"
          value={form.email}
          onChange={handle}
          type="email"
          placeholder="Email"
          className={errors.email ? inputError : inputNormal}
        />
        {errors.email && <p className="mt-1 text-xs text-[#e32028]">{errors.email}</p>}
      </div>

      <div className="mt-3">
        <select
          name="service"
          value={form.service}
          onChange={handle}
          className={errors.service ? inputError : inputNormal}
        >
          <option value="">Select a service</option>
          {SERVICES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.service && <p className="mt-1 text-xs text-[#e32028]">{errors.service}</p>}
      </div>

      <div className="mt-3">
        <textarea
          name="message"
          value={form.message}
          onChange={handle}
          rows={4}
          placeholder="Tell us about your project..."
          className={`${errors.message ? inputError : inputNormal} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-[#e32028]">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className={`mt-4 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 ${
          status === "success"
            ? "bg-[#16a34a] animate-glow-green"
            : "bg-[#e32028] shadow-[0_0_20px_rgba(227,32,40,0.3)] hover:bg-[#c41c22] hover:shadow-[0_0_35px_rgba(227,32,40,0.55)]"
        } ${status === "sending" ? "cursor-not-allowed opacity-70" : ""}`}
      >
        {status === "sending" ? "Sending..." : status === "success" ? "Completed" : status === "error" ? "Try Again" : "Send Message"}
      </button>
    </form>
  );
}
