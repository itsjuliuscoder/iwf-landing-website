import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { AltarCallResponse } from "@/lib/models/AltarCallResponse";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { altarCallSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`altar-call:${ip}`);
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

  const parsed = altarCallSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await connectDb();
    await AltarCallResponse.create({
      name: data.name,
      phone: data.phone,
      nearestCity: data.nearestCity || undefined,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Altar call failed:", err);
    return NextResponse.json(
      { error: "Unable to submit. Please try again." },
      { status: 500 }
    );
  }
}
