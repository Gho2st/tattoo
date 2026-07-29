import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  openGraph: {
    type: "website",
    url: "https://urszulawolak.pl/",
    title:
      "Urszula Wolak - Tatuaż realistyczny | Mikrorealistyczny | Kolorowy | Kraków",
    description:
      "Jeśli szukasz doświadczonej tatuatorki w Krakowie, która łączy artystyczne podejście z techniczną precyzją i potrafi stworzyć kolorowy realistyczny tatuaż lub udany cover – zarpraszam.",
    images: "/opengraph-image.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body
        className="text-primary"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Globalne ziarno / tekstura */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-1 opacity-[0.04] mix-blend-soft-light"
        />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
