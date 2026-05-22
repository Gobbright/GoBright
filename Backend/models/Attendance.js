const mongoose = require("mongoose");

const breakSchema = new mongoose.Schema({ start: Date, end: Date });

const attendanceSchema = new mongoose.Schema(
  {
    employeeId:        { type: String, required: true },
    employeeName:      { type: String, required: true },
    position:          { type: String, required: true },
    date:              { type: String, required: true }, // YYYY-MM-DD IST
    isAbsent:          { type: Boolean, default: false },
    isLeave:           { type: Boolean, default: false }, // Sunday
    inTime:            { type: Date },
    outTime:           { type: Date },
    breaks:            { type: [breakSchema], default: [] },
    totalBreakMinutes: { type: Number, default: 0 },
    fieldWorkInTime:   { type: Date },
    fieldWorkOutTime:  { type: Date },
    shootWorkInTime:   { type: Date },
    shootWorkOutTime:  { type: Date },
  },
  { timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
