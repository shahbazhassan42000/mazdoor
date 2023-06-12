import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const conversationSchema = new mongoose.Schema(
  {
    user1: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
    LastSeenUser1: { type: Date },
    LastSeenUser2: { type: Date },
  },
  { timestamps: true }
);

mongoose.model("conversations", conversationSchema);
