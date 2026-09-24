import Link from "next/link";
import Image from "next/image";

const tags = ["Kolor realistyczny", "Covery", "Szarości", "Kompozycja"];

export default function About() {
  return (
    <section
      id="o-mnie"
      className=" px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-28 2xl:px-[12%]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Główna zawartość */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Zdjęcie */}
          <div className="lg:w-5/12 relative flex-shrink-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/urszula-wolak-tatuazystka-krakow.png"
                alt="Urszula Wolak, tatuażystka z Krakowa"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Badge */}
            <a
              href="https://kulttattoo.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 bg-[#000000]/95 border border-[#c9a96e]/30 hover:border-[#c9a96e]/60 rounded-2xl px-6 py-4 no-underline transition-colors group"
            >
              <span className="block text-xs tracking-widest uppercase text-[#c9a96e]">
                Kult Tattoo
              </span>
              <span className="block text-2xl font-light text-[#f0ece3] group-hover:text-[#c9a96e] transition-colors">
                Kraków
              </span>
            </a>
          </div>

          {/* Tekst + info */}
          <div className="flex-1 flex flex-col">
            <span className="flex items-center gap-3 text-xs tracking-[0.38em] uppercase text-[#c9a96e] mb-6">
              O mnie
            </span>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-light leading-none text-[#f0ece3] mb-8"
            >
              O mnie
              <em className="block not-italic text-[#f0ece3]/42">
                Tatuażystka z Kult Tattoo Kraków
              </em>
            </h2>

            <p className="text-sm sm:text-base font-light leading-[1.85] text-secondary mb-6">
              Jestem tatuażystką w{" "}
              <a
                href="https://kulttattoo.pl/artysci/urszulawolak/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a96e] hover:text-white underline underline-offset-2 decoration-[#c9a96e]/40 hover:decoration-white transition-colors"
              >
                Kult Tattoo
              </a>{" "}
              w Krakowie. Studiowałam projektowanie wnętrz i przestrzeni. To
              wykształcenie daje mi solidne podstawy w kompozycji, proporcjach i
              harmonii, które przenoszę bezpośrednio na skórę.
            </p>

            <p className="text-sm sm:text-base font-light leading-[1.85] text-secondary mb-8">
              Regularnie uczestniczę w seminariach i szkoleniach, bo ciągły
              rozwój to dla mnie podstawa. Pracuję w kolorze i szarościach.
              Chętnie łączę różne inspiracje w jeden spójny, przemyślany
              projekt.
            </p>

            {/* Tagi */}
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs tracking-widest uppercase border border-[#c9a96e]/25 hover:border-[#c9a96e]/50 px-4 py-2 text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#c9a96e] hover:text-white transition-colors group"
            >
              ZOBACZ PORTFOLIO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
