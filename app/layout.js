import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://wolaktattoo.pl"),
  title: "Urszula Wolak | Tatuaż realistyczny i mikrorealizm | Kraków",
  description:
    "Urszula Wolak: tatuaże realistyczne, mikrorealizm, kolor i covery w Krakowie. Pracownia Kult Tattoo.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Urszula Wolak Tattoo",
    url: "https://wolaktattoo.pl/",
    title:
      "Urszula Wolak | Tatuaż realistyczny | Mikrorealistyczny | Kolorowy | Kraków",
    description:
      "Jeśli szukasz doświadczonej tatuatorki w Krakowie, która łączy artystyczne podejście z techniczną precyzją i potrafi stworzyć kolorowy realistyczny tatuaż lub udany cover, zapraszam.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`${inter.className} text-primary`}>
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
