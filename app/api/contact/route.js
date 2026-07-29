import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAIL_USER = process.env.NODEMAILER_EMAIL;
const MAIL_PASS = process.env.NODEMAILER_PW;
const MAX_TOTAL_ATTACHMENTS = 4.5 * 1024 * 1024; // 4.5 MB łącznie
const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
];

// === ESCAPE HTML (chroni szablon przed wstrzyknięciem znaczników) ===
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// === WALIDACJA PÓL ===
function validateFields(fields) {
  return Object.entries(fields).every(
    ([, value]) => value && value.toString().trim() !== "",
  );
}

// === File z FormData -> załącznik Nodemailera ===
async function fileToAttachment(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    filename: file.name,
    content: buffer,
    contentType: file.type || "application/octet-stream",
  };
}

// === SZABLON E-MAILA ===
function createEmailTemplate({
  name,
  contact,
  bodyPart,
  size,
  isCover,
  timing,
  description,
  attachments,
}) {
  const row = (label, value) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; width: 140px; font-size: 13px;">${label}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${value}</td>
    </tr>`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; color: #1a1a1a;">
      <h2 style="border-bottom: 2px solid #c9a96e; padding-bottom: 8px; color: #0a0a08;">
        Nowe zapytanie — Urszula Wolak Tattoo
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        ${row("Imię", escapeHtml(name))}
        ${row("Kontakt", escapeHtml(contact))}
        ${row("Miejsce na ciele", escapeHtml(bodyPart))}
        ${row("Rozmiar", escapeHtml(size) || "—")}
        ${row("Cover?", isCover === "true" ? "Tak" : "Nie")}
        ${row("Preferowany termin", escapeHtml(timing) || "—")}
        ${
          attachments.length > 0
            ? row(
                "Załączniki",
                attachments.map((a) => escapeHtml(a.filename)).join(", "),
              )
            : ""
        }
      </table>

      ${
        description
          ? `
        <div style="margin-top: 20px;">
          <p style="color: #888; font-size: 13px; margin-bottom: 6px;">Opis projektu</p>
          <p style="font-size: 14px; line-height: 1.7; background: #f9f9f9; padding: 12px; border-left: 3px solid #c9a96e;">${escapeHtml(
            description,
          ).replace(/\n/g, "<br>")}</p>
        </div>`
          : ""
      }

      <p style="margin-top: 24px; font-size: 12px; color: #aaa;">
        Wiadomość wysłana przez formularz na wolaktattoo.pl
      </p>
    </div>
  `;
}

// === GŁÓWNA FUNKCJA POST ===
export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const contact = formData.get("contact");
    const bodyPart = formData.get("bodyPart");
    const size = formData.get("size");
    const isCover = formData.get("isCover");
    const description = formData.get("description");
    const timing = formData.get("timing");

    // === 1. Walidacja pól wymaganych ===
    if (!validateFields({ name, contact, bodyPart })) {
      return NextResponse.json(
        { message: "Uzupełnij wymagane pola." },
        { status: 400 },
      );
    }

    // === 2. Zbieranie załączników ===
    const files = [];
    const coverPhoto = formData.get("coverPhoto");
    if (coverPhoto instanceof File && coverPhoto.size > 0)
      files.push(coverPhoto);

    for (const file of formData.getAll("inspirations")) {
      if (file instanceof File && file.size > 0) files.push(file);
    }

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_ATTACHMENTS) {
      return NextResponse.json(
        { message: "Załączniki są za duże (maks. 4,5 MB łącznie)." },
        { status: 413 },
      );
    }

    const badType = files.find((f) => f.type && !ALLOWED_MIME.includes(f.type));
    if (badType) {
      return NextResponse.json(
        { message: "Dozwolone są tylko zdjęcia (JPG, PNG, WEBP, GIF, HEIC)." },
        { status: 415 },
      );
    }

    const attachments = await Promise.all(files.map(fileToAttachment));

    // === 3. Konfiguracja Nodemailer ===
    if (!MAIL_USER || !MAIL_PASS) {
      console.error("❌ Brak NODEMAILER_EMAIL / NODEMAILER_PW w środowisku");
      return NextResponse.json(
        { message: "Błąd konfiguracji serwera. Napisz na Instagram." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
      connectionTimeout: 10000,
      socketTimeout: 20000,
    });

    // === 4. Test połączenia SMTP ===
    try {
      await transporter.verify();
      console.log("✅ SMTP działa – gotowy do wysyłki");
    } catch (verifyError) {
      console.error("❌ Błąd połączenia SMTP:", verifyError.message);
      return NextResponse.json(
        { message: "Błąd serwera pocztowego. Spróbuj później." },
        { status: 500 },
      );
    }

    // === 5. Opcje e-maila ===
    const mailOptions = {
      from: `"Urszula Wolak Tattoo" <${MAIL_USER}>`,
      replyTo: contact.includes("@") ? contact : undefined,
      to: "dominik.jojczyk@gmail.com",
      subject: `Nowe zapytanie od ${name} — ${bodyPart}`,
      html: createEmailTemplate({
        name,
        contact,
        bodyPart,
        size,
        isCover,
        timing,
        description,
        attachments,
      }),
      attachments,
    };

    // === 6. Wysyłka ===
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Wiadomość wysłana prawidłowo!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Błąd API /contact:", error.message || error);
    return NextResponse.json(
      {
        message:
          "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na Instagram.",
        error: error.message || "Nieznany błąd",
      },
      { status: 500 },
    );
  }
}
