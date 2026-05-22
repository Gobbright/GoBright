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

router.post("/owner-login", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(400).json({ success: false, message: "Name and password are required." });

  const nameMatch = name.trim().toLowerCase() === (process.env.OWNER_NAME || "admin").toLowerCase();
  const passMatch = password.trim() === (process.env.OWNER_PASSWORD || "GBOwner@2025");

  console.log(`Owner login attempt — name: "${name.trim()}" | match: ${nameMatch}`);

  if (nameMatch && passMatch)
    return res.json({ success: true, ownerName: process.env.OWNER_NAME || "Admin" });

  return res.status(401).json({ success: false, message: "Invalid name or password." });
});

module.exports = router;
