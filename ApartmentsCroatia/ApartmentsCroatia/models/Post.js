const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    // these stars represent the quality of the apartment, not likes
    stars: { type: Number, default: 0 },
    dayPrice: { type: Number, default: 0 },
    creatorUsername: { type: String, required: false },
    type: { type: Schema.Types.ObjectId, ref: "Type", required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
