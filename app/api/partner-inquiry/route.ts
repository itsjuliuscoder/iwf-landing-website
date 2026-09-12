import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { PartnerInquiry } from "@/lib/models/PartnerInquiry";
import { sendPartnerInquiryNotification } from "@/lib/email";
import { partnerInquirySchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = partnerInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await connectDb();
    const inquiry = await PartnerInquiry.create({
      tier: data.tier,
      organizationName: data.organizationName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      message: data.message || undefined,
    });

    const emailResult = await sendPartnerInquiryNotification({
      inquiryId: String(inquiry._id),
      tier: data.tier,
      organizationName: data.organizationName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      message: data.message || undefined,
    }).catch((err: unknown) => ({
      error: err instanceof Error ? err.message : "Email failed",
    }));

    if (emailResult.error) {
      console.error("Partner inquiry email failed:", emailResult.error);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Partner inquiry failed:", err);
    return NextResponse.json(
      { error: "Unable to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}
