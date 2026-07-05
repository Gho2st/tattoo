import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="bg-primary border-t border-[#c9a96e]/10 px-5 py-20 sm:px-8 sm:py-24 lg:px-20 lg:py-32 2xl:px-[12%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Lewa kolumna */}
        <div className="flex flex-col">
          <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-8">
            <span className="block w-6 h-px bg-[#c9a96e]" />
            Umów sesję
          </span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-none text-[#f0ece3] m-0 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Umów sesję tatuażu
            <em className="block italic text-[#f0ece3]/40"> w Krakowie</em>
          </h2>

          <p className="text-sm 2xl:text-base font-light leading-relaxed text-secondary max-w-md mb-8">
            Napisz — opowiedz o swoim pomyśle, miejscu na ciele i
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

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/kontakt"
              className="text-xs font-medium tracking-widest uppercase text-[#0a0a08] bg-[#c9a96e] hover:bg-[#d4b580] px-8 py-4 transition-colors duration-200 no-underline w-full sm:w-auto text-center"
            >
              Wypełnij formularz
            </Link>
            <a
              href="https://www.instagram.com/wolakurszula/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#f0ece3]/70 hover:text-[#f0ece3]/70 no-underline transition-colors duration-200 group w-full sm:w-auto justify-center sm:justify-start py-4 sm:py-0"
            >
              <span className="block w-5 h-px bg-current transition-all duration-300 group-hover:w-8" />
              Napisz na Instagram
            </a>
          </div>
        </div>

        {/* Prawa kolumna - zdjęcie */}
        <div className="relative h-72 sm:h-96 lg:h-[420px] overflow-hidden rounded-3xl">
          <Image
            src="/images/realizm/1.webp"
            alt="Tatuaż Urszula Wolak"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a08] via-transparent to-[#0a0a08] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/70 to-transparent" />

          <div className="absolute top-8 left-8 right-8 sm:right-12">
            <span className="block w-5 h-px bg-[#c9a96e] mb-4" />
            <p
              className="text-lg sm:text-xl font-light italic leading-snug text-[#f0ece3]/70"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "Każdy tatuaż to osobna historia — zacznijmy pisać Twoją."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
