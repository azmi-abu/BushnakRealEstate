export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-4 text-sm text-white/60">
        © {new Date().getFullYear()} Bushnak Real Estate
      </div>
    </footer>
  );
}
