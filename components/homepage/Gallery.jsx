"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const ALL_ITEMS = [
  { src: "/images/realizm/1.webp", cat: "realizm" },
  { src: "/images/realizm/2.webp", cat: "realizm" },
  { src: "/images/realizm/3.webp", cat: "realizm" },
  { src: "/images/realizm/4.webp", cat: "realizm" },
  { src: "/images/realizm/5.webp", cat: "realizm" },
  { src: "/images/realizm/6.webp", cat: "realizm" },
  { src: "/images/realizm/7.webp", cat: "realizm" },
  { src: "/images/realizm/8.webp", cat: "realizm" },
  { src: "/images/damskie/1.webp", cat: "damskie" },
  { src: "/images/damskie/2.webp", cat: "damskie" },
  { src: "/images/damskie/3.webp", cat: "damskie" },
  { src: "/images/damskie/4.webp", cat: "damskie" },
  { src: "/images/damskie/5.webp", cat: "damskie" },
  { src: "/images/damskie/6.webp", cat: "damskie" },
  { src: "/images/kreskówki/1.webp", cat: "kreskówki" },
  { src: "/images/kreskówki/2.webp", cat: "kreskówki" },
  { src: "/images/kreskówki/3.webp", cat: "kreskówki" },
  { src: "/images/kreskówki/4.webp", cat: "kreskówki" },
  { src: "/images/kreskówki/5.webp", cat: "kreskówki" },
];

const FILTERS = [
  { label: "Wszystkie", value: "all" },
  { label: "Damskie", value: "damskie" },
  { label: "Realizm", value: "realizm" },
  { label: "Kreskówki", value: "kreskówki" },
];

const PAGE_SIZE = 6;

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState(null); // index w filtered

  const filtered =
    active === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.cat === active);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleFilter = (val) => {
    setActive(val);
    setVisible(PAGE_SIZE);
    setLightbox(null);
  };

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = useCallback(
    () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length),
    [filtered.length],
  );
  const next = useCallback(
    () => setLightbox((i) => (i + 1) % filtered.length),
    [filtered.length],
  );

  // Swipe
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Klawiatura
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, next, prev]);

  // Blokuj scroll gdy lightbox otwarty
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section
      id="portfolio"
      className="bg-[#0a0a08] px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-28"
    >
      {/* ── Header ── */}
      <div className="flex items-end justify-between gap-8 mb-8 sm:mb-10">
        <div>
          <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-4">
            <span className="block w-6 h-px bg-[#c9a96e]" />
            Portfolio
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light leading-none text-[#f0ece3] m-0"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Moje
            <em className="block italic text-[#f0ece3]/40"> prace</em>
          </h2>
        </div>

        {/* Filtry pionowo */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleFilter(value)}
              className={[
                "text-xs tracking-widest uppercase bg-transparent border-none cursor-pointer transition-colors duration-200 text-right",
                active === value
                  ? "text-[#c9a96e]"
                  : "text-[#f0ece3]/28 hover:text-[#f0ece3]/55",
              ].join(" ")}
            >
              {label}
              {active === value && (
                <span className="inline-block w-3 h-px bg-[#c9a96e] ml-2 align-middle" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-2 gap-[3px]">
        {shown.map((item, i) => (
          <button
            key={item.src}
            onClick={() => openLightbox(i)}
            className="relative aspect-square overflow-hidden group cursor-pointer bg-[#111] border-none p-0"
          >
            <Image
              src={item.src}
              alt={`Tatuaż ${item.cat} — Urszula Wolak`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0a0a08]/0 group-hover:bg-[#0a0a08]/30 transition-all duration-300 flex items-center justify-center">
              {/* Lupa */}
              <svg
                className="w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(240,236,227,0.85)"
                strokeWidth="1.2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
                <path d="M11 8v6M8 11h6" />
              </svg>
            </div>

            {/* Kategoria + numer */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-xs tracking-widest uppercase text-[#f0ece3]/65">
                {item.cat}
              </span>
              <span
                className="text-xl font-light text-[#f0ece3]/25"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Load more ── */}
      {hasMore && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="w-full mt-3 border border-[#c9a96e]/12 hover:border-[#c9a96e]/35 bg-transparent text-xs tracking-widest uppercase text-[#f0ece3]/50 hover:text-[#f0ece3]/60 py-5 transition-all duration-200 cursor-pointer"
        >
          · · · Zobacz więcej
        </button>
      )}

      {/* ── Instagram ── */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <span className="block w-8 h-px bg-[#c9a96e]/35" />
        <a
          href="https://www.instagram.com/wolakurszula/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-[#c9a96e]/50 hover:text-[#c9a96e] no-underline transition-colors duration-200"
        >
          Więcej na Instagramie
        </a>
        <span className="block w-8 h-px bg-[#c9a96e]/35" />
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0a08]/96 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Zamknij */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-6 text-2xl text-[#f0ece3]/40 hover:text-[#f0ece3] bg-transparent border-none cursor-pointer transition-colors duration-200 z-10"
            aria-label="Zamknij"
          >
            ✕
          </button>

          {/* Poprzedni */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-transparent border-none cursor-pointer group z-10"
            aria-label="Poprzednie"
          >
            <svg
              className="w-6 h-6 stroke-[#f0ece3]/30 group-hover:stroke-[#f0ece3]/80 transition-all duration-200"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Zdjęcie */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox].src}
              alt={`Tatuaż ${filtered[lightbox].cat} — Urszula Wolak`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Następny */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-transparent border-none cursor-pointer group z-10"
            aria-label="Następne"
          >
            <svg
              className="w-6 h-6 stroke-[#f0ece3]/30 group-hover:stroke-[#f0ece3]/80 transition-all duration-200"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Kategoria + licznik */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest uppercase text-[#c9a96e]/50">
              {filtered[lightbox].cat}
            </span>
            <span className="text-xs tracking-widest text-[#f0ece3]/25">
              {String(lightbox + 1).padStart(2, "0")} /{" "}
              {String(filtered.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
