import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  return (
    <section
      className="bg-[#0a0a08] border-t border-[#c9a96e]/10 px-5 py-20 sm:px-8 sm:py-24 lg:px-20 lg:py-32"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── Lewa: tekst + CTA ── */}
        <div className="flex flex-col">
          <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-8">
            <span className="block w-6 h-px bg-[#c9a96e]" />
            Umów sesję
          </span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-none text-[#f0ece3] m-0 mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Masz pomysł?
            <em className="block italic text-[#f0ece3]/40">Porozmawiajmy</em>
          </h2>

          <p className="text-sm font-light leading-relaxed text-[#f0ece3]/38 max-w-md mb-10">
            Napisz do mnie — opowiedz o swoim pomyśle, miejscu na ciele i
            inspiracjach. Odpowiem w ciągu 48 godzin.
          </p>

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
              className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#f0ece3]/40 hover:text-[#f0ece3]/70 no-underline transition-colors duration-200 group w-full sm:w-auto justify-center sm:justify-start py-4 sm:py-0"
            >
              <span className="block w-5 h-px bg-current transition-all duration-300 group-hover:w-8" />
              Napisz na Instagram
            </a>
          </div>
        </div>

        {/* ── Prawa: zdjęcie + dekoracje ── */}
        <div className="relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
          {/* 🖼️ Podmień na dowolne zdjęcie z portfolio — np. /images/realizm/1.webp */}
          <Image
            src="/images/realizm/1.webp"
            alt="Tatuaż Urszula Wolak"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center opacity-55"
          />

          {/* Gradient — wtapia w tło z lewej i prawej */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a08] via-transparent to-[#0a0a08] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a08]/60 to-transparent" />

          {/* Cytat */}
          <div className="absolute top-6 left-6 right-20">
            <span className="block w-5 h-px bg-[#c9a96e] mb-3" />
            <p
              className="text-lg sm:text-xl font-light italic leading-snug text-[#f0ece3]/60"
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
