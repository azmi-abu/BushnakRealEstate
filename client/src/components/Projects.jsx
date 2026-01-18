import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
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

  function openModal(project) {
    setActiveProject(project);
    setOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setOpen(false);
    setActiveProject(null);
    document.body.style.overflow = "";
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
    };
  }, []);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-14">
      <Reveal>
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold">פרויקטים</h2>
          <p className="mt-2 text-white/70">
            פרויקטים נבחרים — לכל פרויקט תמונה אחת, ובלחיצה נפתח PDF.
          </p>
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
                  {/* Keep the same flow: button triggers openModal */}
                  <ProjectCard {...p} onDetails={() => openModal(p)} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Reveal>

      {/* MODAL */}
      {open && activeProject && (
        <ProjectModal project={activeProject} onClose={closeModal} />
      )}
    </section>
  );
}

/**
 * Card:
 * - OLD: had images[] and inner Swiper
 * - NEW: uses single imageUrl, but keeps the same layout & the button
 */
function ProjectCard({
  title,
  location,
  price,
  imageUrl,
  pdfUrl,
  onDetails,
}) {
  const formattedPrice = useMemo(() => formatILS(price), [price]);

  // optional quick open (if you want clicking the image itself to open pdf)
  const openPdfDirect = (e) => {
    // keep click behavior optional; don't break your UI
    // e.preventDefault();
    // e.stopPropagation();
    // if (pdfUrl) window.open(safeUrl(pdfUrl), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl transition hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(217,255,74,0.12)]">
      <div className="relative h-56" onClick={openPdfDirect}>
        {/* One image (no swiper) */}
        <img
          src={imageUrl || "/projects/p1.jpg"}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-bg)]/85 via-[var(--brand-bg)]/10 to-transparent pointer-events-none" />

        {/* Price badge */}
        <div className="absolute bottom-4 right-4 rounded-full bg-[var(--brand-yellow)] px-4 py-2 text-sm font-extrabold text-[var(--brand-bg)] shadow-lg">
          {formattedPrice}
        </div>

        <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
          {location}
        </div>

        {/* Keep the same hint label */}
        <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
          לחץ לצפייה ב-PDF
        </div>
      </div>

      <div className="p-5">
        <div className="text-lg font-extrabold">{title}</div>

        <div className="mt-2 text-sm text-white/80">
          מחיר: <span className="font-extrabold text-white">{formattedPrice}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-white/70">{location}</span>

          {/* This is the key: button opens modal that shows the PDF */}
          <button
            type="button"
            onClick={onDetails}
            className="rounded-2xl bg-[var(--brand-green2)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--brand-yellow)] hover:text-[var(--brand-bg)]"
          >
            לפרטים נוספים
          </button>
        </div>

        {/* Optional debug hint if pdf missing */}
        {!pdfUrl ? (
          <div className="mt-3 text-xs text-red-200">
            חסר pdfUrl לפרויקט הזה במסד הנתונים
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Modal:
 * - OLD: image gallery modal
 * - NEW: PDF viewer modal (iframe), keeps the same header/close styling
 * - Also keeps Swiper imports intact (Autoplay etc.) so you "don’t lose anything",
 *   even though we no longer need the inner gallery.
 */
function ProjectModal({ project, onClose }) {
  const formattedPrice = useMemo(() => formatILS(project.price), [project.price]);

  const pdf = safeUrl(project.pdfUrl);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* modal card */}
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[var(--brand-bg)]/95 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div className="min-w-0">
            <div className="text-xl font-extrabold">{project.title}</div>
            <div className="mt-1 text-sm text-white/70">{project.location}</div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
              מחיר:{" "}
              <span className="font-extrabold text-white">{formattedPrice}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/15 transition"
            aria-label="סגור"
          >
            ✕
          </button>
        </div>

        {/* content */}
        <div className="p-5">
          {/* If no PDF */}
          {!project.pdfUrl ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
              אין קובץ PDF לפרויקט הזה עדיין.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              {/* PDF viewer */}
              <iframe
                title={`PDF - ${project.title}`}
                src={pdf}
                className="h-[70vh] w-full"
              />
            </div>
          )}

          {/* footer */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/70">
              אם הדפדפן לא מציג PDF בתוך החלון — אפשר לפתוח בחלון חדש.
            </div>

            {project.pdfUrl ? (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--brand-yellow)] px-5 py-2 font-extrabold text-[var(--brand-bg)] shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--brand-yellow2)]"
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

/**
 * Accepts:
 * - number: 1690000
 * - string: "1690000" or "₪1,690,000"
 * Returns: "₪ 1,690,000"
 */
function formatILS(value) {
  if (value == null) return "₪ —";
  const digits = String(value).replace(/[^\d]/g, "");
  if (!digits) return String(value);
  const num = Number(digits);
  if (!Number.isFinite(num)) return String(value);
  return `₪ ${num.toLocaleString("en-US")}`;
}

/** Encode spaces in URLs safely */
function safeUrl(url) {
  if (!url) return "";
  // only encode spaces; keeps already-encoded URLs intact
  return String(url).replace(/ /g, "%20");
}
