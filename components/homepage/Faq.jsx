"use client";

import { useState } from "react";

const items = [
  {
    num: "01",
    question: "Czy tatuaż może łączyć różne style?",
    answer:
      "Zdecydowanie — to jedna z rzeczy, które lubię najbardziej. Swobodnie łączę elementy graficzne, realistyczne, ornamentalne i ilustracyjne, tworząc autorskie kompozycje dopasowane dokładnie do Ciebie. Każdy projekt jest inny, bo każdy człowiek jest inny.",
  },
  {
    num: "02",
    question: "Jak wygląda tatuaż realistyczny w kolorze?",
    answer:
      "To styl, który wymaga dużej precyzji i znajomości barwy. Łączę malarskie wyczucie z techniczną dokładnością — dbam o to, żeby kolor zachował głębię, nasycenie i czytelność również po wygojeniu. Zależy mi na naturalnych efektach i dynamicznych kontrastach.",
  },
  {
    num: "03",
    question: "Na czym polega cover tatuażu?",
    answer:
      "Cover to zakrycie starego lub nieudanego tatuażu nowym projektem — tak, żeby całość wyglądała spójnie i naturalnie. Doradztwo, projektowanie i wykonanie traktuję jako jeden proces. Dobry cover nie tylko maskuje — nadaje temu miejscu na skórze zupełnie nowy charakter.",
  },
];

export default function Specializations() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section
      className="bg-[#0a0a08] px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      id="faq"
    >
      {/* Eyebrow */}
      <span className="flex items-center gap-3 text-[0.48rem] sm:text-[0.5rem] tracking-[0.38em] uppercase text-[#c9a96e] mb-7">
        <span className="block w-6 h-px bg-[#c9a96e]" />
        Specjalizacje
      </span>

      {/* Heading */}
      <h2
        className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] font-light leading-[1.04] text-[#f0ece3] m-0 mb-10 sm:mb-12"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Czym się
        <em className="block italic text-[#f0ece3]/42">zajmuję?</em>
      </h2>

      {/* Accordion */}
      <div>
        {items.map(({ num, question, answer }, i) => (
          <div
            key={num}
            className="border-t border-[#c9a96e]/12 last:border-b last:border-b-[#c9a96e]/12"
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between gap-3 py-5 sm:py-6 bg-transparent border-none cursor-pointer text-left group"
            >
              {/* Numer + pytanie */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <span className="text-[0.46rem] tracking-[0.22em] text-[#c9a96e]/45 tabular-nums flex-shrink-0">
                  {num}
                </span>
                <span
                  className={[
                    "text-[1.15rem] sm:text-[1.35rem] lg:text-[1.5rem] font-light leading-snug transition-colors duration-200",
                    open === i
                      ? "text-[#f0ece3]"
                      : "text-[#f0ece3]/75 group-hover:text-[#f0ece3]",
                  ].join(" ")}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {question}
                </span>
              </div>

              {/* +/- ikona */}
              <div className="relative w-5 h-5 flex-shrink-0">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-3 h-px bg-[#c9a96e]" />
                <span
                  className={[
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-px h-3 bg-[#c9a96e] transition-all duration-300",
                    open === i ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
                  ].join(" ")}
                />
              </div>
            </button>

            {/* Odpowiedź */}
            <div
              className={[
                "overflow-hidden transition-all duration-400 ease-in-out",
                open === i ? "max-h-[400px]" : "max-h-0",
              ].join(" ")}
            >
              <p className="text-xs sm:text-base font-light leading-[1.9] text-[#f0ece3]/42 pb-6 sm:pb-7 pl-[2.1rem] sm:pl-[2.4rem] m-0">
                {answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
