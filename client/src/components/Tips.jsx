import Reveal from "./Reveal";
import { LightBulbIcon } from "@heroicons/react/24/solid";

export default function Tips() {
  return (
    <section id="tips" className="mx-auto max-w-6xl px-4 py-14" dir="rtl">
      <Reveal>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-l from-brandPanel to-white/5 p-8 shadow-2xl">
          <h2 className="flex items-center gap-3 text-3xl font-extrabold">
            <LightBulbIcon
              className="h-8 w-8 text-brandYellow drop-shadow-[0_0_12px_rgba(217,255,74,0.6)]"
              aria-hidden="true"
            />
            טיפים למשקיע
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <Tip
              title="הגדירו מטרת השקעה ברורה"
              text="לפני כל צעד, חשוב להגדיר מה אתם מצפים מההשקעה: האם המטרה היא תשואה חודשית קבועה? עליית ערך בטווח הבינוני-ארוך? או שילוב בין השניים. הגדרה מדויקת של המטרה תשפיע על סוג הנכס, האזור והאסטרטגיה כולה."
            />
            <Tip
              title="בחרו אזור עם ביקוש מוכח"
              text="אזורים מתפתחים עשויים להיות אטרקטיביים, אך השקעה חכמה משלבת גם אזורים עם ביקוש יציב להשכרה ולמכירה. בדובאי, נתוני תפוסה, נגישות, תשתיות ותכניות פיתוח קיימות הם גורמים קריטיים בקבלת ההחלטה."
            />
            <Tip
              title="עבדו רק עם גורמים מוסמכים ומקומיים"
              text="הצלחה בהשקעה תלויה בליווי נכון. יש לעבוד אך ורק עם מתווכים מורשים, יזמים מוכרים ויועצים מקצועיים שמכירים את השוק המקומי, הרגולציה והפרקטיקה בפועל."
            />
            <Tip
              title="בדקו את כל העלויות מראש"
              text="מעבר למחיר הנכס, יש להביא בחשבון דמי ניהול, תחזוקה, רישומים, עמלות ותשלומים נלווים. שקיפות מלאה בעלויות תאפשר תכנון פיננסי נכון והימנעות מהפתעות בהמשך הדרך."
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Tip({ title, text }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 hover:shadow-[0_0_55px_rgba(217,255,74,0.08)]">
      <h3 className="text-lg font-extrabold text-brandYellow">{title}</h3>
      <p className="mt-2 text-white/80 leading-relaxed">{text}</p>
    </article>
  );
}
