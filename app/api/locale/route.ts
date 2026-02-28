import { NextResponse } from "next/server";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { locale?: string }
    | null;

  const locale = body?.locale;

  if (!locale || !SUPPORTED_LOCALES.has(locale)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
