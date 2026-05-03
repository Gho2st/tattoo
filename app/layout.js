import Navbar from "@/components/Nav";
import "./globals.css";
import Footer from "@/components/Footer";

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
