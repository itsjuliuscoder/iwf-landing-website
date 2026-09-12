import type { Metadata } from "next";
import { RegistrationForm } from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Free accreditation
          </p>
          <h1 className="mt-2 font-display text-4xl text-navy">Register for IWF 2027</h1>
          <p className="mt-3 text-ink/75 leading-relaxed">
            Secure your QR code for gate entry at Teslim Balogun Stadium. No payment —
            just your details and group size. Confirmation arrives by email.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink/70">
            <li>• Registration ID format: IWF27-XXXXXXXX</li>
            <li>• Present the QR at accreditation desks</li>
            <li>• Select your country so we can celebrate the nations present</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
