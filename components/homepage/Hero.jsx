"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

const SLIDES = [
  "/images/hero/1.webp",
  "/images/hero/2.webp",
  "/images/hero/3.webp",
  "/images/hero/4.webp",
  "/images/hero/5.webp",
];

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD = 40;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = (i) => {
    setCurrent(i);
    startTimer();
  };

  const prev = () => {
    setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length);
    startTimer();
  };

  const next = () => {
    setCurrent((p) => (p + 1) % SLIDES.length);
    startTimer();
  };

  /* ── Touch / Swipe ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    // jeśli ruch poziomy dominuje — blokuj scroll pionowy
    if (dx > dy && dx > 10) {
      isDragging.current = true;
      e.preventDefault();
    }
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      dx < 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  return (
    <section
      className="relative w-full min-h-svh bg-[#0a0a08] flex flex-col overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slideshow tło ── */}
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Tatuaż Urszula Wolak ${i + 1}`}
          fill
          priority={i === 0}
          sizes="100vw"
          className={[
            "object-cover object-center transition-opacity duration-[1400ms] ease-in-out",
            i === current ? "opacity-75" : "opacity-0",
          ].join(" ")}
        />
      ))}

      {/* Gradient — mocniejszy na dole */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] via-[#0a0a08]/45 to-[#0a0a08]/10" />

      {/* ── Strzałki (tylko desktop) ── */}
      <button
        onClick={prev}
        aria-label="Poprzedni slajd"
        className="
          hidden lg:flex
          absolute left-6 top-1/2 -translate-y-1/2 z-20
          items-center justify-center
          w-11 h-11
          border border-[#f0ece3]/20 hover:border-[#c9a96e]/60
          text-[#f0ece3]/40 hover:text-[#c9a96e]
          transition-all duration-300
          group
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          <path
            d="M11 4L6 9L11 14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Następny slajd"
        className="
          hidden lg:flex
          absolute right-6 top-1/2 -translate-y-1/2 z-20
          items-center justify-center
          w-11 h-11
          border border-[#f0ece3]/20 hover:border-[#c9a96e]/60
          text-[#f0ece3]/40 hover:text-[#c9a96e]
          transition-all duration-300
          group
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path
            d="M7 4L12 9L7 14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Główna treść — bottom ── */}
      <div className="relative z-10 mt-auto flex flex-col px-5 pb-8 gap-0 sm:px-8 sm:pb-10 lg:px-20 lg:pb-16 2xl:p-32">
        {/* Eyebrow */}
        <span className="text-[0.65rem] 2xl:text-xs tracking-[0.38em] uppercase text-[#c9a96e] mb-3 animate-[fadeUp_0.8s_ease_0.3s_both]">
          Profesjonalne i indywidualne podejście
        </span>

        {/* Headline */}
        <h1
          className="font-light leading-snug text-[#f0ece3] mt-4 mb-2 animate-[fadeUp_0.9s_ease_0.45s_both] text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Urszula Wolak <br /> Tatuaż realistyczny i mikrorealizm w Krakowie
        </h1>

        {/* Opis */}
        <p className="text-xs sm:text-base 2xl:text-lg font-light leading-[1.85] text-[#f0ece3]/55 mb-5 sm:mb-6 max-w-xs animate-[fadeUp_1s_ease_0.58s_both]">
          Tatuaże, które przyciągają wzrok - od dużych projektów po
          mikrotatuaże.
        </p>

        {/* Dots + CTA */}
        <div className="flex items-center justify-between gap-4 animate-[fadeUp_1s_ease_0.68s_both]">
          {/* Slide dots */}
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slajd ${i + 1}`}
                className={[
                  "h-0.5 rounded-full border-none p-0 cursor-pointer bg-[#c9a96e] transition-all duration-300",
                  i === current ? "w-6 opacity-100" : "w-2 opacity-25",
                ].join(" ")}
              />
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/#portfolio"
              className="text-[0.55rem] sm:text-[0.58rem] 2xl:text-xs tracking-[0.2em] uppercase text-[#f0ece3]/60 border border-[#f0ece3]/25 hover:border-[#f0ece3]/30 px-4 py-3 sm:px-5 transition-colors duration-200 no-underline whitespace-nowrap"
            >
              Portfolio
            </Link>
            <Link
              href="/kontakt"
              className="text-[0.55rem] 2xl:text-xs sm:text-[0.6rem] tracking-[0.2em] uppercase font-medium text-[#0a0a08] bg-[#c9a96e] hover:bg-[#d4b580] px-5 py-3 sm:px-7 sm:py-3.5 transition-colors duration-200 no-underline whitespace-nowrap"
            >
              Umów sesję
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
