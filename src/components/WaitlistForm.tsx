"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";

export function WaitlistForm() {
  const { locale } = useLocale();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    const key = "cour-waitlist";
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
    if (!existing.includes(email)) {
      localStorage.setItem(key, JSON.stringify([...existing, email]));
    }
    setDone(true);
  };

  if (done) {
    return (
      <p className="text-sm text-[#8db4ff]">
        {locale === "nl"
          ? "Bedankt — we hebben je op de lijst gezet voor updates."
          : "Thanks — you're on the list for updates."}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={locale === "nl" ? "jouw@email.nl" : "you@email.com"}
        className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white outline-none transition-[border-color] focus:border-[#8db4ff]/50"
      />
      <button
        type="submit"
        className="rounded-full bg-[#8db4ff] px-6 py-3 text-sm font-semibold text-[#050816] transition-transform duration-160 active:scale-[0.97]"
      >
        {locale === "nl" ? "Houd me op de hoogte" : "Notify me"}
      </button>
    </form>
  );
}
