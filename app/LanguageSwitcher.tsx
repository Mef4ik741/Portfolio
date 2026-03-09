"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

type Locale = "en" | "ru" | "az";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "az", label: "AZ" },
];

export default function LanguageSwitcher({
  currentLocale,
  onLocaleChange,
}: {
  currentLocale: Locale;
  onLocaleChange?: (locale: Locale) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(
    null
  );

  const currentLabel = useMemo(() => {
    return LOCALES.find((l) => l.value === currentLocale)?.label ?? "EN";
  }, [currentLocale]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const updatePos = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const padding = 8;
      const gap = 10;
      const fallbackWidth = 340;
      const panelWidth = panelRef.current?.getBoundingClientRect().width ?? fallbackWidth;

      const top = Math.round(rect.bottom + gap);
      const preferredLeft = rect.right - panelWidth;
      const left = Math.round(
        Math.min(
          Math.max(preferredLeft, padding),
          window.innerWidth - panelWidth - padding
        )
      );

      setPanelPos({ top, left });
    };

    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [open]);

  return (
    <div className="relative" suppressHydrationWarning>
      <button
        ref={buttonRef}
        type="button"
        disabled={isPending}
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-[10px] font-semibold tracking-[0.25em] text-black/80 transition-colors hover:text-black hover:border-black/20 disabled:opacity-60"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        suppressHydrationWarning
      >
        {currentLabel}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="opacity-70"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close language switcher"
            onClick={() => setOpen(false)}
          />

          <div
            ref={panelRef}
            className="absolute w-[min(92vw,340px)] rounded-2xl border border-black/10 bg-white p-4 shadow-xl"
            style={
              panelPos
                ? { top: panelPos.top, left: panelPos.left }
                : { top: 64, left: 8, right: 8, margin: "0 auto" }
            }
          >
            <div className="flex items-center justify-between">
              <div
                id={titleId}
                className="text-xs font-semibold tracking-wide text-black"
              >
                Language
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-black/60 hover:text-black hover:bg-black/5"
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              {LOCALES.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    if (l.value === currentLocale) {
                      setOpen(false);
                      return;
                    }

                    startTransition(async () => {
                      await fetch("/api/locale", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ locale: l.value }),
                      });

                      onLocaleChange?.(l.value);
                      setOpen(false);
                      router.replace(pathname);
                      router.refresh();
                    });
                  }}
                  className={
                    "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors disabled:opacity-60 " +
                    (l.value === currentLocale
                      ? "bg-black text-white"
                      : "bg-black/5 text-black hover:bg-black/10")
                  }
                  aria-pressed={l.value === currentLocale}
                  suppressHydrationWarning
                >
                  <span className="tracking-wide">{l.label}</span>
                  {l.value === currentLocale ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
