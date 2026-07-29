"use client";

import { useState, useRef, useEffect } from "react";

const SIZES = [
  { label: "Mały (do 5 cm)", value: "maly" },
  { label: "Średni (5–15 cm)", value: "sredni" },
  { label: "Duży (15 cm+)", value: "duzy" },
  { label: "Rękaw / sleeve", value: "rekaw" },
];

const MAX_TOTAL_MB = 4; // zapas względem limitu 4,5 MB na body requestu
const MAX_DIMENSION = 1800; // dłuższy bok po kompresji
const JPEG_QUALITY = 0.82;

const INSTAGRAM_URL = "https://www.instagram.com/wolakurszula/";
const WHATSAPP_URL = "https://wa.me/48788557523";

// Kolejność przewijania do pierwszego błędu — zgodna z układem formularza
const FIELD_ORDER = ["name", "contact", "bodyPart", "isCover", "coverPhoto"];

// ── Kompresja zdjęć w przeglądarce ─────────────────────
async function compressImage(file) {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );

    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

const formatMB = (bytes) => (bytes / (1024 * 1024)).toFixed(1);
const fieldWord = (n) => (n === 1 ? "pole" : n < 5 ? "pola" : "pól");

export default function ContactForm() {
  const [isCover, setIsCover] = useState(null);
  const [size, setSize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // { message, kind, retryable }
  const [fieldErrors, setFieldErrors] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formRef = useRef(null);
  const errorRef = useRef(null);
  const successRef = useRef(null);
  const inspirationRef = useRef(null);
  const coverRef = useRef(null);
  const [inspirationFiles, setInspirationFiles] = useState([]);
  const [coverFiles, setCoverFiles] = useState([]);

  // Po udanej wysyłce formularz znika i strona się kurczy —
  // przewijamy do podziękowania, żeby nie zostać przy stopce
  useEffect(() => {
    if (!submitted) return;
    successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    successRef.current?.focus({ preventScroll: true });
  }, [submitted]);

  const errorCount = Object.values(fieldErrors).filter(Boolean).length;
  const totalBytes = [...inspirationFiles, ...coverFiles].reduce(
    (sum, f) => sum + f.size,
    0,
  );

  // ── Nawigacja do błędów ──────────────────────────────
  const scrollToField = (key) => {
    const el = document.getElementById(`field-${key}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.querySelector("input, textarea, button")?.focus({ preventScroll: true });
  };

  const scrollToFirstError = (errors) => {
    const key = FIELD_ORDER.find((f) => errors[f]);
    if (key) scrollToField(key);
  };

  const showError = (message, kind = "server", retryable = true) => {
    setError({ message, kind, retryable });
    requestAnimationFrame(() =>
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  };

  // ── Pliki ────────────────────────────────────────────
  const handleFiles = async (e, setter) => {
    const picked = Array.from(e.target.files);
    if (picked.length === 0) return;

    setIsProcessing(true);
    setError(null);
    try {
      setter(await Promise.all(picked.map(compressImage)));
    } catch {
      showError(
        "Nie udało się przygotować zdjęć. Spróbuj wybrać je ponownie.",
        "files",
        false,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCoverChoice = (value) => {
    setIsCover(value);
    clearFieldError("isCover");
    if (value === false) {
      setCoverFiles([]);
      if (coverRef.current) coverRef.current.value = "";
    }
  };

  // ── Walidacja ────────────────────────────────────────
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.get("name")?.trim()) errors.name = "Imię jest wymagane";
    if (!formData.get("bodyPart")?.trim())
      errors.bodyPart = "Miejsce na ciele jest wymagane";
    if (isCover === null) errors.isCover = "Wybierz czy to cover";
    if (isCover === true && coverFiles.length === 0)
      errors.coverPhoto = "Dodaj zdjęcie tatuażu do zakrycia";

    const contact = formData.get("contact")?.trim();
    if (!contact) {
      errors.contact = "Kontakt jest wymagany";
    } else if (
      !/^\+?\d{7,15}$/.test(contact.replace(/\s/g, "")) &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    ) {
      errors.contact = "Podaj poprawny numer telefonu lub adres email";
    }

    return errors;
  };

  const clearFieldError = (field) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ── Wysyłka ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.target);
    formData.set("size", size);
    formData.set("isCover", String(isCover));

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      scrollToFirstError(validationErrors);
      return;
    }

    if (totalBytes / (1024 * 1024) > MAX_TOTAL_MB) {
      showError(
        `Załączniki ważą ${formatMB(totalBytes)} MB, a limit to ${MAX_TOTAL_MB} MB. Usuń część zdjęć albo wyślij je bezpośrednio przez WhatsApp lub Instagram.`,
        "size",
        false,
      );
      return;
    }

    // Podmieniamy surowe pliki z inputów na wersje skompresowane
    formData.delete("coverPhoto");
    formData.delete("inspirations");
    if (isCover && coverFiles[0]) formData.append("coverPhoto", coverFiles[0]);
    for (const file of inspirationFiles) {
      formData.append("inspirations", file);
    }

    setIsPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      // 413 z gatewaya przychodzi jako HTML, nie JSON
      if (res.status === 413) {
        showError(
          "Załączniki okazały się za duże dla serwera. Usuń część zdjęć i spróbuj ponownie.",
          "size",
          false,
        );
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (res.status === 400) {
        showError(
          data.message || "Formularz zawiera błędy. Sprawdź wpisane dane.",
          "validation",
          false,
        );
        return;
      }

      if (res.status === 429) {
        showError(
          "Za dużo prób pod rząd. Odczekaj chwilę i spróbuj jeszcze raz.",
          "rate",
          true,
        );
        return;
      }

      if (!res.ok) {
        showError(
          data.message ||
            "Serwer poczty nie odpowiedział. Możesz spróbować ponownie albo napisać bezpośrednio.",
          "server",
          true,
        );
        return;
      }

      setSubmitted(true);
    } catch {
      showError(
        "Nie udało się połączyć z serwerem. Sprawdź internet i spróbuj ponownie.",
        "network",
        true,
      );
    } finally {
      setIsPending(false);
    }
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center justify-center py-20 gap-6 text-center scroll-mt-32 outline-none"
      >
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col"
      noValidate
    >
      <div className="flex items-center gap-4 mb-8 lg:hidden">
        <div className="flex-1 h-px bg-[#c9a96e]/10" />
        <span className="text-xs tracking-widest uppercase text-[#c9a96e]">
          Formularz
        </span>
        <div className="flex-1 h-px bg-[#c9a96e]/10" />
      </div>

      <Field id="name" label="Imię" required error={fieldErrors.name}>
        <input
          name="name"
          placeholder="Twoje imię"
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          className={`${inp} ${fieldErrors.name ? "border-red-500" : ""}`}
          onChange={() => clearFieldError("name")}
        />
      </Field>

      <Field
        id="contact"
        label="Telefon / e-mail"
        required
        error={fieldErrors.contact}
      >
        <input
          name="contact"
          placeholder="Jak się z Tobą skontaktować?"
          aria-invalid={!!fieldErrors.contact}
          aria-describedby={fieldErrors.contact ? "contact-error" : undefined}
          className={`${inp} ${fieldErrors.contact ? "border-red-500" : ""}`}
          onChange={() => clearFieldError("contact")}
        />
      </Field>

      <Field
        id="bodyPart"
        label="Miejsce na ciele"
        required
        error={fieldErrors.bodyPart}
      >
        <input
          name="bodyPart"
          placeholder="np. przedramię, łopatka, udo, żebra..."
          aria-invalid={!!fieldErrors.bodyPart}
          aria-describedby={fieldErrors.bodyPart ? "bodyPart-error" : undefined}
          className={`${inp} ${fieldErrors.bodyPart ? "border-red-500" : ""}`}
          onChange={() => clearFieldError("bodyPart")}
        />
      </Field>

      <Field id="size" label="Przybliżony rozmiar">
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

      <Field
        id="isCover"
        label="Czy to cover?"
        required
        error={fieldErrors.isCover}
      >
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleCoverChoice(false)}
            className={pill(isCover === false)}
          >
            Nie
          </button>
          <button
            type="button"
            onClick={() => handleCoverChoice(true)}
            className={pill(isCover === true)}
          >
            Tak — to cover
          </button>
        </div>
      </Field>

      {isCover && (
        <Field
          id="coverPhoto"
          label="Zdjęcie obecnego tatuażu"
          required
          error={fieldErrors.coverPhoto}
        >
          <Upload
            files={coverFiles}
            onClick={() => coverRef.current?.click()}
            hint="Dodaj zdjęcie tatuażu do zakrycia"
            sub="JPG, PNG, WEBP — zdjęcie zostanie automatycznie pomniejszone"
            invalid={!!fieldErrors.coverPhoto}
          />
          <input
            ref={coverRef}
            type="file"
            name="coverPhoto"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              clearFieldError("coverPhoto");
              handleFiles(e, setCoverFiles);
            }}
          />
        </Field>
      )}

      <Field id="inspirations" label="Inspiracje">
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

      <Field id="description" label="Opis projektu">
        <textarea
          name="description"
          rows={5}
          placeholder="Opisz swój pomysł — temat, nastrój, ważne detale..."
          className={`${inp} resize-none`}
        />
      </Field>

      <Field id="timing" label="Preferowany termin" last>
        <input
          name="timing"
          placeholder="np. weekendy, konkretny miesiąc..."
          className={inp}
        />
      </Field>

      {totalBytes > 0 && (
        <p className="mt-6 text-xs text-[#f0ece3]/50">
          Załączniki: {formatMB(totalBytes)} MB z {MAX_TOTAL_MB} MB
        </p>
      )}

      {/* Błąd wysyłki + drogi awaryjne */}
      {error && (
        <div
          ref={errorRef}
          role="alert"
          className="mt-6 border border-red-400/25 bg-red-400/[0.04] px-5 py-4 rounded-xl scroll-mt-32"
        >
          <p className="text-sm leading-relaxed text-red-300">
            {error.message}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {error.retryable && (
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                disabled={isPending}
                className="text-xs tracking-widest uppercase px-4 py-2.5 rounded-full bg-[#c9a96e] text-[#0a0a08] hover:bg-[#d4b580] transition-colors disabled:opacity-60"
              >
                Spróbuj ponownie
              </button>
            )}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={fallbackLink}
            >
              Napisz na WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={fallbackLink}
            >
              Instagram
            </a>
          </div>
        </div>
      )}

      {/* Podsumowanie błędów pól — tuż przy przycisku */}
      {errorCount > 0 && (
        <div
          role="alert"
          className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-red-400/25 px-5 py-4 rounded-xl"
        >
          <p className="text-sm text-red-300">
            Popraw {errorCount} {fieldWord(errorCount)} powyżej, żeby wysłać
            zapytanie.
          </p>
          <button
            type="button"
            onClick={() => scrollToFirstError(fieldErrors)}
            className="text-xs tracking-widest uppercase text-[#c9a96e] underline underline-offset-4 hover:text-[#d4b580] transition-colors"
          >
            Pokaż
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || isProcessing}
        className="mt-6 w-full py-5 text-sm font-medium tracking-widest uppercase bg-[#c9a96e] hover:bg-[#d4b580] text-[#0a0a08] transition-colors disabled:opacity-60"
      >
        {isProcessing
          ? "Przetwarzanie zdjęć..."
          : isPending
            ? "Wysyłanie..."
            : "Wyślij zapytanie"}
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

const fallbackLink = [
  "text-xs tracking-widest uppercase px-4 py-2.5 rounded-full",
  "border border-[#c9a96e]/30 text-[#f0ece3]/80",
  "hover:border-[#c9a96e]/60 hover:text-[#f0ece3] transition-colors",
].join(" ");

const pill = (active) =>
  [
    "text-sm tracking-widest px-5 py-3 border rounded-full cursor-pointer transition-all",
    active
      ? "bg-[#c9a96e] text-[#0a0a08] border-[#c9a96e]"
      : "border-[#c9a96e]/30 text-[#f0ece3]/80 hover:border-[#c9a96e]/60 hover:text-[#f0ece3]",
  ].join(" ");

function Field({ id, label, required, last, error, children }) {
  return (
    <div
      id={`field-${id}`}
      className={`flex flex-col gap-3 py-8 border-t border-[#c9a96e]/10 scroll-mt-32 ${
        last ? "border-b" : ""
      }`}
    >
      <label className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] font-medium">
        {label}
        {required && <span className="ml-1 text-[#c9a96e]/60">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-sm mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

function Upload({ files, onClick, hint, sub, invalid }) {
  return (
    <div
      onClick={onClick}
      className={`mt-2 border border-dashed px-6 py-8 flex flex-col items-center gap-3 cursor-pointer transition-colors rounded-xl ${
        invalid
          ? "border-red-500/60"
          : "border-[#c9a96e]/30 hover:border-[#c9a96e]/60"
      }`}
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
