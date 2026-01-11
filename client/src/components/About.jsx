import Reveal from "./Reveal";

export default function About() {
  return (
    
    <section id="about" className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(217,255,74,0.08)] transition">
          <h2 className="text-3xl font-extrabold">מי אנחנו</h2>
          <p className="mt-4 leading-relaxed text-white/80">
            אנחנו מלווים משקיעים ורוכשים: איתור הזדמנויות, בדיקות, אסטרטגיה,
            ניהול מו״מ וליווי מלא עד חתימה.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>ליווי משקיעים</Badge>
            <Badge>ניתוח עסקה</Badge>
            <Badge>מו״מ מתקדם</Badge>
            <Badge>תכנון מימון</Badge>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-l from-brandPanel to-white/5 p-8 shadow-2xl hover:shadow-[0_0_60px_rgba(13,107,87,0.18)] transition">
          <h3 className="text-2xl font-extrabold text-brandYellow">
            למה לבחור בנו?
          </h3>

          <ul className="mt-6 grid gap-3 text-white/85">
            <Li>שירות מהיר וזמין</Li>
            <Li>שקיפות מלאה</Li>
            <Li>בדיקות לפני רכישה</Li>
            <Li>ליווי עד חתימה</Li>
          </ul>

          <a
            href="#contact"
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-brandYellow px-6 py-3 font-extrabold text-brandBg hover:bg-brandYellow2 transition"
          >
            קבעו שיחה
          </a>
        </div>
      </div>
      </Reveal>
    </section>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-brandYellow/30 bg-brandYellow/10 px-3 py-1 text-sm text-white">
      {children}
    </span>
  );
}

function Li({ children }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      {children}
    </li>
  );
}
