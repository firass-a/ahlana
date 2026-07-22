export type CurrencyCode = "DZD" | "EUR" | "USD";

/** Mock prices in the catalog are stored in Algerian dinars. */
const FROM_DZD: Record<CurrencyCode, number> = {
  DZD: 1,
  EUR: 1 / 145,
  USD: 1 / 134,
};

const LOCALE: Record<CurrencyCode, string> = {
  DZD: "fr-DZ",
  EUR: "fr-FR",
  USD: "en-US",
};

const SUFFIX: Record<CurrencyCode, string> = {
  DZD: "DA",
  EUR: "€",
  USD: "$",
};

export const CURRENCY_OPTIONS: { code: CurrencyCode; label: string }[] = [
  { code: "DZD", label: "DA" },
  { code: "EUR", label: "EUR" },
  { code: "USD", label: "USD" },
];

export function convertFromDzd(valueInDzd: number, currency: CurrencyCode) {
  return valueInDzd * FROM_DZD[currency];
}

export function formatCurrency(valueInDzd: number, currency: CurrencyCode = "DZD") {
  const amount = convertFromDzd(valueInDzd, currency);
  // Always Latin digits 0-9 — never Eastern Arabic numerals
  const formatted = new Intl.NumberFormat(LOCALE[currency], {
    maximumFractionDigits: currency === "DZD" ? 0 : 2,
    minimumFractionDigits: currency === "DZD" ? 0 : 2,
    numberingSystem: "latn",
  }).format(amount);
  if (currency === "EUR") return `${formatted} ${SUFFIX.EUR}`;
  if (currency === "USD") return `${SUFFIX.USD}${formatted}`;
  return `${formatted} ${SUFFIX.DZD}`;
}
