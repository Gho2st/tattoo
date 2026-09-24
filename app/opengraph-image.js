import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Urszula Wolak, tatuaż realistyczny i mikrorealizm w Krakowie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Obrazek do podglądu linku (Facebook, Messenger, WhatsApp) —
// portale nie obsługują SVG, więc generujemy PNG przy buildzie
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "assets/og-tatuaz.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000000",
          color: "#f0ece3",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c9a96e",
              marginBottom: 24,
            }}
          >
            Kult Tattoo · Kraków
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.05, marginBottom: 24 }}>
            Urszula Wolak
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, color: "#c8c2b8" }}>
            Tatuaż realistyczny, mikrorealizm, kolor i covery
          </div>
        </div>
        <img src={src} width={420} height={630} style={{ objectFit: "cover" }} alt="" />
      </div>
    ),
    size,
  );
}
