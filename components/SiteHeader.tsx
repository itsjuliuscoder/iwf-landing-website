"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EVENT } from "@/lib/data/event";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/programme", label: "Programme" },
  { href: "/ministers", label: "Ministers" },
  { href: "/register", label: "Register" },
  { href: "/live", label: "Live" },
  { href: "/partners", label: "Partners" },
  { href: "/press", label: "Press" },
  { href: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="font-display text-lg font-semibold tracking-wide text-navy sm:text-xl">
            {EVENT.shortName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-navy/60 sm:text-xs">
            Worship · Lagos · Free
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-navy text-cream"
                    : "text-navy/80 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:brightness-105 sm:inline-flex"
          >
            Register free
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-navy/20 px-3 py-2 text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-navy/10 bg-cream px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-navy hover:bg-navy/5"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
