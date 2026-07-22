"use client";

import { t, tOption, formatUiDate, formatUiNumber, type LanguageCode } from "@/lib/i18n";
import { formatCurrency, type CurrencyCode } from "@/lib/currency";
import { useAhlanaStore } from "@/store/use-ahlana-store";

export function useI18n() {
  const language = useAhlanaStore((s) => s.language);
  const currency = useAhlanaStore((s) => s.currency);
  return {
    language,
    currency,
    t: (key: string, vars?: Record<string, string | number>) => t(language, key, vars),
    tOption: (value: string) => tOption(language, value),
    money: (valueInDzd: number) => formatCurrency(valueInDzd, currency),
    number: (value: number, options?: Intl.NumberFormatOptions) =>
      formatUiNumber(value, language, options),
    date: (value: Date, options?: Intl.DateTimeFormatOptions) =>
      formatUiDate(value, language, options),
  };
}

export type { LanguageCode, CurrencyCode };
