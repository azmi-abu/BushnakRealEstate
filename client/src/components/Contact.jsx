import { useMemo, useState } from "react";
import axios from "axios";
import Reveal from "./Reveal";
import { PhoneIcon } from "@heroicons/react/24/solid";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  // --- validation helpers ---
  const normalizedPhone = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  function isValidPhone(p) {
    return /^05\d{8}$/.test(p);
  }

  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
  }

  const phoneOk = isValidPhone(normalizedPhone);
  const emailOk = isValidEmail(email);
  const canSubmit = phoneOk && emailOk && status.type !== "loading";

  async function submit(e) {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!phoneOk) {
      setStatus({
        type: "error",
        message: "מספר הטלפון חייב להיות 10 ספרות ולהתחיל ב-05",
      });
      return;
    }

    if (!emailOk) {
      setStatus({
        type: "error",
        message: "נא להזין כתובת אימייל תקינה",
      });
      return;
    }

    setStatus({ type: "loading", message: "" });

    try {
      const res = await axios.post(`${API}/api/contact`, {
        phone: normalizedPhone,
        email: email.trim(),
      });

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
            
            {/* Title with icon */}
            <h2 className="flex items-center gap-3 text-3xl font-extrabold">
              <PhoneIcon className="h-8 w-8 text-brandYellow drop-shadow-[0_0_12px_rgba(217,255,74,0.6)]" />
              ליצירת קשר
            </h2>

            <p className="mt-2 text-white/70">
              השאירו פרטים ונחזור אליכם בהקדם.
            </p>

            <form onSubmit={submit} className="mt-6 grid gap-4">
              <Input
                placeholder="מספר טלפון (05XXXXXXXX)"
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(digits);
                }}
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                pattern="^05\d{8}$"
              />

              <Input
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputMode="email"
                autoComplete="email"
              />

              <button
                disabled={!canSubmit}
                className={[
                  "rounded-2xl px-6 py-3 font-extrabold",
                  "transition-all duration-200 ease-out",
                  "cursor-pointer disabled:cursor-not-allowed",
                  "bg-brandYellow shadow-lg disabled:opacity-60",
                  canSubmit
                    ? "text-black/90 ring-1 ring-brandYellow/40 shadow-[0_0_35px_rgba(217,255,74,0.35)] hover:bg-brandYellow2 hover:shadow-[0_0_55px_rgba(217,255,74,0.55)] hover:scale-[1.06] hover:-translate-y-[2px] active:scale-[1.02]"
                    : "text-brandBg",
                ].join(" ")}
              >
                {status.type === "loading" ? "שולח..." : "שליחה"}
              </button>




              {(phone.length > 0 || email.length > 0) && status.type === "idle" && (
                <div className="grid gap-2 text-sm text-white/70">
                  {phone.length > 0 && !phoneOk && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      טלפון חייב להיות 10 ספרות ולהתחיל ב-05
                    </div>
                  )}
                  {email.length > 0 && !emailOk && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      נא להזין אימייל תקין (לדוגמה: name@example.com)
                    </div>
                  )}
                </div>
              )}

              {status.type !== "idle" && status.message && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                  {status.message}
                </div>
              )}
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-l from-brandPanel to-white/5 p-8 shadow-2xl">
            <h3 className="text-2xl font-extrabold text-brandYellow">
              מה מקבלים?
            </h3>

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
