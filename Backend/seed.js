require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Employee = require("./models/Employee");

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
