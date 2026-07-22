"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, Compass, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LocaleControls } from "@/components/locale-controls";
import { Badge, Button } from "@/components/ui";
import { useI18n } from "@/hooks/use-i18n";
import { hosts } from "@/mock/data";
import { useAhlanaStore } from "@/store/use-ahlana-store";
import type { QuizAnswers } from "@/types";

function Choice({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-14 items-center justify-between rounded-2xl border px-5 py-3 text-left text-sm font-medium transition ${
        selected
          ? "border-[#214b3b] bg-[#e3ece5] text-[#214b3b] shadow-sm"
          : "border-[#d8cab8] bg-white/65 hover:border-[#aa9680] hover:bg-white"
      }`}
    >
      <span>{label}</span>
      {selected && (
        <span className="grid size-6 place-items-center rounded-full bg-[#214b3b] text-white">
          <Check className="size-3.5" />
        </span>
      )}
    </button>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const quiz = useAhlanaStore((state) => state.quiz);
  const update = useAhlanaStore((state) => state.updateQuiz);
  const finish = useAhlanaStore((state) => state.finishOnboarding);
  const score = useAhlanaStore((state) => state.matchScore);
  const { t, tOption, money } = useI18n();
  const pick = (key: keyof QuizAnswers, value: string) => update({ [key]: value });
  const toggle = (key: "languages" | "workshopPreferences" | "interests", value: string) => {
    const values = quiz[key];
    update({ [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] });
  };
  const next = () => {
    if (step === 6) {
      finish();
      setStep(7);
    } else setStep(step + 1);
  };

  const fieldLabels: Record<string, string> = {
    companions: t("onboarding.fields.companions"),
    number: t("onboarding.fields.travelers"),
    age: t("onboarding.fields.ageRange"),
    languages: t("onboarding.fields.languages"),
    hostLanguage: t("onboarding.fields.hostLanguage"),
    genderCompatibility: t("onboarding.fields.gender"),
    privacy: t("onboarding.fields.privacy"),
    children: t("onboarding.fields.children"),
    pets: t("onboarding.fields.pets"),
    environment: t("onboarding.fields.atmosphere"),
    immersion: t("onboarding.fields.immersion"),
    activityAmount: t("onboarding.fields.activityAmount"),
    carNeeded: t("onboarding.fields.rentalCar"),
    vehicleType: t("onboarding.fields.vehicleType"),
    driver: t("onboarding.fields.driver"),
    workshop: t("onboarding.fields.workshop"),
    workshopPreferences: t("onboarding.fields.workshopPreferences"),
    interests: t("onboarding.fields.interests"),
    rhythm: t("onboarding.fields.rhythm"),
    nightBudget: t("onboarding.fields.accommodation"),
    overallBudget: t("onboarding.fields.overallBudget"),
  };

  const groups: Array<{
    fields: Array<{ key: keyof QuizAnswers; options: string[]; multi?: boolean; conditional?: boolean }>;
  }> = [
    {
      fields: [
        { key: "companions", options: ["Solo traveler", "Couple", "Family", "Friends", "Organized group"] },
        { key: "number", options: ["1", "2", "3–4", "5–6", "More than 6"] },
        { key: "age", options: ["Under 18", "18–25", "26–35", "36–50", "51+"] },
        { key: "languages", options: ["Arabic", "French", "English", "Spanish", "Other"], multi: true },
        { key: "hostLanguage", options: ["Arabic", "French", "English", "No preference"] },
      ],
    },
    {
      fields: [
        { key: "genderCompatibility", options: ["Family household", "Same-gender solo host", "Host couple", "No preference"] },
        { key: "privacy", options: ["Very important", "Important", "Moderate", "Not important"] },
        { key: "children", options: ["Yes", "No", "No preference"] },
        { key: "pets", options: ["Yes", "No", "No preference"] },
        { key: "environment", options: ["Calm and relaxing", "Balanced", "Active and social"] },
      ],
    },
    {
      fields: [
        { key: "immersion", options: ["Cultural immersion", "Family experience", "Adventure", "Relaxation", "Mixed"] },
        { key: "activityAmount", options: ["None", "1–2", "3–5", "More than 5"] },
      ],
    },
    {
      fields: [
        { key: "carNeeded", options: ["Yes", "No"] },
        { key: "vehicleType", options: ["Economy", "Family", "SUV", "Luxury"], conditional: true },
        { key: "driver", options: ["Yes", "No"] },
      ],
    },
    {
      fields: [
        { key: "workshop", options: ["Yes", "No"] },
        {
          key: "workshopPreferences",
          options: ["Pottery", "Wood carving", "Traditional cooking", "No preference"],
          multi: true,
          conditional: true,
        },
      ],
    },
    {
      fields: [
        {
          key: "interests",
          options: [
            "Cultural tours",
            "Historic sites",
            "Coastal activities",
            "Hiking",
            "Mountain excursions",
            "Cooking classes",
            "Local festivals",
            "Craft workshops",
          ],
          multi: true,
        },
        { key: "rhythm", options: ["Very relaxed", "Moderately active", "Very active"] },
      ],
    },
    {
      fields: [
        {
          key: "nightBudget",
          options: ["Under 4,500 DA", "4,500–7,500 DA", "7,500–15,000 DA", "More than 15,000 DA"],
        },
        {
          key: "overallBudget",
          options: ["Eco traveler", "Moderate budget", "Premium budget", "Luxury budget"],
        },
      ],
    },
  ];

  if (step === 7) {
    return (
      <main className="min-h-screen bg-[#eee5d8] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex justify-end">
            <LocaleControls />
          </div>
          <div className="text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#214b3b] text-white">
              <Sparkles />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-[#b46d38]">{t("onboarding.resultsEyebrow")}</p>
            <h1 className="mt-3 font-serif text-5xl font-semibold">{t("onboarding.resultsTitle")}</h1>
            <p className="mx-auto mt-4 max-w-xl text-[#75665a]">{t("onboarding.resultsBody", { score })}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {hosts.slice(0, 3).map((host, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                key={host.id}
                className="overflow-hidden rounded-[1.75rem] bg-white shadow-xl"
              >
                <div className="relative h-60 bg-cover bg-center" style={{ backgroundImage: `url(${host.cover})` }}>
                  <Badge className="absolute left-4 top-4 bg-white text-[#214b3b]">
                    {t("onboarding.matchPct", { n: score - index * 2 })}
                  </Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-2xl font-bold">{host.name}</h2>
                    <BadgeCheck className="size-5 text-[#214b3b]" />
                  </div>
                  <p className="mt-1 text-sm text-[#827267]">
                    {t("onboarding.homeEnv", {
                      city: host.city,
                      environment: tOption(host.environment),
                    })}
                  </p>
                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#716157]">{host.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="size-4 fill-[#c88240] text-[#c88240]" />
                      {host.rating}
                    </span>
                    <strong>
                      {money(host.price)}
                      <small className="font-normal text-[#827267]"> {t("onboarding.perNight")}</small>
                    </strong>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild className="px-8">
              <Link href="/dashboard/hosts">
                {t("onboarding.exploreMatches")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const current = groups[step];
  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <header className="flex items-center justify-between gap-3 border-b border-[#ded1c0] px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-[#214b3b] text-white">
            <Compass className="size-5" />
          </span>
          <strong className="font-serif text-2xl">AHLANA</strong>
        </Link>
        <span className="text-sm text-[#79695e]">{t("onboarding.stepOf", { n: step + 1, total: 7 })}</span>
        <div className="flex items-center gap-3">
          <LocaleControls className="hidden sm:flex" />
          <button className="text-sm font-semibold text-[#214b3b]" onClick={() => setStep(7)}>
            {t("onboarding.skip")}
          </button>
        </div>
      </header>
      <div className="h-1.5 bg-[#e5dbcd]">
        <motion.div animate={{ width: `${((step + 1) / 7) * 100}%` }} className="h-full bg-[#d59659]" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-10 lg:grid-cols-[240px_1fr] lg:py-14">
        <aside className="hidden lg:block">
          <p className="mb-6 text-xs font-bold uppercase tracking-[.2em] text-[#9a8474]">{t("onboarding.yourJourney")}</p>
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className={`mb-1 flex items-center gap-3 rounded-xl p-3 text-sm ${
                index === step ? "bg-white font-semibold text-[#214b3b] shadow-sm" : index < step ? "text-[#567362]" : "text-[#a49488]"
              }`}
            >
              <span
                className={`grid size-7 place-items-center rounded-full text-xs ${
                  index <= step ? "bg-[#214b3b] text-white" : "bg-[#e4d9cb]"
                }`}
              >
                {index < step ? <Check className="size-3.5" /> : index + 1}
              </span>
              {t(`onboarding.steps.${index}`)}
            </div>
          ))}
        </aside>
        <section>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }}>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#b36b38]">{t(`onboarding.steps.${step}`)}</p>
              <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight">{t(`onboarding.titles.${step}`)}</h1>
              <p className="mt-3 text-[#7c6c60]">{t(`onboarding.subtitles.${step}`)}</p>
              <div className="mt-9 space-y-8">
                {current.fields
                  .filter(
                    (field) =>
                      !field.conditional ||
                      (field.key === "vehicleType" ? quiz.carNeeded === "Yes" : quiz.workshop === "Yes"),
                  )
                  .map((field) => (
                    <div key={String(field.key)}>
                      <h3 className="mb-3 text-sm font-semibold">{fieldLabels[field.key]}</h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {field.options.map((option) => {
                          const value = quiz[field.key];
                          const selected = field.multi ? (value as string[]).includes(option) : value === option;
                          return (
                            <Choice
                              key={option}
                              label={tOption(option)}
                              selected={selected}
                              onClick={() =>
                                field.multi
                                  ? toggle(field.key as "languages" | "workshopPreferences" | "interests", option)
                                  : pick(field.key, option)
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex justify-between border-t border-[#dfd3c3] pt-6">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
              <ArrowLeft className="size-4" />
              {t("common.back")}
            </Button>
            <Button onClick={next}>
              {step === 6 ? t("onboarding.reveal") : t("common.continue")}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
