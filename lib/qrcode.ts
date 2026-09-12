import QRCode from "qrcode";

/**
 * Encode the registration ID string only (not a URL) so gate scanners
 * can look up the ID directly without depending on a specific page.
 */
export async function generateQrDataUrl(registrationId: string): Promise<string> {
  return QRCode.toDataURL(registrationId, {
    margin: 1,
    width: 320,
    errorCorrectionLevel: "M",
  });
}
