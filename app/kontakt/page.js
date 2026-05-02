"use client";

import { useState, useRef } from "react";

// ✏️ Uzupełnij prawdziwe dane
const INFO = [
  { label: "Studio", value: "Kult Tattoo, Kraków", href: null },
  {
    label: "E-mail",
    value: "ula@kulttattoo.pl",
    href: "mailto:ula@kulttattoo.pl",
  },
  { label: "Telefon", value: "+48 000 000 000", href: "tel:+48000000000" },
  { label: "Godziny", value: "Wt–Sb, 10:00–18:00", href: null },
];

const SIZES = [
  { label: "Mały (do 5 cm)", value: "maly" },
  { label: "Średni (5–15 cm)", value: "sredni" },
  { label: "Duży (15 cm+)", value: "duzy" },
  { label: "Rękaw / sleeve", value: "rekaw" },
];

export default function ContactPage() {
  const [isCover, setIsCover] = useState(null);
  const [size, setSize] = useState("");
  const [inspirationFiles, setInspirationFiles] = useState([]);
  const [coverFiles, setCoverFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inspirationRef = useRef(null);
  const coverRef = useRef(null);

  const handleFiles = (e, setter) => setter(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 🔌 Podepnij Resend / Formspree / EmailJS
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main
        className="min-h-screen bg-[#0a0a08] flex flex-col items-center justify-center gap-8 px-5 text-center"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <span className="block w-10 h-px bg-[#c9a96e] mx-auto" />
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#f0ece3]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Dzięki,
          <em className="block italic text-[#f0ece3]/40">odezwę się wkrótce</em>
        </h1>
        <p className="text-sm font-light leading-relaxed text-[#f0ece3]/40 max-w-sm">
          Odpowiadam w ciągu 48 godzin. Do zobaczenia!
        </p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#0a0a08] px-5 pt-28 pb-20 sm:px-8 sm:pt-32 lg:px-20 lg:pt-36 lg:pb-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
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
        <p className="text-sm font-light leading-relaxed text-[#f0ece3]/40 max-w-md">
          Napisz do mnie — przez formularz, Instagram lub bezpośrednio. Chętnie
          omówię Twój pomysł i odpowiem na wszystkie pytania.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 max-w-5xl">
        {/* ── Lewa kolumna: info + Instagram ── */}
        <div className="flex flex-col gap-8">
          {/* Dane kontaktowe */}
          <div className="border border-[#c9a96e]/12">
            {INFO.map(({ label, value, href }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-4 border-b border-[#c9a96e]/8 last:border-b-0"
              >
                <span className="text-xs tracking-widest uppercase text-[#c9a96e]/45">
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-light text-[#f0ece3]/60 hover:text-[#c9a96e] no-underline transition-colors duration-200"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-sm font-light text-[#f0ece3]/60">
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
            <div className="w-11 h-11 border border-[#c9a96e]/20 flex items-center justify-center flex-shrink-0">
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

          {/* Nota */}
          <p className="text-xs font-light leading-relaxed text-[#f0ece3]/25">
            Możesz też napisać bezpośrednio w DM na Instagramie — zazwyczaj
            odpowiadam tam najszybciej.
          </p>
        </div>

        {/* ── Prawa kolumna: formularz ── */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Divider mobile */}
          <div className="flex items-center gap-4 mb-8 lg:hidden">
            <div className="flex-1 h-px bg-[#c9a96e]/10" />
            <span className="text-xs tracking-widest uppercase text-[#c9a96e]/30">
              formularz
            </span>
            <div className="flex-1 h-px bg-[#c9a96e]/10" />
          </div>

          <Field label="Imię" required>
            <input
              name="name"
              required
              placeholder="Twoje imię"
              className={inp}
            />
          </Field>

          <Field label="Telefon / e-mail" required>
            <input
              name="contact"
              required
              placeholder="Jak się z Tobą skontaktować?"
              className={inp}
            />
          </Field>

          <Field label="Miejsce na ciele" required>
            <input
              name="bodyPart"
              required
              placeholder="np. przedramię, łopatka, udo, żebra..."
              className={inp}
            />
          </Field>

          <Field label="Przybliżony rozmiar">
            <div className="flex flex-wrap gap-2 pt-2">
              {SIZES.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSize(size === value ? "" : value)}
                  className={pill(size === value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <input type="hidden" name="size" value={size} />
          </Field>

          <Field label="Czy to cover?" required>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCover(false)}
                className={pill(isCover === false)}
              >
                Nie
              </button>
              <button
                type="button"
                onClick={() => setIsCover(true)}
                className={pill(isCover === true)}
              >
                Tak — to cover
              </button>
            </div>
          </Field>

          {isCover && (
            <Field label="Zdjęcie obecnego tatuażu" required>
              <Upload
                files={coverFiles}
                onClick={() => coverRef.current?.click()}
                hint="Dodaj zdjęcie tatuażu do zakrycia"
                sub="JPG, PNG, WEBP · maks. 10 MB"
              />
              <input
                ref={coverRef}
                type="file"
                name="coverPhoto"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e, setCoverFiles)}
              />
            </Field>
          )}

          <Field label="Inspiracje">
            <Upload
              files={inspirationFiles}
              onClick={() => inspirationRef.current?.click()}
              hint="Załącz zdjęcia inspiracji"
              sub="Możesz dodać kilka plików · JPG, PNG, WEBP"
            />
            <input
              ref={inspirationRef}
              type="file"
              name="inspirations"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e, setInspirationFiles)}
            />
          </Field>

          <Field label="Opis projektu">
            <textarea
              name="description"
              rows={5}
              placeholder="Opisz swój pomysł — temat, nastrój, ważne detale..."
              className={`${inp} resize-none leading-relaxed`}
            />
          </Field>

          <Field label="Preferowany termin" last>
            <input
              name="timing"
              placeholder="np. weekendy, konkretny miesiąc..."
              className={inp}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className={[
              "mt-10 w-full text-xs font-medium tracking-widest uppercase",
              "text-[#0a0a08] bg-[#c9a96e] hover:bg-[#d4b580] py-5",
              "transition-colors duration-200",
              loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            {loading ? "Wysyłanie..." : "Wyślij zapytanie"}
          </button>

          <p className="mt-5 text-center text-xs leading-relaxed text-[#f0ece3]/20">
            Odpowiadam w ciągu 48 godzin.
            <br />
            Wycenę i szczegóły omówimy po pierwszym kontakcie.
          </p>
        </form>
      </div>
    </main>
  );
}

// ── Helpers ──────────────────────────────────────────

const inp = [
  "w-full bg-transparent border-none outline-none",
  "text-sm sm:text-base font-light text-[#f0ece3]",
  "placeholder:text-[#f0ece3]/20 pt-1 pb-0.5",
].join(" ");

const pill = (active) =>
  [
    "text-xs tracking-wider uppercase px-4 py-2 border cursor-pointer transition-all duration-200",
    active
      ? "bg-[#c9a96e] text-[#0a0a08] border-[#c9a96e] font-medium"
      : "bg-transparent text-[#f0ece3]/40 border-[#c9a96e]/20 hover:text-[#f0ece3]/70 hover:border-[#c9a96e]/40",
  ].join(" ");

function Field({ label, required, last, children }) {
  return (
    <div
      className={[
        "flex flex-col gap-3 py-5 border-t border-[#c9a96e]/10",
        last ? "border-b border-b-[#c9a96e]/10" : "",
      ].join(" ")}
    >
      <label className="text-xs tracking-widest uppercase text-[#c9a96e]/50">
        {label}
        {required && <span className="ml-1 text-[#c9a96e]/30">*</span>}
      </label>
      {children}
    </div>
  );
}

function Upload({ files, onClick, hint, sub }) {
  return (
    <div
      onClick={onClick}
      className="mt-1 border border-dashed border-[#c9a96e]/18 hover:border-[#c9a96e]/45 px-5 py-7 flex flex-col items-center gap-3 cursor-pointer transition-colors duration-200"
    >
      {files.length > 0 ? (
        <p className="text-xs text-[#c9a96e]/65 text-center">
          {files.map((f) => f.name).join(", ")}
        </p>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="rgba(201,169,110,0.35)"
            strokeWidth="1.2"
          >
            <path d="M10 3v10M5 8l5-5 5 5" />
            <path d="M3 15h14" />
          </svg>
          <span className="text-xs tracking-wider uppercase text-[#f0ece3]/25">
            {hint}
          </span>
          <span className="text-xs text-[#f0ece3]/15">{sub}</span>
        </>
      )}
    </div>
  );
}
