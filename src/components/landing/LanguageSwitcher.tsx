"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // pathname from next/navigation includes locale: /en, /sv, etc.
  const pathWithoutLocale = pathname.replace(/^\/(en|sv)/, "") || "/";
  const enHref = `/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  const svHref = `/sv${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

  return (
    <div className={styles.switcherWrap}>
      <a
        href={enHref}
        className={`${styles.switcherLink} ${locale === "en" ? styles.switcherActive : ""}`}
        aria-label="English"
      >
        EN
      </a>
      <span className={styles.switcherDivider}>|</span>
      <a
        href={svHref}
        className={`${styles.switcherLink} ${locale === "sv" ? styles.switcherActive : ""}`}
        aria-label="Svenska"
      >
        SV
      </a>
    </div>
  );
}
