"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ALL_ITEMS = [
  {
    src: "/images/realizm/tatuaz-rekaw-rafa-koralowa-skrzydlica.webp",
    cat: "realizm",
    title: "Kolorowy rękaw z rafą koralową i skrzydlicą",
  },
  {
    src: "/images/realizm/tatuaz-realistyczny-buldog-francuski-lydka.webp",
    cat: "realizm",
    title: "Realistyczny portret buldoga francuskiego na łydce",
  },
  {
    src: "/images/realizm/tatuaz-kolorowa-papuga-akwarela-przedramie.webp",
    cat: "realizm",
    title: "Kolorowa papuga z akwarelowym tłem na przedramieniu",
  },
  {
    src: "/images/realizm/tatuaz-realistyczny-portret-psa-przedramie.webp",
    cat: "realizm",
    title: "Realistyczny portret psa na przedramieniu",
  },
  {
    src: "/images/realizm/tatuaz-portret-wodza-indianskiego-ramie.webp",
    cat: "realizm",
    title: "Portret wodza indiańskiego w pióropuszu na ramieniu",
  },
  {
    src: "/images/realizm/tatuaz-realistyczny-portret-psa-kolor.webp",
    cat: "realizm",
    title: "Kolorowy realistyczny portret psa",
  },
  {
    src: "/images/realizm/tatuaz-dark-fantasy-portret-ogien-udo.webp",
    cat: "realizm",
    title: "Mroczny portret fantasy z ogniem na udzie",
  },
  {
    src: "/images/realizm/tatuaz-papuga-ara-w-locie-lydka.webp",
    cat: "realizm",
    title: "Papuga ara w locie na łydce",
  },
  {
    src: "/images/realizm/tatuaz-wojowniczka-zlota-zbroja-wieniec-laurowy.webp",
    cat: "realizm",
    title: "Wojowniczka w złotej zbroi z wieńcem laurowym na przedramieniu",
  },
  {
    src: "/images/realizm/tatuaz-astronauta-czarno-szary-przedramie.webp",
    cat: "realizm",
    title: "Czarno-szary astronauta na przedramieniu",
  },
  {
    src: "/images/damskie/tatuaz-ryby-bojowniki-akwarela-zebra.webp",
    cat: "damskie",
    title: "Dwie ryby bojowniki w akwareli na żebrach",
  },
  {
    src: "/images/damskie/tatuaz-chabry-lawenda-przedramie.webp",
    cat: "damskie",
    title: "Chabry i lawenda na przedramieniu",
  },
  {
    src: "/images/damskie/tatuaz-zolw-morski-akwarela-noga.webp",
    cat: "damskie",
    title: "Żółw morski w akwareli na nodze",
  },
  {
    src: "/images/damskie/tatuaz-waz-czerwone-maki-biodro.webp",
    cat: "damskie",
    title: "Wąż z czerwonymi makami na biodrze",
  },
  {
    src: "/images/damskie/tatuaz-maliny-z-kwiatem-reka.webp",
    cat: "damskie",
    title: "Maliny z kwiatem na ręce",
  },
  {
    src: "/images/damskie/tatuaz-kolorowy-rekaw-kwiaty.webp",
    cat: "damskie",
    title: "Kolorowy rękaw kwiatowy ze słonecznikiem i makami",
  },
  {
    src: "/images/damskie/tatuaz-polne-kwiaty-mak-chabry-przedramie.webp",
    cat: "damskie",
    title: "Polne kwiaty z makiem, chabrami i truskawką na przedramieniu",
  },
  {
    src: "/images/damskie/tatuaz-jaskolki-czerwone-slonce-lopatka.webp",
    cat: "damskie",
    title: "Dwie jaskółki z czerwonym słońcem na łopatce",
  },
  {
    src: "/images/damskie/tatuaz-portret-kobiety-feniks-udo.webp",
    cat: "damskie",
    title: "Portret kobiety z feniksem na udzie",
  },
  {
    src: "/images/damskie/tatuaz-pin-up-wiedzma-diablica-lydki.webp",
    cat: "damskie",
    title: "Wiedźma i diablica w stylu pin-up na łydkach",
  },
  {
    src: "/images/damskie/tatuaz-wiosenne-kwiaty-narcyz-dzwonki.webp",
    cat: "damskie",
    title: "Wiosenne kwiaty: narcyz, dzwonki i szafirki",
  },
  {
    src: "/images/kreskowki/tatuaz-lola-bunny-kosmiczny-mecz-przedramie.webp",
    cat: "kreskówki",
    title: "Lola Bunny z Kosmicznego meczu na przedramieniu",
  },
  {
    src: "/images/kreskowki/tatuaz-goku-shenron-dragon-ball-lydka.webp",
    cat: "kreskówki",
    title: "Goku i smok Shenron z Dragon Ball na łydce",
  },
  {
    src: "/images/kreskowki/tatuaz-atomowki-powerpuff-girls-reka.webp",
    cat: "kreskówki",
    title: "Atomówki w akwareli na ręce",
  },
  {
    src: "/images/kreskowki/tatuaz-postac-anime-ksiezyc-przedramie.webp",
    cat: "kreskówki",
    title: "Postać anime na tle księżyca na przedramieniu",
  },
  {
    src: "/images/kreskowki/tatuaz-pokemon-mew-minionek-ramie.webp",
    cat: "kreskówki",
    title: "Pokémon Mew i Minionek na ramieniu",
  },
  {
    src: "/images/kreskowki/tatuaz-komiksowa-postac-kolor-przedramie.webp",
    cat: "kreskówki",
    title: "Kolorowa postać komiksowa na przedramieniu",
  },
  {
    src: "/images/kreskowki/tatuaz-szkielet-perkusista-akwarela-przedramie.webp",
    cat: "kreskówki",
    title: "Szkielet grający na perkusji w akwareli na przedramieniu",
  },
  {
    src: "/images/kreskowki/tatuaz-mala-mi-muminki-motyl-piwonia.webp",
    cat: "kreskówki",
    title: "Mała Mi z Muminków z motylem i piwonią",
  },
  {
    src: "/images/kreskowki/tatuaz-wloczykij-mala-mi-muminki-lydka.webp",
    cat: "kreskówki",
    title: "Włóczykij i Mała Mi z Muminków na łydce",
  },
];

