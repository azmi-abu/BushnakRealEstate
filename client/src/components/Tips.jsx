import Reveal from "./Reveal";

export default function Tips() {
  return (
    
    <section id="tips" className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-l from-brandPanel to-white/5 p-8 shadow-2xl">
        <h2 className="text-3xl font-extrabold">טיפים למשקיע</h2>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <Tip title="בדיקות לפני רכישה" text="תשתיות, תחבורה, ביקושים, תכניות עתידיות והשוואת מחירים באזור." />
          <Tip title="תשואה זה לא הכל" text="תסתכלו גם על סיכון, זמן ריק, עלויות שיפוץ ומיסוי." />
          <Tip title="מימון מסודר" text="אישור עקרוני, תרחישים, ומרווח להוצאות והפתעות." />
          <Tip title="מו״מ חכם" text="סעיפי חוזה, ערבויות, הצמדות, ולוחות זמנים ברורים." />
        </div>
      </div>
      </Reveal>
    </section>
    
  );
}

function Tip({ title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 hover:shadow-[0_0_55px_rgba(217,255,74,0.08)]">
      <div className="text-lg font-extrabold text-brandYellow">{title}</div>
      <div className="mt-2 text-white/80 leading-relaxed">{text}</div>
    </div>
  );
}
