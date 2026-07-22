"use client";

import { useI18n } from "@/hooks/use-i18n";
import { CURRENCY_OPTIONS, type CurrencyCode } from "@/lib/currency";
import { LANGUAGE_OPTIONS, type LanguageCode } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useAhlanaStore } from "@/store/use-ahlana-store";

export function LocaleControls({
  className,
  showCurrency = true,
}: {
  className?: string;
  showCurrency?: boolean;
}) {
  const { t } = useI18n();
  const language = useAhlanaStore((state) => state.language);
  const currency = useAhlanaStore((state) => state.currency);
  const setLanguage = useAhlanaStore((state) => state.setLanguage);
  const setCurrency = useAhlanaStore((state) => state.setCurrency);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex rounded-full border border-[#d7c9b7] bg-white/80 p-0.5" role="group" aria-label={t("common.language")}>
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code as LanguageCode)}
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-bold transition",
              language === option.code ? "bg-[#214b3b] text-white" : "text-[#7a6a5e] hover:bg-[#f3ebe0]",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {showCurrency ? (
        <div className="flex rounded-full border border-[#d7c9b7] bg-white/80 p-0.5" role="group" aria-label={t("common.currency")}>
          {CURRENCY_OPTIONS.map((option) => (
            <button
              key={option.code}
              type="button"
              onClick={() => setCurrency(option.code as CurrencyCode)}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-bold transition",
                currency === option.code ? "bg-[#214b3b] text-white" : "text-[#7a6a5e] hover:bg-[#f3ebe0]",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
