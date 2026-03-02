import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { headers } from "next/headers";

import PortfolioGrid from "./PortfolioGrid";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

type Project = {
  id: number;
  name: string;
  github_url: string | null;
  youtube_url: string | null;
  readme_url: string | null;
  website_url: string | null;
  created_at: string;
  images: { id: number; url: string; order: number }[];
};

async function fetchProjects(): Promise<Project[]> {
  const h = await headers();
  const host = h.get("host");
  const forwardedProto = h.get("x-forwarded-proto");
  const protocol = forwardedProto === "https" || forwardedProto === "http" ? forwardedProto : "http";

  if (!host) return [];

  try {
    const res = await fetch(`${protocol}://${host}/api/projects`);

    const data = await res.json();
    return Array.isArray(data) ? (data as Project[]) : [];
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const t = await getTranslations({ locale });
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen bg-[#D9D9D9] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-black">
      <div className="mx-auto max-w-6xl">
        <div className="inline-block border-4 border-black px-8 sm:px-16 py-3 sm:py-4">
          <h1 className="text-xs sm:text-sm font-bold tracking-[0.4em]">
            {t("pages.portfolio.title")}
          </h1>
        </div>

        <p className="mx-auto mt-8 sm:mt-10 max-w-2xl text-center text-xs sm:text-sm leading-6 sm:leading-7 text-black/70">
          {t("pages.portfolio.text")}
        </p>

        {projects.length === 0 ? (
          <div className="mt-10 sm:mt-12 border-2 border-black bg-white px-6 sm:px-10 py-10 sm:py-12 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-black/70">
              PROJECTS NOT FOUND
            </p>
          </div>
        ) : (
          <PortfolioGrid projects={projects} />
        )}

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
