import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">404</p>
      <h1 className="mt-2 font-display text-3xl text-navy">Not found</h1>
      <p className="mt-3 text-sm text-ink/70">
        That page or registration ID does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream"
      >
        Back home
      </Link>
    </div>
  );
}
