import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export default async function AboutPage() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-[#D9D9D9] px-8 py-16 text-black">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-block border-4 border-black px-12 py-4">
          <h1 className="text-sm font-bold tracking-[0.4em]">
            {t("pages.about.title")}
          </h1>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-sm leading-7 text-black/70">
          {t("pages.about.text")}
        </p>

        <div className="mt-12">
          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.2em] text-black/80 hover:text-black"
          >
            {t("pages.backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
