import ContactForm from "@/components/ContactForm";

const INFO = [
  { label: "Studio", value: "Kult Tattoo, Kraków", href: null },
  {
    label: "E-mail",
    value: "ula@kulttattoo.pl",
    href: "mailto:ula@kulttattoo.pl",
  },
  { label: "Telefon", value: "+48 000 000 000", href: "tel:+48000000000" },
];

export const metadata = {
  title: "Umów sesję — Kontakt",
  description:
    "Umów konsultację z Urszulą Wolak — tatuażystką w Kult Tattoo Studio w Krakowie. Wypełnij formularz, podaj miejsce na ciele i dołącz inspiracje.",
  alternates: {
    canonical: "https://wolaktattoo.pl/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-primary px-5 pt-28 pb-20 sm:px-8 sm:pt-32 lg:px-20 lg:pt-36 lg:pb-28">
      {/* ── Header ── */}
      <div className="max-w-2xl mb-14 sm:mb-16">
        <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-8">
          <span className="block w-6 h-px bg-[#c9a96e]" />
          Kontakt
        </span>
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-light leading-none text-[#f0ece3] m-0 mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Umów się
          <em className="block italic text-[#f0ece3]/40">na sesję</em>
        </h1>
        <p className="text-sm font-light leading-relaxed text-secondary max-w-md">
          Napisz do mnie — przez formularz, Instagram lub bezpośrednio. Chętnie
          omówię Twój pomysł i odpowiem na wszystkie pytania.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 max-w-5xl">
        {/* ── Lewa kolumna: info + Instagram — renderowane na serwerze ── */}
        <div className="flex flex-col gap-8">
          {/* Dane kontaktowe */}
          <div className="border border-[#c9a96e]/12">
            {INFO.map(({ label, value, href }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-4 border-b border-[#c9a96e]/8 last:border-b-0"
              >
                <span className="text-xs tracking-widest uppercase text-[#c9a96e]/65">
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-light text-secondary hover:text-[#c9a96e] no-underline transition-colors duration-200"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-sm font-light text-secondary">
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/wolakurszula/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 border border-[#c9a96e]/12 hover:border-[#c9a96e]/35 hover:bg-[#c9a96e]/[0.03] px-5 py-5 no-underline transition-all duration-200 group"
          >
            <div className="w-11 h-11 border border-[#c9a96e]/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 fill-[#c9a96e]/65" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs tracking-widest uppercase text-[#f0ece3]/55 group-hover:text-[#f0ece3]/80 transition-colors duration-200">
                Instagram
              </span>
              <span className="text-sm font-light text-[#c9a96e]/55 group-hover:text-[#c9a96e] transition-colors duration-200">
                @wolakurszula
              </span>
            </div>
            <svg
              className="ml-auto w-4 h-4 text-[#c9a96e]/25 group-hover:text-[#c9a96e]/60 group-hover:translate-x-0.5 transition-all duration-200"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>

          <p className="text-xs font-light leading-relaxed text-[#f0ece3]/45">
            Możesz też napisać bezpośrednio w DM na Instagramie — zazwyczaj
            odpowiadam tam najszybciej.
          </p>
        </div>

        {/* ── Prawa kolumna: formularz — Client Component ── */}
        <ContactForm />
      </div>
    </main>
  );
}
