import type { LanguageCode } from "@/lib/i18n/types";

/** Always Latin digits 0–9, even when UI language is Arabic. */
export function formatUiNumber(
  value: number,
  language: LanguageCode,
  options?: Intl.NumberFormatOptions,
) {
  const locale = language === "fr" ? "fr-FR" : language === "ar" ? "ar-DZ" : "en-US";
  return new Intl.NumberFormat(locale, {
    ...options,
    numberingSystem: "latn",
  }).format(value);
}

export function formatUiDate(
  date: Date,
  language: LanguageCode,
  options?: Intl.DateTimeFormatOptions,
) {
  const locale = language === "fr" ? "fr-FR" : language === "ar" ? "ar-DZ" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    ...options,
    numberingSystem: "latn",
  }).format(date);
}

export function dateFnsLocaleCode(language: LanguageCode): "enUS" | "fr" | "arDZ" {
  if (language === "fr") return "fr";
  if (language === "ar") return "arDZ";
  return "enUS";
}
