import About from "@/components/homepage/About";
import CTA from "@/components/homepage/CTA";
import Specializations from "@/components/homepage/Faq";
import Gallery from "@/components/homepage/Gallery";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "Urszula Wolak - Tatuaż realistyczny | Mikrorealistyczny | Kolorowy",
  description:
    "Urszula Wolak — tatuażystka w Krakowie. Specjalizacja: realizm kolorowy i covery. Umów konsultację online.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Specializations />
      <Gallery />
      <CTA />
    </>
  );
}
