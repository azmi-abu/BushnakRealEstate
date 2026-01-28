import nodemailer from "nodemailer";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP_HOST / SMTP_USER / SMTP_PASS in .env");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = true, 587 = false (STARTTLS)
    auth: { user, pass },

    // ✅ important for Brevo on 587
    requireTLS: port === 587,

    // (optional) more tolerant in dev environments
    tls: {
      minVersion: "TLSv1.2",
    },
  });
}

export async function sendLeadEmail({ phone, email }) {
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.MAIL_FROM;

  if (!to) throw new Error("Missing LEADS_TO_EMAIL in .env");
  if (!from) throw new Error("Missing MAIL_FROM in .env");

  const transporter = createTransporter();

  const subject = `🔥 Lead חדש מהאתר - ${phone}`;
  const text = `Lead חדש התקבל:\n\nטלפון: ${phone}\nאימייל: ${email}\nזמן: ${new Date().toLocaleString(
    "he-IL"
  )}\n`;

  const html = `
    <div style="font-family: Arial, sans-serif; direction: rtl">
      <h2>🔥 Lead חדש התקבל</h2>
      <p><b>טלפון:</b> ${phone}</p>
      <p><b>אימייל:</b> ${email}</p>
      <p style="color:#666"><b>זמן:</b> ${new Date().toLocaleString("he-IL")}</p>
    </div>
  `;

  await transporter.sendMail({
    from: `W.B Real Estate Consulting <${from}>`,
    to,
    replyTo: email, // reply to the lead email
    subject,
    text,
    html,
  });
}
