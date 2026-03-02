import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

import aspNetCoreLogo from "../../pngs/Bitmap-MEDIUM_ASP.NET-Core-Logo_2colors_Square_RGB.png";
import redisLogo from "../../pngs/redis-logo-base-de-datos-instalar-debian.png";
import postgresqlLogo from "../../pngs/postgresql-logo.png";
import nextjsLogo from "../../pngs/nextjs-logo-square.webp";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export default async function SkillsPage() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-[#D9D9D9] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-black">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-block border-4 border-black px-8 sm:px-16 py-3 sm:py-4">
          <h1 className="text-xs sm:text-sm font-bold tracking-[0.4em]">
            {t("pages.skills.title")}
          </h1>
        </div>

        <div className="mt-10 sm:mt-16">
          <h2 className="text-xs font-bold tracking-[0.3em] text-black">
            {t("skills.usingNow")}
          </h2>

          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <svg
                width="100"
                height="100"
                viewBox="0 0 790 790"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="C#"
                className="sm:w-32 sm:h-32 md:w-40 md:h-40"
              >
                <path
                  fill="#512bd4"
                  fillRule="evenodd"
                  d="m395 36-37.203 21.479L84.097 215.5v359L395 754l310.903-179.5v-359L435.395 59.322z"
                />
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M397.252 618c-122.883 0-222.5-99.617-222.5-222.5S274.369 173 397.252 173c82.224 0 154.679 45.73 193.197 112.063l-88.056 50.87c-20.751-37.094-59.614-61.751-105.141-61.751-67.002 0-121.316 54.316-121.316 121.318s54.314 121.318 121.316 121.318c45.228 0 84.675-24.752 105.537-61.447l87.943 50.074C552.45 572.67 480.145 618 397.252 618"
                />
                <text
                  x="532.41333"
                  y="447"
                  fill="#fff"
                  fontFamily="Arial, sans-serif"
                  fontSize="169"
                  fontWeight="700"
                >
                  #
                </text>
              </svg>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src={aspNetCoreLogo}
                alt="ASP.NET Core"
                width={100}
                height={100}
                className="object-contain sm:w-32 sm:h-32 md:w-40 md:h-40"
                priority
              />
            </div>

            <div className="flex flex-col items-center">
              <Image
                src={redisLogo}
                alt="Redis"
                width={100}
                height={100}
                className="object-contain sm:w-32 sm:h-32 md:w-40 md:h-40"
              />
            </div>

            <div className="flex flex-col items-center">
              <Image
                src={postgresqlLogo}
                alt="PostgreSQL"
                width={100}
                height={100}
                className="object-contain sm:w-32 sm:h-32 md:w-40 md:h-40"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <h2 className="text-sm sm:text-base font-extrabold tracking-[0.25em] text-black uppercase">
            Практикую
          </h2>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Image
              src={nextjsLogo}
              alt="Next.js"
              width={140}
              height={140}
              className="object-contain w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
            />
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
