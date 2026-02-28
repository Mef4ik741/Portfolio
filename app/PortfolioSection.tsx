"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type PortfolioTab = "all" | "coded" | "designed";

type PortfolioItem = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  category: Exclude<PortfolioTab, "all">;
  featured?: boolean;
};

export default function PortfolioSection() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<PortfolioTab>("all");

  const items: PortfolioItem[] = useMemo(
    () => [
      {
        id: "grid-1",
        title: "Abstract Hex",
        imageUrl:
          "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
        category: "designed",
      },
      {
        id: "eatsome",
        title: "eatsome.",
        subtitle: "Restaurant browsing in React.js (Using Yelp API)",
        imageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        category: "coded",
        featured: true,
      },
      {
        id: "car-1",
        title: "Drive",
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        category: "coded",
      },
      {
        id: "neon-1",
        title: "Neon",
        imageUrl:
          "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
        category: "designed",
      },
      {
        id: "car-2",
        title: "Garage",
        imageUrl:
          "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80",
        category: "coded",
      },
      {
        id: "grid-2",
        title: "Abstract Grid",
        imageUrl:
          "https://images.unsplash.com/photo-1520975958225-437dce485a62?auto=format&fit=crop&w=1200&q=80",
        category: "designed",
      },
    ],
    [],
  );

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return items;
    return items.filter((x) => x.category === activeTab);
  }, [activeTab, items]);

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
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex w-full max-w-md items-center justify-center gap-10 border-t border-white/30 pt-5 text-[11px] font-semibold tracking-[0.25em] text-white/70">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={
                  activeTab === "all" ? "text-white" : "hover:text-white"
                }
              >
                {t("portfolio.tabs.all")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("coded")}
                className={
                  activeTab === "coded" ? "text-white" : "hover:text-white"
                }
              >
                {t("portfolio.tabs.coded")}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("designed")}
                className={
                  activeTab === "designed" ? "text-white" : "hover:text-white"
                }
              >
                {t("portfolio.tabs.designed")}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
            {filteredItems.map((item) => {
              const showOverlay = Boolean(item.featured);

              return (
                <div key={item.id} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />

                  <div
                    className={
                      "absolute inset-0 bg-black/55 transition-opacity " +
                      (showOverlay
                        ? "opacity-100"
                        : "opacity-0 hover:opacity-100")
                    }
                  />

                  <div
                    className={
                      "absolute inset-0 grid place-items-center p-6 transition-opacity " +
                      (showOverlay
                        ? "opacity-100"
                        : "opacity-0 hover:opacity-100")
                    }
                  >
                    <div className="text-center">
                      <p className="text-[10px] font-semibold tracking-[0.25em] text-white/80">
                        {item.category === "coded"
                          ? t("portfolio.tabs.coded")
                          : t("portfolio.tabs.designed")}
                      </p>
                      <p className="mt-3 text-3xl font-extrabold tracking-[0.1em]">
                        {item.title}
                      </p>
                      {item.subtitle ? (
                        <p className="mx-auto mt-3 max-w-xs text-[11px] leading-5 text-white/70">
                          {item.subtitle}
                        </p>
                      ) : null}

                      <div className="mt-6 flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.25em] text-white/85">
                        <Link href="/portfolio" className="hover:text-white">
                          {t("portfolio.demo")}
                        </Link>
                        <span className="h-3 w-px bg-white/40" />
                        <Link href="/portfolio" className="hover:text-white">
                          {t("portfolio.more")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[#1A1A1A] py-12 text-center">
            <p className="text-xs font-semibold tracking-[0.1em] text-white/85">
              {t("portfolio.andMore")}
            </p>
            <div className="mx-auto mt-8 h-px w-full max-w-5xl bg-white/35" />
          </div>
        </div>
      </div>
    </section>
  );
}
