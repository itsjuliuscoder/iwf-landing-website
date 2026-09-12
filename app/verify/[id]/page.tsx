import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDb } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";

export const metadata: Metadata = {
  title: "Verify accreditation",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VerifyPage({ params }: PageProps) {
  const { id } = await params;
  const registrationId = decodeURIComponent(id).trim().toUpperCase();

  if (!/^IWF27-[0-9A-Z]{8}$/.test(registrationId)) {
    notFound();
  }

  let registration: {
    fullName: string;
    registrationId: string;
    checkedIn: boolean;
    checkedInAt?: Date | null;
    groupSize: number;
  } | null = null;

  try {
    await connectDb();
    registration = await Registration.findOne({ registrationId })
      .select("fullName registrationId checkedIn checkedInAt groupSize")
      .lean();
  } catch {
    notFound();
  }

  if (!registration) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-navy/15 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Gate accreditation
        </p>
        <h1 className="mt-2 font-display text-2xl text-navy">{registration.fullName}</h1>
        <p className="mt-1 font-mono text-sm text-navy/80">{registration.registrationId}</p>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-navy/5 pb-2">
            <dt className="text-ink/60">Group size</dt>
            <dd className="font-medium text-navy">{registration.groupSize}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-navy/5 pb-2">
            <dt className="text-ink/60">Checked in</dt>
            <dd
              className={`font-semibold ${
                registration.checkedIn ? "text-green-700" : "text-amber-700"
              }`}
            >
              {registration.checkedIn ? "Yes" : "Not yet"}
            </dd>
          </div>
          {registration.checkedIn && registration.checkedInAt && (
            <div className="flex justify-between gap-4">
              <dt className="text-ink/60">Checked in at</dt>
              <dd className="font-medium text-navy">
                {new Date(registration.checkedInAt).toLocaleString("en-NG", {
                  timeZone: "Africa/Lagos",
                })}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
