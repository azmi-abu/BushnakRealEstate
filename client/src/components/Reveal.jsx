import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // If the browser doesn't support IntersectionObserver, show everything
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setShow(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "120px 0px 120px 0px", // helps trigger earlier
      }
    );

    obs.observe(el);

    // SAFETY: if it didn't trigger within 600ms, show anyway
    const t = setTimeout(() => setShow(true), 600);

    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={[
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "transition-all duration-700 ease-out will-change-transform",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
