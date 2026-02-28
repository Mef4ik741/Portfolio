import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Rauf Nabiyev - Back-end Developer",
};

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  const messages = (await import(`../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
