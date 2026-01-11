import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Tips from "./components/Tips";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brandGreen2 via-brandBg to-brandBg text-white">
      <Header />

      {/* HERO */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden">
        {/* Background image */}
        <img
          src="/hero.jpg"
          alt="Real estate"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* GREEN overlay (lighter) */}
        <div className="absolute inset-0 bg-gradient-to-b from-brandGreen/55 via-brandGreen/30 to-brandBg/65" />

        {/* Yellow tint (injects brand into photo) */}
        <div className="absolute inset-0 bg-brandYellow/12 mix-blend-overlay" />

        {/* Glow blobs */}
        <div className="pointer-events-none absolute -top-44 -right-44 h-[580px] w-[580px] rounded-full bg-brandYellow/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-44 -left-44 h-[580px] w-[580px] rounded-full bg-brandGreen2/30 blur-3xl" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-6xl items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brandYellow/40 bg-brandGreen/30 px-4 py-2 text-sm text-white/95 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brandYellow" />
              Bushnak Real Estate • דף נחיתה
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              נדל״ן. <span className="text-brandYellow">שיווק.</span> תוצאות.
            </h1>

            <p className="mt-4 text-lg text-white/90">
              ליווי משקיעים ורוכשים עם תהליך ברור: בדיקות, ניתוח, מו״מ וליווי עד חתימה.
              דף נחיתה מודרני שמביא פניות איכותיות.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-brandYellow px-7 py-3 font-extrabold text-brandBg shadow-lg hover:bg-brandYellow2 transition"
              >
                השאירו פרטים
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-2xl border border-brandYellow/45 bg-brandGreen/25 px-7 py-3 font-semibold text-brandYellow backdrop-blur hover:bg-brandGreen/35 transition"
              >
                צפו בפרויקטים
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/95 md:grid-cols-4">
              <MiniStat title="תהליך מסודר" />
              <MiniStat title="המלצות אמיתיות" />
              <MiniStat title="מיקוד בתשואה" />
              <MiniStat title="שקיפות מלאה" />
            </div>
          </motion.div>
        </div>
      </section>

      <main>
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
    <div className="rounded-2xl border border-brandYellow/20 bg-brandGreen/25 p-4 backdrop-blur transition hover:bg-brandGreen/35 hover:shadow-[0_0_55px_rgba(217,255,74,0.14)]">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-white/80">✔</div>
    </div>
  );
}
