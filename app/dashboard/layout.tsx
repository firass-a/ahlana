"use client";

import { Command } from "cmdk";
import {
  CalendarDays, Car, CircleHelp, Compass, CreditCard, FileSignature, Gem, Hammer, HeartHandshake,
  Home, Lock, Map, Menu, MessageCircle, Package, Receipt, Search, Sparkles, User, X, Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LocaleControls } from "@/components/locale-controls";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useAhlanaStore } from "@/store/use-ahlana-store";

const topLinks = [
  ["nav.hosts", "hosts", Home],
  ["nav.cars", "cars", Car],
  ["nav.artisans", "artisans", Hammer],
  ["nav.activities", "activities", Compass],
  ["nav.vrCities", "vr-cities", Zap],
  ["nav.journal", "journal", Sparkles],
  ["nav.support", "support", CircleHelp],
  ["nav.hiddenGems", "hidden-gems", Gem],
  ["nav.hostPremium", "host-premium", HeartHandshake],
  ["nav.profile", "profile", User],
] as const;

const journeyOrder = ["build-package", "calendar", "chat"] as const;

const journeyLinks: { slug: (typeof journeyOrder)[number]; icon: typeof Package; labelKey: string; step: 1 | 2 | 3 }[] = [
  { slug: "build-package", icon: Package, labelKey: "nav.buildPackage", step: 1 },
  { slug: "calendar", icon: CalendarDays, labelKey: "nav.calendar", step: 2 },
  { slug: "chat", icon: MessageCircle, labelKey: "nav.chat", step: 3 },
];

const sideLinkKeys: { slug: string; icon: typeof Package; labelKey: string }[] = [
  { slug: "contracts", icon: FileSignature, labelKey: "nav.contracts" },
  { slug: "trip-map", icon: Map, labelKey: "nav.tripMap" },
  { slug: "payment", icon: CreditCard, labelKey: "nav.payment" },
  { slug: "invoices", icon: Receipt, labelKey: "nav.invoices" },
];

function requiredStepForPath(pathname: string): 1 | 2 | 3 | null {
  if (pathname.includes("/calendar")) return 2;
  if (pathname.includes("/chat")) return 3;
  if (pathname.includes("/build-package")) return 1;
  return null;
}

