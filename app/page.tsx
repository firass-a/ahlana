"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Car, Compass, HeartHandshake, MapPin, Menu, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { LocaleControls } from "@/components/locale-controls";
import { Badge, Button } from "@/components/ui";
import { useI18n } from "@/hooks/use-i18n";
import { activities, artisans, hosts, vehicles } from "@/mock/data";

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className={`grid size-9 place-items-center rounded-full ${light ? "bg-white/15" : "bg-[#214b3b]"} text-white`}>
        <Compass className="size-5" />
      </span>
      <span className={`font-serif text-2xl font-bold tracking-wide ${light ? "text-white" : "text-[#3a281e]"}`}>AHLANA</span>
    </Link>
  );
}

export default function Home() {
  const { t } = useI18n();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, dragFree: false });

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = window.setInterval(() => emblaApi.scrollNext(), 3500);
    return () => window.clearInterval(autoplay);
  }, [emblaApi]);

  const featureCards = [
    { id: "stay", Icon: Users, title: t("landing.cardStayTitle"), text: t("landing.cardStayBody") },
    { id: "make", Icon: HeartHandshake, title: t("landing.cardMakeTitle"), text: t("landing.cardMakeBody") },
    { id: "wander", Icon: Compass, title: t("landing.cardWanderTitle"), text: t("landing.cardWanderBody") },
    { id: "move", Icon: Car, title: t("landing.cardMoveTitle"), text: t("landing.cardMoveBody") },
  ] as const;

  const stats = [
    ["20+", t("landing.statHomes")],
    ["30+", t("landing.statAdventures")],
    ["4.9", t("landing.statRating")],
  ] as const;

  return (
    <main className="overflow-hidden bg-[#f5eee4]">
      <section className="relative min-h-[92vh] overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(29,20,14,.84),rgba(29,20,14,.34),rgba(29,20,14,.08)),url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2000&q=90)",
          }}
        />
        <nav className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-7 lg:px-10">
          <Logo light />
          <div className="hidden gap-8 text-sm text-white/90 md:flex">
            <a href="#experiences">{t("nav.experiences")}</a>
            <a href="#matching">{t("nav.smartMatching")}</a>
            <a href="#stories">{t("nav.stories")}</a>
          </div>
          <div className="flex items-center gap-3">
            <LocaleControls
              showCurrency={false}
              className="hidden sm:flex [&_button]:border-white/20 [&_button]:bg-white/10 [&_button]:text-white [&_div]:border-white/25 [&_div]:bg-white/10"
            />
            <div className="hidden gap-3 sm:flex">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link href="/login">{t("nav.signIn")}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/signup">{t("nav.createAccount")}</Link>
              </Button>
            </div>
            <Menu className="text-white sm:hidden" />
          </div>
        </nav>
        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[1400px] items-center px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              <Sparkles className="size-4 text-[#f0b879]" />
              {t("landing.heroBadge")}
            </div>
            <h1 className="font-serif text-6xl font-semibold leading-[.94] tracking-[-.03em] text-white sm:text-7xl lg:text-[96px]">
              {t("landing.heroTitle")}
              <br />
              <em className="text-[#edbd87]">{t("landing.heroEm")}</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">{t("landing.heroBody")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="secondary" className="h-13 px-7">
                <Link href="/signup">
                  {t("landing.startHere")} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-13 border-white/30 bg-white/10 px-7 text-white backdrop-blur-md hover:bg-white/20">
                <Link href="/dashboard">{t("landing.ctaExplore")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 z-10 hidden w-[42%] rounded-tl-[2.5rem] bg-[#f4ede2]/92 px-8 py-6 backdrop-blur-xl lg:block">
          <div className="grid grid-cols-3 gap-5">
            {stats.map(([a, b]) => (
              <div key={b}>
                <div className="font-serif text-3xl font-bold text-[#2e4b3c]">{a}</div>
                <div className="text-xs uppercase tracking-wider text-[#78685c]">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10" id="experiences">
        <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#b66c36]">{t("landing.expEyebrow")}</p>
            <h2 className="max-w-2xl font-serif text-5xl font-semibold leading-tight">{t("landing.expTitle")}</h2>
          </div>
          <p className="max-w-md leading-7 text-[#716055]">{t("landing.expBody")}</p>
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(({ id, Icon, title, text }, i) => (
            <motion.div
              key={id}
              initial={reveal.initial}
              whileInView={reveal.whileInView}
              viewport={reveal.viewport}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="group rounded-[1.75rem] border border-[#d9cbb8] bg-white/65 p-7 transition hover:-translate-y-2 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-7 grid size-12 place-items-center rounded-2xl bg-[#e1ebe3] text-[#214b3b]">
                <Icon />
              </div>
              <h3 className="font-serif text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#79685b]">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="matching" className="bg-[#234638] py-24 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
          <motion.div {...reveal}>
            <Badge className="bg-white/10 text-[#f2c48f]">{t("landing.matchBadge")}</Badge>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-tight">
              {t("landing.matchTitle")}
              <br />
              {t("landing.matchTitle2")}
            </h2>
            <p className="mt-6 max-w-lg leading-7 text-white/65">{t("landing.matchBody")}</p>
            <Button asChild variant="secondary" className="mt-8">
              <Link href="/onboarding">
                {t("landing.matchCta")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div {...reveal} className="rounded-[2rem] border border-white/15 bg-white/8 p-6">
            <div className="mb-5 flex justify-between">
              <span className="text-sm text-white/60">{t("landing.topMatch")}</span>
              <Badge className="bg-[#d59659] text-[#2d2019]">{t("landing.compatible", { pct: 96 })}</Badge>
            </div>
            <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
              <div className="h-52 rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${hosts[1].cover})` }} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-3xl font-semibold">{hosts[1].name}</h3>
                  <BadgeCheck className="size-5 text-[#e5b273]" />
                </div>
                <p className="mt-1 flex items-center gap-1 text-sm text-white/55">
                  <MapPin className="size-3.5" />
                  {hosts[1].city}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[t("landing.tagFrench"), t("landing.tagCalm"), t("landing.tagCulture")].map((x) => (
                    <span key={x} className="rounded-full bg-white/10 px-3 py-1.5 text-xs">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm">
                  <Star className="size-4 fill-[#e9b87b] text-[#e9b87b]" />
                  <strong>4.9</strong>
                  <span className="text-white/45">{t("landing.reviews", { n: 48 })}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24" id="stories">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div {...reveal} className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#b66c36]">{t("landing.storiesEyebrow")}</p>
            <h2 className="mt-3 font-serif text-5xl font-semibold">{t("landing.storiesTitle")}</h2>
          </motion.div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-5 flex">
              {[hosts[0], artisans[2], activities[4], vehicles[3], hosts[6]].map((item, i) => {
                const title = "title" in item ? item.title : item.name;
                return (
                  <div className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_48%] lg:flex-[0_0_31%]" key={`${title}-${i}`}>
                    <Link href="/dashboard" className="group block overflow-hidden rounded-[1.7rem] bg-white shadow-sm">
                      <div className="h-72 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${item.cover})` }} />
                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#a86738]">{t("landing.localExperience")}</p>
                        <h3 className="mt-2 font-serif text-2xl font-bold">{title}</h3>
                        <p className="mt-2 flex items-center gap-1 text-sm text-[#817064]">
                          <MapPin className="size-3.5" />
                          {item.city}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10">
        <motion.div {...reveal} className="relative overflow-hidden rounded-[2.5rem] bg-[#d7a066] px-7 py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[.25em]">{t("landing.inviteEyebrow")}</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-5xl font-semibold leading-tight">
            {t("landing.inviteTitle")}
            <br />
            {t("landing.inviteTitle2")}
          </h2>
          <Button asChild className="mt-8">
            <Link href="/signup">
              {t("landing.inviteCta")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </section>
      <footer className="wood-texture text-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-4 lg:px-10">
          <div>
            <Logo light />
            <p className="mt-5 text-sm text-white/55">{t("landing.footerTag")}</p>
          </div>
          {[t("landing.footerExplore"), t("landing.footerAhlana"), t("landing.footerSupport")].map((x) => (
            <div key={x}>
              <h4 className="font-semibold">{x}</h4>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/50">{t("landing.footerLinks")}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">{t("landing.footerCopy")}</div>
      </footer>
    </main>
  );
}
