import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import mongoose from "mongoose";
import { sendLeadEmail } from "./mailer.js";
import projectsRoute from "./routes/projects.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: CLIENT_ORIGIN }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const leadsFile = path.join(__dirname, "leads.json");

function readLeads() {
  try {
    if (!fs.existsSync(leadsFile)) fs.writeFileSync(leadsFile, "[]", "utf8");
    const raw = fs.readFileSync(leadsFile, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeLeads(leads) {
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf8");
}

function isValidPhone(p) {
  const digits = String(p || "").replace(/\D/g, "");
  return /^05\d{8}$/.test(digits); // Israeli mobile format
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e || "").trim());
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

/** ✅ Quick email test (hit in browser) */
app.get("/api/test-email", async (req, res) => {
  try {
    await sendLeadEmail({ phone: "0501234567", email: "test@example.com" });
    res.json({ ok: true, message: "Test email sent ✅" });
  } catch (err) {
    console.error("TEST EMAIL ERROR:", err);
    res.status(500).json({ ok: false, message: err.message || "Failed to send" });
  }
});

/** Projects API (MongoDB) */
app.use("/api/projects", projectsRoute);

/** Contact API (still saving leads.json) */
app.post("/api/contact", async (req, res) => {
  try {
    const { phone, email } = req.body || {};

    const phoneClean = String(phone || "").replace(/\D/g, "");
    const emailClean = String(email || "").trim();

    // Validation
    if (!isValidPhone(phoneClean)) {
      return res.status(400).json({
        ok: false,
        message: "מספר טלפון לא תקין (חייב להתחיל ב-05 ולהיות 10 ספרות)",
      });
    }
    if (!isValidEmail(emailClean)) {
      return res.status(400).json({ ok: false, message: "אימייל לא תקין" });
    }

    // Save to leads.json
    const leads = readLeads();
    const lead = {
      id: crypto.randomUUID(),
      phone: phoneClean,
      email: emailClean,
      createdAt: new Date().toISOString(),
    };

    leads.unshift(lead);
    writeLeads(leads);

    // Send email
    await sendLeadEmail({ phone: phoneClean, email: emailClean });

    return res.json({ ok: true, message: "פרטיך התקבלו בהצלחה ✅" });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return res.status(500).json({ ok: false, message: err.message || "שגיאה בשליחה (שרת)" });
  }
});

const PORT = process.env.PORT || 5000;

/** Connect MongoDB, then start server */
async function start() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Missing MONGO_URI in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => console.log(`✅ API listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
