const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");

router.post("/employee-login", async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    if (!employeeId || !password)
      return res.status(400).json({ success: false, message: "Employee ID and password are required." });

    const employee = await Employee.findOne({ employeeId: employeeId.toUpperCase().trim() });
    if (!employee)
      return res.status(401).json({ success: false, message: "Incorrect password." });

    const isValid = await bcrypt.compare(password, employee.password);
    if (!isValid)
      return res.status(401).json({ success: false, message: "Incorrect password." });

    return res.json({
      success: true,
      employee: {
        employeeId: employee.employeeId,
        name: employee.name,
        position: employee.position,
      },
    });
  } catch (err) {
    console.error("employee-login error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

router.post("/add-employee", async (req, res) => {
  try {
    const { employeeId, name, position, password } = req.body;
    if (!employeeId || !name || !position || !password)
      return res.status(400).json({ success: false, message: "All fields are required." });

    const existing = await Employee.findOne({ employeeId: employeeId.toUpperCase().trim() });
    if (existing)
      return res.status(400).json({ success: false, message: "Employee ID already exists." });

    const hashed = await bcrypt.hash(password, 10);
    const emp = new Employee({
      employeeId: employeeId.toUpperCase().trim(),
      name:       name.trim(),
      position:   position.trim(),
      password:   hashed,
    });
    await emp.save();
    return res.json({ success: true, employee: { employeeId: emp.employeeId, name: emp.name, position: emp.position } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/owner-login", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(400).json({ success: false, message: "Name and password are required." });

  const n = name.trim().toLowerCase();
  const p = password.trim();

  const admins = [
    { name: (process.env.OWNER_NAME  || "Admin").toLowerCase(),     pass: process.env.OWNER_PASSWORD  || "GBOwner@2025",   display: process.env.OWNER_NAME  || "Admin"    },
    { name: (process.env.OWNER_NAME2 || "GoBright").toLowerCase(),  pass: process.env.OWNER_PASSWORD2 || "GB@Admin2026",   display: process.env.OWNER_NAME2 || "GoBright" },
  ];

  const matched = admins.find(a => a.name === n && a.pass === p);
  if (matched)
    return res.json({ success: true, ownerName: matched.display });

  return res.status(401).json({ success: false, message: "Invalid name or password." });
});

module.exports = router;
