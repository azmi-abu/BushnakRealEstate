import { useState } from "react";
import axios from "axios";
import Reveal from "./Reveal";


const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function submit(e) {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });

    try {
      const res = await axios.post(`${API}/api/contact`, { phone, email });
      setStatus({ type: "success", message: res.data?.message || "נשלח!" });
      setPhone("");
      setEmail("");
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.response?.data?.message || "שגיאה בשליחה",
      });
    }
  }

  return (
    
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl hover:shadow-[0_0_70px_rgba(217,255,74,0.10)] transition">
          <h2 className="text-3xl font-extrabold">ליצירת קשר</h2>
          <p className="mt-2 text-white/70">השאירו פרטים ונחזור אליכם בהקדם.</p>

          <form onSubmit={submit} className="mt-6 grid gap-4">
            <Input
              placeholder="מספר טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              disabled={status.type === "loading"}
              className="rounded-2xl bg-brandYellow px-6 py-3 font-extrabold text-brandBg shadow-lg hover:bg-brandYellow2 transition disabled:opacity-60"
            >
              {status.type === "loading" ? "שולח..." : "שליחה"}
            </button>

            {status.type !== "idle" && status.message && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                {status.message}
              </div>
            )}
          </form>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-l from-brandPanel to-white/5 p-8 shadow-2xl">
          <h3 className="text-2xl font-extrabold text-brandYellow">מה מקבלים?</h3>

          <div className="mt-6 grid gap-3">
            <Point>שיחת אפיון קצרה</Point>
            <Point>התאמה לתקציב</Point>
            <Point>תהליך ברור ושקוף</Point>
            <Point>ליווי עד חתימה</Point>
          </div>
        </div>
      </div>
      </Reveal>
    </section>
    
  );
}

function Input(props) {
  return (
    <input
      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-brandYellow/40"
      {...props}
    />
  );
}

function Point({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85">
      {children}
    </div>
  );
}
