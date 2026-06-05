require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Employee = require("./models/Employee");

const employees = [
  { employeeId: "GB2026001", name: "Mr. Thanga Durai",    position: "Managing Director (MD)",             password: "Thanga@GB2026001" },
  { employeeId: "GB2026002", name: "Mr. Sridhar",         position: "Executive Director (ED)",            password: "Sridhar@GB2026002" },
  { employeeId: "GB2026003", name: "Mr. Dhayala Prakash", position: "Chief Administrative Officer (CAO)", password: "Dhayal@GB2026003" },
  { employeeId: "GB2026004", name: "Mrs. Akila",          position: "Administrative Officer (AO)",        password: "Akila@GB2026004" },
  { employeeId: "GB2026005", name: "Mr. Vignesh",         position: "Senior IT Executive",               password: "Vignesh@GB2026005" },
  { employeeId: "GB2026006", name: "Mr. Praveen",         position: "Content Creator",                   password: "Praveen@GB2026006" },
  { employeeId: "GB2026007", name: "Mr. Bala Ganesan",    position: "Content Creator",                   password: "Bala@GB2026007" },
  { employeeId: "GB2026008", name: "Mr. Fradrick",        position: "Full Stack Developer",              password: "Fradrick@GB2026008" },
  { employeeId: "GB2026009", name: "Mr. Anbarasan",       position: "Full Stack Developer",              password: "Anbu@GB2026009" },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB:", process.env.MONGODB_URI);

  for (const emp of employees) {
    const hashed = await bcrypt.hash(emp.password, 10);
    await Employee.findOneAndUpdate(
      { employeeId: emp.employeeId },
      { employeeId: emp.employeeId, name: emp.name, position: emp.position, password: hashed },
      { upsert: true, new: true }
    );
    console.log(`Seeded: ${emp.employeeId} - ${emp.name}`);
  }

  console.log("\nAll employees seeded successfully.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
