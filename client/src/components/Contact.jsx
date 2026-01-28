import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Reveal from "./Reveal";
import { PhoneIcon } from "@heroicons/react/24/solid";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({ phone: false, email: false });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  // --- validation helpers ---
  const normalizedPhone = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  function isValidPhone(p) {
    return /^05\d{8}$/.test(p);
  }

  function isValidEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e).trim());
  }

  const phoneOk = isValidPhone(normalizedPhone);
  const emailOk = isValidEmail(email);

  const phoneError =
    touched.phone && normalizedPhone.length > 0 && !phoneOk
      ? "טלפון חייב להיות 10 ספרות ולהתחיל ב-05"
      : touched.phone && normalizedPhone.length === 0
      ? "נא להזין מספר טלפון"
      : "";

  const emailError =
    touched.email && email.trim().length > 0 && !emailOk
      ? "נא להזין אימייל תקין (לדוגמה: name@example.com)"
      : touched.email && email.trim().length === 0
      ? "נא להזין כתובת אימייל"
      : "";

  const canSubmit = phoneOk && emailOk && status.type !== "loading";

  useEffect(() => {
  if (status.type !== "success" && status.type !== "error") return;

  const t = setTimeout(() => {
    setStatus({ type: "idle", message: "" });
  }, 2000);

  return () => clearTimeout(t);
}, [status.type]);


  async function submit(e) {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    // Mark both as touched to reveal errors
    setTouched({ phone: true, email: true });

    if (!phoneOk) {
      setStatus({
        type: "error",
        message: "נא לתקן את מספר הטלפון לפני שליחה.",
      });
      // move focus to first invalid field
      phoneRef.current?.focus?.();
      return;
    }

    if (!emailOk) {
      setStatus({
        type: "error",
        message: "נא לתקן את כתובת האימייל לפני שליחה.",
      });
      emailRef.current?.focus?.();
      return;
    }

    setStatus({ type: "loading", message: "שולח..." });

    try {
      const res = await axios.post(`${API}/api/contact`, {
        phone: normalizedPhone,
        email: email.trim(),
      });

      setStatus({ type: "success", message: res.data?.message || "נשלח בהצלחה!" });
      setPhone("");
      setEmail("");
      setTouched({ phone: false, email: false });

      // Focus back to phone for quick resubmit if needed
      setTimeout(() => phoneRef.current?.focus?.(), 0);
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.response?.data?.message || "שגיאה בשליחה",
      });
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14" dir="rtl">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl hover:shadow-[0_0_70px_rgba(217,255,74,0.10)] transition">
            {/* Title with icon */}
            <h2 className="flex items-center gap-3 text-3xl font-extrabold">
              <PhoneIcon className="h-8 w-8 text-brandYellow drop-shadow-[0_0_12px_rgba(217,255,74,0.6)]" />
              ליצירת קשר
            </h2>

            <p className="mt-2 text-white/70">השאירו פרטים ונחזור אליכם בהקדם.</p>

            {/* Live region for SR (announces success/error/loading) */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {status.type !== "idle" ? status.message : ""}
            </div>

            <form onSubmit={submit} className="mt-6 grid gap-4" noValidate>
              {/* PHONE */}
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-white/85">
                  מספר טלפון
                </label>
                <input
                  ref={phoneRef}
                  id="contact-phone"
                  name="phone"
                  className="
                    mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3
                    text-white placeholder:text-white/40 outline-none
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-brandYellow/60
                    focus-visible:ring-offset-2 focus-visible:ring-offset-black/30
                  "
                  placeholder="05XXXXXXXX"
                  value={phone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhone(digits);

                    // clear phone error while typing
                    if (touched.phone) setTouched((t) => ({ ...t, phone: false }));

                    // clear status box when user edits
                    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
                  }}

                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                {phoneError ? (
                  <p id="phone-error" className="mt-2 text-sm text-red-200" role="alert">
                    {phoneError}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-white/50">
                    לדוגמה: 0501234567
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-white/85">
                  אימייל
                </label>
                <input
                  ref={emailRef}
                  id="contact-email"
                  name="email"
                  className="
                    mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3
                    text-white placeholder:text-white/40 outline-none
                    focus:outline-none focus-visible:ring-4 focus-visible:ring-brandYellow/60
                    focus-visible:ring-offset-2 focus-visible:ring-offset-black/30
                  "
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    // clear email error while typing
                    if (touched.email) setTouched((t) => ({ ...t, email: false }));

                    // clear status box when user edits
                    if (status.type !== "idle") setStatus({ type: "idle", message: "" });
                  }}

                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                {emailError ? (
                  <p id="email-error" className="mt-2 text-sm text-red-200" role="alert">
                    {emailError}
                  </p>
                ) : null}
              </div>

              {/* STATUS BOX (visible) */}
              {status.type !== "idle" && status.message ? (
                <div
                  className={[
                    "rounded-2xl border p-4 text-sm",
                    status.type === "success"
                      ? "border-emerald-300/25 bg-emerald-500/10 text-emerald-100"
                      : status.type === "error"
                      ? "border-red-300/25 bg-red-500/10 text-red-100"
                      : "border-white/10 bg-white/5 text-white/80",
                  ].join(" ")}
                  role={status.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {status.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "rounded-2xl px-6 py-3 font-extrabold",
                  "transition-all duration-200 ease-out",
                  "cursor-pointer disabled:cursor-not-allowed",
                  "bg-brandYellow shadow-lg disabled:opacity-60",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-brandYellow/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
                  canSubmit
                    ? "text-black/90 ring-1 ring-brandYellow/40 shadow-[0_0_35px_rgba(217,255,74,0.35)] hover:bg-brandYellow2 hover:shadow-[0_0_55px_rgba(217,255,74,0.55)] hover:scale-[1.04] hover:-translate-y-[1px] active:scale-[1.02]"
                    : "text-brandBg",
                ].join(" ")}
              >
                {status.type === "loading" ? "שולח..." : "שליחה"}
              </button>
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

function Point({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85">
      {children}
    </div>
  );
}
