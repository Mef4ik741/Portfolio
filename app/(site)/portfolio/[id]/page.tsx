import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";

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

async function fetchProject(id: string): Promise<Project | null> {
  try {
    const h = await headers();
    const host = h.get("host");
    const forwardedProto = h.get("x-forwarded-proto");
    const protocol = forwardedProto === "https" || forwardedProto === "http" ? forwardedProto : "http";

    if (!host) return null;

    const res = await fetch(`${protocol}://${host}/api/projects/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data as Project;
  } catch {
    return null;
  }
}

async function fetchReadme(url: string): Promise<string | null> {
  try {
    const h = await headers();
    const host = h.get("host");
    const forwardedProto = h.get("x-forwarded-proto");
    const protocol = forwardedProto === "https" || forwardedProto === "http" ? forwardedProto : "http";

    if (!host) return null;

    const res = await fetch(
      `${protocol}://${host}/api/readme?url=${encodeURIComponent(url)}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function renderMarkdown(md: string) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let inCode = false;
  let codeLines: string[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="ml-5 list-disc space-y-1">
        {listItems.map((item, idx) => (
          <li key={idx}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  const flushCode = () => {
    if (codeLines.length === 0) return;
    nodes.push(
      <pre
        key={`code-${nodes.length}`}
        className="overflow-auto rounded border border-black/20 bg-black px-4 py-3 text-[12px] leading-5 text-white"
      >
        <code>{codeLines.join("\n")}</code>
      </pre>
    );
    codeLines = [];
  };

  const renderInline = (text: string) => {
    const parts: React.ReactNode[] = [];
    const re = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
      parts.push(
        <a
          key={`${m.index}-${m[2]}`}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:opacity-80"
        >
          {m[1]}
        </a>
      );
      lastIndex = m.index + m[0].length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts.length ? parts : text;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        flushList();
        inCode = true;
        codeLines = [];
      }
      i += 1;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      i += 1;
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      i += 1;
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const cls =
        level === 1
          ? "text-xl font-extrabold"
          : level === 2
            ? "text-lg font-extrabold"
            : "text-base font-extrabold";
      nodes.push(
        <p key={`h-${nodes.length}`} className={`${cls} tracking-normal`}>
          {renderInline(text)}
        </p>
      );
      i += 1;
      continue;
    }

    const listMatch = /^[-*]\s+(.*)$/.exec(trimmed);
    if (listMatch) {
      listItems.push(listMatch[1]);
      i += 1;
      continue;
    }

    flushList();
    nodes.push(
      <p key={`p-${nodes.length}`} className="tracking-normal">
        {renderInline(trimmed)}
      </p>
    );
    i += 1;
  }

  flushList();
  if (inCode) flushCode();
  return <div className="space-y-3">{nodes}</div>;
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    notFound();
  }

  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";
  const t = await getTranslations({ locale });

  const sortedImages = [...project.images].sort((a, b) => a.order - b.order);
  const readmeText = project.readme_url ? await fetchReadme(project.readme_url) : null;

  return (
    <div className="min-h-screen bg-[#D9D9D9] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-black">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-black bg-white px-4 sm:px-6 py-4 gap-3 sm:gap-0">
          <h1 className="text-xs sm:text-sm font-extrabold tracking-[0.25em] truncate">{project.name}</h1>
          <Link
            href="/portfolio"
            className="text-xs font-extrabold tracking-[0.25em] text-black/70 hover:text-black"
          >
            BACK
          </Link>
        </div>

        {/* Main content */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-12">
          {/* Left: Images */}
          <div className="lg:col-span-7">
            {sortedImages.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {/* Main image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-black bg-white">
                  <Image
                    src={sortedImages[0].url}
                    alt={project.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Thumbnails */}
                {sortedImages.length > 1 ? (
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto border-2 border-black bg-white p-3 sm:p-4">
                    {sortedImages.map((img) => (
                      <div
                        key={img.id}
                        className="relative h-16 sm:h-20 w-20 sm:w-28 shrink-0 overflow-hidden border-2 border-black/30"
                      >
                        <Image
                          src={img.url}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="aspect-[16/10] w-full border-2 border-black bg-white" />
            )}
          </div>

          {/* Right: Links & README */}
          <div className="lg:col-span-5">
            <div className="border-2 border-black bg-white p-4 sm:p-6">
              <h2 className="text-xs sm:text-sm font-extrabold tracking-[0.25em]">LINKS</h2>

              <div className="mt-4 grid gap-2 sm:gap-3">
                {project.website_url ? (
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black px-3 sm:px-4 py-2 sm:py-3 text-xs font-semibold tracking-[0.18em] hover:bg-black/5"
                  >
                    WEBSITE
                  </a>
                ) : null}
                {project.github_url ? (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black px-3 sm:px-4 py-2 sm:py-3 text-xs font-semibold tracking-[0.18em] hover:bg-black/5"
                  >
                    GITHUB
                  </a>
                ) : null}
                {project.youtube_url ? (
                  <a
                    href={project.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black px-3 sm:px-4 py-2 sm:py-3 text-xs font-semibold tracking-[0.18em] hover:bg-black/5"
                  >
                    YOUTUBE
                  </a>
                ) : null}
              </div>

              {readmeText ? (
                <>
                  <h2 className="mt-6 sm:mt-8 text-xs sm:text-sm font-extrabold tracking-[0.25em]">README</h2>
                  <div className="mt-4 max-h-[300px] sm:max-h-[400px] overflow-auto border-2 border-black p-3 sm:p-4">
                    <div className="text-xs sm:text-[13px] leading-5 sm:leading-6 text-black/85">
                      {renderMarkdown(readmeText)}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
