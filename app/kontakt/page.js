import ContactForm from "../../components/ContactForm";

const INFO = [
  { label: "Studio", value: "Kult Tattoo, Kraków", href: null },
  {
    label: "E-mail",
    value: "wolaktattoo@gmail.com",
    href: "mailto:wolaktattoo@gmail.com",
  },
  { label: "Telefon", value: "+48 788 557 523", href: "tel:+48788557523" },
];

export const metadata = {
  title: "Umów sesję — Kontakt",
  description:
    "Umów konsultację z Urszulą Wolak — tatuażystką w Kult Tattoo Studio w Krakowie.",
  alternates: {
    canonical: "https://wolaktattoo.pl/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-primary px-5 pt-28 pb-20 sm:px-8 sm:pt-32 lg:px-20 lg:pt-36 lg:pb-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-6">
            <span className="block w-6 h-px bg-[#c9a96e]" />
            Kontakt
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light leading-none text-[#f0ece3] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Umów się
            <em className="block italic text-[#f0ece3]/50">na sesję</em>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#f0ece3]/80 max-w-md">
            Napisz do mnie — przez formularz, Instagram lub bezpośrednio.
            Chętnie omówię Twój pomysł i odpowiem na wszystkie pytania.
          </p>
        </div>

        {/* Główny grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Lewa kolumna - informacje + bezpłatna konsultacja na dole */}
          <aside className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="flex flex-col gap-8">
              {/* Dane kontaktowe */}
              <div className="border border-[#c9a96e]/15 rounded-2xl overflow-hidden">
                {INFO.map(({ label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-6 py-5 border-b border-[#c9a96e]/10 last:border-b-0"
                  >
                    <span className="text-xs tracking-widest uppercase text-[#c9a96e]">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-base font-light text-[#f0ece3]/90 hover:text-[#c9a96e] transition-colors text-right"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-base font-light text-[#f0ece3]/90 text-right">
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
                className="flex items-center gap-5 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 px-6 py-6 rounded-2xl group transition-all duration-200 hover:bg-[#c9a96e]/[0.03]"
              >
                <div className="w-12 h-12 border border-[#c9a96e]/25 flex items-center justify-center rounded-full shrink-0">
                  <svg
                    className="w-6 h-6 text-[#c9a96e]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>

                <div>
                  <span className="block text-base font-light text-[#f0ece3]/90 group-hover:text-white transition-colors">
                    @wolakurszula
                  </span>
                  <span className="text-xs tracking-widest uppercase text-[#c9a96e]">
                    Instagram
                  </span>
                </div>

                <svg
                  className="ml-auto w-5 h-5 text-[#c9a96e]/40 group-hover:text-[#c9a96e] transition-all"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7-7 7"
                  />
                </svg>
              </a>

              {/* === NOWA SEKCJA - BEZPŁATNE KONSULTACJE === */}
              <div className="border border-[#c9a96e]/20 bg-[#0a0a08]/50 rounded-3xl p-7 sm:p-8 mt-4">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-[#c9a96e]/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <span className="inline-block px-3.5 py-1 bg-[#c9a96e]/10 text-[#c9a96e] text-xs tracking-widest uppercase rounded-full mb-3">
                      BEZPŁATNIE
                    </span>
                    <h3 className="text-2xl font-light text-[#f0ece3] mb-3">
                      Bezpłatna konsultacja
                    </h3>
                    <p className="text-[#f0ece3]/80 text-[15.5px] leading-relaxed">
                      Każda konsultacja jest całkowicie darmowa. Omówimy pomysł,
                      styl, rozmiar tatuażu oraz przygotuję wstępną wycenę.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Prawa kolumna - formularz */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
