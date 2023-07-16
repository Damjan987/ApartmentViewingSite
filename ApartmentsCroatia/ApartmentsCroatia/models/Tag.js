const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Represents an accessory that an appartment has
const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", TagSchema);
