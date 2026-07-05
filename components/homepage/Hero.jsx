"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  "/images/hero/1.webp",
  "/images/hero/2.webp",
  "/images/hero/3.webp",
  "/images/hero/4.webp",
];

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD = 50;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  // Timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
      }, INTERVAL_MS);
    }
  }, [isPaused]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Pauza przy najechaniu myszką (lepsze UX)
  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);

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

  /* ── Swipe ── */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full min-h-svh bg-[#0a0a08] flex flex-col overflow-hidden"
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Urszula Wolak - tatuaż realistyczny ${i + 1}`}
          fill
          priority={i === 0}
          loading={i === 0 ? "eager" : "lazy"}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ease-out ${
            i === current ? "opacity-80" : "opacity-0"
          }`}
          quality={92}
        />
      ))}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08] via-[#0a0a08]/60 to-transparent" />

      {/* Strzałki */}
      <button
        onClick={prev}
        aria-label="Poprzedni slajd"
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 border border-[#f0ece3]/20 hover:border-[#c9a96e] text-[#f0ece3]/40 hover:text-[#c9a96e] rounded-full transition-all duration-300 group"
      >
        <ChevronLeft
          size={20}
          strokeWidth={2}
          className="transition-transform group-hover:-translate-x-0.5"
        />
      </button>

      <button
        onClick={next}
        aria-label="Następny slajd"
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 border border-[#f0ece3]/20 hover:border-[#c9a96e] text-[#f0ece3]/40 hover:text-[#c9a96e] rounded-full transition-all duration-300 group"
      >
        <ChevronRight
          size={20}
          strokeWidth={2}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>

      {/* Treść */}
      <div className="relative z-10 mt-auto flex flex-col px-5 pb-10 sm:px-8 sm:pb-12 lg:px-20 lg:pb-20 2xl:pb-32">
        <span className="text-[0.7rem] tracking-[0.4em] uppercase text-[#c9a96e] mb-4">
          Profesjonalne tatuaże w Krakowie
        </span>

        <h1
          className="font-light leading-[1.05] text-[#f0ece3] text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Urszula Wolak
          <br />
          <span className="text-[#f0ece3]/80">
            {" "}
            Tatuaż realistyczny i mikrorealizm
          </span>
        </h1>

        <p className="max-w-md text-base sm:text-lg text-[#f0ece3]/70 mb-8">
          Indywidualne projekty • Realizm • Mikrorealizm • Kolor • Covery
        </p>

        {/* Dots + CTA */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Kropki */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Idź do slajdu ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-10 bg-[#c9a96e]"
                    : "w-5 bg-[#f0ece3]/30 hover:bg-[#f0ece3]/50"
                }`}
              />
            ))}
          </div>

          {/* Przyciski */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/#portfolio"
              className="text-center px-6 py-3.5 text-sm tracking-widest border border-[#f0ece3]/30 hover:border-[#f0ece3]/50 text-[#f0ece3]/80 hover:text-white transition-all"
            >
              Zobacz portfolio
            </Link>
            <Link
              href="/kontakt"
              className="text-center px-7 py-3.5 text-sm tracking-widest font-medium bg-[#c9a96e] hover:bg-[#d4b580] text-[#0a0a08] transition-all"
            >
              Umów sesję
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
