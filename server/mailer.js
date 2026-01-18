import nodemailer from "nodemailer";

export async function sendLeadEmail({ phone, email }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"W.B Real Estate Consulting" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "📩 ליד חדש מהאתר",
    html: `
      <h3>ליד חדש התקבל</h3>
      <p><b>טלפון:</b> ${phone}</p>
      <p><b>אימייל:</b> ${email}</p>
    `,
  });
}
