const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    profileImage: { type: String, required: false },
    role: {
      type: Number,
      default: 0,
    },
    isSubscriber: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    notes: { type: String, required: false },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    savedPosts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    chats: [
      {
        type: ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
