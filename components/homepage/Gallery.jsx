"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  { label: "realizm", value: "realizm" },
  { label: "Kreskówki", value: "kreskówki" },
];

const PAGE_SIZE = 6;

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered =
    active === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.cat === active);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleFilter = (val) => {
    setActive(val);
    setVisible(PAGE_SIZE);
  };

  return (
    <section
      className="bg-[#0a0a08] px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      id="portfolio"
    >
      {/* Eyebrow */}
      <span className="flex items-center gap-3 text-[0.48rem] sm:text-[0.5rem] tracking-[0.38em] uppercase text-[#c9a96e] mb-7">
        <span className="block w-6 h-px bg-[#c9a96e]" />
        Portfolio
      </span>

      {/* Heading */}
      <h2
        className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] font-light leading-[1.04] text-[#f0ece3] m-0 mb-8 sm:mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Moje
        <em className="block italic text-[#f0ece3]/42">prace</em>
      </h2>

      {/* Filtry */}
      <div className="flex mb-8 sm:mb-10 border border-[#c9a96e]/15 w-fit overflow-hidden">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleFilter(value)}
            className={[
              "text-[0.5rem] sm:text-[0.55rem] tracking-[0.22em] uppercase px-4 py-2.5 sm:px-5 sm:py-3 border-none cursor-pointer transition-all duration-200 whitespace-nowrap",
              "border-l border-l-[#c9a96e]/15 first:border-l-0",
              active === value
                ? "bg-[#c9a96e] text-[#0a0a08] font-medium"
                : "bg-transparent text-[#f0ece3]/38 hover:text-[#f0ece3]/70",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-[2px]">
        {shown.map((item, i) => {
          // Pierwszy element w kategorii "wszystkie" rozciąga się na całą szerokość
          const isWide = item.span && active === "all" && i === 0;
          return (
            <div
              key={item.src}
              className={[
                "relative overflow-hidden group cursor-pointer",
                isWide ? "col-span-2 aspect-[16/9]" : "aspect-square",
              ].join(" ")}
            >
              <Image
                src={item.src}
                alt={`Tatuaż ${item.cat} — Urszula Wolak`}
                fill
                sizes={isWide ? "100vw" : "(max-width: 768px) 50vw, 33vw"}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />

              {/* Overlay przy hover */}
              <div className="absolute inset-0 bg-[#0a0a08]/0 group-hover:bg-[#0a0a08]/35 transition-all duration-300" />

              {/* Kategoria */}
              <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 text-[0.42rem] sm:text-[0.45rem] tracking-[0.2em] uppercase text-[#f0ece3]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.cat}
              </span>
            </div>
          );
        })}
      </div>

      {/* Load more */}
      {hasMore && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="w-full mt-4 flex items-center justify-center gap-3 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 bg-transparent text-[0.52rem] tracking-[0.26em] uppercase text-[#f0ece3]/35 hover:text-[#f0ece3]/65 py-4 transition-all duration-200 cursor-pointer"
        >
          <span className="block w-5 h-px bg-current" />
          Zobacz więcej
        </button>
      )}

      {/* Instagram CTA */}
      <div className="mt-8 flex justify-center">
        <a
          href="https://www.instagram.com/wolakurszula/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-[0.52rem] tracking-[0.26em] uppercase text-[#c9a96e]/60 hover:text-[#c9a96e] no-underline transition-colors duration-200 group"
        >
          <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
          Więcej na Instagramie
        </a>
      </div>
    </section>
  );
}
