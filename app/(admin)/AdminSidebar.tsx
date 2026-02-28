"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import itbLogo from "../pngs/logo.png";

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1A1A1A] text-white">
      <div className="flex flex-col p-6">
        {/* Logo */}
        <div className="mb-6">
          <Image src={itbLogo} alt="Logo" width={60} height={60} priority />
        </div>

        {/* Title */}
        <h1 className="mb-8 text-lg font-semibold tracking-wide text-white/90">
          Админ-Панель
        </h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <Link
            href="/admin/upload"
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              isActive("/admin/upload")
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Загрузить проект
          </Link>
          <Link
            href="/admin/projects"
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              isActive("/admin/projects")
                ? "bg-white/20 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            Показать проекты
          </Link>
        </nav>

        {/* Back to site link */}
        <div className="mt-auto pt-8">
          <Link
            href="/"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            ← Вернуться на сайт
          </Link>
        </div>
      </div>
    </aside>
  );
}
