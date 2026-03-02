"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import itbLogo from "./pngs/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

type Locale = "en" | "ru" | "az";

function getCookieLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const raw = match?.[1];
  return raw && SUPPORTED_LOCALES.has(raw) ? (raw as Locale) : "en";
}

export default function Navbar() {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(() => getCookieLocale());

  const navLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/skills", label: t("nav.skills") },
    { href: "/portfolio", label: t("nav.portfolio") },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b border-black/10 bg-white text-black supports-[backdrop-filter]:bg-white/85 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-0 px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <div className="col-span-6 md:col-span-5 flex items-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src={itbLogo} alt="Logo" width={36} height={36} priority className="md:w-11 md:h-11" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="col-span-7 hidden md:flex items-center justify-end gap-6 lg:gap-10 text-sm font-medium text-black/80">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className="transition-colors hover:text-black"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="rounded-full bg-black px-4 lg:px-5 py-2 text-xs font-semibold tracking-wide text-white"
            href="/contact"
          >
            {t("nav.contact")}
          </Link>

          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Mobile Menu Button */}
        <div className="col-span-6 flex md:hidden items-center justify-end gap-3">
          <LanguageSwitcher currentLocale={locale} />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-black/80 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block w-full text-center rounded-full bg-black px-5 py-3 text-xs font-semibold tracking-wide text-white mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
