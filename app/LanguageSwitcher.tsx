"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

type Locale = "en" | "ru" | "az";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "az", label: "AZ" },
];

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2" suppressHydrationWarning>
      {LOCALES.map((l) => (
        <button
          key={l.value}
          type="button"
          disabled={isPending}
          onClick={() => {
            if (l.value === currentLocale) return;

            startTransition(async () => {
              await fetch("/api/locale", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ locale: l.value }),
              });

              router.replace(pathname);
              router.refresh();
            });
          }}
          className={
            "px-2 py-1 text-[10px] font-semibold tracking-[0.25em] transition-colors " +
            (l.value === currentLocale
              ? "text-black"
              : "text-black/60 hover:text-black")
          }
          aria-pressed={l.value === currentLocale}
          suppressHydrationWarning
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
