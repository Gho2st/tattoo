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
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
