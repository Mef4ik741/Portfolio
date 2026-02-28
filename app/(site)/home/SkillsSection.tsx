import Image from "next/image";
import { getTranslations } from "next-intl/server";

import aspNetCoreLogo from "../pngs/Bitmap-MEDIUM_ASP.NET-Core-Logo_2colors_Square_RGB.png";
import redisLogo from "../pngs/redis-logo-base-de-datos-instalar-debian.png";
import postgresqlLogo from "../pngs/postgresql-logo.png";

type Props = {
  locale: "en" | "ru" | "az";
};

export default async function SkillsSection({ locale }: Props) {
  const t = await getTranslations({ locale });

  return (
    <section className="bg-[#D9D9D9] pb-20">
      <div className="mx-auto max-w-4xl px-8 text-center">
        <div className="mt-16">
          <h3 className="text-xs font-bold tracking-[0.3em] text-black">
            {t("skills.usingNow")}
          </h3>

          <div className="mt-8 grid grid-cols-2 gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-3">
              <svg
                width="160"
                height="160"
                viewBox="0 0 790 790"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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

            <div className="flex flex-col items-center gap-3">
              <Image
                src={aspNetCoreLogo}
                alt="ASP.NET Core"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <Image
                src={redisLogo}
                alt="Redis"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <Image
                src={postgresqlLogo}
                alt="PostgreSQL"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
