export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brandYellow/20 bg-brandGreen/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <nav className="hidden gap-6 text-sm text-white/90 md:flex">
          <a className="hover:text-brandYellow transition" href="#about">מי אנחנו</a>
          <a className="hover:text-brandYellow transition" href="#projects">פרויקטים</a>
          <a className="hover:text-brandYellow transition" href="#tips">טיפים למשקיע</a>
          <a className="hover:text-brandYellow transition" href="#contact">ליצירת קשר</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brandYellow text-brandBg font-extrabold shadow">
            B
          </div>
          <div className="leading-tight text-right">
            <div className="text-sm font-semibold">Bushnak Real Estate</div>
            <div className="text-xs text-white/80">דף נחיתה</div>
          </div>
        </div>
      </div>
    </header>
  );
}
