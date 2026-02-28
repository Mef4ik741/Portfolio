import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import itbLogo from "./pngs/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export default async function Navbar() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const t = await getTranslations({ locale });

  return (
    <div className="sticky top-0 z-50 w-full border-b border-black/10 bg-white text-black supports-[backdrop-filter]:bg-white/85 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-0 px-8 py-4">
        <div className="col-span-5 flex items-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src={itbLogo} alt="Logo" width={44} height={44} priority />
          </Link>
        </div>

        <div className="col-span-7 flex items-center justify-end gap-10 text-sm font-medium text-black/80">
          <Link className="transition-colors hover:text-black" href="/about">
            {t("nav.about")}
          </Link>
          <Link className="transition-colors hover:text-black" href="/skills">
            {t("nav.skills")}
          </Link>
          <Link className="transition-colors hover:text-black" href="/portfolio">
            {t("nav.portfolio")}
          </Link>
          <Link
            className="rounded-full bg-black px-5 py-2 text-xs font-semibold tracking-wide text-white"
            href="/contact"
          >
            {t("nav.contact")}
          </Link>

          <LanguageSwitcher currentLocale={locale as "en" | "ru" | "az"} />
        </div>
      </div>
    </div>
  );
}
