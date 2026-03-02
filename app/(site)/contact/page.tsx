import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export default async function ContactPage() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-[#D9D9D9] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-black">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-block border-4 border-black px-8 sm:px-16 py-3 sm:py-4">
          <h1 className="text-xs sm:text-sm font-bold tracking-[0.4em]">
            {t("pages.contact.title")}
          </h1>
        </div>

        <p className="mx-auto mt-8 sm:mt-10 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-black/70">
          {t("pages.contact.text")}
        </p>

        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4">
          <span className="h-6 w-px bg-black/40" />
          <span className="text-xs font-semibold tracking-[0.2em] text-black/80">
            {t("pages.contact.messageMe")}
          </span>
          <span className="h-6 w-px bg-black/40" />
        </div>

        <div className="mx-auto mt-8 sm:mt-10 max-w-xl px-4 sm:px-0">
          <div className="border-2 border-black/70 bg-white/40 px-4 sm:px-8 py-8 sm:py-10">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full border-2 border-black bg-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-7 sm:h-7"
                >
                  <path
                    d="M22 3.01L2 11l6.5 2.2L19 6.5 9.8 16.1 10 21l3.6-3.4L18.8 20c.8.4 1.4.2 1.6-.8L23 4.6c.3-1.2-.5-1.9-1-1.6Z"
                    fill="currentColor"
                    className="text-black"
                  />
                </svg>
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm font-bold tracking-[0.3em]">
                  {t("pages.contact.telegram")}
                </p>
                <a
                  href="https://t.me/Bumbimbambum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs sm:text-sm font-semibold tracking-[0.1em] text-black/80 hover:text-black"
                >
                  t.me/Bumbimbambum
                </a>
              </div>

              <a
                href="https://t.me/Bumbimbambum"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border-2 border-black bg-black px-6 sm:px-8 py-3 text-xs font-semibold tracking-[0.25em] text-white transition-colors hover:bg-black/85"
              >
                {t("pages.contact.openTelegram")}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
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
