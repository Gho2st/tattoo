"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_EMAIL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

// Zamienia File z FormData na { filename, content } wymagane przez Resend
async function fileToAttachment(file) {
  const buffer = await file.arrayBuffer();
  return {
    filename: file.name,
    content: Buffer.from(buffer),
  };
}

export async function sendContactEmail(formData) {
  const name = formData.get("name");
  const contact = formData.get("contact");
  const bodyPart = formData.get("bodyPart");
  const size = formData.get("size");
  const isCover = formData.get("isCover");
  const description = formData.get("description");
  const timing = formData.get("timing");

  // Walidacja
  if (!name || !contact || !bodyPart) {
    return { success: false, error: "Uzupełnij wymagane pola." };
  }

  // Zbierz załączniki
  const attachments = [];

  const coverPhoto = formData.get("coverPhoto");
  if (coverPhoto instanceof File && coverPhoto.size > 0) {
    attachments.push(await fileToAttachment(coverPhoto));
  }

  // getAll bo inspirations to multiple
  const inspirations = formData.getAll("inspirations");
  for (const file of inspirations) {
    if (file instanceof File && file.size > 0) {
      attachments.push(await fileToAttachment(file));
    }
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; color: #1a1a1a;">
      <h2 style="border-bottom: 2px solid #c9a96e; padding-bottom: 8px; color: #0a0a08;">
        Nowe zapytanie — Urszula Wolak Tattoo
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; width: 140px; font-size: 13px;">Imię</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Kontakt</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${contact}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Miejsce na ciele</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${bodyPart}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Rozmiar</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${size || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Cover?</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${isCover === "true" ? "Tak" : "Nie"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Preferowany termin</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${timing || "—"}</td>
        </tr>
        ${
          attachments.length > 0
            ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 13px;">Załączniki</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${attachments.map((a) => a.filename).join(", ")}</td>
        </tr>`
            : ""
        }
      </table>

      ${
        description
          ? `
        <div style="margin-top: 20px;">
          <p style="color: #888; font-size: 13px; margin-bottom: 6px;">Opis projektu</p>
          <p style="font-size: 14px; line-height: 1.7; background: #f9f9f9; padding: 12px; border-left: 3px solid #c9a96e;">${description}</p>
        </div>
      `
          : ""
      }

      <p style="margin-top: 24px; font-size: 12px; color: #aaa;">
        Wiadomość wysłana przez formularz na wolaktattoo.pl
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: contact.includes("@") ? contact : undefined,
      subject: `Nowe zapytanie od ${name} — ${bodyPart}`,
      html,
      attachments,
    });

    return { success: true };
  } catch (err) {
    console.error("Resend error:", err);
    return {
      success: false,
      error:
        "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na Instagram.",
    };
  }
}
