import Link from "next/link";
import { getTranslations } from "next-intl/server";

type Props = {
  locale: "en" | "ru" | "az";
};

export default async function AboutSection({ locale }: Props) {
  const t = await getTranslations({ locale });

  return (
    <section className="bg-[#D9D9D9] py-20">
      <div className="mx-auto max-w-4xl px-8 text-center">
        <div className="inline-block border-4 border-black px-12 py-4">
          <h2 className="text-sm font-bold tracking-[0.4em] text-black">
            {t("about.title")}
          </h2>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-xs leading-6 text-black/70">
          {t("about.text")}
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="h-6 w-px bg-black/40" />
          <Link
            className="text-xs font-semibold tracking-[0.2em] text-black transition-colors hover:text-black/70"
            href="/about"
          >
            {t("about.explore")}
          </Link>
          <span className="h-6 w-px bg-black/40" />
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-black" />
          <svg
            width="40"
            height="12"
            viewBox="0 0 40 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M0 6h12M16 2l4 4-4 4M24 2l4 4-4 4M32 6h8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="h-px w-12 bg-black" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="text-left">
            <div className="flex items-center gap-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-black/30"
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
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-black/30"
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
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-black/30"
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

        <div className="mt-16 flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-black" />
          <svg
            width="40"
            height="12"
            viewBox="0 0 40 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M0 6h12M16 2l4 4-4 4M24 2l4 4-4 4M32 6h8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="h-px w-12 bg-black" />
        </div>

        <div className="mt-16 inline-block border-4 border-black px-16 py-4">
          <h2 className="text-sm font-bold tracking-[0.4em] text-black">
            {t("skills.title")}
          </h2>
        </div>
      </div>
    </section>
  );
}
