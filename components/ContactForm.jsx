"use client";

import { useState, useRef, useTransition } from "react";
import { sendContactEmail } from "@/actions/sendContactEmail";

const SIZES = [
  { label: "Mały (do 5 cm)", value: "maly" },
  { label: "Średni (5–15 cm)", value: "sredni" },
  { label: "Duży (15 cm+)", value: "duzy" },
  { label: "Rękaw / sleeve", value: "rekaw" },
];

const MAX_TOTAL_MB = 35;

export default function ContactForm() {
  const [isCover, setIsCover] = useState(null);
  const [size, setSize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const inspirationRef = useRef(null);
  const coverRef = useRef(null);
  const [inspirationFiles, setInspirationFiles] = useState([]);
  const [coverFiles, setCoverFiles] = useState([]);

  const handleFiles = (e, setter) => setter(Array.from(e.target.files));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Walidacja rozmiaru załączników po stronie klienta
    const allFiles = [...inspirationFiles, ...coverFiles];
    const totalMB =
      allFiles.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
    if (totalMB > MAX_TOTAL_MB) {
      setError(
        `Załączniki są za duże (${totalMB.toFixed(1)} MB). Maksymalnie ${MAX_TOTAL_MB} MB łącznie.`,
      );
      return;
    }

    const formData = new FormData(e.target);
    formData.set("size", size);
    formData.set("isCover", String(isCover));

    startTransition(async () => {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Coś poszło nie tak.");
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <span className="block w-10 h-px bg-[#c9a96e] mx-auto" />
        <h2
          className="text-4xl sm:text-5xl font-light text-[#f0ece3]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Dzięki,
          <em className="block italic text-[#f0ece3]/40">odezwę się wkrótce</em>
        </h2>
        <p className="text-sm font-light leading-relaxed text-[#f0ece3]/40 max-w-sm">
          Odpowiadam w ciągu 48 godzin. Do zobaczenia!
        </p>
      </div>
    );
  }

  return (
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
        <input name="name" required placeholder="Twoje imię" className={inp} />
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

      {error && (
        <p className="mt-5 text-sm text-red-400 border border-red-400/20 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={[
          "mt-10 w-full text-sm font-medium tracking-widest uppercase",
          "text-[#0a0a08] bg-[#c9a96e] hover:bg-[#d4b580] py-5",
          "transition-colors duration-200",
          isPending ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        {isPending ? "Wysyłanie..." : "Wyślij zapytanie"}
      </button>

      <p className="mt-5 text-center text-sm leading-relaxed text-[#f0ece3]/20">
        Odpowiadam w ciągu 48 godzin.
        <br />
        Wycenę i szczegóły omówimy po pierwszym kontakcie.
      </p>
    </form>
  );
}

// ── Helpers ───────────────────────────────────────────

const inp = [
  "w-full bg-transparent border-none outline-none",
  "text-base sm:text-lg font-light text-[#f0ece3]",
  "placeholder:text-[#f0ece3]/18 pt-1 pb-1",
].join(" ");

const pill = (active) =>
  [
    "text-sm tracking-wider uppercase px-5 py-2.5 border cursor-pointer transition-all duration-200",
    active
      ? "bg-[#c9a96e] text-[#0a0a08] border-[#c9a96e] font-medium"
      : "bg-transparent text-[#f0ece3]/40 border-[#c9a96e]/20 hover:text-[#f0ece3]/70 hover:border-[#c9a96e]/40",
  ].join(" ");

function Field({ label, required, last, children }) {
  return (
    <div
      className={[
        "flex flex-col gap-3 py-6 border-t border-[#c9a96e]/12",
        last ? "border-b border-b-[#c9a96e]/12" : "",
      ].join(" ")}
    >
      <label className="text-xs tracking-widest uppercase text-[#c9a96e]/60 font-medium">
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
      className="mt-2 border border-dashed border-[#c9a96e]/20 hover:border-[#c9a96e]/50 px-6 py-8 flex flex-col items-center gap-3 cursor-pointer transition-colors duration-200"
    >
      {files.length > 0 ? (
        <p className="text-sm text-[#c9a96e]/70 text-center leading-relaxed">
          {files.map((f) => f.name).join(", ")}
        </p>
      ) : (
        <>
          <svg
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="none"
            stroke="rgba(201,169,110,0.4)"
            strokeWidth="1.2"
          >
            <path d="M10 3v10M5 8l5-5 5 5" />
            <path d="M3 15h14" />
          </svg>
          <span className="text-sm tracking-wider uppercase text-[#f0ece3]/28">
            {hint}
          </span>
          <span className="text-sm text-[#f0ece3]/16">{sub}</span>
        </>
      )}
    </div>
  );
}
