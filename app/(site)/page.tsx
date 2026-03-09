import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

import itbLogo from "../pngs/logo.png";
import watermarkLogo from "../pngs/Logo ITB.png";
import portrait from "../pngs/foto_portfolio.jpg";
import aspNetCoreLogo from "../pngs/Bitmap-MEDIUM_ASP.NET-Core-Logo_2colors_Square_RGB.png";
import redisLogo from "../pngs/redis-logo-base-de-datos-instalar-debian.png";
import postgresqlLogo from "../pngs/postgresql-logo.png";
import nextjsLogo from "../pngs/nextjs-logo-square.webp";
import PortfolioSection from "../PortfolioSection";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded bg-[#D8D8D8] text-black shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

export default async function Home() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale =
    rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="w-full">
        <section className="relative overflow-visible">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(90deg, #D9D9D9 0%, #D9D9D9 52%, #0B0B0B 52%, #0B0B0B 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 left-0 w-[62%]"
            aria-hidden="true"
            style={{
              clipPath: "polygon(0 0, 100% 0, 86% 100%, 0 100%)",
              background: "#D9D9D9",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[62%]"
            aria-hidden="true"
            style={{
              clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)",
              background: "#0B0B0B",
            }}
          />

          <div className="relative z-10 grid min-h-[640px] grid-cols-1 lg:grid-cols-12 gap-0 px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-center py-6 lg:py-10 text-black order-2 lg:order-1">
              <div className="max-w-md pl-0 lg:pl-12 text-center lg:text-left">
                <p className="text-lg lg:text-xl font-semibold tracking-tight">
                  {t("hero.hi")}
                </p>
                <h1 className="mt-3 lg:mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight">
                  {t("hero.name")}
                </h1>
                <p className="mt-2 lg:mt-3 text-xs sm:text-sm font-semibold text-black/50">
                  {t("hero.title")}
                </p>

                <div className="mt-8 lg:mt-12 flex items-center justify-center lg:justify-start gap-4">
                  <SocialButton href="https://github.com/Mef4ik741" label="GitHub">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </SocialButton>

                  <SocialButton
                    href="https://www.linkedin.com/in/rauf-nebiyev-993824372/"
                    label="LinkedIn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </SocialButton>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-6 relative flex items-center lg:items-end justify-center order-1 lg:order-2 mb-4 lg:mb-0" style={{ marginLeft: '0' }}>
              <div className="relative h-[300px] w-[220px] sm:h-[400px] sm:w-[300px] lg:h-[560px] lg:w-[420px] rotate-[15deg]">
                <Image
                  src={portrait}
                  alt="Portrait"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1A1A1A] px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
          <div className="relative z-10 max-w-[720px]">
            <h2 className="text-xs sm:text-sm font-semibold tracking-[0.35em] text-white">
              {t("itBerries.title")}
            </h2>
            <p className="mt-4 lg:mt-6 text-xs leading-5 lg:leading-6 text-white/65">
              {t("itBerries.text")}
            </p>
            <div className="mt-6 lg:mt-8 flex items-center gap-3 lg:gap-4">
              <span className="h-px w-8 lg:w-10 bg-white/40" />
              <Link
                className="text-[10px] lg:text-[11px] font-semibold tracking-[0.2em] text-white/80 transition-colors hover:text-white"
                href="/portfolio"
              >
                {t("itBerries.readMore")}
              </Link>
              <span className="h-px w-8 lg:w-10 bg-white/40" />
            </div>
          </div>

          <div className="pointer-events-none absolute -right-24 -bottom-48 opacity-20">
            <Image src={watermarkLogo} alt="" width={400} height={400} className="lg:w-[520px] lg:h-[520px]" />
          </div>
        </section>

        <section className="bg-[#D9D9D9] py-12 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block border-4 border-black px-6 sm:px-12 py-3 sm:py-4">
              <h2 className="text-xs sm:text-sm font-bold tracking-[0.4em] text-black">
                {t("about.title")}
              </h2>
            </div>

            <p className="mx-auto mt-6 lg:mt-10 max-w-xl text-xs leading-5 lg:leading-6 text-black/70">
              {t("about.text")}
            </p>

            <div className="mt-8 lg:mt-10 flex items-center justify-center gap-4">
              <span className="h-6 w-px bg-black/40" />
              <Link
                className="text-xs font-semibold tracking-[0.2em] text-black transition-colors hover:text-black/70"
                href="/about"
              >
                {t("about.explore")}
              </Link>
              <span className="h-6 w-px bg-black/40" />
            </div>

            <div className="mt-8 lg:mt-10 flex items-center justify-center gap-2">
              <span className="h-px w-8 sm:w-12 bg-black" />
              <svg
                width="32"
                height="10"
                viewBox="0 0 40 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black sm:w-10 sm:h-3"
              >
                <path
                  d="M0 6h12M16 2l4 4-4 4M24 2l4 4-4 4M32 6h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="h-px w-8 sm:w-12 bg-black" />
            </div>

            <div className="mt-12 lg:mt-16 grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-2">
              <div className="text-left">
                <div className="flex items-center gap-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-black/30 lg:w-8 lg:h-8"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                  <h3 className="text-xs font-bold tracking-[0.3em] text-black">
                    {t("about.design")}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-5 text-black/60">
                  {t("about.cardText")}
                </p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-black/30 lg:w-8 lg:h-8"
                  >
                    <path d="M4 6h16M4 12h16M4 18h7" />
                    <path d="M14 15l3 3 5-5" />
                  </svg>
                  <h3 className="text-xs font-bold tracking-[0.3em] text-black">
                    {t("about.development")}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-5 text-black/60">
                  {t("about.cardText")}
                </p>
              </div>

              <div className="text-left md:col-span-2 md:mx-auto md:max-w-sm">
                <div className="flex items-center gap-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-black/30 lg:w-8 lg:h-8"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                  </svg>
                  <h3 className="text-xs font-bold tracking-[0.3em] text-black">
                    {t("about.maintenance")}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-5 text-black/60">
                  {t("about.cardText")}
                </p>
              </div>
            </div>

            <div className="mt-12 lg:mt-16 flex items-center justify-center gap-2">
              <span className="h-px w-8 sm:w-12 bg-black" />
              <svg
                width="32"
                height="10"
                viewBox="0 0 40 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black sm:w-10 sm:h-3"
              >
                <path
                  d="M0 6h12M16 2l4 4-4 4M24 2l4 4-4 4M32 6h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="h-px w-8 sm:w-12 bg-black" />
            </div>

            <div className="mt-12 lg:mt-16 inline-block border-4 border-black px-8 sm:px-16 py-3 sm:py-4">
              <h2 className="text-xs sm:text-sm font-bold tracking-[0.4em] text-black">
                {t("skills.title")}
              </h2>
            </div>

            <div className="mt-12 lg:mt-16">
              <h3 className="text-xs font-bold tracking-[0.3em] text-black">
                {t("skills.usingNow")}
              </h3>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-8 md:gap-16">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 790 790"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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

                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Image
                    src={aspNetCoreLogo}
                    alt="ASP.NET Core"
                    width={120}
                    height={120}
                    className="object-contain sm:w-32 sm:h-32 md:w-40 md:h-40"
                  />
                </div>

                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Image
                    src={redisLogo}
                    alt="Redis"
                    width={120}
                    height={120}
                    className="object-contain sm:w-32 sm:h-32 md:w-40 md:h-40"
                  />
                </div>

                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Image
                    src={postgresqlLogo}
                    alt="PostgreSQL"
                    width={120}
                    height={120}
                    className="object-contain sm:w-32 sm:h-32 md:w-40 md:h-40"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-16">
              <h3 className="text-sm sm:text-base font-extrabold tracking-[0.25em] text-black uppercase">
                Практикую
              </h3>

              <div className="mt-8 flex justify-center">
                <Image
                  src={nextjsLogo}
                  alt="Next.js"
                  width={160}
                  height={160}
                  className="object-contain w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60"
                />
              </div>
            </div>
          </div>
        </section>

        <PortfolioSection />
      </main>
    </div>
  );
}
