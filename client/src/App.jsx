import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Tips from "./components/Tips";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-white">
      <Header />

      {/* HERO */}
      <section className="relative h-[82vh] min-h-[620px] overflow-hidden">
        {/* Background image */}
        <img
          src="/images/hero.jpg"
          alt="Real estate"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Darken photo for readability */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Brand gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-green2)]/35 via-[var(--brand-bg)]/35 to-[var(--brand-bg)]/70" />

        {/* Yellow tint */}
        <div className="absolute inset-0 bg-[var(--brand-yellow)]/10 mix-blend-overlay" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute -top-44 -right-44 h-[580px] w-[580px] rounded-full bg-[var(--brand-yellow)]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-44 -left-44 h-[580px] w-[580px] rounded-full bg-[var(--brand-green2)]/28 blur-3xl" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-6xl items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            {/* GLASS PANEL (this is the main fix) */}
            <div className="max-w-3xl rounded-[2.25rem] border border-white/10 bg-white/10 p-7 backdrop-blur-xl shadow-2xl md:p-10">
              {/* Accent top line */}
              <div className="mb-4 h-[2px] w-28 rounded-full bg-[var(--brand-yellow)]/80" />

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/95 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                W.B Real Estate Consulting
              </div>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl [text-shadow:0_10px_30px_rgba(0,0,0,0.65)]">
                נדל״ן. <span className="text-[var(--brand-yellow)]">שיווק.</span>{" "}
                תוצאות.
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-white/90 [text-shadow:0_6px_18px_rgba(0,0,0,0.55)]">
              ב-W.B Real Estate Consulting אנו מלווים משקיעים שמחפשים יותר מעסקה —
              דיוק, ביטחון ותשואה חכמה, עם אסטרטגיית השקעה אישית וסטנדרט בלתי מתפשר.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="font-[inherit] inline-flex items-center justify-center rounded-2xl bg-[var(--brand-yellow)] px-7 py-3 font-semibold text-[var(--brand-bg)] shadow-lg hover:bg-[var(--brand-yellow2)] transition"
                >
                  השאירו פרטים
                </a>

                <a
                  href="#projects"
                  className="font-[inherit] inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur hover:bg-white/15 transition"
                >
                  צפו בפרויקטים
                </a>
              </div>


              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                <MiniStat title="תהליך מסודר" />
                <MiniStat title="המלצות אמיתיות" />
                <MiniStat title="מיקוד בתשואה" />
                <MiniStat title="שקיפות מלאה" />
              </div>
            </div>

            {/* Bottom trust strip (adds “real estate professional” vibe) */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/80">
              <TrustPill>ליווי אישי</TrustPill>
              <TrustPill>בדיקות לפני רכישה</TrustPill>
              <TrustPill>תמחור נכון</TrustPill>
              <TrustPill>מו״מ מקצועי</TrustPill>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BODY */}
      <main className="bg-gradient-to-b from-[var(--brand-bg)] via-[var(--brand-bg)] to-black/40">
        <About />
        <Projects />
        <Tips />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function MiniStat({ title }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15 hover:shadow-[0_0_55px_rgba(217,255,74,0.12)]">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-white/80">✔</div>
    </div>
  );
}

function TrustPill({ children }) {
  return (
    <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/15 transition">
      {children}
    </div>
  );
}
