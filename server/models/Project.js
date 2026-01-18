import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true }, // store as number
    currency: { type: String, default: "ILS" },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
