import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Start", href: "/#hero" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/kontakt" },
];

const IconMail = (
  <svg
    className="w-4 h-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const IconPhone = (
  <svg
    className="w-4 h-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.2 3.58a1 1 0 01-.27 1.06l-1.5 1.35a13 13 0 006.44 6.44l1.35-1.5a1 1 0 011.06-.27l3.58 1.2a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C8.6 21 3 15.4 3 6V5z"
    />
  </svg>
);

const IconWhatsApp = (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CONTACT = [
  {
    label: "wolaktattoo@gmail.com",
    href: "mailto:wolaktattoo@gmail.com",
    icon: IconMail,
  },
  {
    label: "Studio Kult Tattoo: +48 502 045 009",
    href: "tel:+48502045009",
    icon: IconPhone,
  },
  {
    label: "WhatsApp: +48 788 557 523",
    href: "https://wa.me/48788557523",
    external: true,
    icon: IconWhatsApp,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className=" border-t border-[#c9a96e]/10">
      {/* ── Top grid ── */}
      <div className="px-5 pt-12 pb-10 sm:px-8 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 lg:gap-16 border-b border-[#c9a96e]/8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="no-underline flex flex-col gap-1">
            <span
              className="text-xl sm:text-2xl 2xl:text-3xl font-light tracking-[0.12em] uppercase text-[#f0ece3] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Urszula Wolak
            </span>
            <span className="text-xs 2xl:text-base tracking-[0.35em] uppercase text-[#c9a96e]">
              Tattoo Artist · Kraków
            </span>
          </Link>
          <p className="text-xs 2xl:text-base font-light leading-relaxed text-secondary max-w-xs">
            Tatuaże w kolorze i szarościach, covery oraz autorskie kompozycje.
          </p>
          {/* Logo */}
          <Image
            src="/images/logo/logo.png"
            alt="Urszula Wolak Tattoo"
            width={48}
            height={48}
            className="w-10 h-10 object-contain  opacity-30 mt-2"
          />
        </div>

        {/* Nawigacja */}
        <div>
          <span className="block text-xs 2xl:text-lg tracking-[0.32em] uppercase text-[#c9a96e]/85 mb-5">
            Nawigacja
          </span>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs 2xl:text-base font-light tracking-wide text-secondary hover:text-[#c9a96e] no-underline transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Kontakt */}
        <div>
          <span className="block text-xs 2xl:text-lg tracking-[0.32em] uppercase text-[#c9a96e]/85 mb-5">
            Kontakt
          </span>
          <div className="flex flex-col gap-3">
            {CONTACT.map(({ label, href, external, icon }) => {
              const commonClasses =
                "flex items-center gap-2.5 text-xs 2xl:text-base font-light tracking-wide text-secondary";

              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={`${commonClasses} hover:text-[#c9a96e] no-underline transition-colors duration-200 group`}
                >
                  <span className="text-[#c9a96e]/50 group-hover:text-[#c9a96e] transition-colors">
                    {icon}
                  </span>
                  {label}
                </a>
              ) : (
                <span key={label} className={commonClasses}>
                  <span className="text-[#c9a96e]/50">{icon}</span>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-5 py-5 sm:px-8 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-secondary tracking-wide order-2 sm:order-1">
          © {year} Urszula Wolak. Wszelkie prawa zastrzeżone.
        </span>

        <a
          href="https://www.instagram.com/wolakurszula/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 no-underline group order-1 sm:order-2"
        >
          <svg
            className="w-3.5 h-3.5 fill-[#c9a96e]/40 group-hover:fill-[#c9a96e] transition-colors duration-200"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="text-xs tracking-widest uppercase text-[#c9a96e]/60 group-hover:text-[#c9a96e] transition-colors duration-200">
            @wolakurszula
          </span>
        </a>

        <span className="text-xs text-secondary tracking-wide order-3">
          Made with ♥ in Kraków
        </span>
      </div>
    </footer>
  );
}
