// server/utils/mailer.js
import axios from "axios";

export async function sendLeadEmail({ phone, email }) {
  const apiKey = process.env.BREVO_API_KEY;
  const toEmail = process.env.LEADS_TO_EMAIL;
  const fromEmail = process.env.MAIL_FROM;

  if (!apiKey) throw new Error("Missing BREVO_API_KEY in env");
  if (!toEmail) throw new Error("Missing LEADS_TO_EMAIL in env");
  if (!fromEmail) throw new Error("Missing MAIL_FROM in env");

  const subject = `🔥 Lead חדש מהאתר - ${phone}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; direction: rtl">
      <h2>🔥 Lead חדש התקבל</h2>
      <p><b>טלפון:</b> ${phone}</p>
      <p><b>אימייל:</b> ${email}</p>
      <p style="color:#666"><b>זמן:</b> ${new Date().toLocaleString("he-IL")}</p>
    </div>
  `;

  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { name: "W.B Real Estate Consulting", email: fromEmail },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
      replyTo: { email },
    },
    {
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      timeout: 15000,
    }
  );
}
