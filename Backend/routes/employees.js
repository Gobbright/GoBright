const router   = require("express").Router();
const bcrypt   = require("bcryptjs");
const Employee = require("../models/Employee");

/* GET /api/employees — list all employees */
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({}, "-password").sort("employeeId");
    return res.json({ success: true, employees });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

/* GET /api/employees/:employeeId — single employee */
router.get("/:employeeId", async (req, res) => {
  try {
    const emp = await Employee.findOne({ employeeId: req.params.employeeId }, "-password");
    if (!emp) return res.status(404).json({ success: false, message: "Employee not found." });
    return res.json({ success: true, employee: emp });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

/* POST /api/employees — create employee */
router.post("/", async (req, res) => {
  try {
    const { employeeId, name, password, position, designation, department, mobile, email, joiningDate, salary, address, status } = req.body;
    if (!employeeId || !name || !password) return res.status(400).json({ success: false, message: "employeeId, name and password are required." });

    const exists = await Employee.findOne({ employeeId });
    if (exists) return res.status(409).json({ success: false, message: "Employee ID already exists." });

    const hashed = await bcrypt.hash(password, 10);
    const emp = await Employee.create({
      employeeId, name, password: hashed,
      position: designation || position || "Employee",
      department, mobile, email, joiningDate, salary, address,
      status: status || "active",
    });

    const { password: _, ...empData } = emp.toObject();
    return res.status(201).json({ success: true, employee: empData });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

/* PUT /api/employees/:employeeId — update employee */
router.put("/:employeeId", async (req, res) => {
  try {
    const { password, position, designation, ...rest } = req.body;
    const update = { ...rest, position: designation || position };
    if (password) update.password = await bcrypt.hash(password, 10);

    const emp = await Employee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      update,
      { new: true, projection: "-password" }
    );
    if (!emp) return res.status(404).json({ success: false, message: "Employee not found." });
    return res.json({ success: true, employee: emp });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

/* DELETE /api/employees/:employeeId — delete employee */
router.delete("/:employeeId", async (req, res) => {
  try {
    const emp = await Employee.findOneAndDelete({ employeeId: req.params.employeeId });
    if (!emp) return res.status(404).json({ success: false, message: "Employee not found." });
    return res.json({ success: true });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

/* DELETE /api/employees/cleanup/old-format — remove GB001 format employees */
router.delete("/cleanup/old-format", async (req, res) => {
  try {
    const result = await Employee.deleteMany({ employeeId: /^GB\d{3}$/ });
    return res.json({ success: true, deleted: result.deletedCount });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
