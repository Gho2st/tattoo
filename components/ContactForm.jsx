"use client";

import { useState, useRef, useTransition } from "react";
import { sendContactEmail } from "../actions/sendContactEmail";

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
  const [error, setError] = useState(""); // błąd ogólny
  const [fieldErrors, setFieldErrors] = useState({}); // błędy per pole
  const [isPending, startTransition] = useTransition();

  const inspirationRef = useRef(null);
  const coverRef = useRef(null);
  const [inspirationFiles, setInspirationFiles] = useState([]);
  const [coverFiles, setCoverFiles] = useState([]);

  const handleFiles = (e, setter) => setter(Array.from(e.target.files));

  // Prosta walidacja
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.get("name")?.trim()) errors.name = "Imię jest wymagane";
    if (!formData.get("contact")?.trim())
      errors.contact = "Kontakt jest wymagany";
    if (!formData.get("bodyPart")?.trim())
      errors.bodyPart = "Miejsce na ciele jest wymagane";

    const isCoverValue = formData.get("isCover");
    if (isCoverValue === "null" || isCoverValue === null) {
      errors.isCover = "Wybierz czy to cover";
    }

    // Prosta walidacja email/telefon
    const contact = formData.get("contact")?.trim();
    if (
      contact &&
      !/^\+?\d{7,15}$/.test(contact.replace(/\s/g, "")) &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    ) {
      errors.contact = "Podaj poprawny numer telefonu lub adres email";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const formData = new FormData(e.target);
    formData.set("size", size);
    formData.set("isCover", String(isCover));

    // Walidacja klienta
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    // Walidacja plików
    const allFiles = [...inspirationFiles, ...coverFiles];
    const totalMB =
      allFiles.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);

    if (totalMB > MAX_TOTAL_MB) {
      setError(
        `Załączniki są za duże (${totalMB.toFixed(1)} MB). Maksymalnie ${MAX_TOTAL_MB} MB łącznie.`,
      );
      return;
    }

    startTransition(async () => {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitted(true);
        setError("");
        setFieldErrors({});
      } else {
        setError(
          result.error || "Coś poszło nie tak. Spróbuj ponownie później.",
        );
      }
    });
  };

  const clearFieldError = (field) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
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
          <em className="block italic text-[#f0ece3]/50">odezwę się wkrótce</em>
        </h2>
        <p className="text-base font-light leading-relaxed text-[#f0ece3]/75 max-w-sm">
          Odpowiadam zazwyczaj w ciągu 48 godzin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex items-center gap-4 mb-8 lg:hidden">
        <div className="flex-1 h-px bg-[#c9a96e]/10" />
        <span className="text-xs tracking-widest uppercase text-[#c9a96e]">
          Formularz
        </span>
        <div className="flex-1 h-px bg-[#c9a96e]/10" />
      </div>

      <Field label="Imię" required error={fieldErrors.name}>
        <input
          name="name"
          required
          placeholder="Twoje imię"
          className={`${inp} ${fieldErrors.name ? "border-red-500" : ""}`}
          onChange={() => clearFieldError("name")}
        />
      </Field>

      <Field label="Telefon / e-mail" required error={fieldErrors.contact}>
        <input
          name="contact"
          required
          placeholder="Jak się z Tobą skontaktować?"
          className={`${inp} ${fieldErrors.contact ? "border-red-500" : ""}`}
          onChange={() => clearFieldError("contact")}
        />
      </Field>

      <Field label="Miejsce na ciele" required error={fieldErrors.bodyPart}>
        <input
          name="bodyPart"
          required
          placeholder="np. przedramię, łopatka, udo, żebra..."
          className={`${inp} ${fieldErrors.bodyPart ? "border-red-500" : ""}`}
          onChange={() => clearFieldError("bodyPart")}
        />
      </Field>

      <Field label="Przybliżony rozmiar">
        <div className="flex flex-wrap gap-2 pt-1">
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

      <Field label="Czy to cover?" required error={fieldErrors.isCover}>
        <div className="flex gap-2 pt-1">
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
        {fieldErrors.isCover && (
          <p className="text-red-400 text-sm mt-2">{fieldErrors.isCover}</p>
        )}
      </Field>

      {isCover && (
        <Field label="Zdjęcie obecnego tatuażu" required>
          <Upload
            files={coverFiles}
            onClick={() => coverRef.current?.click()}
            hint="Dodaj zdjęcie tatuażu do zakrycia"
            sub="JPG, PNG, WEBP · max 10 MB"
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
          sub="Możesz dodać kilka plików"
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
          className={`${inp} resize-none`}
        />
      </Field>

      <Field label="Preferowany termin" last>
        <input
          name="timing"
          placeholder="np. weekendy, konkretny miesiąc..."
          className={inp}
        />
      </Field>

      {/* Błędy ogólne */}
      {error && (
        <p className="mt-6 text-sm text-red-400 border border-red-400/20 px-5 py-4 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-10 w-full py-5 text-sm font-medium tracking-widest uppercase bg-[#c9a96e] hover:bg-[#d4b580] text-[#0a0a08] transition-colors disabled:opacity-60"
      >
        {isPending ? "Wysyłanie..." : "Wyślij zapytanie"}
      </button>

      <p className="mt-6 text-center text-xs text-[#f0ece3]/65">
        Odpowiadam w ciągu 48 godzin. Wycenę przygotuję po kontakcie.
      </p>
    </form>
  );
}

// ── Helpers ───────────────────────────────────────────

const inp = [
  "w-full bg-transparent border-b border-[#c9a96e]/30 focus:border-[#c9a96e]",
  "text-base sm:text-lg font-light text-[#f0ece3] placeholder:text-[#f0ece3]/50",
  "py-3 transition-colors duration-200",
].join(" ");

const pill = (active) =>
  [
    "text-sm tracking-widest px-5 py-3 border rounded-full cursor-pointer transition-all",
    active
      ? "bg-[#c9a96e] text-[#0a0a08] border-[#c9a96e]"
      : "border-[#c9a96e]/30 text-[#f0ece3]/80 hover:border-[#c9a96e]/60 hover:text-[#f0ece3]",
  ].join(" ");

function Field({ label, required, last, error, children }) {
  return (
    <div
      className={`flex flex-col gap-3 py-8 border-t border-[#c9a96e]/10 ${
        last ? "border-b" : ""
      }`}
    >
      <label className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] font-medium">
        {label}
        {required && <span className="ml-1 text-[#c9a96e]/60">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-sm mt-1.5">{error}</p>}
    </div>
  );
}

function Upload({ files, onClick, hint, sub }) {
  return (
    <div
      onClick={onClick}
      className="mt-2 border border-dashed border-[#c9a96e]/30 hover:border-[#c9a96e]/60 px-6 py-8 flex flex-col items-center gap-3 cursor-pointer transition-colors rounded-xl"
    >
      {files.length > 0 ? (
        <p className="text-sm text-[#c9a96e]/80 text-center break-all">
          {files.map((f) => f.name).join(", ")}
        </p>
      ) : (
        <>
          <svg
            className="w-7 h-7"
            viewBox="0 0 20 20"
            fill="none"
            stroke="rgba(201,169,110,0.5)"
            strokeWidth="1.4"
          >
            <path d="M10 3v10M5 8l5-5 5 5" />
            <path d="M3 15h14" />
          </svg>
          <span className="text-sm tracking-widest uppercase text-[#f0ece3]/70">
            {hint}
          </span>
          <span className="text-xs text-[#f0ece3]/40">{sub}</span>
        </>
      )}
    </div>
  );
}
