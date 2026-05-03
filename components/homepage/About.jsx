import Link from "next/link";
import Image from "next/image";

const tags = ["Kolor realistyczny", "Covery", "Szarości", "Kompozycja"];

const stats = [
  { num: "8", suffix: "+", label: "lat doświadczenia" },
  { num: "500", suffix: "+", label: "wykonanych prac" },
];

export default function About() {
  return (
    <section
      id="o-mnie"
      className="bg-primary px-5 py-16 flex flex-col gap-12 sm:px-8 sm:py-20 lg:px-20 lg:py-28"
    >
      {/* ── Top: zdjęcie + tekst ── */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
        {/* Zdjęcie — mobile full width, desktop ~połowa */}
        <div className="relative w-full lg:w-[45%] lg:shrink-0">
          <div className="relative w-full aspect-4/5 overflow-hidden">
            <Image
              src="/images/ula.png"
              alt="Urszula Wolak — tatuażystka Kraków"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>

          {/* Badge na zdjęciu */}
          <div className="absolute bottom-4 right-4 bg-[#0a0a08]/88 border border-[#c9a96e]/25 px-3.5 py-2.5 sm:bottom-5 sm:right-5">
            <span className="block text-xs tracking-wide uppercase text-[#c9a96e] mb-1">
              Kult Tattoo
            </span>
            <span className="block text-[1.5rem] font-light leading-none text-primary">
              Kraków
            </span>
          </div>
        </div>

        {/* Tekst */}
        <div className="flex flex-col gap-5 lg:pt-2">
          {/* Eyebrow */}
          <span className="flex items-center gap-3 text-xs tracking-wide uppercase text-[#c9a96e]">
            <span className="block w-6 h-px bg-[#c9a96e]" />O mnie
          </span>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-6xl font-light leading-[1.02] text-[#f0ece3] m-0"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Cześć, jestem
            <em className="block italic text-[#f0ece3]/42">Ula</em>
          </h2>

          {/* Opis */}
          <p className="text-xs sm:text-base font-light leading-[1.9] text-secondary m-0">
            Jestem tatuażystką w Kult Tattoo w Krakowie. Studiowałam
            projektowanie wnętrz i przestrzeni — to wykształcenie daje mi
            solidne podstawy w kompozycji, proporcjach i harmonii, które
            przenoszę bezpośrednio na skórę.
          </p>
          <p className="text-xs sm:text-base font-light leading-[1.9] text-secondary m-0">
            Regularnie uczestniczę w seminariach i szkoleniach, bo ciągły rozwój
            to dla mnie podstawa. Pracuję w kolorze i szarościach — chętnie
            łączę różne inspiracje w jeden spójny, przemyślany projekt.
          </p>

          {/* Tagi specjalizacji */}
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.48rem] tracking-[0.2em] uppercase text-[#c9a96e]/65 border border-[#c9a96e]/18 px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA link */}
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-3 mt-2 text-xs  tracking-[0.26em] uppercase text-seocondary hover:text-[#f0ece3] no-underline transition-colors duration-200 group"
          >
            <span className="block w-8 h-px bg-[#c9a96e] transition-all duration-300 group-hover:w-12" />
            Zobacz portfolio
          </Link>
        </div>
      </div>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-2 gap-px bg-[#c9a96e]/12 border border-[#c9a96e]/12">
        {stats.map(({ num, suffix, label }) => (
          <div
            key={label}
            className="bg-[#0a0a08] px-4 py-5 sm:px-6 sm:py-6 flex flex-col gap-1.5"
          >
            <span
              className="text-xl sm:text-4xl font-light leading-none text-primary"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {num}
              {suffix && (
                <span className="text-base sm:text-lg text-[#c9a96e]">
                  {suffix}
                </span>
              )}
            </span>
            <span className="text-[0.48rem] sm:text-[0.5rem] tracking-[0.22em] uppercase text-[#f0ece3]/28">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
