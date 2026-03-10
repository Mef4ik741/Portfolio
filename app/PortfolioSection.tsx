"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PortfolioTab = "all";

type Project = {
  id: number;
  name: string;
  website_url?: string | null;
  images: { id: number; url: string; order: number }[];
};

function getDomain(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function PortfolioSection() {
  const t = useTranslations();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PortfolioTab>("all");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) {
          setProjects(Array.isArray(data) ? (data as Project[]) : []);
        }
      } catch {
        if (!cancelled) setProjects([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-[#0B0B0B] text-white">
      <div className="relative h-[240px] w-full overflow-hidden md:h-[260px]">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority={false}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-x-0 top-10 flex justify-center">
          <div className="border-4 border-black bg-white/30 px-14 py-4 backdrop-blur-[1px]">
            <h2 className="text-sm font-bold tracking-[0.6em] text-black">
              {t("portfolio.title")}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-center py-6 sm:py-8">
            <div className="flex w-full max-w-md items-center justify-center gap-4 sm:gap-10 border-t border-white/30 pt-5 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-white/70">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={
                  activeTab === "all" ? "text-white" : "hover:text-white"
                }
              >
                {t("portfolio.tabs.all")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3">
            {loading ? (
              <div className="col-span-full border border-white/20 bg-black/10 px-6 py-10 text-center text-xs font-semibold tracking-[0.25em] text-white/60">
                LOADING...
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-full border border-white/20 bg-black/10 px-6 py-10 text-center text-xs font-semibold tracking-[0.25em] text-white/60">
                PROJECTS NOT FOUND
              </div>
            ) : (
              projects.map((p) => {
                const preview = p.images?.[0]?.url || null;
                if (!preview) return null;

                const domain = p.website_url ? getDomain(p.website_url) : null;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => router.push(`/portfolio/${p.id}`)}
                    className="group relative aspect-[4/3] overflow-hidden text-left"
                    aria-label={p.name}
                  >
                    <Image
                      src={preview}
                      alt={p.name}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />

                    <div className="pointer-events-none absolute inset-0 flex items-end p-4 opacity-0 transition-all duration-200 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                      <div className="pointer-events-auto">
                        <p className="text-xs font-extrabold tracking-[0.18em] text-white">
                          {p.name}
                        </p>
                        {domain && p.website_url ? (
                          <a
                            href={p.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-[10px] font-semibold tracking-[0.22em] text-white/85 underline underline-offset-4 hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {domain}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="bg-[#1A1A1A] py-8 sm:py-12 text-center">
            <p className="text-xs font-semibold tracking-[0.1em] text-white/85">
              {t("portfolio.andMore")}
            </p>
            <div className="mx-auto mt-6 sm:mt-8 h-px w-full max-w-5xl bg-white/35" />
          </div>
        </div>
      </div>
    </section>
  );
}
