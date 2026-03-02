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
    <div className="min-h-screen bg-[#D9D9D9] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-black">
      <div className="mx-auto max-w-3xl">
        <div className="inline-block border-4 border-black px-6 sm:px-12 py-3 sm:py-4 mb-8 sm:mb-12">
          <h1 className="text-xs sm:text-sm font-bold tracking-[0.4em]">
            Обо мне
          </h1>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {/* Block 1: Education */}
          <div>
            <h2 className="text-sm font-extrabold tracking-[0.25em] text-black uppercase mb-5 sm:mb-6">
              Образование
            </h2>
            <p className="text-sm leading-7 text-black/80">
              Я — .NET Back-end Developer и выпускник{" "}
              <a
                href="https://itstep.az/ru"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-black underline underline-offset-4 hover:text-black/70"
              >
                IT Step Academy
              </a>
              . Обучался в академии на протяжении 2,5 лет по направлению разработки
              программного обеспечения, где углублённо изучал архитектуру приложений,
              серверную разработку и принципы построения надёжных систем.
            </p>
          </div>

          {/* Block 2: Philosophy */}
          <div>
            <h2 className="text-sm font-extrabold tracking-[0.25em] text-black uppercase mb-5 sm:mb-6">
              Мой подход
            </h2>
            <p className="text-sm leading-7 text-black/80">
              Я выбрал backend-направление осознанно — мне важно контролировать
              ключевую логику приложения, отвечать за архитектуру, безопасность и
              стабильность работы системы. Мне нравится брать на себя ответственность
              за фундамент проекта и обеспечивать его надёжность и масштабируемость.
            </p>
          </div>

          {/* Block 3: Projects */}
          <div>
            <h2 className="text-sm font-extrabold tracking-[0.25em] text-black uppercase mb-5 sm:mb-6">
              Проекты
            </h2>
            <p className="text-sm leading-7 text-black/80">
              С моими проектами вы можете ознакомиться в разделе{" "}
              <Link
                href="/portfolio"
                className="font-semibold text-black underline underline-offset-4 hover:text-black/70"
              >
                /portfolio
              </Link>
              .
            </p>
          </div>

          {/* Block 4: Contact */}
          <div>
            <h2 className="text-sm font-extrabold tracking-[0.25em] text-black uppercase mb-5 sm:mb-6">
              Сотрудничество
            </h2>
            <p className="text-sm leading-7 text-black/80">
              Если я вас заинтересовал — буду рад обсудить сотрудничество в разделе{" "}
              <Link
                href="/contact"
                className="font-semibold text-black underline underline-offset-4 hover:text-black/70"
              >
                /contact
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
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
