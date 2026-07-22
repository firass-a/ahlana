export const JOURNEY_TOTAL = 7;

export const journeyOrder = [
  "build-package",
  "calendar",
  "chat",
  "contracts",
  "invoices",
  "payment",
  "trip-map",
] as const;

export type JourneySlug = (typeof journeyOrder)[number];
export type JourneyStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function journeyStepFromPath(pathname: string): JourneyStep | null {
  const index = journeyOrder.findIndex((slug) => pathname.includes(`/${slug}`));
  if (index < 0) return null;
  return (index + 1) as JourneyStep;
}

export function pathForJourneyStep(step: JourneyStep) {
  return `/dashboard/${journeyOrder[step - 1]}`;
}

export function tripProgressPct(unlocked: JourneyStep) {
  return Math.round((unlocked / JOURNEY_TOTAL) * 100);
}
