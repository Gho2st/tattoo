"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Start", href: "/" },
  { label: "O mnie", href: "/#o-mnie" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "FAQ", href: "/#faq" },
  { label: "Kontakt", href: "/kontakt" },
];

const serif = { fontFamily: "'Cormorant Garamond', serif" };

/* ── Przycisk CTA (używany w dwóch miejscach) ── */
function CtaButton({ className, onClick }) {
  return (
    <Link
      href="/kontakt"
      onClick={onClick}
      className={cn(
        "font-medium tracking-[0.26em] uppercase no-underline",
        "bg-[#c9a96e] hover:bg-[#d4b580] text-[#0a0a08]",
        "transition-colors duration-200",
        className,
      )}
    >
      Umów sesję
    </Link>
  );
}

/* ── Hamburger ── */
function Hamburger({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Zamknij menu" : "Otwórz menu"}
      className="flex lg:hidden flex-col justify-center gap-[5px] w-9 h-9 -mr-1 bg-transparent border-none cursor-pointer p-1"
    >
      <span
        className={cn(
          "block h-px bg-[#f0ece3] origin-center transition-all duration-300",
          open ? "w-5 translate-y-[6px] rotate-45" : "w-5",
        )}
      />
      <span
        className={cn(
          "block h-px bg-[#f0ece3] transition-all duration-300",
          open ? "w-0 opacity-0" : "w-5 opacity-100",
        )}
      />
      <span
        className={cn(
          "block h-px bg-[#f0ece3] origin-center transition-all duration-300",
          open ? "w-5 -translate-y-[6px] -rotate-45" : "w-3.5",
        )}
      />
    </button>
  );
}

/* ── Menu mobilne ── */
function MobileMenu({ open, onClose }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 lg:hidden flex flex-col items-center justify-center",
        "bg-[#0a0a08] transition-opacity duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      <nav className="w-full">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              "flex items-center justify-between w-full px-8 sm:px-12 py-4 sm:py-5",
              "border-b border-[#c9a96e]/12 no-underline group transition-all duration-200",
              i === 0 && "border-t border-t-[#c9a96e]/12",
            )}
          >
            <div className="flex items-baseline gap-4">
              <span className="text-xs tracking-[0.25em] text-[#c9a96e]/40 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-xl font-light tracking-wide text-[#f0ece3]/75 group-hover:text-[#f0ece3] transition-colors duration-200"
                style={serif}
              >
                {link.label}
              </span>
            </div>

            <svg
              className="w-4 h-4 text-[#c9a96e]/30 group-hover:text-[#c9a96e] group-hover:translate-x-1 transition-all duration-200"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        ))}
      </nav>

      <div className="w-full px-8 sm:px-12 mt-8 flex items-center justify-between">
        <a
          href="https://www.instagram.com/wolakurszula/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.52rem] tracking-[0.28em] uppercase text-[#6b6560] hover:text-[#c9a96e] transition-colors duration-200 no-underline"
        >
          @wolakurszula
        </a>
        <CtaButton onClick={onClose} className="text-[0.58rem] px-7 py-3.5" />
      </div>
    </div>
  );
}

/* ── Navbar ── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between",
          "px-5 sm:px-8 lg:px-12 transition-all duration-300",
          scrolled
            ? "h-14 sm:h-16 bg-[#0a0a08]/96 backdrop-blur-md border-b border-[#c9a96e]/15"
            : "h-16 sm:h-20 bg-transparent",
        )}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0 no-underline" onClick={close}>
          <Image
            src="/images/logo/logo.png"
            alt="Urszula Wolak Tattoo"
            width={72}
            height={72}
            className={cn(
              "object-contain transition-all duration-300",
              scrolled
                ? "w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12"
                : "w-11 h-11 sm:w-13 sm:h-13 lg:w-[68px] lg:h-[68px]",
            )}
            priority
          />
        </Link>

        {/* Linki desktop */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-10 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-xs 2xl:text-sm tracking-[0.22em] uppercase text-white/80 hover:text-[#f0ece3] transition-colors duration-200 no-underline"
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#c9a96e] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="w-px h-6 bg-[#c9a96e]/20" />
          <CtaButton className="text-[0.58rem] 2xl:text-xs px-5 py-2.5 hover:-translate-y-px" />
        </div>

        <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
      </nav>

      <MobileMenu open={menuOpen} onClose={close} />
    </>
  );
}
