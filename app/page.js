import About from "@/components/homepage/About";
import CTA from "@/components/homepage/CTA";
import Specializations from "@/components/homepage/Faq";
import Gallery from "@/components/homepage/Gallery";
import Hero from "@/components/homepage/Hero";

export const metadata = {
  title: "Urszula Wolak — Tatuaż realistyczny i mikrorealizm | Kraków",
  description:
    "Urszula Wolak — tatuaże realistyczne, mikrorealizm i covery w Krakowie. Pracownia Kult Tattoo. Autorskie kompozycje. Umów sesję.",
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
