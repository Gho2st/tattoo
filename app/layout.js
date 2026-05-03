import Navbar from "@/components/Nav";
import "./globals.css";
import Footer from "@/components/Footer";

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
        className="bg-primary text-primary"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