const FILTERS = [
  { label: "Wszystkie", value: "all" },
  { label: "Damskie", value: "damskie" },
  { label: "Realizm", value: "realizm" },
  { label: "Kreskówki", value: "kreskówki" },
];

const PAGE_SIZE = 8;

// Te same wartości sizes w siatce i podglądzie — dzięki temu przeglądarka
// ma miniaturę w cache i może ją od razu pokazać jako podkład
const GRID_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
const LIGHTBOX_SIZES = "(max-width: 768px) 92vw, 50vw";

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(null); // zmieniona nazwa dla jasności

  const filtered =
    active === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.cat === active);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleFilter = (val) => {
    setActive(val);
    setVisible(PAGE_SIZE);
    setLightboxIndex(null); // zamknięcie lightboxa przy zmianie filtra
  };

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const count = filtered.length;

  const prev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % count);
  }, [count]);

  // Swipe
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  // Klawiatura
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, next, prev]);

  // Blokada scrolla
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <section
      id="portfolio"
      className=" py-12 sm:py-16 lg:py-20 px-5 lg:px-20 2xl:px-[12%]"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <span className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#c9a96e] mb-3">
            Galeria
          </span>
          <h2
            className="text-3xl sm:text-4xl font-light leading-tight text-[#f0ece3]"
          >
            Portfolio tatuaży
            <em className="block not-italic text-[#f0ece3]/40 text-2xl sm:text-3xl">
              Moje prace
            </em>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handleFilter(value)}
              className={`px-5 py-2 text-xs tracking-widest uppercase rounded-full border transition-all duration-200 whitespace-nowrap ${
                active === value
                  ? "bg-[#c9a96e] text-[#000000] border-[#c9a96e]"
                  : "border-[#c9a96e]/30 text-[#f0ece3]/60 hover:border-[#c9a96e]/60 hover:text-[#f0ece3]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[3px]">
        {shown.map((item, i) => (
          <button
            key={item.src}
            onClick={() => openLightbox(i)}
            aria-label={`Powiększ: ${item.title}`}
            className="relative aspect-square overflow-hidden group cursor-pointer bg-black"
          >
            <Image
              src={item.src}
              alt={`Tatuaż: ${item.title}. Urszula Wolak, Kraków`}
              fill
              sizes={GRID_SIZES}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="absolute bottom-3 left-3 right-3 flex justify-between opacity-0 group-hover:opacity-100 transition-all">
              <span className="text-xs uppercase tracking-widest text-white/70">
                {item.cat}
              </span>
              <span className="text-lg font-light text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="w-full mt-8 border border-[#c9a96e]/20 hover:border-[#c9a96e]/40 py-4 text-xs tracking-widest uppercase text-[#f0ece3]/60 hover:text-[#f0ece3]"
        >
          Zobacz więcej prac
        </button>
      )}

      {/* Instagram */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <a
          href="https://www.instagram.com/wolakurszula/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-[#c9a96e]/60 hover:text-[#c9a96e]"
        >
          Więcej na Instagramie →
        </a>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeLightbox}
            aria-label="Zamknij podgląd"
            className="absolute top-6 right-6 text-4xl text-white/60 hover:text-white z-10"
          >
            ✕
          </button>

          {/* Poprzednie */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-4"
          >
            <ChevronLeft
              size={36}
              className="text-white/60 hover:text-white transition-colors"
            />
          </button>

          {/* Zdjęcie z paddingiem na dole */}
          <div
            className="relative max-w-[92vw] max-h-[85vh] w-full h-full pb-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Podkład: miniatura z siatki, widoczna od razu */}
            <Image
              key={`thumb-${filtered[lightboxIndex].src}`}
              src={filtered[lightboxIndex].src}
              alt=""
              aria-hidden="true"
              fill
              sizes={GRID_SIZES}
              className="object-contain blur-sm"
            />
            <Image
              key={filtered[lightboxIndex].src}
              src={filtered[lightboxIndex].src}
              alt={`Tatuaż: ${filtered[lightboxIndex].title}. Urszula Wolak, Kraków`}
              fill
              sizes={LIGHTBOX_SIZES}
              className="object-contain"
              priority
            />
          </div>

          {/* Wczytanie sąsiednich zdjęć w tle, żeby przewijanie było płynne */}
          <div className="hidden" aria-hidden="true">
            {[-1, 1].map((offset) => {
              const item = filtered[(lightboxIndex + offset + count) % count];
              return (
                <Image
                  key={`preload-${item.src}`}
                  src={item.src}
                  alt=""
                  width={1000}
                  height={1000}
                  sizes={LIGHTBOX_SIZES}
                  loading="eager"
                />
              );
            })}
          </div>

          {/* Następne */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Następne zdjęcie"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-4"
          >
            <ChevronRight
              size={36}
              className="text-white/60 hover:text-white transition-colors"
            />
          </button>

          {/* Podpis na dole - teraz z tłem i lepszym odstępem */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-3 rounded-2xl text-center border border-white/10">
            <span className="uppercase tracking-widest text-[#c9a96e] text-sm block">
              {filtered[lightboxIndex].cat}
            </span>
            <span className="block text-xs text-white/50 mt-1">
              {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {String(filtered.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
