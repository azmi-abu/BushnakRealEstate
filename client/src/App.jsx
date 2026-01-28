import { useEffect, useState } from "react";

import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Tips from "./components/Tips";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AccessibilityTools from "./components/AccessibilityTools";
import { motion } from "framer-motion";

export default function App() {
  const [openA11y, setOpenA11y] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenA11y(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full overflow-x-clip bg-[var(--brand-bg)] text-white font-[inherit]"
    >
      {/* Skip to content */}
      <a
        href="#main"
        className="
          sr-only focus:not-sr-only
          focus:fixed focus:top-4 focus:left-4 focus:z-[10000]
          focus:rounded-xl focus:bg-white focus:px-4 focus:py-2
          focus:text-black focus:shadow-xl
        "
      >
        דלג לתוכן
      </a>

      <div className="w-full overflow-x-clip">
        <Header />
      </div>

      {/* HERO */}
      <section
        className="
          relative w-full overflow-hidden
          h-auto sm:h-[78vh]
          min-h-0 sm:min-h-[560px] lg:min-h-[620px]
          py-10 sm:py-0
        "
      >
        <img
          src="/images/hero.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-green2)]/35 via-[var(--brand-bg)]/35 to-[var(--brand-bg)]/70" />
        <div className="absolute inset-0 bg-[var(--brand-yellow)]/10 mix-blend-overlay" />

        <div className="pointer-events-none absolute -top-40 -right-40 h-[380px] w-[380px] sm:h-[580px] sm:w-[580px] rounded-full bg-[var(--brand-yellow)]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[380px] w-[380px] sm:h-[580px] sm:w-[580px] rounded-full bg-[var(--brand-green2)]/28 blur-3xl" />

        <div className="relative mx-auto h-full w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-start justify-center sm:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full"
            >
              {/* Card */}
              <div
                className="
                  mx-auto w-full max-w-[760px]
                  rounded-3xl sm:rounded-[2.25rem]
                  border border-white/10 bg-white/10
                  backdrop-blur-xl shadow-2xl
                  p-4 sm:p-7 md:p-10
                "
              >
                <div className="mb-4 h-[2px] w-24 sm:w-28 rounded-full bg-[var(--brand-yellow)]/80" />

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/95 backdrop-blur font-[inherit]">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                  W.B Real Estate Consulting
                </div>

                <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight [text-shadow:0_10px_30px_rgba(0,0,0,0.65)] font-[inherit]">
                  ליווי השקעות נדל״ן{" "}
                  <span className="text-[var(--brand-yellow)]">בדיוק ובביטחון</span>
                </h1>

                <p className="mt-3 sm:mt-4 text-sm sm:text-lg leading-relaxed text-white/90 [text-shadow:0_6px_18px_rgba(0,0,0,0.55)] font-[inherit]">
                  ב-W.B Real Estate Consulting אנו מלווים משקיעים שמחפשים יותר מעסקה —
                  דיוק, ביטחון ותשואה חכמה, עם אסטרטגיית השקעה אישית וסטנדרט בלתי מתפשר.
                </p>

                <div className="mt-5 sm:mt-7 grid grid-cols-1 sm:flex sm:flex-row gap-3">
                  <a
                    href="#contact"
                    className="
                      w-full sm:w-auto font-[inherit]
                      inline-flex items-center justify-center
                      rounded-2xl bg-[var(--brand-yellow)]
                      px-6 sm:px-7 py-3
                      text-sm sm:text-base font-semibold
                      text-[var(--brand-bg)] shadow-lg
                      hover:bg-[var(--brand-yellow2)] transition
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/60
                      focus-visible:ring-offset-2 focus-visible:ring-offset-black/30
                    "
                  >
                    השאירו פרטים
                  </a>

                  <a
                    href="#projects"
                    className="
                      w-full sm:w-auto font-[inherit]
                      inline-flex items-center justify-center
                      rounded-2xl border border-white/20 bg-white/10
                      px-6 sm:px-7 py-3
                      text-sm sm:text-base font-semibold text-white
                      backdrop-blur hover:bg-white/15 transition
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/60
                      focus-visible:ring-offset-2 focus-visible:ring-offset-black/30
                    "
                  >
                    צפו בפרויקטים
                  </a>
                </div>

                <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <MiniStat title="תהליך מסודר" compact />
                  <MiniStat title="המלצות אמיתיות" compact />
                  <MiniStat title="מיקוד בתשואה" compact />
                  <MiniStat title="שקיפות מלאה" compact />
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-white/80 font-[inherit]">
                <TrustPill>ליווי אישי</TrustPill>
                <TrustPill>בדיקות לפני רכישה</TrustPill>
                <TrustPill>תמחור נכון</TrustPill>
                <TrustPill>מו״מ מקצועי</TrustPill>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main
        id="main"
        className="w-full overflow-x-clip bg-gradient-to-b from-[var(--brand-bg)] via-[var(--brand-bg)] to-black/40"
      >
        <About />
        <Projects />
        <Tips />
        <Contact />
      </main>

      <Footer onOpenA11y={() => setOpenA11y(true)} />
      <AccessibilityTools />
      {openA11y && <AccessibilityStatementModal onClose={() => setOpenA11y(false)} />}
    </div>
  );
}

