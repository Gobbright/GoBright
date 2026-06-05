import { useMemo, useState } from "react";
import PageHeroBackdrop from "../PageHeroBackdrop";
import { getSubmitLabel, sendContactLead } from "../../lib/contactApi";

const openings = [
  {
    title: "Digital Marketing Intern",
    type: "Internship",
    experience: "0-1 year",
    summary:
      "Work with the growth team on social media, SEO, ads, reporting, and campaign execution for real client brands.",
    requirements: [
      "Basic understanding of Instagram, Facebook, Google, and YouTube marketing",
      "Interest in SEO, keyword research, content planning, and performance ads",
      "Good writing skills in English; Tamil communication is a plus",
      "Ability to track campaign data, prepare reports, and learn analytics tools",
      "Creative mindset with discipline to meet posting and campaign deadlines",
    ],
  },
  {
    title: "UI/UX Designer",
    type: "Full-time",
    experience: "0-3 years",
    summary:
      "Design clean websites, dashboards, landing pages, and app screens with strong user flow, layout, and visual hierarchy.",
    requirements: [
      "Knowledge of Figma, wireframes, prototypes, user flows, and responsive layouts",
      "Strong sense of spacing, typography, colors, components, and design systems",
      "Ability to convert requirements into practical web and mobile UI screens",
      "Portfolio with website, app, dashboard, or landing page design work",
      "Basic understanding of HTML/CSS or frontend handoff is an advantage",
    ],
  },
  {
    title: "Graphic Designer",
    type: "Full-time",
    experience: "0-3 years",
    summary:
      "Create brand creatives, social media designs, print layouts, campaign visuals, and marketing collateral.",
    requirements: [
      "Good skills in Photoshop, Illustrator, Canva, or similar design tools",
      "Understanding of branding, layouts, color combinations, and visual storytelling",
      "Ability to design posters, social posts, brochures, banners, and ad creatives",
      "Portfolio with brand, social media, print, or campaign design samples",
      "Video editing or motion graphics knowledge is an added advantage",
    ],
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  role: "",
  experience: "",
  education: "",
  skills: "",
  portfolio: "",
  noticePeriod: "",
  message: "",
};

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#111] placeholder-[#8a8a8a] transition-colors duration-200 focus:outline-none focus:border-[#e32028]";
const inputNormal = `${inputBase} border-[#d8d8d8]`;
const inputError = `${inputBase} border-[#e32028]/70`;

function validateApplication(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!/^[+]?[\d\s\-()]{7,15}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!form.role) errors.role = "Please select a role.";
  if (!form.experience) errors.experience = "Please select experience.";
  if (form.city.trim().length < 2) errors.city = "City must be at least 2 characters.";
  if (form.skills.trim().length < 5) errors.skills = "Add a few relevant skills.";
  return errors;
}

function buildApplicationMessage(form) {
  return [
    `Career Application: ${form.role}`,
    `Experience: ${form.experience}`,
    `City: ${form.city}`,
    `Education: ${form.education || "Not provided"}`,
    `Skills: ${form.skills || "Not provided"}`,
    `Portfolio / Resume Link: ${form.portfolio || "Not provided"}`,
    `Notice Period / Availability: ${form.noticePeriod || "Not provided"}`,
    `Candidate Note: ${form.message || "Not provided"}`,
  ].join("\n\n");
}

