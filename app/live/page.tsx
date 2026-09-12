import type { Metadata } from "next";
import Link from "next/link";
import { AltarCallForm } from "@/components/AltarCallForm";

export const metadata: Metadata = {
  title: "Live",
};

export default function LivePage() {
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_EMBED_URL;
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK_EMBED_URL;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Livestream hub
          </p>
          <h1 className="mt-2 font-display text-4xl text-navy">Watch IWF 2027 live</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/register"
            className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-cream"
          >
            Register free
          </Link>
          <Link
            href="/partners"
            className="rounded-full border border-navy/20 px-4 py-2 text-sm font-semibold text-navy"
          >
            Partner with us
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <EmbedFrame
            title="YouTube livestream"
            src={youtube}
            emptyLabel="YouTube embed URL not configured yet (NEXT_PUBLIC_YOUTUBE_EMBED_URL)."
          />
          <EmbedFrame
            title="Facebook livestream"
            src={facebook}
            emptyLabel="Facebook embed URL not configured yet (NEXT_PUBLIC_FACEBOOK_EMBED_URL)."
          />
        </div>

        <aside className="lg:col-span-2">
          <AltarCallForm />
          <p className="mt-3 text-xs text-ink/55">
            The altar-call form stays visible for the entire stream — not only during a
            scheduled window.
          </p>
        </aside>
      </div>

      <div className="sticky bottom-3 z-40 mt-10">
        <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-gold/40 bg-navy/95 p-3 text-cream shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-sm sm:text-base">
            In Lagos? <span className="font-semibold text-gold">Register free</span> for
            stadium accreditation. Or{" "}
            <span className="font-semibold text-gold">partner</span> to resource the day.
          </p>
          <div className="flex gap-2">
            <Link
              href="/register"
              className="flex-1 rounded-full bg-gold px-4 py-2 text-center text-sm font-semibold text-navy sm:flex-none"
            >
              Register
            </Link>
            <Link
              href="/partners"
              className="flex-1 rounded-full border border-cream/30 px-4 py-2 text-center text-sm font-semibold text-cream sm:flex-none"
            >
              Partners
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmbedFrame({
  title,
  src,
  emptyLabel,
}: {
  title: string;
  src?: string;
  emptyLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
      <div className="border-b border-navy/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy/60">
        {title}
      </div>
      {src ? (
        <div className="aspect-video w-full">
          <iframe
            src={src}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-navy/5 px-6 text-center text-sm text-ink/60">
          {emptyLabel}
        </div>
      )}
    </div>
  );
}
