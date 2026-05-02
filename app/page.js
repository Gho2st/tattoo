import About from "@/components/homepage/About";
import CTA from "@/components/homepage/CTA";
import Specializations from "@/components/homepage/Faq";
import Gallery from "@/components/homepage/Gallery";
import Hero from "@/components/homepage/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Specializations />
      <Gallery />
      <CTA/>
    </>
  );
}
