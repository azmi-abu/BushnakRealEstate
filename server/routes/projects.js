import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// POST /api/projects (optional - for admin usage)
router.post("/", async (req, res) => {
  try {
    const { title, location, price, currency, images } = req.body;

    if (!title || !location || typeof price !== "number" || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Missing/invalid fields" });
    }

    const created = await Project.create({
      title,
      location,
      price,
      currency: currency || "ILS",
      images,
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: "Failed to create project" });
  }
});

export default router;
