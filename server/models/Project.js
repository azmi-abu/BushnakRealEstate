import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    currency: { type: String, default: "ILS" },
    imageUrl: { type: String, required: true },
    pdfUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
