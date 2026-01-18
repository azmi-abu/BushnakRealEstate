import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const WA_TEXT =
  "שלום 👋\nאשמח לשמוע עוד פרטים על תוכנית הליווי שלכם ולבדוק התאמה עבורי. תודה!";
const WA_LINK = `https://wa.me/972506161616?text=${encodeURIComponent(WA_TEXT)}`;

const EMAIL_TO = "azmi.abu95@gmail.com";
const EMAIL_SUBJECT = "פנייה מתוכנית הליווי";
const EMAIL_BODY =
  "שלום 👋\nאשמח לשמוע עוד פרטים על תוכנית הליווי שלכם ולבדוק התאמה עבורי. תודה!";
const EMAIL_LINK = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(
  EMAIL_SUBJECT
)}&body=${encodeURIComponent(EMAIL_BODY)}`;

export default function Footer() {
  return (
    <>
      {/* Floating Contact Buttons (side-by-side) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* WhatsApp */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-xl transition-all duration-200 ease-out hover:scale-110 hover:shadow-[0_0_28px_rgba(34,197,94,0.7)] focus:outline-none focus:ring-2 focus:ring-green-300/60 active:scale-105"
          title="WhatsApp"
        >
          {/* pulse ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-green-300/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <PhoneIcon className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
        </a>

        {/* Email */}
        <a
          href={EMAIL_LINK}
          aria-label="Email"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-yellow)] shadow-xl transition-all duration-200 ease-out hover:scale-110 hover:shadow-[0_0_28px_rgba(217,255,74,0.75)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-yellow)]/50 active:scale-105"
          title="אימייל"
        >
          {/* pulse ring */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--brand-yellow)]/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <EnvelopeIcon className="h-7 w-7 text-[var(--brand-bg)] transition-transform duration-200 group-hover:scale-110" />
        </a>
      </div>

      {/* Footer Bar */}
      <footer className="border-t border-white/10 bg-black/40 py-6 text-center text-sm text-white/70">
        © {new Date().getFullYear()} W.B Real Estate Consulting · כל הזכויות שמורות
      </footer>
    </>
  );
}
