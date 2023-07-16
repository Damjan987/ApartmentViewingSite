const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const LocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: false },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", LocationSchema);
