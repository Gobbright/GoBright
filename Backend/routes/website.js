const router = require("express").Router();
const WebsiteContent = require("../models/WebsiteContent");

/* GET all items of a type */
router.get("/:type", async (req, res) => {
  const { type } = req.params;
  if (!["client", "review", "team"].includes(type))
    return res.status(400).json({ success: false, message: "Invalid type." });
  try {
    const items = await WebsiteContent.find({ type }).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, items });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* POST create new item */
router.post("/:type", async (req, res) => {
  const { type } = req.params;
  if (!["client", "review", "team"].includes(type))
    return res.status(400).json({ success: false, message: "Invalid type." });
  try {
    const count = await WebsiteContent.countDocuments({ type });
    const item = new WebsiteContent({ type, ...req.body, order: count });
    await item.save();
    res.json({ success: true, item });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* PUT update item */
router.put("/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  if (!["client", "review", "team"].includes(type))
    return res.status(400).json({ success: false, message: "Invalid type." });
  try {
    const item = await WebsiteContent.findOneAndUpdate(
      { _id: id, type },
      { $set: req.body },
      { new: true }
    );
    if (!item) return res.status(404).json({ success: false, message: "Not found." });
    res.json({ success: true, item });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* DELETE item */
router.delete("/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  try {
    await WebsiteContent.findOneAndDelete({ _id: id, type });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
