import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const projectSchema = new mongoose.Schema(
    {
        gig: { type: mongoose.Schema.Types.ObjectId, ref: "gigs" },
        description: { type: String, required: [true, "can't be blank"] },
        price: { type: Number, required: [true, "can't be blank"] },
        deliveryTime: { type: Number, required: [true, "can't be blank"] },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        status: { type: String, default: "OFFERED" }
    },
    { timestamps: true }
);

mongoose.model("projects", projectSchema);