function AccessibilityStatementModal({ onClose }) {
  const LAST_UPDATED = "20.01.2026";

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 cursor-pointer"
      role="dialog"
      aria-modal="true"
      aria-label="הצהרת נגישות"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#0f172a] shadow-2xl cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div dir="rtl" className="text-lg font-extrabold text-white">
            הצהרת נגישות
            <div className="text-xs font-bold text-white/50">
              תאריך עדכון אחרון: {LAST_UPDATED}
            </div>
          </div>

          <button
            type="button"
            aria-label="סגור"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"
          >
            ✕
          </button>
        </div>

        <div
          dir="rtl"
          className="max-h-[70vh] overflow-y-auto px-6 py-6 text-white/85 leading-relaxed space-y-6"
        >
          <p>
            האתר <b>W.B Real Estate Consulting</b> מחויב לספק חוויית גלישה נגישה,
            שוויונית ונוחה לכלל המשתמשים, לרבות אנשים עם מוגבלויות.
          </p>

          <p>
            אנו פועלים ליישום והטמעה של עקרונות הנגישות בהתאם להוראות הדין והתקנים
            המקובלים, במטרה לאפשר שימוש מיטבי באתר לכלל האוכלוסייה.
          </p>

          <section>
            <h3 className="font-extrabold text-white">תקנים וחקיקה</h3>
            <ul className="mt-2 list-disc pr-5 space-y-1">
              <li>התקן הישראלי ת״י 5568</li>
              <li>
                תקנה 35 לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
                תשע״ג–2013
              </li>
              <li>WCAG 2.1 של W3C ברמה AA</li>
              <li>תקני HTML ו-CSS של W3C</li>
            </ul>
          </section>

          <section>
            <h3 className="font-extrabold text-white">התאמות נגישות שבוצעו באתר</h3>
            <ul className="mt-2 list-disc pr-5 space-y-1">
              <li>ניווט מלא באמצעות מקלדת</li>
              <li>אפשרות לדילוג לתוכן הראשי</li>
              <li>היררכיית כותרות תקינה</li>
              <li>ניגודיות צבעים מתאימה</li>
              <li>התאמה לקוראי מסך וטכנולוגיות מסייעות</li>
              <li>טקסטים קריאים וברורים</li>
              <li>רספונסיביות למכשירים שונים</li>
            </ul>
          </section>

          <section>
            <h3 className="font-extrabold text-white">סייגים / רכיבי צד ג׳</h3>
            <p className="mt-2">
              ייתכן שחלק מהתכנים באתר, ובפרט רכיבים/תכנים המוטמעים מצדדים שלישיים (כגון ווידג׳ט
              WhatsApp וקישורים לשירותים חיצוניים כגון Instagram ו-Facebook), אינם נגישים במלואם
              ואינם בשליטתנו. אם נתקלתם בקושי — נשמח לסייע ולספק חלופה נגישה.
            </p>
          </section>

          <section>
            <h3 className="font-extrabold text-white">פנייה בנושא נגישות</h3>
            <div className="mt-2 space-y-1">
              <div>
                <b>אימייל:</b> azmi.abu95@gmail.com
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl bg-[var(--brand-yellow)] px-6 py-3 font-extrabold text-[var(--brand-bg)] hover:bg-[var(--brand-yellow2)] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/60"
            >
              סגור
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ title, compact = false }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/10 backdrop-blur transition hover:bg-white/15 font-[inherit]",
        compact ? "p-3" : "p-4",
      ].join(" ")}
    >
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-white/80" aria-hidden="true">
        ✔
      </div>
    </div>
  );
}

function TrustPill({ children }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/10 px-3 sm:px-4 py-2 backdrop-blur hover:bg-white/15 transition font-[inherit]">
      {children}
    </div>
  );
}
