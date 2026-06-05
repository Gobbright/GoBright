const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId:  { type: String, required: true, unique: true },
  name:        { type: String, required: true },
  position:    { type: String, required: true },
  password:    { type: String, required: true },
  /* Extended fields */
  mobile:      { type: String, default: "" },
  email:       { type: String, default: "" },
  department:  { type: String, default: "" },
  designation: { type: String, default: "" },
  joiningDate: { type: Date },
  salary:      { type: Number, default: 0 },
  address:     { type: String, default: "" },
  status:      { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
