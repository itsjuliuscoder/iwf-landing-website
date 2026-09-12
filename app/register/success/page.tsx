import type { Metadata } from "next";
import { RegistrationSuccess } from "@/components/RegistrationSuccess";

export const metadata: Metadata = {
  title: "Registration confirmed",
};

export default function RegisterSuccessPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <RegistrationSuccess />
    </div>
  );
}
