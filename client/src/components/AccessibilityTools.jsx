import { useEffect, useMemo, useRef, useState } from "react";

/**
 * AccessibilityTools.jsx
 * Matches the toolbar in your screenshot:
 * - Bottom-left FAB + panel (won't cover WhatsApp on right)
 * - Panel is scrollable so it's always fully visible
 * - "יישומון גדול" ONLY makes the widget bigger (UI size)
 * - Same tiles + same icon style (inline SVGs)
 * - Persists settings in localStorage
 * - Ctrl+U toggle, Esc close
 *
 * NOTE: This file injects the needed CSS (body classes + CSS vars) so you don't need extra files.
 */

const STORAGE_KEY = "a11y_toolbar_settings_v3";

const DEFAULTS = {
  open: false,

  // UI only
  bigWidget: false,

  // Accessibility features
  fontScale: 1, // 1..1.35
  highContrast: false,
  highlightLinks: false,
  textSpacing: false, // ריווח טקסט
  hideImages: false,
  reduceMotion: false,
  bigCursor: false,
  dyslexia: false, // תמיכה בדיסלקסיה

  lineHeight: "default", // default | relaxed | extra
  align: "default", // default | right | center | left

  descriptions: false, // תיאורים
  saturate: false, // רווי
};

export default function AccessibilityTools() {
  const [s, setS] = useState(DEFAULTS);
  const panelRef = useRef(null);

  // Load settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setS((prev) => ({ ...prev, ...parsed, open: false }));
      }
    } catch {}
  }, []);

  // Persist (do not persist open)
  useEffect(() => {
    try {
      const { open, ...rest } = s;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {}
  }, [s]);

  // Ctrl+U open/close, Esc close
  useEffect(() => {
    const onKey = (e) => {
      const isCtrlU = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u";
      if (isCtrlU) {
        e.preventDefault();
        setS((p) => ({ ...p, open: !p.open }));
      }
      if (e.key === "Escape") setS((p) => ({ ...p, open: false }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside closes
  useEffect(() => {
    const onDown = (e) => {
      if (!s.open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        const fab = document.getElementById("a11y-fab");
        if (fab && fab.contains(e.target)) return;
        setS((p) => ({ ...p, open: false }));
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [s.open]);

  // Apply effects globally
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.style.setProperty("--a11y-font-scale", String(s.fontScale));

    body.dataset.a11yAlign = s.align;
    body.dataset.a11yLineHeight = s.lineHeight;

    toggleClass(body, "a11y-contrast", s.highContrast);
    toggleClass(body, "a11y-highlight-links", s.highlightLinks);
    toggleClass(body, "a11y-text-spacing", s.textSpacing);
    toggleClass(body, "a11y-hide-images", s.hideImages);
    toggleClass(body, "a11y-reduce-motion", s.reduceMotion);
    toggleClass(body, "a11y-big-cursor", s.bigCursor);
    toggleClass(body, "a11y-dyslexia", s.dyslexia);
    toggleClass(body, "a11y-descriptions", s.descriptions);
    toggleClass(body, "a11y-saturate", s.saturate);
    toggleClass(body, "a11y-widget-big", s.bigWidget);
  }, [s]);

  // Optional: “Descriptions” helper (lightweight, non-invasive)
  // Adds a title tooltip to elements with aria-label if they don't have title.
  useEffect(() => {
    if (!s.descriptions) return;

    const els = Array.from(
      document.querySelectorAll("button[aria-label], a[aria-label], input[aria-label]")
    );

    const touched = [];
    for (const el of els) {
      if (!el.getAttribute("title")) {
        el.setAttribute("title", el.getAttribute("aria-label") || "");
        touched.push(el);
      }
    }

    return () => {
      // remove only the titles we added
      for (const el of touched) {
        const aria = el.getAttribute("aria-label") || "";
        if (el.getAttribute("title") === aria) el.removeAttribute("title");
      }
    };
  }, [s.descriptions]);

  const fontPercent = useMemo(() => Math.round(s.fontScale * 100), [s.fontScale]);

  function setBigText() {
    setS((p) => ({ ...p, fontScale: clamp(round2(p.fontScale + 0.05), 1, 1.35) }));
  }

  function toggle(key) {
    setS((p) => ({ ...p, [key]: !p[key] }));
  }

  function cycleLineHeight() {
    setS((p) => ({ ...p, lineHeight: nextLineHeight(p.lineHeight) }));
  }

  function cycleAlign() {
    setS((p) => ({ ...p, align: nextAlign(p.align) }));
  }

  function resetAll() {
    setS((p) => ({ ...DEFAULTS, open: p.open }));
  }

  const fabSize = s.bigWidget ? "h-14 w-14 text-2xl" : "h-12 w-12 text-xl";
  const panelWidth = s.bigWidget ? "w-[360px]" : "w-[340px]";
  const tileMinH = s.bigWidget ? "min-h-[104px]" : "min-h-[96px]";
  const iconSize = s.bigWidget ? "h-9 w-9" : "h-8 w-8";

  return (
    <>
      {/* Inject CSS for effects + sizing (no extra files needed) */}
      <style>{GLOBAL_A11Y_CSS}</style>

      {/* Floating Button (BOTTOM-LEFT) */}
      <button
        id="a11y-fab"
        type="button"
        onClick={() => setS((p) => ({ ...p, open: !p.open }))}
        aria-label="פתח תפריט נגישות"
        className={[
          "fixed bottom-5 left-5 z-[9999]",
          "grid place-items-center",
          fabSize,
          "rounded-full",
          "border border-black/10",
          "bg-white shadow-xl",
          "hover:shadow-2xl transition",
        ].join(" ")}
      >
        ♿
      </button>

      {/* Panel */}
      {s.open && (
        <div
          ref={panelRef}
          dir="rtl"
          role="dialog"
          aria-label="תפריט נגישות"
          className={[
            "fixed bottom-20 left-3 sm:left-5 z-[9999]",
            panelWidth,
            "max-w-[92vw]",
            "max-h-[calc(100vh-120px)] overflow-y-auto",
            "rounded-3xl",
            "bg-[#0f172a] shadow-2xl border border-white/10",
          ].join(" ")}
        >
          {/* Top row: close + title */}
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setS((p) => ({ ...p, open: false }))}
              aria-label="סגור"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/15 transition"
            >
              <IconClose className="h-4 w-4" />
            </button>

            <div className="text-white/95 font-extrabold text-sm">
              תפריט נגישות <span className="text-white/50 font-bold">(CTRL+U)</span>
            </div>

            {/* spacer to keep title visually centered in RTL */}
            <div className="h-9 w-9" />
          </div>

          {/* Big Widget row */}
          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="text-white/85 text-sm font-bold">יישומון גדול</div>
            <Switch checked={s.bigWidget} onChange={() => toggle("bigWidget")} />
          </div>

          {/* Grid tiles (same layout as screenshot) */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-3">
              <Tile
                className={tileMinH}
                label="הדגשת קישורים"
                icon={<IconLink className={iconSize} />}
                active={s.highlightLinks}
                onClick={() => toggle("highlightLinks")}
              />
              <Tile
                className={tileMinH}
                label="ניגודיות +"
                icon={<IconContrast className={iconSize} />}
                active={s.highContrast}
                onClick={() => toggle("highContrast")}
              />

              <Tile
                className={tileMinH}
                label="ריווח טקסט"
                icon={<IconTextSpacing className={iconSize} />}
                active={s.textSpacing}
                onClick={() => toggle("textSpacing")}
                info
              />
              <Tile
                className={tileMinH}
                label="טקסט גדול"
                icon={<IconBigText className={iconSize} />}
                onClick={setBigText}
                sub={`${fontPercent}%`}
              />

              <Tile
                className={tileMinH}
                label="הסתרת תמונות"
                icon={<IconHideImages className={iconSize} />}
                active={s.hideImages}
                onClick={() => toggle("hideImages")}
              />
              <Tile
                className={tileMinH}
                label="ביטול הנפשות"
                icon={<IconMotionOff className={iconSize} />}
                active={s.reduceMotion}
                onClick={() => toggle("reduceMotion")}
              />

              <Tile
                className={tileMinH}
                label="סמן"
                icon={<IconCursor className={iconSize} />}
                active={s.bigCursor}
                onClick={() => toggle("bigCursor")}
              />
              <Tile
                className={tileMinH}
                label="תמיכה בדיסלקסיה"
                icon={<IconDf className={iconSize} />}
                active={s.dyslexia}
                onClick={() => toggle("dyslexia")}
                info
              />

              <Tile
                className={tileMinH}
                label="גובה שורה"
                icon={<IconLineHeight className={iconSize} />}
                onClick={cycleLineHeight}
                sub={lineHeightLabel(s.lineHeight)}
              />
              <Tile
                className={tileMinH}
                label="תיאורים"
                icon={<IconInfoBox className={iconSize} />}
                active={s.descriptions}
                onClick={() => toggle("descriptions")}
              />

              <Tile
                className={tileMinH}
                label="רווי"
                icon={<IconDrop className={iconSize} />}
                active={s.saturate}
                onClick={() => toggle("saturate")}
              />
              <Tile
                className={tileMinH}
                label="יישור טקסט"
                icon={<IconAlign className={iconSize} />}
                onClick={cycleAlign}
                sub={alignLabel(s.align)}
              />
            </div>

            {/* Bottom reset bar like screenshot */}
            <button
              type="button"
              onClick={resetAll}
              className="mt-4 w-full rounded-2xl bg-[#0b1220] border border-white/10 px-4 py-3 text-white font-extrabold flex items-center justify-between hover:bg-[#0d1526] transition"
            >
              <span>איפוס כל הגדרות הנגישות</span>
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 border border-white/10">
                <IconRefresh className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ----------------------------- Tile + Switch ----------------------------- */

function Tile({ label, sub, icon, onClick, active = false, info = false, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative",
        "rounded-2xl bg-white",
        "border border-black/10",
        "shadow-sm hover:shadow-md transition",
        "px-3 py-4",
        "flex flex-col items-center justify-center gap-2",
        "text-[#0b1220]",
        className,
      ].join(" ")}
    >
      {info ? (
        <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-[#0b1220]/5">
          <IconInfoMini className="h-3 w-3 text-[#0b1220]/70" />
        </span>
      ) : null}

      <div className="grid place-items-center">{icon}</div>
      <div className="text-sm font-extrabold text-center leading-tight">{label}</div>
      {sub ? <div className="text-xs font-bold text-[#0b1220]/55">{sub}</div> : null}

      {active ? (
        <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[#0b1220]" />
      ) : null}
    </button>
  );
}

function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={[
        "relative inline-flex h-7 w-12 items-center rounded-full transition",
        checked ? "bg-white/30" : "bg-white/10",
        "border border-white/15",
      ].join(" ")}
    >
      <span
        className="inline-block h-5 w-5 rounded-full bg-white shadow-sm transition"
        style={{ transform: checked ? "translateX(-18px)" : "translateX(-2px)" }}
      />
    </button>
  );
}

/* ----------------------------- Global A11Y CSS ----------------------------- */
/**
 * You can customize these rules.
 * They’re intentionally safe + lightweight.
 */
const GLOBAL_A11Y_CSS = `
  :root{
    --a11y-font-scale: 1;
  }

  /* font scale (applies to most text) */
  body{
    font-size: calc(1rem * var(--a11y-font-scale));
  }

  /* alignment */
  body[data-a11y-align="right"] { text-align: right; }
  body[data-a11y-align="center"]{ text-align: center; }
  body[data-a11y-align="left"]  { text-align: left; }
  body[data-a11y-align="default"]{ text-align: initial; }

  /* line height */
  body[data-a11y-line-height="default"]{ line-height: normal; }
  body[data-a11y-line-height="relaxed"]{ line-height: 1.75; }
  body[data-a11y-line-height="extra"]{ line-height: 2.05; }

  /* high contrast */
  body.a11y-contrast{
    filter: contrast(1.25);
  }

  /* highlight links */
  body.a11y-highlight-links a{
    text-decoration: underline !important;
    text-decoration-thickness: 2px !important;
    text-underline-offset: 3px !important;
  }

  /* text spacing (WCAG style spacing helpers) */
  body.a11y-text-spacing{
    letter-spacing: 0.06em !important;
    word-spacing: 0.12em !important;
  }
  body.a11y-text-spacing p,
  body.a11y-text-spacing li{
    line-height: 1.9 !important;
  }

  /* hide images */
  body.a11y-hide-images img,
  body.a11y-hide-images svg.image,
  body.a11y-hide-images video{
    visibility: hidden !important;
  }

  /* reduce motion */
  body.a11y-reduce-motion *,
  body.a11y-reduce-motion *::before,
  body.a11y-reduce-motion *::after{
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }

  /* big cursor */
  body.a11y-big-cursor{ cursor: zoom-in !important; }
  body.a11y-big-cursor *{ cursor: zoom-in !important; }

  /* dyslexia-friendly font (fallbacks) */
  body.a11y-dyslexia{
    font-family: "Atkinson Hyperlegible", "Arial", "Heebo", system-ui, sans-serif !important;
  }

  /* saturate */
  body.a11y-saturate{
    filter: saturate(1.35);
  }

  /* descriptions: add stronger focus outline */
  body.a11y-descriptions :focus{
    outline: 3px solid #111827 !important;
    outline-offset: 2px !important;
  }

  /* big widget affects only widget sizing (FAB already controlled by state classes) */
  body.a11y-widget-big{}
`;

/* ----------------------------- Helpers ----------------------------- */

function toggleClass(el, cls, on) {
  if (!el) return;
  el.classList.toggle(cls, !!on);
}

function clamp(n, a, b) {
  return Math.min(b, Math.max(a, n));
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function nextLineHeight(v) {
  if (v === "default") return "relaxed";
  if (v === "relaxed") return "extra";
  return "default";
}

function lineHeightLabel(v) {
  if (v === "relaxed") return "רגיל+";
  if (v === "extra") return "גבוה";
  return "ברירת מחדל";
}

function nextAlign(v) {
  if (v === "default") return "right";
  if (v === "right") return "center";
  if (v === "center") return "left";
  return "default";
}

function alignLabel(v) {
  if (v === "right") return "ימין";
  if (v === "center") return "מרכז";
  if (v === "left") return "שמאל";
  return "ברירת מחדל";
}

/* ----------------------------- Icons (match screenshot style) ----------------------------- */

function IconBase({ className = "", children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function IconClose({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </IconBase>
  );
}

function IconRefresh({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M20 12a8 8 0 1 1-2.3-5.7" />
      <path d="M20 4v6h-6" />
    </IconBase>
  );
}

function IconLink({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M10 13a4 4 0 0 1 0-6l1-1a4 4 0 0 1 6 6l-1 1" />
      <path d="M14 11a4 4 0 0 1 0 6l-1 1a4 4 0 0 1-6-6l1-1" />
    </IconBase>
  );
}

function IconContrast({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M12 3a9 9 0 1 0 0 18" />
      <path d="M12 3v18" />
    </IconBase>
  );
}

function IconTextSpacing({ className = "" }) {
  // three lines + arrows (similar vibe to screenshot)
  return (
    <IconBase className={className}>
      <path d="M6 8h12" />
      <path d="M6 12h10" />
      <path d="M6 16h12" />
      <path d="M8 6l-2 2 2 2" />
      <path d="M16 6l2 2-2 2" />
    </IconBase>
  );
}

function IconBigText({ className = "" }) {
  // "TT" look
  return (
    <IconBase className={className}>
      <path d="M6 7h6" />
      <path d="M9 7v10" />
      <path d="M14 9h6" />
      <path d="M17 9v8" />
    </IconBase>
  );
}

function IconHideImages({ className = "" }) {
  return (
    <IconBase className={className}>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 14l2-2 2 2 2-2 4 4" />
      <path d="M4 4l16 16" />
    </IconBase>
  );
}

function IconMotionOff({ className = "" }) {
  // "sun rays / stop motion" vibe
  return (
    <IconBase className={className}>
      <path d="M12 8v2" />
      <path d="M12 14v2" />
      <path d="M8 12h2" />
      <path d="M14 12h2" />
      <path d="M9.5 9.5l1.4 1.4" />
      <path d="M13.1 13.1l1.4 1.4" />
      <path d="M14.5 9.5l-1.4 1.4" />
      <path d="M10.9 13.1l-1.4 1.4" />
      <path d="M4 4l16 16" />
    </IconBase>
  );
}

function IconCursor({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M6 4l7 16 2-6 5-2L6 4z" />
    </IconBase>
  );
}

function IconDf({ className = "" }) {
  // "Df" letter-style
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <text
        x="6"
        y="16"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui, Arial"
        fill="currentColor"
      >
        Df
      </text>
    </svg>
  );
}

function IconLineHeight({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M9 7h10" />
      <path d="M9 11h10" />
      <path d="M9 15h10" />
      <path d="M5 7v10" />
      <path d="M3.8 8.5L5 7l1.2 1.5" />
      <path d="M3.8 15.5L5 17l1.2-1.5" />
    </IconBase>
  );
}

function IconInfoBox({ className = "" }) {
  return (
    <IconBase className={className}>
      <rect x="6" y="5" width="12" height="14" rx="2" />
      <path d="M12 10h0" />
      <path d="M11.5 12H12v4h.5" />
    </IconBase>
  );
}

function IconDrop({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z" />
    </IconBase>
  );
}

function IconAlign({ className = "" }) {
  return (
    <IconBase className={className}>
      <path d="M7 8h12" />
      <path d="M7 12h9" />
      <path d="M7 16h12" />
      <path d="M5 7h0" />
    </IconBase>
  );
}

function IconInfoMini({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 17v-5m0-3h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
