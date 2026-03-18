import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "sv"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false, // Always use URL – /en default, no browser/cookie detection
});
