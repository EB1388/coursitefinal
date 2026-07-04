import type { Metadata } from "next";
import { CompanyPrivacyContent } from "@/components/CompanyPrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Cour studio privacy policy and links to privacy policies for each Cour game and app.",
};

export default function PrivacyPage() {
  return <CompanyPrivacyContent />;
}
