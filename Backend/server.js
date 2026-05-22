require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const cron     = require("node-cron");

const authRoutes       = require("./routes/auth");
const attendanceRoutes = require("./routes/attendance");
const Employee         = require("./models/Employee");
const { markAbsentToday } = require("./jobs/markAbsent");

const app  = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173")
  .split(",").map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "20kb" }));

app.use("/api/auth",       authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

/* ── Employee seed data ── */
const employees = [
  { employeeId: "GB001", name: "Mr. Thanga Durai",    position: "Managing Director (MD)",             password: "Thanga@GB001" },
  { employeeId: "GB002", name: "Mr. Sridhar",         position: "Executive Director (ED)",            password: "Sridhar@GB002" },
  { employeeId: "GB003", name: "Mr. Dhayala Prakash", position: "Chief Administrative Officer (CAO)", password: "Dhayal@GB003" },
  { employeeId: "GB004", name: "Mrs. Akila",          position: "Administrative Officer (AO)",        password: "Akila@GB004" },
  { employeeId: "GB005", name: "Mr. Vignesh",         position: "Senior IT Executive",               password: "Vignesh@GB005" },
  { employeeId: "GB006", name: "Mr. Praveen",         position: "Content Creator",                   password: "Praveen@GB006" },
  { employeeId: "GB007", name: "Mr. Bala Ganesan",    position: "Content Creator",                   password: "Bala@GB007" },
  { employeeId: "GB008", name: "Mr. Sundhar",         position: "UI UX Designer",                    password: "Sundhar@GB008" },
  { employeeId: "GB009", name: "Mr. Fradrick",        position: "Full Stack Developer",              password: "Fradrick@GB009" },
  { employeeId: "GB010", name: "Mr. Anbarasan",       position: "Full Stack Developer",              password: "Anbu@GB010" },
];

async function autoSeed() {
  const count = await Employee.countDocuments();
  if (count === employees.length) return;
  console.log("Auto-seeding employees…");
  for (const emp of employees) {
    const hashed = await bcrypt.hash(emp.password, 10);
    await Employee.findOneAndUpdate(
      { employeeId: emp.employeeId },
      { employeeId: emp.employeeId, name: emp.name, position: emp.position, password: hashed },
      { upsert: true, new: true }
    );
  }
  console.log("✓ Employees seeded.");
}

/* ── Cron Jobs (IST) ── */
function startCronJobs() {
  // 6:00 PM IST = 12:30 UTC → mark absent (Mon–Sat)
  cron.schedule("30 12 * * 1-6", async () => {
    console.log("⏰ 6 PM IST — Running absent check…");
    try { await markAbsentToday(); }
    catch (e) { console.error("Absent cron error:", e.message); }
  }, { timezone: "UTC" });

  // Sunday midnight IST (5:30 PM Sat UTC) → mark Sunday leave
  cron.schedule("30 18 * * 6", async () => {
    console.log("⏰ Sunday IST starting — marking Leave…");
    try { await markAbsentToday(); } // handles Sunday inside
    catch (e) { console.error("Leave cron error:", e.message); }
  }, { timezone: "UTC" });

  console.log("✓ Cron jobs scheduled (absent @6PM IST, leave @Sunday).");
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected:", process.env.MONGODB_URI);
    await autoSeed();
    startCronJobs();
    app.listen(PORT, () =>
      console.log(`GoBright Attendance backend running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
