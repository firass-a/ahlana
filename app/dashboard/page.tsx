"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CloudSun, MapPin, MessageCircle, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";
import { useI18n } from "@/hooks/use-i18n";
import { activities, hosts } from "@/mock/data";
import { useAhlanaStore } from "@/store/use-ahlana-store";

export default function DashboardPage() {
  const user = useAhlanaStore((state) => state.currentUser);
  const bookings = useAhlanaStore((state) => state.bookings);
  const { t } = useI18n();
  const firstName = user?.name.split(" ")[0] ?? "";

  return (
    <main className="mx-auto max-w-[1500px] p-5 md:p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-[#8a786a]">{t("dashHome.dateLine")}</p>
          <h1 className="mt-1 font-serif text-4xl font-semibold">
            {t("dashHome.greeting", { name: firstName })}{" "}
            <span className="text-[#c17a41]">{t("dashHome.ready")}</span>
          </h1>
        </div>
        <Button asChild>
          <Link href="/dashboard/build-package">
            <Sparkles className="size-4" />
            {t("dashHome.continuePackage")}
          </Link>
        </Button>
      </div>
      <div className="mt-7 grid gap-5 lg:grid-cols-[1.5fr_.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative min-h-[350px] overflow-hidden rounded-[2rem] bg-cover bg-center p-7 text-white"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(25,32,23,.86),rgba(25,32,23,.2)),url(https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1400&q=85)",
          }}
        >
          <Badge className="bg-white/15 text-white">{t("dashHome.upcoming")}</Badge>
          <div className="absolute bottom-7 left-7">
            <p className="flex items-center gap-2 text-sm text-white/70">
              <MapPin className="size-4" />
              {t("dashHome.route")}
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold">{t("dashHome.sevenDays")}</h2>
            <div className="mt-5 flex gap-3">
              <Button asChild variant="secondary">
                <Link href="/dashboard/trip-map">{t("dashHome.viewItinerary")}</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white">
                <Link href="/dashboard/contracts">{t("dashHome.openContract")}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Card className="p-6">
            <div className="flex justify-between">
              <div className="grid size-11 place-items-center rounded-2xl bg-[#e6eee6] text-[#214b3b]">
                <CalendarDays />
              </div>
              <Badge>{t("dashHome.daysAway", { n: 6 })}</Badge>
            </div>
            <p className="mt-6 text-sm text-[#837266]">{t("dashHome.nextReservation")}</p>
            <h3 className="mt-1 font-serif text-2xl font-bold">{bookings[1]?.title}</h3>
            <p className="mt-2 text-sm text-[#837266]">{t("dashHome.confirmedOn")}</p>
          </Card>
          <Card className="bg-[#dca269] p-6">
            <CloudSun className="size-8" />
            <p className="mt-8 text-sm">{t("dashHome.weatherCity")}</p>
            <h3 className="font-serif text-2xl font-bold">{t("dashHome.weatherTitle")}</h3>
            <p className="mt-1 text-sm text-[#59402c]">{t("dashHome.weatherBody")}</p>
          </Card>
        </div>
      </div>
      <div className="mt-9 flex items-center justify-between">
        <h2 className="font-serif text-3xl font-bold">{t("dashHome.picked")}</h2>
        <Link href="/dashboard/activities" className="flex items-center gap-1 text-sm font-semibold text-[#214b3b]">
          {t("dashHome.seeAll")} <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[hosts[2], activities[3], hosts[6], activities[8]].map((item, index) => {
          const title = "title" in item ? item.title : item.name;
          return (
            <Link
              href={index % 2 ? "/dashboard/activities" : "/dashboard/hosts"}
              key={item.id}
              className="group overflow-hidden rounded-[1.5rem] bg-white shadow-sm"
            >
              <div
                className="h-48 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.cover})` }}
              />
              <div className="p-4">
                <h3 className="font-serif text-xl font-bold">{title}</h3>
                <div className="mt-2 flex justify-between text-sm text-[#7e6d61]">
                  <span>{item.city}</span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5 fill-[#c57a3b] text-[#c57a3b]" />
                    {item.rating}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card className="p-5">
          <MessageCircle className="text-[#214b3b]" />
          <h3 className="mt-4 font-semibold">{t("dashHome.newMessages", { n: 3 })}</h3>
          <p className="mt-1 text-sm text-[#837266]">{t("dashHome.messagesBody")}</p>
        </Card>
        <Card className="p-5">
          <Sparkles className="text-[#c57a3b]" />
          <h3 className="mt-4 font-semibold">{t("dashHome.dailyMission")}</h3>
          <p className="mt-1 text-sm text-[#837266]">{t("dashHome.missionBody")}</p>
        </Card>
        <Card className="p-5">
          <Star className="text-[#c57a3b]" />
          <h3 className="mt-4 font-semibold">{t("dashHome.travelScore")}</h3>
          <p className="mt-1 text-sm text-[#837266]">{t("dashHome.scoreBody")}</p>
        </Card>
      </div>
    </main>
  );
}
