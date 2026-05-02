import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Start", href: "/#hero" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/kontakt" },
];

// ✏️ Uzupełnij prawdziwe dane
const CONTACT = [
  { label: "ula@kulttattoo.pl", href: "mailto:ula@kulttattoo.pl" },
  { label: "+48 000 000 000", href: "tel:+48000000000" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0a0a08] border-t border-[#c9a96e]/10"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* ── Top grid ── */}
      <div className="px-5 pt-12 pb-10 sm:px-8 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 lg:gap-16 border-b border-[#c9a96e]/8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="no-underline flex flex-col gap-1">
            <span
              className="text-xl sm:text-2xl font-light tracking-[0.12em] uppercase text-[#f0ece3] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Urszula Wolak
            </span>
            <span className="text-xs tracking-[0.35em] uppercase text-[#c9a96e]">
              Tattoo Artist · Kraków
            </span>
          </Link>
          <p className="text-xs font-light leading-relaxed text-[#f0ece3]/28 max-w-xs">
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
          <span className="block text-xs tracking-[0.32em] uppercase text-[#c9a96e]/45 mb-5">
            Nawigacja
          </span>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-light tracking-wide text-[#f0ece3]/38 hover:text-[#c9a96e] no-underline transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Kontakt */}
        <div>
          <span className="block text-xs tracking-[0.32em] uppercase text-[#c9a96e]/45 mb-5">
            Kontakt
          </span>
          <div className="flex flex-col gap-3">
            {CONTACT.map(({ label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  className="text-xs font-light tracking-wide text-[#f0ece3]/38 hover:text-[#c9a96e] no-underline transition-colors duration-200"
                >
                  {label}
                </a>
              ) : (
                <span
                  key={label}
                  className="text-xs font-light tracking-wide text-[#f0ece3]/38"
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-5 py-5 sm:px-8 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[#f0ece3]/18 tracking-wide order-2 sm:order-1">
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
          <span className="text-xs tracking-widest uppercase text-[#c9a96e]/40 group-hover:text-[#c9a96e] transition-colors duration-200">
            @wolakurszula
          </span>
        </a>

        <span className="text-xs text-[#f0ece3]/12 tracking-wide order-3">
          Made with ♥ in Kraków
        </span>
      </div>
    </footer>
  );
}