function ApplicationModal({ selectedRole, onClose }) {
  const [form, setForm] = useState({ ...initialForm, role: selectedRole?.title || "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const submitLabel = getSubmitLabel(status, "Submit Application");

  const handle = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const fieldErrors = validateApplication(form);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await sendContactLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: `Career Application - ${form.role}`,
        location: form.city,
        company: form.education,
        message: buildApplicationMessage(form),
      });
      setStatus("success");
      setForm({ ...initialForm, role: selectedRole?.title || "" });
    } catch (err) {
      setServerError(err.message || "Application email failed. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/80 px-4 pb-4 sm:items-center sm:pb-0">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#101010] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#101010] px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e32028]">Career Application</p>
            <h2 className="mt-1 text-xl font-extrabold text-white">{form.role}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#e32028] hover:text-[#e32028]"
            aria-label="Close application form"
          >
            x
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          {serverError && (
            <p className="rounded-xl border border-[#e32028]/40 bg-[#e32028]/10 px-4 py-3 text-sm font-semibold text-[#e32028] sm:col-span-2">
              {serverError}
            </p>
          )}

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Full Name</span>
            <input name="name" value={form.name} onChange={handle} className={errors.name ? inputError : inputNormal} placeholder="Your name" />
            {errors.name && <span className="text-xs font-semibold text-[#e32028]">{errors.name}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Email</span>
            <input name="email" type="email" value={form.email} onChange={handle} className={errors.email ? inputError : inputNormal} placeholder="you@example.com" />
            {errors.email && <span className="text-xs font-semibold text-[#e32028]">{errors.email}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Phone</span>
            <input name="phone" value={form.phone} onChange={handle} className={errors.phone ? inputError : inputNormal} placeholder="+91 98765 43210" />
            {errors.phone && <span className="text-xs font-semibold text-[#e32028]">{errors.phone}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">City</span>
            <input name="city" value={form.city} onChange={handle} className={errors.city ? inputError : inputNormal} placeholder="Trichy" />
            {errors.city && <span className="text-xs font-semibold text-[#e32028]">{errors.city}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Role</span>
            <select name="role" value={form.role} onChange={handle} className={errors.role ? inputError : inputNormal}>
              <option value="">Select role</option>
              {openings.map((job) => (
                <option key={job.title} value={job.title}>{job.title}</option>
              ))}
            </select>
            {errors.role && <span className="text-xs font-semibold text-[#e32028]">{errors.role}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Experience</span>
            <select name="experience" value={form.experience} onChange={handle} className={errors.experience ? inputError : inputNormal}>
              <option value="">Select experience</option>
              <option value="Fresher">Fresher</option>
              <option value="0-1 year">0-1 year</option>
              <option value="1-2 years">1-2 years</option>
              <option value="2-3 years">2-3 years</option>
              <option value="3+ years">3+ years</option>
            </select>
            {errors.experience && <span className="text-xs font-semibold text-[#e32028]">{errors.experience}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Education</span>
            <input name="education" value={form.education} onChange={handle} className={inputNormal} placeholder="Degree / course" />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Portfolio / Resume Link</span>
            <input name="portfolio" value={form.portfolio} onChange={handle} className={inputNormal} placeholder="Drive, Behance, LinkedIn, portfolio URL" />
          </label>

          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Skills</span>
            <textarea name="skills" value={form.skills} onChange={handle} rows={3} className={`${errors.skills ? inputError : inputNormal} resize-none`} placeholder="Tools, platforms, design or marketing skills" />
            {errors.skills && <span className="text-xs font-semibold text-[#e32028]">{errors.skills}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Availability</span>
            <input name="noticePeriod" value={form.noticePeriod} onChange={handle} className={inputNormal} placeholder="Immediate / 15 days / 30 days" />
          </label>

          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#777]">Message</span>
            <textarea name="message" value={form.message} onChange={handle} rows={4} className={`${inputNormal} resize-none`} placeholder="Tell us why you want to join GoBright" />
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row">
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className={`flex-1 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors ${
                status === "success" ? "bg-[#16a34a]" : "bg-[#e32028] hover:bg-[#c41c22]"
              } ${status === "sending" ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-[#e32028] hover:text-[#e32028] sm:w-36"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState(null);

  const roleCount = useMemo(() => openings.length, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d0d0d] text-white">
      <section className="relative overflow-hidden pb-20">
        <PageHeroBackdrop gridHeight="50%" imageOpacity={0.09} />
        <div className="relative z-10 bg-[#e32028] px-5 py-5 text-center text-xl font-extrabold leading-tight text-white md:text-2xl">
          Careers at GoBright
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pt-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Build brands, campaigns, and digital products with us.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-[#d7d7d7]">
              We are hiring creative and growth-minded people for Digital Marketing, UI/UX, and Graphic Design roles.
              Join a Trichy-based brand growth team working across strategy, design, marketing, and technology.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#open-roles" className="rounded-full bg-[#e32028] px-6 py-3 text-sm font-bold text-white no-underline transition-colors hover:bg-[#c41c22]">
                View Open Roles
              </a>
              <a href="#apply" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white no-underline transition-colors hover:border-[#e32028] hover:text-[#e32028]">
                Apply Now
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#303030] to-[#181818] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e32028]">Current openings</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[#0d0d0d] p-4 text-center">
                <p className="text-3xl font-extrabold text-[#e32028]">{roleCount}</p>
                <p className="mt-1 text-xs font-semibold text-[#aaa]">Roles</p>
              </div>
              <div className="rounded-xl bg-[#0d0d0d] p-4 text-center">
                <p className="text-3xl font-extrabold text-[#e32028]">0-3</p>
                <p className="mt-1 text-xs font-semibold text-[#aaa]">Years</p>
              </div>
              <div className="rounded-xl bg-[#0d0d0d] p-4 text-center">
                <p className="text-3xl font-extrabold text-[#e32028]">3</p>
                <p className="mt-1 text-xs font-semibold text-[#aaa]">Tracks</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm font-medium leading-6 text-[#d7d7d7]">
              <li>Freshers and early-career candidates can apply.</li>
              <li>Portfolio, project samples, or internship work will be helpful.</li>
              <li>Applications are sent directly to the GoBright hiring email.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="open-roles" className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#e32028] md:text-4xl">Open Roles</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-7 text-white">
              We are looking for people who can learn fast, think clearly, and care about polished execution.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {openings.map((job) => (
              <article key={job.title} className="flex flex-col rounded-2xl border border-white/15 bg-gradient-to-br from-[#252525] to-[#151515] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#e32028]/15 px-3 py-1 text-xs font-bold text-[#ff6b71]">{job.type}</span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white">{job.experience}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold text-white">{job.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-[#cfcfcf]">{job.summary}</p>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-extrabold text-[#e32028]">Requirements</p>
                  <ul className="mt-4 space-y-3 text-sm font-medium leading-6 text-[#f1f1f1]">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 text-[#e32028]">*</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRole(job)}
                  className="mt-8 rounded-xl bg-[#e32028] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c41c22]"
                >
                  Apply for {job.title}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="border-t border-white/10 px-6 py-20 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-2xl border border-white/15 bg-gradient-to-br from-[#2c2c2c] to-[#151515] px-6 py-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          <h2 className="text-3xl font-extrabold text-white">Ready to apply?</h2>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#cfcfcf]">
            Select the role that matches your skills and submit your details. The application will be emailed to GoBright with your full profile.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {openings.map((job) => (
              <button
                key={job.title}
                type="button"
                onClick={() => setSelectedRole(job)}
                className="rounded-full border border-[#e32028]/50 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#e32028]"
              >
                {job.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedRole && (
        <ApplicationModal selectedRole={selectedRole} onClose={() => setSelectedRole(null)} />
      )}
    </main>
  );
}
