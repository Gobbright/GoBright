const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");

function getTodayIST() {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return ist.toISOString().split("T")[0];
}

function getDayOfWeek(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).getDay(); // 0=Sun
}

/* Mark absent for all employees who didn't check in today (Mon–Sat only) */
async function markAbsentToday() {
  const date = getTodayIST();
  const dayOfWeek = getDayOfWeek(date);

  if (dayOfWeek === 0) {
    console.log(`[${date}] Sunday — marking as Leave for all.`);
    await markSundayLeave(date);
    return;
  }

  const employees = await Employee.find();
  let absentCount = 0;

  for (const emp of employees) {
    const existing = await Attendance.findOne({ employeeId: emp.employeeId, date });
    if (!existing || (!existing.inTime && !existing.isAbsent && !existing.isLeave)) {
      await Attendance.findOneAndUpdate(
        { employeeId: emp.employeeId, date },
        {
          $set: {
            employeeName: emp.name,
            position: emp.position,
            isAbsent: true,
          },
        },
        { upsert: true, new: true }
      );
      absentCount++;
    }
  }
  console.log(`[${date}] Absent marked for ${absentCount} employee(s).`);
}

/* Mark Sunday Leave for all employees */
async function markSundayLeave(date) {
  const employees = await Employee.find();
  for (const emp of employees) {
    await Attendance.findOneAndUpdate(
      { employeeId: emp.employeeId, date },
      {
        $setOnInsert: {
          employeeName: emp.name,
          position: emp.position,
          isLeave: true,
        },
      },
      { upsert: true, new: true }
    );
  }
}

module.exports = { markAbsentToday, markSundayLeave };
