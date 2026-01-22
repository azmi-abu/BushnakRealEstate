import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Reveal from "./Reveal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getProjects } from "../data/projects";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const lastFocusRef = useRef(null);
  const prevOverflowRef = useRef("");

  function openModal(project, openerEl) {
    lastFocusRef.current = openerEl || document.activeElement;
    setActiveProject(project);
    setOpen(true);

    prevOverflowRef.current = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setOpen(false);
    setActiveProject(null);

    document.body.style.overflow = prevOverflowRef.current || "";

    // return focus
    setTimeout(() => {
      lastFocusRef.current?.focus?.();
    }, 0);
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErrMsg("");
        const data = await getProjects();
        if (!alive) return;
        setProjects(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setErrMsg("שגיאה בטעינת פרויקטים");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
      // safety cleanup in case modal left open
      document.body.style.overflow = prevOverflowRef.current || "";
    };
  }, []);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold">פרויקטים</h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl">
          {loading ? (
            <div className="py-12 text-center text-white/70">טוען פרויקטים…</div>
          ) : errMsg ? (
            <div className="py-12 text-center text-red-200">{errMsg}</div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center text-white/70">
              אין פרויקטים להצגה כרגע.
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1.05 },
                640: { slidesPerView: 2.05 },
                1024: { slidesPerView: 3.05 },
              }}
            >
              {projects.map((p) => (
                <SwiperSlide key={p._id}>
                  <ProjectCard
                    {...p}
                    onDetails={(e) => openModal(p, e?.currentTarget)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Reveal>

      {open && activeProject && (
        <ProjectModal project={activeProject} onClose={closeModal} />
      )}
    </section>
  );
}

function ProjectCard({ title, location, price, imageUrl, pdfUrl, onDetails }) {
  const hasPrice = Number.isFinite(Number(price)) && Number(price) > 0;
  const formattedPrice = useMemo(
    () => (hasPrice ? formatILS(price) : ""),
    [hasPrice, price]
  );

  const pdf = safeUrl(pdfUrl);

  function openPdf() {
    if (!pdf) return;
    window.open(pdf, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="
        group overflow-hidden rounded-3xl border border-white/10 bg-white/5
        shadow-xl transition hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(217,255,74,0.12)]
        flex flex-col h-full
      "
    >
      {/* IMAGE AREA MUST BE A BUTTON (not div onClick) */}
      <button
        type="button"
        onClick={openPdf}
        className="relative h-56 shrink-0 w-full text-right focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
        aria-label={pdf ? `צפייה ב-PDF של ${title}` : `אין PDF לפרויקט: ${title}`}
        disabled={!pdf}
      >
        <img
          src={imageUrl || "/projects/p1.jpg"}
          alt={title || "תמונת פרויקט"}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)]/85 via-[var(--brand-bg)]/10 to-transparent pointer-events-none" />

        {hasPrice && (
          <div className="absolute bottom-4 right-4 rounded-full bg-[var(--brand-yellow)] px-4 py-2 text-sm font-extrabold text-[var(--brand-bg)] shadow-lg pointer-events-none">
            {formattedPrice}
          </div>
        )}

        <div
          className="
            absolute bottom-4 left-4
            max-w-[calc(100%-170px)]
            truncate
            rounded-full border border-white/15 bg-white/10
            px-3 py-1 text-xs text-white backdrop-blur pointer-events-none
          "
          title={location}
        >
          {location}
        </div>

        <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
          {pdf ? "לחץ לצפייה ב-PDF" : "אין PDF"}
        </div>
      </button>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-lg font-extrabold">{title}</div>

        <div className="mt-3 text-sm text-white/70 line-clamp-2">{location}</div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xs text-white/50" />

          <button
            type="button"
            onClick={onDetails}
            className="rounded-2xl bg-[var(--brand-green2)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-bg)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
          >
            לפרטים נוספים
          </button>
        </div>

        {!pdfUrl ? (
          <div className="mt-3 text-xs text-red-200">
            חסר pdfUrl לפרויקט הזה במסד הנתונים
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);

  const hasPrice =
    Number.isFinite(Number(project.price)) && Number(project.price) > 0;

  const formattedPrice = useMemo(
    () => (hasPrice ? formatILS(project.price) : ""),
    [hasPrice, project.price]
  );

  const pdf = safeUrl(project.pdfUrl);

  // Focus close button on open
  useEffect(() => {
    closeBtnRef.current?.focus?.();
  }, []);

  // Trap focus inside modal + ESC close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll(focusableSelector)).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
      );

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusable();
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      // shift+tab
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // tab
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Click on backdrop closes (mouse)
  const onBackdropMouseDown = () => onClose();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onBackdropMouseDown}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`פרטי פרויקט: ${project.title}`}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[var(--brand-bg)]/95 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div className="min-w-0">
            <div className="text-xl font-extrabold">{project.title}</div>
            <div className="mt-1 text-sm text-white/70">{project.location}</div>

            {hasPrice && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                מחיר:{" "}
                <span className="font-extrabold text-white">{formattedPrice}</span>
              </div>
            )}
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/15 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
            aria-label="סגור חלון פרויקט"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {!project.pdfUrl ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
              אין קובץ PDF לפרויקט הזה עדיין.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <iframe
                title={`PDF - ${project.title}`}
                src={pdf}
                className="h-[70vh] w-full"
              />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/70">
              אם הדפדפן לא מציג PDF בתוך החלון — אפשר לפתוח בחלון חדש.
            </div>

            {project.pdfUrl ? (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-yellow)] px-5 py-2 font-extrabold text-[var(--brand-bg)] shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--brand-yellow2)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              >
                פתח PDF בחלון חדש
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatILS(value) {
  if (value == null) return "₪ —";
  const digits = String(value).replace(/[^\d]/g, "");
  if (!digits) return String(value);
  const num = Number(digits);
  if (!Number.isFinite(num)) return String(value);
  return `₪ ${num.toLocaleString("en-US")}`;
}

function safeUrl(url) {
  if (!url) return "";
  return String(url).replace(/ /g, "%20");
}
