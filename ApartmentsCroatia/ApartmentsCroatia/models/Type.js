const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// HOTEL, APARTMENT, CAMP, ...
const TypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Type", TypeSchema);
