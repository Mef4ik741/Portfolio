"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();

  return (
    <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {projects.map((project) => {
        const preview = project.images?.[0]?.url || null;

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => router.push(`/portfolio/${project.id}`)}
            className="group text-left"
          >
            <div className="overflow-hidden border-2 border-black bg-white shadow-[0_10px_18px_rgba(0,0,0,0.10)] transition-transform group-hover:-translate-y-0.5">
              <div className="relative aspect-[4/3] w-full bg-[#D9D9D9]">
                {preview ? (
                  <Image
                    src={preview}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="border-t-2 border-black px-4 py-3">
                <p className="text-[11px] font-extrabold tracking-[0.22em] text-black">
                  {project.name}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
