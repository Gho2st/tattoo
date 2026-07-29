"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
];

const FILTERS = [
  { label: "Wszystkie", value: "all" },
  { label: "Damskie", value: "damskie" },
  { label: "Realizm", value: "realizm" },
  { label: "Kreskówki", value: "kreskówki" },
];

const PAGE_SIZE = 8;

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(null); // zmieniona nazwa dla jasności

  const filtered =
    active === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.cat === active);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleFilter = (val) => {
    setActive(val);
    setVisible(PAGE_SIZE);
    setLightboxIndex(null); // zamknięcie lightboxa przy zmianie filtra
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filtered.length);
  }, [filtered.length]);

  // Swipe
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  // Klawiatura
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, next, prev]);

  // Blokada scrolla
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <section
      id="portfolio"
      className=" py-12 sm:py-16 lg:py-20 px-5 lg:px-20 2xl:px-[12%]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-3">
            <span className="block w-6 h-px bg-[#c9a96e]" />
            Galeria
          </span>
          <h2
            className="text-3xl sm:text-4xl font-light leading-tight text-[#f0ece3]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Portfolio tatuaży
            <em className="block italic text-[#f0ece3]/40 text-2xl sm:text-3xl">
              — moje prace
            </em>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleFilter(value)}
              className={`px-5 py-2 text-xs tracking-widest uppercase rounded-full border transition-all duration-200 whitespace-nowrap ${
                active === value
                  ? "bg-[#c9a96e] text-[#0a0a08] border-[#c9a96e]"
                  : "border-[#c9a96e]/30 text-[#f0ece3]/60 hover:border-[#c9a96e]/60 hover:text-[#f0ece3]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[3px]">
        {shown.map((item, i) => (
          <button
            key={item.src}
            onClick={() => openLightbox(i)}
            className="relative aspect-square overflow-hidden group cursor-pointer bg-[#111]"
          >
            <Image
              src={item.src}
              alt={`Tatuaż ${item.cat} — Urszula Wolak`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="absolute bottom-3 left-3 right-3 flex justify-between opacity-0 group-hover:opacity-100 transition-all">
              <span className="text-xs uppercase tracking-widest text-white/70">
                {item.cat}
              </span>
              <span className="text-lg font-light text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="w-full mt-8 border border-[#c9a96e]/20 hover:border-[#c9a96e]/40 py-4 text-xs tracking-widest uppercase text-[#f0ece3]/60 hover:text-[#f0ece3]"
        >
          Zobacz więcej prac
        </button>
      )}

      {/* Instagram */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <span className="block w-8 h-px bg-[#c9a96e]/30" />
        <a
          href="https://www.instagram.com/wolakurszula/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-[#c9a96e]/60 hover:text-[#c9a96e]"
        >
          Więcej na Instagramie →
        </a>
        <span className="block w-8 h-px bg-[#c9a96e]/30" />
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-4xl text-white/60 hover:text-white z-10"
          >
            ✕
          </button>

          {/* Poprzednie */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-4"
          >
            <ChevronLeft
              size={36}
              className="text-white/60 hover:text-white transition-colors"
            />
          </button>

          {/* Zdjęcie z paddingiem na dole */}
          <div
            className="relative max-w-[92vw] max-h-[85vh] w-full h-full pb-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].src}
              alt="Tatuaż Urszula Wolak"
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Następne */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-4"
          >
            <ChevronRight
              size={36}
              className="text-white/60 hover:text-white transition-colors"
            />
          </button>

          {/* Podpis na dole - teraz z tłem i lepszym odstępem */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-3 rounded-2xl text-center border border-white/10">
            <span className="uppercase tracking-widest text-[#c9a96e] text-sm block">
              {filtered[lightboxIndex].cat}
            </span>
            <span className="block text-xs text-white/50 mt-1">
              {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {String(filtered.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
