import nodemailer from "nodemailer";

export function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendLeadEmail({ phone, email }) {
  const to = process.env.LEADS_TO_EMAIL || process.env.GMAIL_USER;
  const from = process.env.GMAIL_USER;

  const transporter = createTransporter();

  const subject = `🔥 Lead חדש מהדף נחיתה - ${phone}`;
  const text = `Lead חדש התקבל:\n\nטלפון: ${phone}\nאימייל: ${email}\n\nזמן: ${new Date().toLocaleString("he-IL")}\n`;
  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl">
      <h2>🔥 Lead חדש התקבל</h2>
      <p><b>טלפון:</b> ${phone}</p>
      <p><b>אימייל:</b> ${email}</p>
      <p style="color:#666"><b>זמן:</b> ${new Date().toLocaleString("he-IL")}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"W.B Real Estate Consulting" <${from}>`,
    to,
    subject,
    text,
    html,
  });
}
