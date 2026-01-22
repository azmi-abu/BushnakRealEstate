export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-brandYellow/20 bg-brandGreen/70 backdrop-blur"
      dir="rtl"
    >
      <div className="relative h-[72px] w-full max-w-6xl mx-auto px-4">
        {/* LOGO — pinned LEFT (visual), but DOM order doesn't matter much here */}
        <a
          href="#main"
          className="absolute left-4 sm:left-14 top-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-4 focus-visible:ring-brandYellow/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 rounded-xl"
          aria-label="דלג לתוכן הראשי"
        >
          <img
            src="/images/logo.jpg"
            alt="W.B Real Estate Consulting"
            className="h-14 w-auto object-contain drop-shadow-[0_0_10px_rgba(217,255,74,0.25)]"
          />
        </a>

        {/* NAV — pinned RIGHT */}
        <nav
          aria-label="ניווט ראשי"
          className="absolute right-4 sm:right-14 top-1/2 hidden -translate-y-1/2 gap-3 md:flex"
        >
          <HeaderLink href="#about">מי אנחנו</HeaderLink>
          <HeaderLink href="#projects">פרויקטים</HeaderLink>
          <HeaderLink href="#tips">טיפים למשקיע</HeaderLink>
          <HeaderLink href="#contact">ליצירת קשר</HeaderLink>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({ href, children }) {
  return (
    <a
      href={href}
      className="
        font-[inherit]
        inline-flex items-center justify-center
        rounded-xl
        border border-white/20
        bg-white/5
        px-4 py-2
        text-sm font-semibold text-white/90
        backdrop-blur
        transition-all duration-200
        hover:bg-white/15
        hover:text-brandYellow
        hover:shadow-[0_0_18px_rgba(217,255,74,0.18)]
        focus:outline-none focus-visible:ring-4
        focus-visible:ring-brandYellow/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-black/30
      "
    >
      {children}
    </a>
  );
}
