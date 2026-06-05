require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const mongoose   = require("mongoose");
const bcrypt     = require("bcryptjs");
const cron       = require("node-cron");
const nodemailer = require("nodemailer");

const authRoutes          = require("./routes/auth");
const attendanceRoutes    = require("./routes/attendance");
const employeeRoutes      = require("./routes/employees");
const websiteRoutes       = require("./routes/website");
const Employee            = require("./models/Employee");
const { markAbsentToday } = require("./jobs/markAbsent");

const app  = express();
const PORT = process.env.PORT || 5001;

/* ─── CORS ─── */
const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173")
  .split(",").map((o) => o.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));

/* ════════════════════════════════════════════
   ROUTES
════════════════════════════════════════════ */
app.use("/api/auth",       authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/employees",  employeeRoutes);
app.use("/api/website",    websiteRoutes);

/* ─── Health ─── */
app.get("/api/health", (_, res) =>
  res.json({ status: "ok", service: "GoBright API" })
);

/* ─── DB Storage Status ─── */
app.get("/api/db-status", async (_, res) => {
  try {
    const stats    = await mongoose.connection.db.command({ dbStats: 1 });
    const usedMB   = ((stats.dataSize + stats.indexSize) / 1024 / 1024).toFixed(2);
    const limitMB  = Number(process.env.DB_STORAGE_LIMIT_MB || 512);
    const percent  = ((usedMB / limitMB) * 100).toFixed(1);
    const status   = percent >= 90 ? "critical" : percent >= 80 ? "warning" : "ok";
    res.json({ usedMB: Number(usedMB), limitMB, percent: Number(percent), status });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ════════════════════════════════════════════
   EMAIL HELPERS
════════════════════════════════════════════ */
function clean(v) { return String(v || "").trim(); }

function parseRecipients(value, fallback = "info.gobrightglobal@gmail.com") {
  return (clean(value) || fallback)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function esc(v) {
  return clean(v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
    throw new Error("EMAIL_USER and EMAIL_PASS are required.");
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
}

/* ════════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════════ */
function buildContactHTML(lead) {
  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short",
  });
  const rows = [
    ["Name",     lead.name],
    ["Email",    lead.email],
    ["Phone",    lead.phone],
    ["Service",  lead.service],
    ["Company",  lead.company],
    ["Location", lead.location],
    ["Message",  lead.message],
    ["Received", `${now} IST`],
  ]
    .filter(([, v]) => clean(v))
    .map(([label, value]) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#777;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:32%;">${esc(label)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(value)}</td>
      </tr>`)
    .join("");

  return `
    <div style="margin:0;padding:32px;background:#0d0d0d;font-family:Arial,sans-serif;color:#fff;">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width:640px;margin:0 auto;background:#111;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:28px 24px;background:#e32028;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:26px;">New Website Enquiry</h1>
            <p style="margin:8px 0 0;color:#ffe5e5;font-size:14px;">GoBright lead form submission</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <table width="100%" cellpadding="0" cellspacing="0"
              style="border:1px solid #2a2a2a;border-radius:10px;overflow:hidden;">${rows}</table>
            <p style="margin:20px 0 0;color:#777;font-size:12px;text-align:center;">
              Sent automatically from gobrightglobal.com
            </p>
          </td>
        </tr>
      </table>
    </div>`.trim();
}

app.post("/api/contact", async (req, res) => {
  const b      = req.body;
  const parts  = [];
  if (clean(b.company))  parts.push(`Company: ${clean(b.company)}`);
  if (clean(b.location)) parts.push(`Location: ${clean(b.location)}`);
  if (clean(b.message))  parts.push(clean(b.message));

  const lead = {
    name:     clean(b.name),
    email:    clean(b.email).toLowerCase(),
    phone:    clean(b.phone),
    service:  clean(b.service) || "Website Enquiry",
    company:  clean(b.company),
    location: clean(b.location),
    message:  parts.join("\n\n") || "No message provided.",
  };

  const errors = [];
  if (lead.name.length < 2)                             errors.push("Name must be at least 2 characters.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))  errors.push("Enter a valid email address.");
  if (!/^[+]?[\d\s\-()]{7,15}$/.test(lead.phone))      errors.push("Enter a valid phone number.");
  if (!lead.service)                                    errors.push("Please select a service.");
  if (errors.length) return res.status(400).json({ success: false, errors });

  try {
    const recipients = parseRecipients(process.env.EMAIL_TO);
    const info = await createTransporter().sendMail({
      from:    `"GoBright Website" <${process.env.EMAIL_USER}>`,
      to:      recipients,
      replyTo: lead.email,
      subject: `New Lead: ${lead.name} — ${lead.service}`,
      html:    buildContactHTML(lead),
    });

    const accepted = (info.accepted || []).map((address) => address.toLowerCase());
    const missing = recipients.filter((address) => !accepted.includes(address.toLowerCase()));
    if (missing.length === recipients.length)
      return res.status(502).json({ success: false, error: `Email not accepted by ${recipients.join(", ")}.` });

    console.log(`[Contact] Email sent: ${info.messageId}`);
    return res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("[Contact] Email failed:", err.message);
    return res.status(500).json({ success: false, error: "Email send failed. Please try again." });
  }
});

/* ════════════════════════════════════════════
   DB STORAGE ALERT EMAIL
════════════════════════════════════════════ */
function buildDbAlertHTML({ usedMB, limitMB, percent, status }) {
  const color    = status === "critical" ? "#e32028" : "#f59e0b";
  const barWidth = Math.min(percent, 100);

  return `
    <div style="margin:0;padding:32px;background:#0d0d0d;font-family:Arial,sans-serif;color:#fff;">
      <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width:600px;margin:0 auto;background:#111;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:28px 24px;background:${color};text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:24px;">⚠️ MongoDB Storage Alert</h1>
            <p style="margin:8px 0 0;color:#fff;font-size:14px;opacity:0.85;">GoBright — gobright Database</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 24px;">
            <p style="margin:0 0 16px;font-size:16px;color:#ccc;">
              Your MongoDB Atlas M0 free tier storage is <strong style="color:${color}">${percent}% full</strong>.
            </p>
            <div style="background:#1a1a1a;border-radius:8px;overflow:hidden;height:20px;margin-bottom:16px;">
              <div style="background:${color};width:${barWidth}%;height:100%;border-radius:8px;"></div>
            </div>
            <table width="100%" style="border:1px solid #2a2a2a;border-radius:8px;overflow:hidden;">
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#777;font-size:12px;text-transform:uppercase;">Used</td>
                <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;">${usedMB} MB</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#777;font-size:12px;text-transform:uppercase;">Limit (M0 Free)</td>
                <td style="padding:12px 16px;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;">${limitMB} MB</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;color:#777;font-size:12px;text-transform:uppercase;">Status</td>
                <td style="padding:12px 16px;color:${color};font-size:14px;font-weight:bold;">${status.toUpperCase()}</td>
              </tr>
            </table>
            <p style="margin:20px 0 0;color:#777;font-size:12px;text-align:center;">
              Action Required: Upgrade to MongoDB Atlas M10+ or clear old records.
            </p>
          </td>
        </tr>
      </table>
    </div>`.trim();
}

async function checkDbStorage() {
  try {
    const stats       = await mongoose.connection.db.command({ dbStats: 1 });
    const usedMB      = (stats.dataSize + stats.indexSize) / 1024 / 1024;
    const limitMB     = Number(process.env.DB_STORAGE_LIMIT_MB || 512);
    const threshold   = Number(process.env.DB_ALERT_THRESHOLD_PERCENT || 80);
    const percent     = (usedMB / limitMB) * 100;

    console.log(`[DB Monitor] Used: ${usedMB.toFixed(2)}MB / ${limitMB}MB (${percent.toFixed(1)}%)`);

    if (percent < threshold) return;

    const status = percent >= 90 ? "critical" : "warning";
    const recipients = parseRecipients(process.env.EMAIL_TO);

    await createTransporter().sendMail({
      from:    `"GoBright System" <${process.env.EMAIL_USER}>`,
      to:      recipients,
      subject: `[${status.toUpperCase()}] MongoDB Storage ${percent.toFixed(1)}% Full — Action Required`,
      html:    buildDbAlertHTML({ usedMB: usedMB.toFixed(2), limitMB, percent: percent.toFixed(1), status }),
    });

    console.log(`[DB Monitor] Alert email sent (${percent.toFixed(1)}% full)`);
  } catch (e) {
    console.error("[DB Monitor] Check failed:", e.message);
  }
}

/* ════════════════════════════════════════════
   EMPLOYEE SEED
════════════════════════════════════════════ */
const EMPLOYEES = [
  { employeeId: "GB2026001", name: "Mr. Thanga Durai",    position: "Managing Director (MD)",             password: "Thanga@GB2026001" },
  { employeeId: "GB2026002", name: "Mr. Sridhar",         position: "Executive Director (ED)",            password: "Sridhar@GB2026002" },
  { employeeId: "GB2026003", name: "Mr. Dhayala Prakash", position: "Chief Administrative Officer (CAO)", password: "Dhayal@GB2026003" },
  { employeeId: "GB2026004", name: "Mrs. Akila",          position: "Administrative Officer (AO)",        password: "Akila@GB2026004" },
  { employeeId: "GB2026005", name: "Mr. Vignesh",         position: "Senior IT Executive",                password: "Vignesh@GB2026005" },
  { employeeId: "GB2026006", name: "Mr. Praveen",         position: "Content Creator",                    password: "Praveen@GB2026006" },
  { employeeId: "GB2026007", name: "Mr. Bala Ganesan",    position: "Content Creator",                    password: "Bala@GB2026007" },
  { employeeId: "GB2026008", name: "Mr. Fradrick",        position: "Full Stack Developer",               password: "Fradrick@GB2026008" },
  { employeeId: "GB2026009", name: "Mr. Anbarasan",       position: "Full Stack Developer",               password: "Anbu@GB2026009" },
];

async function autoSeed() {
  // Remove any old-format employees (GB001–GB999) that don't match GB2026xxx
  const oldEmployees = await Employee.find({ employeeId: /^GB\d{3}$/ });
  if (oldEmployees.length > 0) {
    await Employee.deleteMany({ employeeId: /^GB\d{3}$/ });
    console.log(`[Seed] Removed ${oldEmployees.length} old-format employees (GB001 format).`);
  }

  // Seed all GB2026xxx employees
  console.log("[Seed] Seeding employees…");
  for (const emp of EMPLOYEES) {
    const hashed = await bcrypt.hash(emp.password, 10);
    await Employee.findOneAndUpdate(
      { employeeId: emp.employeeId },
      { employeeId: emp.employeeId, name: emp.name, position: emp.position, password: hashed },
      { upsert: true, new: true }
    );
  }
  console.log("[Seed] ✓ Employees seeded.");
}

/* ════════════════════════════════════════════
   CRON JOBS
════════════════════════════════════════════ */
function startCronJobs() {
  /* Absent check — 6:00 PM IST (12:30 UTC), Mon–Sat */
  cron.schedule("30 12 * * 1-6", async () => {
    console.log("[Cron] 6PM IST — absent check");
    try { await markAbsentToday(); }
    catch (e) { console.error("[Cron] Absent error:", e.message); }
  }, { timezone: "UTC" });

  /* Sunday leave — 12:00 AM IST Sunday (6:30 PM Sat UTC) */
  cron.schedule("30 18 * * 6", async () => {
    console.log("[Cron] Sunday IST — marking Leave");
    try { await markAbsentToday(); }
    catch (e) { console.error("[Cron] Leave error:", e.message); }
  }, { timezone: "UTC" });

  /* DB storage check — every day 9:00 AM IST (3:30 AM UTC) */
  cron.schedule("30 3 * * *", async () => {
    console.log("[Cron] Daily DB storage check");
    await checkDbStorage();
  }, { timezone: "UTC" });

  console.log("[Cron] ✓ All jobs scheduled.");
}

/* ════════════════════════════════════════════
   EMAIL CONNECTION TEST
════════════════════════════════════════════ */
async function testEmailConnection() {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("✗ Email: EMAIL_USER or EMAIL_PASS missing in .env");
      return;
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.verify();
    console.log(`✓ Email connected — ${process.env.EMAIL_USER}`);
  } catch (err) {
    console.error("✗ Email connection failed:", err.message);
    console.error("  → Check EMAIL_USER and EMAIL_PASS in .env (use Gmail App Password)");
  }
}

/* ════════════════════════════════════════════
   STARTUP
════════════════════════════════════════════ */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✓ MongoDB connected — gobright");
    await autoSeed();
    await testEmailConnection();
    startCronJobs();
    app.listen(PORT, () =>
      console.log(`✓ GoBright API running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("✗ MongoDB connection failed:", err.message);
    process.exit(1);
  });
