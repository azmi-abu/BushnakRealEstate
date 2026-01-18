import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function About() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Sync React state with the actual video element
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
    videoRef.current.volume = 1;
  }, [isMuted]);

  const toggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    // Ensure playback continues after user interaction
    try {
      if (!nextMuted && video.paused) {
        await video.play();
      }
    } catch {
      // silently ignore browser restrictions
    }
  };

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {/* VIDEO PANEL */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            {/* glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--brand-yellow)]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--brand-green2)]/25 blur-3xl" />

            <div className="relative h-full min-h-[360px]">
              {/* CLICK OVERLAY */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
                className="absolute inset-0 z-10 cursor-pointer"
              >
                {/* SOUND INDICATOR */}
                <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-sm text-white backdrop-blur transition hover:bg-black/55">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isMuted
                        ? "bg-white/60"
                        : "bg-[var(--brand-yellow)] shadow-[0_0_12px_rgba(217,255,74,0.6)]"
                    }`}
                  />
                  {isMuted ? "ללא קול" : "קול פעיל"}
                </div>
              </button>

              {/* VIDEO */}
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="/video/about.mp4"
                poster="/about-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />

              {/* overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)]/80 via-[var(--brand-bg)]/25 to-transparent" />
              <div className="absolute inset-0 bg-[var(--brand-yellow)]/10 mix-blend-overlay" />

              {/* TEXT */}
              <div className="relative z-20 flex h-full flex-col justify-end p-6 pointer-events-none">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                  מי אנחנו
                </div>

                <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                  W.B Real Estate Consulting
                </h2>

                <p className="mt-2 text-white/85 leading-relaxed">
                  השקעות נדל״ן ברמה אחרת — דיוק, ביטחון ותשואה חכמה, בסטנדרט גבוה.
                </p>
              </div>
            </div>
          </div>

          {/* TEXT PANEL */}
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl transition hover:shadow-[0_0_60px_rgba(217,255,74,0.10)]">
            <div className="pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full bg-[var(--brand-green2)]/10 blur-3xl" />

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
              מי אנחנו
            </div>

            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              השקעות נדל״ן ברמה אחרת
            </h2>

            <div className="mt-4 space-y-4 text-white/85 leading-relaxed">
              <p>
                אנו מתאימים לכל לקוח אסטרטגיית השקעה אישית בהתאם לתקציב, ליעדים
                ולפרופיל הסיכון שלו, ומאפשרים גישה לפרויקטים נבחרים שעברו סינון
                מקצועי קפדני. כל עסקה נבחנת לעומק , מהיזם, דרך הנכס ועד הכדאיות
                הכלכלית ומלווה בליווי משפטי מקצועי לצד ליווי עסקי מלא, לאורך כל
                שלבי ההשקעה. כל זאת במסגרת שירות אישי, דיסקרטי ובלתי מתפשר,
                בסטנדרטים הגבוהים ביותר.
              </p>

              <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="font-semibold text-white">
                  זו לא עוד השקעה.
                </span>{" "}
                <span className="text-white/85">זו החלטה אסטרטגית.</span>
              </p>

              <p className="font-bold text-white">
                מחפשים השקעה שמבוססת על יוקרה, יציבות ותשואה חכמה ?
              </p>

              <p className="text-[var(--brand-yellow)] font-semibold">
                הגעתם למקום הנכון.
              </p>
            </div>

            <div className="mt-7 grid gap-3 font-semibold">
              <Bullet
                title="אסטרטגיה אישית למשקיע"
                desc="התאמה לתקציב, ליעדים ולפרופיל הסיכון — כדי לבחור נכון."
              />
              <Bullet
                title="גישה לפרויקטים נבחרים"
                desc="סינון מקצועי קפדני לפני שמציגים לכם הזדמנויות."
              />
              <Bullet
                title="בדיקת עסקה לעומק"
                desc="מהיזם, דרך הנכס ועד הכדאיות הכלכלית — בלי ניחושים."
              />
              <Bullet
                title="ליווי משפטי + עסקי"
                desc="ליווי מקצועי לאורך כל שלבי ההשקעה, עד הסגירה."
              />
              <Bullet
                title="שירות אישי ודיסקרטי"
                desc="יחס בלתי מתפשר וסטנדרטים גבוהים — כמו שמגיע לכם."
              />
            </div>

            <a
              href="#contact"
              className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-yellow)] px-6 py-3 font-semibold text-[var(--brand-bg)] shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--brand-yellow2)] hover:shadow-[0_0_35px_rgba(217,255,74,0.20)] active:translate-y-0"
            >
              קבעו שיחה
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Bullet({ title, desc }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--brand-yellow)] shadow-[0_0_18px_rgba(217,255,74,0.22)]" />
      <div>
        <div className="font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm text-white/75 leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  );
}
