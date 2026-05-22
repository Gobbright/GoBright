const router = require("express").Router();
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

function getTodayIST() {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().split("T")[0];
}

async function getOrCreateRecord(employeeId, date) {
  const employee = await Employee.findOne({ employeeId });
  if (!employee) return null;
  return Attendance.findOneAndUpdate(
    { employeeId, date },
    { $setOnInsert: { employeeName: employee.name, position: employee.position } },
    { upsert: true, new: true }
  );
}

// ── Check In ──
router.post("/checkin", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await getOrCreateRecord(employeeId, date);
    if (!record) return res.status(404).json({ success: false, message: "Employee not found." });
    if (record.inTime) return res.status(400).json({ success: false, message: "Already checked in." });
    record.inTime = new Date();
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Check Out ──
router.post("/checkout", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await Attendance.findOne({ employeeId, date });
    if (!record?.inTime) return res.status(400).json({ success: false, message: "Not checked in." });
    if (record.outTime) return res.status(400).json({ success: false, message: "Already checked out." });
    const openBreak = record.breaks.findIndex(b => b.start && !b.end);
    if (openBreak !== -1) { record.breaks[openBreak].end = new Date(); record.markModified("breaks"); }
    let totalBreak = 0;
    record.breaks.forEach(b => { if (b.start && b.end) totalBreak += (new Date(b.end) - new Date(b.start)) / 60000; });
    record.outTime = new Date();
    record.totalBreakMinutes = Math.round(totalBreak);
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Break Start ──
router.post("/break-start", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await Attendance.findOne({ employeeId, date });
    if (!record?.inTime) return res.status(400).json({ success: false, message: "Not checked in." });
    if (record.outTime) return res.status(400).json({ success: false, message: "Already checked out." });
    if (record.breaks.some(b => b.start && !b.end)) return res.status(400).json({ success: false, message: "Break already active." });
    record.breaks.push({ start: new Date() });
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Break End ──
router.post("/break-end", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await Attendance.findOne({ employeeId, date });
    const idx = record?.breaks?.findIndex(b => b.start && !b.end);
    if (idx === -1 || idx === undefined) return res.status(400).json({ success: false, message: "No active break." });
    record.breaks[idx].end = new Date();
    record.markModified("breaks");
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Field Work In ──
router.post("/field-work-in", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await getOrCreateRecord(employeeId, date);
    if (!record) return res.status(404).json({ success: false, message: "Employee not found." });
    record.fieldWorkInTime = new Date();
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Field Work Out ──
router.post("/field-work-out", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await Attendance.findOne({ employeeId, date });
    if (!record?.fieldWorkInTime) return res.status(400).json({ success: false, message: "Field work not started." });
    record.fieldWorkOutTime = new Date();
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Shoot Work In ──
router.post("/shoot-work-in", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await getOrCreateRecord(employeeId, date);
    if (!record) return res.status(404).json({ success: false, message: "Employee not found." });
    record.shootWorkInTime = new Date();
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Shoot Work Out ──
router.post("/shoot-work-out", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const date = getTodayIST();
    const record = await Attendance.findOne({ employeeId, date });
    if (!record?.shootWorkInTime) return res.status(400).json({ success: false, message: "Shoot work not started." });
    record.shootWorkOutTime = new Date();
    await record.save();
    return res.json({ success: true, record });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Today's record ──
router.get("/today/:employeeId", async (req, res) => {
  try {
    const record = await Attendance.findOne({ employeeId: req.params.employeeId, date: getTodayIST() });
    return res.json({ success: true, record: record || null });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── All records (owner) ──
router.get("/all", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1, employeeId: 1 });
    return res.json({ success: true, records });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── All employees list ──
router.get("/employees-list", async (req, res) => {
  try {
    const Employee = require("../models/Employee");
    const employees = await Employee.find({}, "employeeId name position").sort("employeeId");
    return res.json({ success: true, employees });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Employee's all records ──
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.params.employeeId }).sort({ date: -1 });
    return res.json({ success: true, records });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Delete a record ──
router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

// ── Manual absent trigger (owner use / testing) ──
router.post("/mark-absent-now", async (req, res) => {
  try {
    const { markAbsentToday } = require("../jobs/markAbsent");
    await markAbsentToday();
    return res.json({ success: true, message: "Absent marking done." });
  } catch (e) { return res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
