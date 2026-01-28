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

const INSTAGRAM_LINK =
  "https://www.instagram.com/wb.realestate.dubai?igsh=ZzU5ODJsc2NqaXg1";
const FACEBOOK_LINK =
  "https://www.facebook.com/share/1K6Mopnirh/?mibextid=wwXIfr";

export default function Footer({ onOpenA11y }) {
  return (
    <>
      {/* Floating Contact Buttons (ONLY WhatsApp + Email) */}
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
          <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--brand-yellow)]/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <EnvelopeIcon className="h-7 w-7 text-[var(--brand-bg)] transition-transform duration-200 group-hover:scale-110" />
        </a>
      </div>

      {/* Footer Bar */}
      <footer className="border-t border-white/10 bg-black/40 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/40"
            >
              <FacebookIcon className="h-5 w-5 text-white/85" />
            </a>

            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-yellow)]/40"
            >
              <InstagramIcon className="h-5 w-5 text-white/85" />
            </a>
          </div>

          {/* ✅ Accessibility Statement (CLICKABLE) */}
          <button
            type="button"
            onClick={() => onOpenA11y?.()}
            className="
              text-sm text-white/80
              underline underline-offset-4
              decoration-white/30
              hover:text-white hover:decoration-white
              transition
              cursor-pointer
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-[var(--brand-yellow)]/60
              rounded
            "
          >
            הצהרת נגישות
          </button>

          {/* Copyright */}
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} W.B Real Estate Consulting · כל הזכויות שמורות
          </div>
        </div>
      </footer>
    </>
  );
}

/* Modern Instagram */
function InstagramIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Z" />
      <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

/* Facebook "f" */
function FacebookIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.6v3H10v8h3.5Z" />
    </svg>
  );
}
