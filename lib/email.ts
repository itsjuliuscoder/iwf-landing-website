import { Resend } from "resend";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(key);
}

function getFrom(): string {
  return process.env.EMAIL_FROM ?? "IWF 2027 <noreply@iworshipfestival.org>";
}

export interface RegistrationConfirmationPayload {
  to: string;
  fullName: string;
  registrationId: string;
  qrDataUrl: string;
  groupSize: number;
}

export async function sendRegistrationConfirmation(
  payload: RegistrationConfirmationPayload
): Promise<{ id?: string; error?: string }> {
  const resend = getResend();
  const { data, error } = await resend.emails.send(
    {
      from: getFrom(),
      to: [payload.to],
      subject: `You're registered for IWF 2027 — ${payload.registrationId}`,
      html: `
        <div style="font-family: Georgia, serif; color: #1A1A1A; max-width: 560px; margin: 0 auto;">
          <h1 style="color: #0B1F3A;">International Worship Festival 2027</h1>
          <p>Dear ${escapeHtml(payload.fullName)},</p>
          <p>
            Thank you for registering for IWF 2027 at Teslim Balogun Stadium, Lagos
            on Saturday 9 January 2027. Entry is free — please keep this email and
            your QR code for accreditation at the gate.
          </p>
          <p><strong>Registration ID:</strong> ${escapeHtml(payload.registrationId)}</p>
          <p><strong>Group size:</strong> ${payload.groupSize}</p>
          <p style="text-align: center; margin: 24px 0;">
            <img src="${payload.qrDataUrl}" alt="Accreditation QR code" width="240" height="240" style="border: 1px solid #C9A227;" />
          </p>
          <p style="font-size: 14px; color: #555;">
            Present this QR code (or your registration ID) at the gate. Do not share
            it if it is for a private group accreditation.
          </p>
          <p style="color: #0B1F3A;">See you at the festival.</p>
        </div>
      `,
    },
    { idempotencyKey: `registration-confirmation/${payload.registrationId}` }
  );

  if (error) {
    return { error: error.message };
  }
  return { id: data?.id };
}

export interface PartnerInquiryNotificationPayload {
  inquiryId: string;
  tier: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
}

export async function sendPartnerInquiryNotification(
  payload: PartnerInquiryNotificationPayload
): Promise<{ id?: string; error?: string }> {
  const to = process.env.PARTNER_INQUIRY_TO;
  if (!to) {
    return { error: "PARTNER_INQUIRY_TO is not set" };
  }

  const resend = getResend();
  const { data, error } = await resend.emails.send(
    {
      from: getFrom(),
      to: [to],
      subject: `IWF 2027 partner inquiry — ${payload.tier} — ${payload.organizationName}`,
      html: `
        <div style="font-family: sans-serif; color: #1A1A1A;">
          <h2>New partnership inquiry</h2>
          <ul>
            <li><strong>Tier:</strong> ${escapeHtml(payload.tier)}</li>
            <li><strong>Organization:</strong> ${escapeHtml(payload.organizationName)}</li>
            <li><strong>Contact:</strong> ${escapeHtml(payload.contactName)}</li>
            <li><strong>Email:</strong> ${escapeHtml(payload.email)}</li>
            <li><strong>Phone:</strong> ${escapeHtml(payload.phone)}</li>
          </ul>
          ${
            payload.message
              ? `<p><strong>Message:</strong></p><p>${escapeHtml(payload.message)}</p>`
              : ""
          }
        </div>
      `,
    },
    { idempotencyKey: `partner-inquiry/${payload.inquiryId}` }
  );

  if (error) {
    return { error: error.message };
  }
  return { id: data?.id };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