function pathForStep(step: 1 | 2 | 3) {
  return `/dashboard/${journeyOrder[step - 1]}`;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const currentUser = useAhlanaStore((state) => state.currentUser);
  const language = useAhlanaStore((state) => state.language);
  const packageSelection = useAhlanaStore((state) => state.packageSelection);
  const journeyUnlocked = useAhlanaStore((state) => state.journeyUnlocked);
  const journeyStep = pathname.includes("calendar")
    ? 2
    : pathname.includes("chat")
      ? 3
      : pathname.includes("build-package")
        ? 1
        : packageSelection.confirmed
          ? Math.min(journeyUnlocked, 2)
          : 1;
  const tripPct = journeyUnlocked === 3 ? 100 : journeyUnlocked === 2 ? 66 : 33;

  useEffect(() => {
    const needed = requiredStepForPath(pathname);
    if (needed && needed > journeyUnlocked) {
      router.replace(pathForStep(journeyUnlocked));
    }
  }, [pathname, journeyUnlocked, router]);

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "ar" ? "ar" : language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const goJourney = (step: 1 | 2 | 3) => {
    if (step > journeyUnlocked) {
      toast.info(t(language, "package.stepLocked"));
      return;
    }
    navigate(journeyOrder[step - 1]);
  };

  const navigate = (slug: string) => {
    const journey = journeyLinks.find((item) => item.slug === slug);
    if (journey && journey.step > journeyUnlocked) {
      toast.info(t(language, "package.stepLocked"));
      setCommandOpen(false);
      setMobile(false);
      return;
    }
    router.push(`/dashboard/${slug}`);
    setCommandOpen(false);
    setMobile(false);
  };

  const navItems = [
    ...topLinks.map(([labelKey, slug, icon]) => [t(language, labelKey), slug, icon] as const),
    ...journeyLinks.map(({ slug, icon, labelKey }) => [t(language, labelKey), slug, icon] as const),
    ...sideLinkKeys.map(({ slug, icon, labelKey }) => [t(language, labelKey), slug, icon] as const),
  ];

  return (
    <div className="min-h-screen bg-[#f5efe6]">
      <header className="sticky top-0 z-40 border-b border-[#dacdbb] bg-[#f8f2e9]/90 backdrop-blur-xl">
        <div className="flex h-[70px] items-center gap-3 px-4 lg:px-7">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-[#214b3b] text-white">
              <Compass className="size-5" />
            </span>
            <strong className="hidden font-serif text-2xl tracking-wide xl:block">AHLANA</strong>
          </Link>
          <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex">
            {topLinks.map(([labelKey, slug]) => (
              <Link
                key={slug}
                href={`/dashboard/${slug}`}
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition hover:bg-white",
                  pathname.includes(slug) ? "bg-[#214b3b] text-white hover:bg-[#214b3b]" : "text-[#69594e]",
                )}
              >
                {t(language, labelKey)}
              </Link>
            ))}
          </nav>
          <LocaleControls className="hidden md:flex" />
          <button
            onClick={() => setCommandOpen(true)}
            className="ml-auto hidden items-center gap-2 rounded-full border border-[#d7c9b7] bg-white/70 px-3 py-2 text-xs text-[#8a796d] sm:flex lg:ml-0"
          >
            <Search className="size-4" />
            {t(language, "layout.searchHint")} <kbd className="rounded bg-[#eee5d9] px-1.5 py-0.5">⌘K</kbd>
          </button>
          <Link href="/dashboard/profile" className="size-9 overflow-hidden rounded-full border-2 border-white shadow">
            <img src={currentUser?.avatar} alt="" className="size-full object-cover" />
          </Link>
          <button className="lg:hidden" onClick={() => setMobile(true)}>
            <Menu />
          </button>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-[70px] hidden h-[calc(100vh-70px)] w-[230px] shrink-0 border-r border-[#dacdbb] bg-[#efe5d8]/70 p-4 lg:block">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#998677]">
            {t(language, "nav.startJourney")}
          </p>
          <div className="mb-3 flex items-center gap-1 px-2">
            {journeyLinks.map((item, index) => {
              const step = item.step;
              const unlocked = step <= journeyUnlocked;
              const done = journeyUnlocked > step;
              const current = journeyStep === step;
              return (
                <div key={item.slug} className="flex flex-1 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => goJourney(step)}
                    disabled={!unlocked}
                    title={t(language, item.labelKey)}
                    className={cn(
                      "grid size-7 place-items-center rounded-full text-[10px] font-bold transition",
                      current || done
                        ? "bg-[#214b3b] text-white"
                        : unlocked
                          ? "bg-[#d5e2d8] text-[#214b3b] hover:bg-[#214b3b] hover:text-white"
                          : "cursor-not-allowed bg-[#e4d8c8] text-[#8a786c]",
                    )}
                  >
                    {unlocked ? step : <Lock className="size-3" />}
                  </button>
                  {index < journeyLinks.length - 1 && (
                    <span className={cn("h-0.5 flex-1 rounded-full", journeyUnlocked > step ? "bg-[#214b3b]" : "bg-[#e4d8c8]")} />
                  )}
                </div>
              );
            })}
          </div>
          <nav className="space-y-1">
            {journeyLinks.map(({ slug, icon: Icon, labelKey, step }) => {
              const unlocked = step <= journeyUnlocked;
              const active = pathname.includes(slug);
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => goJourney(step)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition",
                    active
                      ? "bg-white text-[#214b3b] shadow-sm"
                      : unlocked
                        ? "text-[#6f5f54] hover:bg-white/60"
                        : "cursor-not-allowed text-[#b0a194]",
                  )}
                >
                  <Icon className="size-4.5 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{t(language, labelKey)}</span>
                  {!unlocked && <Lock className="size-3.5 shrink-0 opacity-70" />}
                </button>
              );
            })}
          </nav>
          <p className="mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#998677]">
            {t(language, "common.navigate")}
          </p>
          <nav className="space-y-1">
            {sideLinkKeys.map(({ slug, icon: Icon, labelKey }) => (
              <Link
                key={slug}
                href={`/dashboard/${slug}`}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                  pathname.includes(slug) ? "bg-white text-[#214b3b] shadow-sm" : "text-[#6f5f54] hover:bg-white/60",
                )}
              >
                <Icon className="size-4.5" />
                {t(language, labelKey)}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-[#214b3b] p-4 text-white">
            <Sparkles className="size-5 text-[#e9b87b]" />
            <p className="mt-3 font-serif text-lg font-bold">{t(language, "package.tripReady", { pct: tripPct })}</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-[#e1a968]" style={{ width: `${tripPct}%` }} />
            </div>
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 bg-[#f5eee4] p-5 lg:hidden">
          <div className="flex items-center justify-between">
            <strong className="font-serif text-2xl">AHLANA</strong>
            <button onClick={() => setMobile(false)}>
              <X />
            </button>
          </div>
          <LocaleControls className="mt-5" />
          <div className="mt-6 grid grid-cols-2 gap-2">
            {navItems.map(([label, slug, Icon]) => (
              <button
                key={slug}
                onClick={() => navigate(slug)}
                className="flex items-center gap-2 rounded-xl bg-white p-4 text-left text-sm"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {commandOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/45 p-4 pt-[15vh] backdrop-blur-sm"
          onMouseDown={() => setCommandOpen(false)}
        >
          <Command
            className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-[#fbf7f0] shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#dfd3c3] px-5">
              <Search className="size-5 text-[#8d7d70]" />
              <Command.Input
                autoFocus
                placeholder={t(language, "layout.searchPlaceholder")}
                className="h-16 flex-1 bg-transparent outline-none"
              />
              <button onClick={() => setCommandOpen(false)}>
                <X className="size-4" />
              </button>
            </div>
            <Command.List className="max-h-80 overflow-auto p-2">
              <Command.Empty className="p-8 text-center text-sm text-[#88776b]">{t(language, "layout.noJourneys")}</Command.Empty>
              <Command.Group heading={t(language, "common.navigate")} className="p-2 text-xs text-[#988577]">
                {navItems.map(([label, slug, Icon]) => (
                  <Command.Item
                    key={slug}
                    onSelect={() => navigate(slug)}
                    className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm text-[#49382e] data-[selected=true]:bg-[#e8eee5]"
                  >
                    <Icon className="size-4" />
                    {label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      )}
    </div>
  );
}
