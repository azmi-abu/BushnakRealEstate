import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

app.post("/api/contact", (req, res) => {
  const { phone, email } = req.body || {};

  const phoneClean = String(phone || "").trim();
  const emailClean = String(email || "").trim();

  // Simple validation
  if (phoneClean.length < 7) {
    return res.status(400).json({ ok: false, message: "מספר טלפון לא תקין" });
  }
  if (!emailClean.includes("@")) {
    return res.status(400).json({ ok: false, message: "אימייל לא תקין" });
  }

  const leads = readLeads();
  leads.unshift({
    id: crypto.randomUUID(),
    phone: phoneClean,
    email: emailClean,
    createdAt: new Date().toISOString(),
  });
  writeLeads(leads);

  return res.json({ ok: true, message: "פרטיך התקבלו בהצלחה" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
