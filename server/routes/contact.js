import express from "express";
import { sendLeadEmail } from "../utils/mailer.js";

const router = express.Router();

function isValidPhone(p) {
  return /^05\d{8}$/.test(p);
}
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e).trim());
}

router.post("/", async (req, res) => {
  try {
    const phone = String(req.body.phone || "").replace(/\D/g, "");
    const email = String(req.body.email || "").trim();

    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: "מספר הטלפון לא תקין" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "אימייל לא תקין" });
    }

    await sendLeadEmail({ phone, email });

    return res.json({ message: "הפרטים נשלחו בהצלחה ✅" });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return res.status(500).json({ message: "שגיאה בשליחה (שרת)" });
  }
});

export default router;
