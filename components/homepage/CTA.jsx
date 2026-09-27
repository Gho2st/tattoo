import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  return (
    <section className=" border-t border-[#c9a96e]/10 px-5 py-20 sm:px-8 sm:py-24 lg:px-20 lg:py-32 2xl:px-[12%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Lewa kolumna */}
        <div className="flex flex-col">
          <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-8">
            Umów sesję
          </span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-none text-[#f0ece3] m-0 mb-6"
          >
            Umów sesję tatuażu
            <em className="block not-italic text-[#f0ece3]/40">w Krakowie</em>
          </h2>

          <p className="text-sm 2xl:text-base font-light leading-relaxed text-secondary max-w-md mb-8">
            Napisz i opowiedz o swoim pomyśle, miejscu na ciele i
            inspiracjach. Odpowiem w ciągu 48 godzin.
          </p>

          {/* Węższa sekcja bezpłatnej konsultacji */}
          <div className="inline-flex items-center gap-3 bg-[#c9a96e]/5 border border-[#c9a96e]/20 rounded-2xl px-5 py-3.5 mb-9 max-w-xs">
            <div className="w-7 h-7 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center text-lg flex-shrink-0">
              💬
            </div>
            <div className="text-sm">
              <span className="uppercase tracking-widest text-[#c9a96e] text-xs font-medium block">
                BEZPŁATNA KONSULTACJA
              </span>
              <span className="text-[#f0ece3]/80">
                Każda konsultacja jest darmowa
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/kontakt"
              className="text-xs font-medium tracking-widest uppercase text-[#000000] bg-[#c9a96e] hover:bg-[#d4b580] px-8 py-4 transition-colors duration-200 no-underline w-full sm:w-auto text-center"
            >
              Wypełnij formularz
            </Link>
            <a
              href="https://www.instagram.com/wolakurszula/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-xs font-medium tracking-widest uppercase text-[#c9a96e] border border-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#000000] px-8 py-4 no-underline transition-colors duration-200 w-full sm:w-auto"
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Napisz na Instagramie
            </a>
          </div>
        </div>

        {/* Prawa kolumna - zdjęcie */}
        <div className="relative h-72 sm:h-96 lg:h-[420px] overflow-hidden rounded-3xl">
          <Image
            src="/images/realizm/tatuaz-rekaw-rafa-koralowa-skrzydlica.webp"
            alt="Kolorowy tatuaż rękaw z rafą koralową i skrzydlicą. Urszula Wolak, Kraków"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-[#000000] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 to-transparent" />

          <div className="absolute top-8 left-8 right-8 sm:right-12">
            <p
              className="text-lg sm:text-xl font-light leading-snug text-[#f0ece3]/70"
            >
              „Każdy tatuaż to osobna historia. Zacznijmy pisać Twoją.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
