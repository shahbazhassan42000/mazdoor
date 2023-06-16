import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

mongoose.set("strictQuery", false);

const gigSchema = new mongoose.Schema({
  image: { type: String, required: [true, "can't be blank"] },
  title: { type: String, required: [true, "can't be blank"], unique: true, index: true },
  description: { type: String, required: [true, "can't be blank"] },
  area: { type: String, required: [true, "can't be blank"] },
  category: { type: String, required: [true, "can't be blank"] },
  price: { type: Number, required: [true, "can't be blank"] },
  deliveryTime: { type: Number, required: [true, "can't be blank"] },
  rating: { type: Number, default: 80 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "projects" }],
}, { timestamps: true });

gigSchema.plugin(uniqueValidator);

mongoose.model("gigs", gigSchema);