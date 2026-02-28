import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import "../globals.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navbar />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}
