import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";
import { generateQrDataUrl } from "@/lib/qrcode";
import { sendRegistrationConfirmation } from "@/lib/email";
import { createRegistrationId } from "@/lib/registrationId";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { registrationSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`register:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const registrationId = createRegistrationId();

  try {
    await connectDb();
    await Registration.create({
      registrationId,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      churchAffiliation: data.churchAffiliation || undefined,
      country: data.country,
      groupSize: data.groupSize,
      checkedIn: false,
    });

    const qrDataUrl = await generateQrDataUrl(registrationId);

    const emailResult = await sendRegistrationConfirmation({
      to: data.email,
      fullName: data.fullName,
      registrationId,
      qrDataUrl,
      groupSize: data.groupSize,
    }).catch((err: unknown) => ({
      error: err instanceof Error ? err.message : "Email failed",
    }));

    if (emailResult.error) {
      console.error("Registration confirmation email failed:", emailResult.error);
    }

    return NextResponse.json(
      {
        registrationId,
        qrDataUrl,
        fullName: data.fullName,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration failed:", err);
    return NextResponse.json(
      { error: "Unable to complete registration. Please try again." },
      { status: 500 }
    );
  }
}
