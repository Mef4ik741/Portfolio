import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "site_locale";
const SUPPORTED_LOCALES = new Set(["en", "ru", "az"]);

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get(COOKIE_NAME)?.value;
  const locale = rawLocale && SUPPORTED_LOCALES.has(rawLocale) ? rawLocale : "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
