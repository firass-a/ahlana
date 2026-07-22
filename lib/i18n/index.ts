import type { LanguageCode } from "./types";
import { en } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";

export type { LanguageCode } from "./types";
export { LANGUAGE_OPTIONS } from "./types";
export { formatUiNumber, formatUiDate, dateFnsLocaleCode } from "./format";

export const messages = { en, fr, ar } as const;
export type MessageTree = typeof en;

/** Flat keys used by earlier PackagePage / layout → dotted catalog paths */
const LEGACY: Record<string, string> = {
  startJourney: "nav.startJourney",
  buildPackage: "nav.buildPackage",
  calendar: "nav.calendar",
  chat: "nav.chat",
  contracts: "nav.contracts",
  tripMap: "nav.tripMap",
  payment: "nav.payment",
  invoices: "nav.invoices",
  tripReady: "package.tripReady",
  packageEyebrow: "package.eyebrow",
  packageTitle: "package.title",
  packageDesc: "package.desc",
  liveSummary: "package.liveSummary",
  savePackage: "package.savePackage",
  chooseHost: "package.chooseHost",
  chooseCar: "package.chooseCar",
  chooseArtisan: "package.chooseArtisan",
  chooseActivities: "package.chooseActivities",
  selected: "common.selected",
  chooseOne: "common.chooseOne",
  total: "common.total",
  nights: "common.nights",
  calendarEyebrow: "package.calendarEyebrow",
  calendarTitle: "package.calendarTitle",
  calendarDesc: "package.calendarDesc",
  tripDates: "package.tripDates",
  scheduleServices: "package.scheduleServices",
  hostStay: "package.hostStay",
  carRental: "package.carRental",
  artisanWorkshop: "package.artisanWorkshop",
  activity: "package.activity",
  pickDate: "package.pickDate",
  pickRange: "package.pickRange",
  withinTrip: "package.withinTrip",
  continueChat: "package.continueChat",
  backToPackage: "package.backToPackage",
  backToCalendar: "package.backToCalendar",
  stepLocked: "package.stepLocked",
  packageIncomplete: "package.packageIncomplete",
  packageSaved: "package.packageSaved",
  datesSaved: "package.datesSaved",
  clearDates: "package.clearDates",
  stepOf: "package.stepOf",
  checkInOut: "package.checkInOut",
  yourStay: "package.yourStay",
};

type Path = string;

function getPath(tree: unknown, path: Path): string | undefined {
  const parts = path.split(".");
  let node: unknown = tree;
  for (const part of parts) {
    if (node == null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : undefined;
}

function resolveKey(key: Path) {
  return LEGACY[key] ?? key;
}

/** Translate a dotted key (or legacy flat key). Falls back to English. */
export function t(language: LanguageCode, key: Path, vars?: Record<string, string | number>) {
  const path = resolveKey(key);
  let text = getPath(messages[language], path) ?? getPath(messages.en, path) ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

/** Look up a translated label for an English option value (onboarding / filters). */
export function tOption(language: LanguageCode, englishValue: string) {
  const mapped =
    getPath(messages[language], `options.${englishValue}`) ??
    getPath(messages.en, `options.${englishValue}`);
  return mapped ?? englishValue;
}

export type TranslationKey = string;
