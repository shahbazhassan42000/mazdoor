import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    message: { type: String, required: [true, "can't be blank"] },
    date: { type: Date, default: Date.now },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
    },
  },
  { timestamps: true }
);

mongoose.model("messages", messageSchema);
