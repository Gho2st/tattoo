"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const SLIDES = [
  "/images/hero/1.webp",
  "/images/hero/2.webp",
  "/images/hero/3.webp",
  "/images/hero/4.webp",
  "/images/hero/5.webp",
];

const INTERVAL_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i) => {
    setCurrent(i);
    startTimer(); // reset timera po kliknięciu
  };

  return (
    <section
      className="relative w-full min-h-svh bg-[#0a0a08] flex flex-col overflow-hidden"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
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
            "object-cover object-center transition-opacity duration-1400ms ease-in-out",
            i === current ? "opacity-75" : "opacity-0",
          ].join(" ")}
        />
      ))}

      {/* Gradient — mocniejszy na dole */}
      <div className="absolute inset-0 bg-linear-to-t from-[#0a0a08] via-[#0a0a08]/65 to-[#0a0a08]/10" />

      {/* ── Główna treść — bottom ── */}
      <div className="relative z-10 mt-auto flex flex-col px-5 pb-8 gap-0 sm:px-8 sm:pb-10 lg:px-20 lg:pb-16">
        {/* Eyebrow */}
        <span className="text-[0.65rem] sm:text-[0.65rem] tracking-[0.38em] uppercase text-[#c9a96e] mb-3 animate-[fadeUp_0.8s_ease_0.3s_both]">
          Profesjonalne i indywidualne podejście
        </span>

        {/* Headline */}
        <h1
          className="font-light leading-snug text-[#f0ece3] mt-4 mb-2 animate-[fadeUp_0.9s_ease_0.45s_both] text-2xl sm:text-3xl lg:text-4xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Urszula Wolak <br /> Tatuaż realistyczny i mikrorealizm w Krakowie
        </h1>

        {/* Opis */}
        <p className="text-xs sm:text-base font-light leading-[1.85] text-secondary mb-5 sm:mb-6 max-w-xs animate-[fadeUp_1s_ease_0.58s_both]">
          Tatuaże, które przyciągają wzrok - od dużych projektów po
          mikrotatuaże.
        </p>

        {/* Dots + CTA w jednym wierszu na mobile */}
        <div className="flex items-center justify-between gap-4 animate-[fadeUp_1s_ease_0.68s_both]">
          {/* Slide dots */}
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slajd ${i + 1}`}
                className={[
                  "h-0.5 rounded-full border-none p-0 cursor-pointer bg-[#c9a96e] transition-all duration-350",
                  i === current ? "w-6 opacity-100" : "w-2 opacity-25",
                ].join(" ")}
              />
            ))}
          </div>

          {/* CTA row */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/#portfolio"
              className="text-[0.55rem] sm:text-[0.58rem] tracking-[0.2em] uppercase text-[#f0ece3]/60 border border-[#f0ece3]/25 hover:border-[#f0ece3]/30 px-4 py-3 sm:px-5 transition-colors duration-200 no-underline whitespace-nowrap"
            >
              Portfolio
            </Link>
            <Link
              href="/kontakt"
              className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] uppercase font-medium text-[#0a0a08] bg-[#c9a96e] hover:bg-[#d4b580] px-5 py-3 sm:px-7 sm:py-3.5 transition-colors duration-200 no-underline whitespace-nowrap"
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
