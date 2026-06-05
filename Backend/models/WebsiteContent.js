const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: { type: String, enum: ["client", "review", "team"], required: true },
  name:    { type: String, required: true },
  role:    String,
  photo:   String,
  logo:    String,
  rating:  { type: Number, min: 1, max: 5, default: 5 },
  text:    String,
  order:   { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("WebsiteContent", schema);
