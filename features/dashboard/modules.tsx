"use client";

import dynamic from "next/dynamic";
import { DayPicker, type DateRange } from "react-day-picker";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import {
  AlertTriangle, ArrowLeft, ArrowRight, Award, BadgeCheck, Bell, CalendarDays, Check, CheckCircle2, ChevronRight, Download,
  FileText, Globe2, Lock, MapPin, MessageCircle, MoreHorizontal, Palette, Paperclip, PenLine, Phone, PhoneCall, Plus,
  Receipt, Search, Send, ShieldCheck, Smile, Sparkles, Star, Trash2, User, Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge, Button, Card, Input, Modal } from "@/components/ui";
import { useI18n } from "@/hooks/use-i18n";
import { t, formatUiDate, type TranslationKey } from "@/lib/i18n";
import { formatCurrency } from "@/lib/utils";
import { activities, artisans, contracts, hiddenGems, hosts, vehicles } from "@/mock/data";
import { useAhlanaStore } from "@/store/use-ahlana-store";
import type { MapPoint } from "@/components/travel-map";

const TravelMap = dynamic(()=>import("@/components/travel-map"),{ssr:false,loading:()=> <div className="h-[500px] animate-pulse rounded-2xl bg-[#dce4d6]"/>});
const stats=[{month:"Feb",views:1240,revenue:243000},{month:"Mar",views:1590,revenue:321000},{month:"Apr",views:1830,revenue:352500},{month:"May",views:2120,revenue:438000},{month:"Jun",views:2680,revenue:546000},{month:"Jul",views:3140,revenue:631500}];

function Header({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}) {
  return <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#b36d39]">{eyebrow}</p><h1 className="mt-2 font-serif text-5xl font-semibold">{title}</h1>{description&&<p className="mt-3 max-w-2xl text-sm leading-6 text-[#7c6c60]">{description}</p>}</div>;
}

export function JournalPage() {
  const { t } = useI18n();
  const notes=useAhlanaStore(s=>s.journalNotes), add=useAhlanaStore(s=>s.addJournalNote), xp=useAhlanaStore(s=>s.xp);
  const [text,setText]=useState("");
  const missions=[t("journal.mission1"),t("journal.mission2"),t("journal.mission3")];
  return <main className="mx-auto max-w-[1400px] p-5 md:p-8"><Header eyebrow={t("journal.eyebrow")} title={t("journal.title")} description={t("journal.desc")}/>
    <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]"><motion.div initial={{rotateY:-8,opacity:0}} animate={{rotateY:0,opacity:1}} className="grid min-h-[590px] overflow-hidden rounded-[1.5rem] border-8 border-[#51372a] bg-[#fbf4df] shadow-2xl md:grid-cols-2">
      <div className="relative border-b border-[#cdbf9f] p-8 md:border-b-0 md:border-r"><span className="text-xs text-[#9d8768]">{t("journal.datePlace")}</span><h2 className="handwriting mt-5 text-4xl text-[#4c3528]">{t("journal.pageTitle")}</h2><div className="mt-6 h-52 rotate-[-2deg] rounded-sm border-8 border-white bg-cover bg-center shadow-lg" style={{backgroundImage:`url(${hiddenGems[3].image})`}}/><p className="handwriting mt-7 leading-8 text-[#5e493c]">{notes[0]}</p><span className="absolute bottom-4 left-1/2 text-xs text-[#a8977c]">12</span></div>
      <div className="relative p-8"><h3 className="handwriting text-3xl">{t("journal.writeTitle")}</h3><textarea value={text} onChange={e=>setText(e.target.value)} className="handwriting mt-6 h-72 w-full resize-none bg-[linear-gradient(transparent_31px,#d8ceb8_32px)] bg-[length:100%_32px] text-lg leading-8 outline-none" placeholder={t("journal.placeholder")}/><Button onClick={()=>{if(text.trim()){add(text);setText("");toast.success(t("toasts.journalSaved"))}}}><PenLine className="size-4"/>{t("journal.savePage")}</Button><span className="absolute bottom-4 left-1/2 text-xs text-[#a8977c]">13</span></div>
    </motion.div>
    <aside className="space-y-5"><Card className="p-5"><div className="flex justify-between"><div><p className="text-xs text-[#8a786c]">{t("journal.level")}</p><h3 className="mt-1 font-serif text-2xl font-bold">{xp} XP</h3></div><Award className="size-9 text-[#c57b3e]"/></div><div className="mt-4 h-2 rounded-full bg-[#e9dfd2]"><div className="h-full w-[68%] rounded-full bg-[#d59659]"/></div><p className="mt-2 text-xs text-[#8b796c]">{t("journal.xpTo",{n:320})}</p></Card>
      <Card className="p-5"><div className="flex items-center gap-2"><Sparkles className="size-5 text-[#c57b3e]"/><h3 className="font-semibold">{t("journal.missions")}</h3></div>{missions.map((mission,index)=><div key={mission} className="mt-4 flex items-center gap-3"><span className={`grid size-7 place-items-center rounded-full ${index===0?"bg-[#214b3b] text-white":"border border-[#cdbda9]"}`}>{index===0&&<Check className="size-4"/>}</span><span className="flex-1 text-sm">{mission}</span><Badge>+{20+index*10}</Badge></div>)}</Card>
      <Card className="p-5"><h3 className="font-semibold">{t("journal.badges")}</h3><div className="mt-4 flex gap-3">{["🏺","🌿","🫖","⛰️"].map(icon=><span key={icon} className="grid size-12 place-items-center rounded-2xl bg-[#eee5d6] text-2xl">{icon}</span>)}</div></Card>
    </aside></div>
  </main>;
}

export function SupportPage() {
  const { t } = useI18n();
  const faqKeys=["support.q1","support.q2","support.q3","support.q4"] as const;
  const [messages,setMessages]=useState([t("support.seed")]);const [text,setText]=useState("");
  return <main className="mx-auto max-w-[1300px] p-5 md:p-8"><Header eyebrow={t("support.eyebrow")} title={t("support.title")} description={t("support.desc")}/><div className="mt-8 grid gap-6 lg:grid-cols-[1fr_330px]">
    <Card className="overflow-hidden"><div className="flex items-center gap-3 border-b border-[#e1d5c5] p-5"><span className="grid size-11 place-items-center rounded-full bg-[#214b3b] text-white"><ShieldCheck/></span><div><strong>{t("support.agent")}</strong><p className="text-xs text-[#71816f]">{t("support.online")}</p></div></div><div className="h-[400px] space-y-3 overflow-auto p-5">{messages.map((m,i)=><div key={`${m}-${i}`} className={`max-w-[80%] rounded-2xl p-4 text-sm leading-6 ${i?"ml-auto bg-[#214b3b] text-white":"bg-[#eee6da]"}`}>{m}</div>)}</div><form onSubmit={e=>{e.preventDefault();if(text){setMessages([...messages,text]);setText("");setTimeout(()=>setMessages(current=>[...current,t("support.autoReply")]),600)}}} className="flex gap-2 border-t border-[#e1d5c5] p-4"><Input value={text} onChange={e=>setText(e.target.value)} placeholder={t("support.placeholder")}/><Button type="submit" className="size-12 px-0"><Send className="size-4"/></Button></form></Card>
    <aside className="space-y-5"><button onClick={()=>toast.error(t("toasts.sos"))} className="w-full rounded-[1.5rem] bg-[#a34335] p-6 text-left text-white shadow-lg"><AlertTriangle className="size-8"/><h3 className="mt-5 font-serif text-2xl font-bold">{t("support.sosTitle")}</h3><p className="mt-2 text-sm text-white/70">{t("support.sosBody")}</p><span className="mt-5 flex items-center gap-2 font-semibold"><Phone className="size-4"/>{t("support.sosCta")}</span></button><Card className="p-5"><h3 className="font-semibold">{t("support.popular")}</h3>{faqKeys.map(key=><button onClick={()=>toast.info(t("toasts.helpArticle",{q:t(key)}))} key={key} className="flex w-full items-center justify-between border-b border-[#eee5da] py-3 text-left text-sm last:border-0">{t(key)}<ChevronRight className="size-4"/></button>)}</Card></aside>
  </div></main>;
}

export function HiddenGemsPage() {
  const { t, tOption } = useI18n();
  const gemFilters=["All","Nature","Food","Culture","Viewpoint"] as const;
  const [filter,setFilter]=useState<(typeof gemFilters)[number]>("All");
  const gems=filter==="All"?hiddenGems:hiddenGems.filter(g=>g.category===filter);
  return <main className="mx-auto max-w-[1500px] p-5 md:p-8"><Header eyebrow={t("gems.eyebrow")} title={t("gems.title")} description={t("gems.desc")}/><div className="mt-6 flex gap-2 overflow-auto">{gemFilters.map(x=><button key={x} onClick={()=>setFilter(x)} className={`rounded-full px-4 py-2 text-xs font-semibold ${filter===x?"bg-[#214b3b] text-white":"bg-white"}`}>{x==="All"?t("common.all"):tOption(x)}</button>)}</div><div className="mt-5 grid gap-5 xl:grid-cols-[1fr_380px]"><div className="overflow-hidden rounded-[1.5rem] border border-[#d5c8b7]"><TravelMap points={gems.map(g=>({id:g.id,name:g.name,coordinates:g.coordinates,detail:g.description}))}/></div><div className="max-h-[500px] space-y-3 overflow-auto pr-1">{gems.map(g=><Card key={g.id} className="flex gap-3 p-3"><div className="h-24 w-28 shrink-0 rounded-xl bg-cover bg-center" style={{backgroundImage:`url(${g.image})`}}/><div className="min-w-0"><Badge>{tOption(g.category)}</Badge><h3 className="mt-2 truncate font-serif text-lg font-bold">{g.name}</h3><p className="mt-1 flex items-center gap-1 text-xs text-[#807065]"><MapPin className="size-3"/>{g.city}</p></div></Card>)}</div></div></main>;
}

export function PremiumPage() {
  const { t, money } = useI18n();
  const statsCards=[
    [t("premium.visitors"),"3,140","+18%"],
    [t("premium.matches"),"846","+24%"],
    [t("premium.conversion"),"12.8%","+3.2%"],
    [t("premium.revenueMonth"),money(631500),"+16%"],
  ] as const;
  return <main className="mx-auto max-w-[1500px] p-5 md:p-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><Header eyebrow={t("premium.eyebrow")} title={t("premium.title")} description={t("premium.desc")}/><Button variant="secondary"><Sparkles className="size-4"/>{t("premium.improve")}</Button></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{statsCards.map(([a,b,c])=><Card key={a} className="p-5"><p className="text-sm text-[#827165]">{a}</p><div className="mt-3 flex items-end justify-between"><strong className="font-serif text-3xl">{b}</strong><Badge>{c}</Badge></div></Card>)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]"><Card className="p-6"><h3 className="font-serif text-2xl font-bold">{t("premium.discovery")}</h3><p className="text-xs text-[#8c7b70]">{t("premium.discoverySub")}</p><div className="mt-5 h-72"><ResponsiveContainer><AreaChart data={stats}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#214b3b" stopOpacity=".4"/><stop offset="1" stopColor="#214b3b" stopOpacity="0"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area type="monotone" dataKey="views" stroke="#214b3b" strokeWidth={3} fill="url(#fill)"/></AreaChart></ResponsiveContainer></div></Card>
      <Card className="p-6"><h3 className="font-serif text-2xl font-bold">{t("premium.revenue")}</h3><p className="text-xs text-[#8c7b70]">{t("premium.revenueSub")}</p><div className="mt-5 h-72"><ResponsiveContainer><BarChart data={stats}><XAxis dataKey="month"/><YAxis hide/><Tooltip/><Bar dataKey="revenue" fill="#d59659" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer></div></Card></div>
    <Card className="mt-5 p-6"><div className="flex items-start gap-4"><span className="grid size-12 place-items-center rounded-2xl bg-[#e7eee6] text-[#214b3b]"><Sparkles/></span><div><h3 className="font-serif text-xl font-bold">{t("premium.tipTitle")}</h3><p className="mt-1 text-sm text-[#76665b]">{t("premium.tipBody")}</p></div><Button variant="outline" className="ml-auto">{t("premium.tipCta")}</Button></div></Card>
  </main>;
}

export function PackagePage({ calendarOnly = false }: { calendarOnly?: boolean }) {
  const router = useRouter();
  const selection = useAhlanaStore((s) => s.packageSelection);
  const update = useAhlanaStore((s) => s.updatePackage);
  const updateItemDates = useAhlanaStore((s) => s.updateItemDates);
  const clearPackageSchedule = useAhlanaStore((s) => s.clearPackageSchedule);
  const confirmPackage = useAhlanaStore((s) => s.confirmPackage);
  const unlockJourneyStep = useAhlanaStore((s) => s.unlockJourneyStep);
  const language = useAhlanaStore((s) => s.language);
  const currency = useAhlanaStore((s) => s.currency);
  const money = (value: number) => formatCurrency(value, currency);
  const label = (key: TranslationKey, vars?: Record<string, string | number>) => t(language, key, vars);

  const parseDay = (value?: string) => (value ? new Date(`${value.slice(0, 10)}T12:00:00`) : undefined);
  const toDay = (date?: Date) => date?.toISOString().slice(0, 10);

  const [calendarRange, setCalendarRange] = useState<DateRange | undefined>(() => ({
    from: parseDay(selection.startDate) ?? new Date(2026, 7, 12),
    to: parseDay(selection.endDate) ?? new Date(2026, 7, 19),
  }));
  const [calendarMonth, setCalendarMonth] = useState(() => calendarRange?.from ?? new Date(2026, 7));
  const [activeItem, setActiveItem] = useState<string>("host");
  const calendarRef = useRef<HTMLElement>(null);

  const selectedHost = hosts.find((x) => x.id === selection.host);
  const selectedCar = vehicles.find((x) => x.id === selection.car);
  const selectedArtisan = artisans.find((x) => x.id === selection.artisan);
  const selectedActivities = activities.filter((x) => selection.activities.includes(x.id));

  const nights =
    calendarRange?.from && calendarRange?.to
      ? Math.max(1, Math.round((calendarRange.to.getTime() - calendarRange.from.getTime()) / 86400000))
      : 7;
  const total =
    (selectedHost?.price ?? 0) * nights +
    (selectedCar?.price ?? 0) * nights +
    (selectedArtisan?.price ?? 0) +
    selectedActivities.reduce((sum, x) => sum + x.price, 0);

  const calendarLabel = calendarRange?.from
    ? `${formatUiDate(calendarRange.from, language, { month: "long", day: "numeric" })}${
        calendarRange.to
          ? ` – ${formatUiDate(calendarRange.to, language, {
              month: calendarRange.from.getMonth() === calendarRange.to.getMonth() ? undefined : "long",
              day: "numeric",
            })}`
          : ""
      }`
    : label("pickRange");

  const tripStart = calendarRange?.from;
  const tripEnd = calendarRange?.to;
  const inTrip = (date: Date) => {
    if (!tripStart || !tripEnd) return false;
    const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const start = new Date(tripStart.getFullYear(), tripStart.getMonth(), tripStart.getDate()).getTime();
    const end = new Date(tripEnd.getFullYear(), tripEnd.getMonth(), tripEnd.getDate()).getTime();
    return day >= start && day <= end;
  };

  const dayPickerClassNames = {
    root: "relative w-full",
    months: "w-full",
    month: "w-full",
    month_caption: "relative mb-5 flex h-11 items-center justify-center",
    caption_label: "font-serif text-2xl font-bold text-[#3c291f]",
    nav: "absolute inset-x-0 top-0 z-10 flex justify-between",
    button_previous:
      "pointer-events-auto grid size-11 place-items-center rounded-full border border-[#d8c7b2] bg-white text-[#214b3b] shadow-sm transition hover:-translate-x-0.5 hover:bg-[#eee3d4] active:scale-95",
    button_next:
      "pointer-events-auto grid size-11 place-items-center rounded-full border border-[#d8c7b2] bg-white text-[#214b3b] shadow-sm transition hover:translate-x-0.5 hover:bg-[#eee3d4] active:scale-95",
    month_grid: "w-full border-separate border-spacing-y-1",
    weekdays: "",
    weekday: "pb-3 text-center text-[10px] font-bold uppercase tracking-[.12em] text-[#9a806c]",
    week: "",
    day: "h-12 p-0 text-center",
    day_button:
      "mx-auto grid size-11 place-items-center rounded-full text-sm font-semibold text-[#4b382c] transition hover:bg-[#eadbc7]",
    today: "[&>button]:ring-2 [&>button]:ring-[#d59659] [&>button]:ring-offset-2 [&>button]:ring-offset-[#fbf5eb]",
    outside: "opacity-30",
    disabled: "opacity-25",
    hidden: "invisible",
    selected: "",
    range_start:
      "rounded-l-full bg-[#d9c2a3] [&>button]:bg-[#214b3b] [&>button]:text-white [&>button]:shadow-lg",
    range_middle: "bg-[#d9c2a3] [&>button]:rounded-none [&>button]:bg-transparent [&>button]:text-[#3e2b20]",
    range_end:
      "rounded-r-full bg-[#d9c2a3] [&>button]:bg-[#214b3b] [&>button]:text-white [&>button]:shadow-lg",
  } as const;

  const savePackage = () => {
    if (!selection.host) {
      toast.error(label("packageIncomplete"));
      return;
    }
    confirmPackage();
    toast.success(label("packageSaved"));
    router.push("/dashboard/calendar");
  };

  const scheduleItems = [
    selectedHost && {
      id: "host",
      kind: "host" as const,
      title: selectedHost.name,
      subtitle: label("hostStay"),
      detail: calendarLabel,
    },
    selectedCar && {
      id: "car",
      kind: "car" as const,
      title: selectedCar.name,
      subtitle: label("carRental"),
      detail:
        selection.itemDates.carStart && selection.itemDates.carEnd
          ? `${selection.itemDates.carStart} → ${selection.itemDates.carEnd}`
          : label("pickRange"),
    },
    selectedArtisan && {
      id: "artisan",
      kind: "artisan" as const,
      title: selectedArtisan.name,
      subtitle: label("artisanWorkshop"),
      detail: selection.itemDates.artisanDate ?? label("pickDate"),
    },
    ...selectedActivities.map((activity) => ({
      id: activity.id,
      kind: "activity" as const,
      title: activity.title,
      subtitle: label("activity"),
      detail: selection.itemDates.activities[activity.id] ?? label("pickDate"),
    })),
  ].filter(Boolean) as {
    id: string;
    kind: "host" | "car" | "artisan" | "activity";
    title: string;
    subtitle: string;
    detail: string;
  }[];

  if (calendarOnly) {
    return (
      <main className="mx-auto max-w-6xl p-5 md:p-8">
        <Header eyebrow={label("calendarEyebrow")} title={label("calendarTitle")} description={label("calendarDesc")} />
        <p className="mt-3 text-xs font-semibold text-[#8a786c]">{label("stepOf", { n: 2, total: 7 })}</p>
        <Card className="mt-6 overflow-hidden border-[#cdb99f] bg-[#e9dac5] p-3 shadow-[0_24px_70px_rgba(80,55,38,.13)] md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <section ref={calendarRef} className="rounded-[1.75rem] border border-[#d8c6ae] bg-[#fbf5eb] p-5 md:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a8673b]">
                    {activeItem === "host" || !activeItem ? label("tripDates") : label("scheduleServices")}
                  </p>
                  <h2 className="mt-1 font-serif text-3xl font-bold">{calendarLabel}</h2>
                </div>
                <span className="hidden rounded-full bg-[#e5eee6] px-3 py-1.5 text-xs font-semibold text-[#214b3b] sm:block">
                  {nights} {label("nights")}
                </span>
              </div>

              {(activeItem === "host" || !scheduleItems.find((item) => item.id === activeItem)) && (
                <DayPicker
                  mode="range"
                  month={calendarMonth}
                  onMonthChange={setCalendarMonth}
                  startMonth={new Date(2025, 0)}
                  endMonth={new Date(2028, 11)}
                  selected={calendarRange}
                  showOutsideDays
                  onSelect={(range) => {
                    setCalendarRange(range);
                    update({ startDate: range?.from?.toISOString(), endDate: range?.to?.toISOString() });
                  }}
                  classNames={dayPickerClassNames}
                />
              )}

              {activeItem === "car" && selectedCar && (
                <>
                  <p className="mb-3 text-xs text-[#7c695c]">{label("withinTrip")}</p>
                  <DayPicker
                    mode="range"
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    startMonth={tripStart ?? new Date(2025, 0)}
                    endMonth={tripEnd ?? new Date(2028, 11)}
                    selected={{
                      from: parseDay(selection.itemDates.carStart),
                      to: parseDay(selection.itemDates.carEnd),
                    }}
                    disabled={(date) => !inTrip(date)}
                    showOutsideDays
                    onSelect={(range) => {
                      updateItemDates({ carStart: toDay(range?.from), carEnd: toDay(range?.to) });
                      toast.success(label("datesSaved"));
                    }}
                    classNames={dayPickerClassNames}
                  />
                </>
              )}

              {activeItem === "artisan" && selectedArtisan && (
                <>
                  <p className="mb-3 text-xs text-[#7c695c]">{label("withinTrip")}</p>
                  <DayPicker
                    mode="single"
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    selected={parseDay(selection.itemDates.artisanDate)}
                    disabled={(date) => !inTrip(date)}
                    showOutsideDays
                    onSelect={(date) => {
                      if (!date) return;
                      updateItemDates({ artisanDate: toDay(date) });
                      toast.success(label("datesSaved"));
                    }}
                    classNames={{
                      ...dayPickerClassNames,
                      selected: "[&>button]:bg-[#214b3b] [&>button]:text-white [&>button]:shadow-lg",
                    }}
                  />
                </>
              )}

              {selectedActivities.some((activity) => activity.id === activeItem) && (
                <>
                  <p className="mb-3 text-xs text-[#7c695c]">{label("withinTrip")}</p>
                  <DayPicker
                    mode="single"
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    selected={parseDay(selection.itemDates.activities[activeItem])}
                    disabled={(date) => !inTrip(date)}
                    showOutsideDays
                    onSelect={(date) => {
                      if (!date) return;
                      const day = toDay(date);
                      if (!day) return;
                      updateItemDates({ activities: { [activeItem]: day } });
                      toast.success(label("datesSaved"));
                    }}
                    classNames={{
                      ...dayPickerClassNames,
                      selected: "[&>button]:bg-[#214b3b] [&>button]:text-white [&>button]:shadow-lg",
                    }}
                  />
                </>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#e5d8c7] pt-5 text-xs text-[#7c695c]">
                <span className="flex items-center gap-2">
                  <i className="size-3 rounded-full bg-[#214b3b]" />
                  {label("checkInOut")}
                </span>
                <span className="flex items-center gap-2">
                  <i className="size-3 rounded-sm bg-[#d9c2a3]" />
                  {label("tripDates")}
                </span>
                <span className="ml-auto font-semibold text-[#214b3b]">
                  {nights} {label("nights")}
                </span>
              </div>
            </section>

            <section className="rounded-[1.75rem] bg-[#f3e8d8] p-5 md:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a8673b]">{label("scheduleServices")}</p>
                  <h3 className="mt-1 font-serif text-3xl font-bold">{calendarLabel}</h3>
                </div>
                <CalendarDays className="size-7 text-[#214b3b]" />
              </div>
              <div className="mt-6 space-y-3">
                {scheduleItems.map((item, index) => (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    key={item.id}
                    onClick={() => {
                      setActiveItem(item.id);
                      calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 ${
                      activeItem === item.id
                        ? "border-[#214b3b] bg-white ring-2 ring-[#214b3b]/15"
                        : "border-[#dfcfba] bg-white/75 hover:bg-white"
                    }`}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#214b3b] font-serif text-lg font-bold text-white shadow-md">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#a8673b]">{item.subtitle}</p>
                      <strong className="mt-0.5 block truncate text-sm">{item.title}</strong>
                      <p className="mt-1 text-xs text-[#837267]">{item.detail}</p>
                    </div>
                    <CheckCircle2 className="size-5 text-[#6f8c76]" />
                  </motion.button>
                ))}
                {!scheduleItems.length && (
                  <p className="rounded-2xl border border-dashed border-[#c9b396] p-6 text-center text-sm text-[#846f5e]">
                    {label("packageIncomplete")}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setCalendarRange(undefined);
                  clearPackageSchedule();
                  setActiveItem("host");
                  toast.info(label("clearDates"));
                }}
                className="mt-6 w-full rounded-2xl border border-dashed border-[#c9b396] p-4 text-center text-xs text-[#846f5e] transition hover:border-[#214b3b] hover:bg-white/60 hover:text-[#214b3b]"
              >
                <Plus className="mx-auto mb-2 size-5" />
                {label("clearDates")}
              </button>
              <div className="mt-3 flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/build-package")}>
                  <ArrowLeft className="size-4" />
                  {label("backToPackage")}
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    unlockJourneyStep(3);
                    router.push("/dashboard/chat");
                  }}
                >
                  {label("continueChat")} <ArrowRight className="size-4" />
                </Button>
              </div>
            </section>
          </div>
        </Card>
      </main>
    );
  }

  const Selector = ({
    labelText,
    type,
    items,
    value,
  }: {
    labelText: string;
    type: "host" | "car" | "artisan";
    items: { id: string; name: string; cover: string; price: number }[];
    value?: string;
  }) => (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="min-w-0 font-serif text-xl font-bold">{labelText}</h3>
        <Badge>{value ? label("selected") : label("chooseOne")}</Badge>
      </div>
      <div className="flex max-w-full gap-3 overflow-x-auto pb-2">
        {items.slice(0, 5).map((item) => (
          <button
            onClick={() => update({ [type]: item.id })}
            key={item.id}
            className={`w-44 shrink-0 overflow-hidden rounded-2xl border text-left ${
              value === item.id ? "border-[#214b3b] ring-2 ring-[#214b3b]/20" : "border-[#dacdbc]"
            }`}
          >
            <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${item.cover})` }} />
            <div className="bg-white p-3">
              <strong className="block truncate text-sm">{item.name}</strong>
              <small>{money(item.price)}</small>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="mx-auto w-full min-w-0 max-w-[1450px] p-5 md:p-8">
      <Header eyebrow={label("packageEyebrow")} title={label("packageTitle")} description={label("packageDesc")} />
      <p className="mt-3 text-xs font-semibold text-[#8a786c]">{label("stepOf", { n: 1, total: 7 })}</p>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          <Selector labelText={label("chooseHost")} type="host" items={hosts} value={selection.host} />
          <Selector labelText={label("chooseCar")} type="car" items={vehicles} value={selection.car} />
          <Selector labelText={label("chooseArtisan")} type="artisan" items={artisans} value={selection.artisan} />
          <div>
            <h3 className="font-serif text-xl font-bold">{label("chooseActivities")}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {activities.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    update({
                      activities: selection.activities.includes(item.id)
                        ? selection.activities.filter((x) => x !== item.id)
                        : [...selection.activities, item.id],
                    })
                  }
                  className={`flex min-w-0 items-center gap-3 rounded-xl border bg-white p-3 text-left ${
                    selection.activities.includes(item.id) ? "border-[#214b3b]" : ""
                  }`}
                >
                  <div className="size-14 shrink-0 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${item.cover})` }} />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-sm">{item.title}</strong>
                    <small>{money(item.price)}</small>
                  </div>
                  {selection.activities.includes(item.id) && <CheckCircle2 className="shrink-0 text-[#214b3b]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
        <aside className="min-w-0 w-full lg:sticky lg:top-24">
          <Card className="w-full overflow-hidden p-5 sm:p-6">
            <h2 className="font-serif text-2xl font-bold">{label("liveSummary")}</h2>
            <p className="mt-1 text-xs text-[#857469]">
              {calendarLabel} · {nights} {label("nights")}
            </p>
            <div className="my-5 space-y-3 border-y border-[#e5dbcf] py-5">
              {[
                [selectedHost?.name, (selectedHost?.price ?? 0) * nights],
                [selectedCar?.name, (selectedCar?.price ?? 0) * nights],
                [selectedArtisan?.name, selectedArtisan?.price],
                ...selectedActivities.map((x) => [x.title, x.price] as const),
              ]
                .filter((x) => x[0])
                .map(([name, price]) => (
                  <div key={String(name)} className="flex items-start justify-between gap-3 text-sm">
                    <span className="min-w-0 flex-1 truncate">{name}</span>
                    <strong className="shrink-0 tabular-nums">{money(Number(price))}</strong>
                  </div>
                ))}
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <strong className="shrink-0">{label("total")}</strong>
              <strong className="shrink-0 text-right text-base font-bold tabular-nums">
                {money(total)}
              </strong>
            </div>
            <Button className="mt-6 w-full" onClick={savePackage}>
              {label("savePackage")} <ArrowRight className="size-4" />
            </Button>
          </Card>
        </aside>
      </div>
    </main>
  );
}


export function ChatPage() {
  const { t } = useI18n();
  const router = useRouter();
  const unlockJourneyStep = useAhlanaStore((s) => s.unlockJourneyStep);
  const conversations=useAhlanaStore(s=>s.conversations),add=useAhlanaStore(s=>s.addMessage);
  const [active,setActive]=useState(conversations[0].id),[text,setText]=useState(""),[query,setQuery]=useState("");
  const [tab,setTab]=useState<"all"|"host"|"artisan"|"car"|"activity">("all");
  const [agreement,setAgreement]=useState<"pending"|"accepted"|"rejected">("pending");
  const filtered=conversations.filter(conversation=>(tab==="all"||conversation.kind===tab)&&conversation.name.toLowerCase().includes(query.toLowerCase()));
  const current=conversations.find(conversation=>conversation.id===active)??conversations[0];
  const sendMessage=()=>{
    const message=text.trim();
    if(!message)return;
    const conversationId=current.id;
    add(conversationId,message);
    setText("");
    toast.success(t("toasts.messageSent"));
    window.setTimeout(()=>add(conversationId,t("chat.autoReply"),"them"),900);  };
  const tabs=[["all","chat.tabAll"],["host","chat.tabHost"],["artisan","chat.tabArtisan"],["car","chat.tabCar"],["activity","chat.tabActivity"]] as const;
  const agreementTitle=agreement==="accepted"?t("chat.termsAccepted"):agreement==="rejected"?t("chat.requestDeclined"):t("chat.awaiting");
  return <main className="flex h-[calc(100vh-70px)] min-h-[600px] flex-col p-3 md:p-6">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs font-semibold text-[#8a786c]">{t("package.stepOf", { n: 3, total: 7 })}</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="h-9" onClick={() => router.push("/dashboard/calendar")}>
          <ArrowLeft className="size-4" />
          {t("package.backToCalendar")}
        </Button>
        <Button
          className="h-9"
          onClick={() => {
            unlockJourneyStep(4);
            router.push("/dashboard/contracts");
          }}
        >
          {t("package.continueContract")} <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
    <Card className="grid min-h-0 flex-1 overflow-hidden bg-[#fbf7f0] md:grid-cols-[330px_1fr]">
    <aside className="flex min-h-0 flex-col border-r border-[#dfd3c4] bg-[#f4ece0]">
      <div className="p-5 pb-3"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#ae6a39]">{t("chat.eyebrow")}</p><h1 className="mt-1 font-serif text-3xl font-bold">{t("chat.title")}</h1></div><button className="grid size-10 place-items-center rounded-full bg-[#214b3b] text-white" aria-label={t("chat.newMessage")}><Plus className="size-4"/></button></div>
        <div className="relative mt-4"><Search className="absolute left-4 top-3.5 size-4 text-[#948276]"/><Input value={query} onChange={event=>setQuery(event.target.value)} className="bg-white pl-10" placeholder={t("chat.searchPeople")}/></div>
      </div>
      <div className="flex gap-1 overflow-x-auto px-4 pb-3">{tabs.map(([value,tabKey])=><button key={value} onClick={()=>setTab(value)} className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-semibold transition ${tab===value?"bg-[#214b3b] text-white":"bg-white/70 text-[#705f53] hover:bg-white"}`}>{t(tabKey)}</button>)}</div>
      <div className="min-h-0 flex-1 overflow-auto border-t border-[#dfd3c4]">{filtered.map(conversation=><button onClick={()=>{setActive(conversation.id);setAgreement("pending")}} key={conversation.id} className={`relative flex w-full gap-3 border-b border-[#e7dccd] p-4 text-left transition ${current.id===conversation.id?"bg-white before:absolute before:bottom-3 before:left-0 before:top-3 before:w-1 before:rounded-r-full before:bg-[#d59659]":"hover:bg-white/60"}`}>
        <div className="relative shrink-0"><img src={conversation.avatar} alt="" className="size-12 rounded-full object-cover"/>{conversation.online&&<span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-white bg-[#4e8a64]"/>}</div>
        <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><strong className="truncate text-sm">{conversation.name}</strong><span className="text-[10px] text-[#9a887b]">10:31</span></div><p className="mt-1 truncate text-xs text-[#817064]">{conversation.messages.at(-1)?.text}</p><Badge className="mt-2 bg-[#e8ded0] py-0.5 text-[9px] capitalize text-[#6e5c50]">{conversation.kind}</Badge></div>
      </button>)}{!filtered.length&&<div className="p-10 text-center text-sm text-[#89776a]"><MessageCircle className="mx-auto mb-3 size-7 opacity-50"/>{t("chat.noConversations")}</div>}</div>
    </aside>
    <section className="flex min-h-0 min-w-0 flex-col">
      <header className="flex h-[74px] shrink-0 items-center gap-3 border-b border-[#dfd3c4] bg-white/70 px-5"><div className="relative"><img src={current.avatar} alt="" className="size-11 rounded-full object-cover"/>{current.online&&<span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-[#4e8a64]"/>}</div><div className="min-w-0"><strong className="block truncate">{current.name}</strong><p className="text-xs text-[#6e866f]">{current.online?t("chat.onlineNow"):t("chat.usuallyReplies")}</p></div><div className="ml-auto flex gap-1"><button className="grid size-10 place-items-center rounded-full text-[#69584d] hover:bg-[#eee6da]" aria-label={t("chat.voiceVideo")}><PhoneCall className="size-4.5"/></button><button className="grid size-10 place-items-center rounded-full text-[#69584d] hover:bg-[#eee6da]" aria-label={t("chat.voiceVideo")}><Video className="size-4.5"/></button><button className="grid size-10 place-items-center rounded-full text-[#69584d] hover:bg-[#eee6da]" aria-label={t("chat.moreActions")}><MoreHorizontal className="size-5"/></button></div></header>
      <div className="border-b border-[#dfd3c4] bg-[#f3eadc] px-5 py-3"><div className="flex flex-wrap items-center gap-3"><span className={`grid size-9 place-items-center rounded-full ${agreement==="accepted"?"bg-[#214b3b] text-white":agreement==="rejected"?"bg-[#a34335] text-white":"bg-white text-[#b37340]"}`}>{agreement==="accepted"?<Check className="size-4"/>:<FileText className="size-4"/>}</span><div className="min-w-48 flex-1"><strong className="text-sm">{agreementTitle}</strong><p className="text-xs text-[#817064]">{t("chat.stayDates")} · {t("chat.detailsReady")}</p></div>{agreement==="pending"&&<><Button variant="outline" className="h-9 bg-white" onClick={()=>{setAgreement("rejected");toast.error(t("toasts.requestDeclined"))}}>{t("chat.decline")}</Button><Button className="h-9" onClick={()=>{setAgreement("accepted");toast.success(t("toasts.requestAccepted"))}}>{t("chat.accept")}</Button></>}</div></div>
      <div className="min-h-0 flex-1 space-y-5 overflow-auto bg-[radial-gradient(circle_at_top_right,rgba(213,150,89,.08),transparent_35%)] p-5 md:p-7">
        <div className="text-center"><span className="rounded-full bg-[#e9dfd1] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8b796c]">{t("chat.today")}</span></div>
        {current.messages.map(message=><div key={message.id} className={`flex items-end gap-2 ${message.sender==="me"?"justify-end":""}`}>{message.sender==="them"&&<img src={current.avatar} alt="" className="size-7 rounded-full object-cover"/>}<div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${message.sender==="me"?"rounded-br-md bg-[#214b3b] text-white":"rounded-bl-md border border-[#e4d9cb] bg-white text-[#45352b]"}`}><p>{message.text}</p><small className={`mt-1 block text-right text-[10px] ${message.sender==="me"?"text-white/50":"text-[#9c897b]"}`}>{message.time}{message.sender==="me"&&` · ${t("chat.read")}`}</small></div></div>)}
      </div>
      <div className="shrink-0 border-t border-[#dfd3c4] bg-white p-3 md:p-4"><div className="flex items-end gap-2 rounded-[1.4rem] border border-[#d9ccbb] bg-[#faf6ef] p-2 shadow-sm focus-within:border-[#214b3b] focus-within:ring-4 focus-within:ring-[#214b3b]/8"><button onClick={()=>toast.info(t("toasts.attachment"))} className="grid size-10 shrink-0 place-items-center rounded-full text-[#806e61] hover:bg-[#eee5da]" aria-label={t("chat.attach")}><Paperclip className="size-4.5"/></button><textarea value={text} onChange={event=>setText(event.target.value)} onKeyDown={event=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();sendMessage()}}} rows={1} className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-[#a49285]" placeholder={t("chat.placeholder",{name:current.name})}/><button onClick={()=>toast.info(t("toasts.emoji"))} className="grid size-10 shrink-0 place-items-center rounded-full text-[#806e61] hover:bg-[#eee5da]" aria-label={t("chat.emoji")}><Smile className="size-4.5"/></button><Button onClick={sendMessage} disabled={!text.trim()} className="size-11 shrink-0 px-0" aria-label={t("chat.send")}><Send className="size-4"/></Button></div><p className="mt-2 px-2 text-[10px] text-[#9a897c]">{t("chat.pressEnter")} · {t("chat.shiftEnter")}</p></div>
    </section>
  </Card></main>;
}

export function ContractsPage() {
  const { t, money } = useI18n();
  const router = useRouter();
  const unlockJourneyStep = useAhlanaStore((s) => s.unlockJourneyStep);
  const list = useAhlanaStore((s) => s.contracts);
  const [signed, setSigned] = useState(false);
  return (
    <main className="mx-auto max-w-[1300px] p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#8a786c]">{t("package.stepOf", { n: 4, total: 7 })}</p>
        <Button variant="outline" className="h-9" onClick={() => router.push("/dashboard/chat")}>
          <ArrowLeft className="size-4" />
          {t("package.backToChat")}
        </Button>
      </div>
      <Header eyebrow={t("contracts.eyebrow")} title={t("contracts.title")} description={t("contracts.desc")} />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {list.map((contract) => (
          <Card key={contract.id} className="p-5">
            <div className="flex justify-between">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#e8eee6] text-[#214b3b]">
                <FileText />
              </span>
              <Badge>{signed ? t("status.Signed") : t(`status.${contract.status}`)}</Badge>
            </div>
            <p className="mt-5 text-xs text-[#8b7a6e]">
              {contract.id} · {contract.date}
            </p>
            <h2 className="mt-1 font-serif text-2xl font-bold">{contract.host}</h2>
            <p className="mt-2 text-sm text-[#77665b]">{contract.services.join(" · ")}</p>
            <div className="mt-5 flex items-center justify-between border-t border-[#e5dbcf] pt-4">
              <strong>{money(contract.total)}</strong>
              <Modal
                title={`${t("contracts.preview")} ${contract.id}`}
                trigger={<Button variant="outline">{t("contracts.preview")}</Button>}
              >
                <Agreement contract={contract} />
              </Modal>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-6 overflow-hidden p-0">
        <div className="grid gap-0 md:grid-cols-[1.1fr_.9fr]">
          <div className="border-b border-[#e5dbcf] p-6 md:border-b-0 md:border-r">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b36d39]">{t("contracts.agreementEyebrow")}</p>
            <h3 className="mt-3 font-serif text-3xl font-bold">{t("contracts.agreementTitle")}</h3>
            <p className="mt-3 text-sm leading-6 text-[#77665b]">{t("contracts.desc")}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-dashed border-[#cbbba6] bg-[#faf6ef] p-4">
                <p className="text-xs text-[#8b7a6e]">{t("contracts.travelerSig")}</p>
                <p className={`mt-6 font-serif text-2xl ${signed ? "text-[#214b3b]" : "text-[#c4b5a4]"}`}>
                  {signed ? "Maya L." : "········"}
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-[#cbbba6] bg-[#faf6ef] p-4">
                <p className="text-xs text-[#8b7a6e]">{t("contracts.hostSig")}</p>
                <p className={`mt-6 font-serif text-2xl ${signed ? "text-[#214b3b]" : "text-[#c4b5a4]"}`}>
                  {signed ? "Amina B." : "········"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#214b3b] p-6 text-white">
            <ShieldCheck className="size-8 text-[#e9b87b]" />
            <h3 className="mt-4 font-serif text-2xl font-bold">{t("contracts.preview")}</h3>
            <p className="mt-2 text-sm text-white/65">{t("contracts.insuranceBody")}</p>
            <Button
              variant="secondary"
              className="mt-6 w-full"
              onClick={() => {
                setSigned(true);
                unlockJourneyStep(5);
                toast.success(t("toasts.requestAccepted"));
              }}
            >
              <PenLine className="size-4" />
              {t("package.signContinue")}
            </Button>
            <Button
              className="mt-3 w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
              disabled={!signed}
              onClick={() => {
                unlockJourneyStep(5);
                router.push("/dashboard/invoices");
              }}
            >
              {t("package.continueInvoice")} <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}

function Agreement({contract}:{contract:(typeof contracts)[number]}) {
  const { t, money } = useI18n();
  const sections=[
    [t("contracts.traveler"),contract.traveler],
    [t("contracts.hostFamily"),contract.host],
    [t("contracts.included"),contract.services.join(", ")],
    [t("contracts.totalPrice"),money(contract.total)],
    [t("contracts.cancellation"),t("contracts.cancellationBody")],
    [t("contracts.insurance"),t("contracts.insuranceBody")],
  ] as const;
  return <div className="space-y-5 text-sm leading-6"><div className="rounded-2xl bg-[#214b3b] p-6 text-white"><p className="text-xs tracking-widest text-white/60">{t("contracts.agreementEyebrow")}</p><h2 className="mt-2 font-serif text-3xl">{t("contracts.agreementTitle")}</h2></div>{sections.map(([a,b])=><section key={a}><h3 className="font-serif text-xl font-bold">{a}</h3><p className="mt-1 text-[#6f5e53]">{b}</p></section>)}<div className="grid grid-cols-2 gap-4 pt-5"><div className="border-t border-[#6f5e53] pt-2">{t("contracts.travelerSig")}</div><div className="border-t border-[#6f5e53] pt-2">{t("contracts.hostSig")}</div></div></div>;
}

export function TripMapPage() {
  const { t } = useI18n();
  const router = useRouter();
  const points:MapPoint[]=[
    {id:"1",name:t("tripMap.p1"),coordinates:hosts[0].coordinates,detail:t("tripMap.p1d")},
    {id:"2",name:t("tripMap.p2"),coordinates:[36.784,3.061],detail:t("tripMap.p2d")},
    {id:"3",name:t("tripMap.p3"),coordinates:[36.74,3.09],detail:t("tripMap.p3d")},
    {id:"4",name:t("tripMap.p4"),coordinates:[36.72,3.04],detail:t("tripMap.p4d")},
  ];
  return (
    <main className="mx-auto max-w-[1500px] p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#8a786c]">{t("package.stepOf", { n: 7, total: 7 })}</p>
        <Button variant="outline" className="h-9" onClick={() => router.push("/dashboard/payment")}>
          <ArrowLeft className="size-4" />
          {t("package.backToPayment")}
        </Button>
      </div>
      <Header eyebrow={t("tripMap.eyebrow")} title={t("tripMap.title")} description={t("package.tripRecap")} />
      <div className="mt-7 grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-[1.5rem] border border-[#d6c8b6]">
          <TravelMap points={points} route />
        </div>
        <Card className="p-5">
          <h2 className="font-serif text-2xl font-bold">{t("tripMap.timeline")}</h2>
          {points.map((p, i) => (
            <div key={p.id} className="relative flex gap-3 pb-6 last:pb-0">
              <div className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-[#214b3b] text-xs text-white">
                {i + 1}
              </div>
              {i < points.length - 1 && (
                <span className="absolute left-[17px] top-9 h-[calc(100%-36px)] border-l border-dashed border-[#bcae9b]" />
              )}
              <div>
                <strong className="text-sm">{p.name}</strong>
                <p className="text-xs text-[#837267]">{p.detail}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </main>
  );
}

export function PaymentPage() {
  const { t, money } = useI18n();
  const router = useRouter();
  const unlockJourneyStep = useAhlanaStore((s) => s.unlockJourneyStep);
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState("Visa");
  const total = 119700;
  if (success)
    return (
      <main className="grid min-h-[calc(100vh-70px)] place-items-center p-6">
        <div className="max-w-lg text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto grid size-24 place-items-center rounded-full bg-[#214b3b] text-white"
          >
            <Check className="size-12" />
          </motion.div>
          <h1 className="mt-6 font-serif text-5xl font-semibold">{t("payment.successTitle")}</h1>
          <p className="mt-3 text-[#7d6c60]">{t("payment.successBody")}</p>
          <Button
            className="mt-7"
            onClick={() => {
              unlockJourneyStep(7);
              router.push("/dashboard/trip-map");
            }}
          >
            {t("package.continueTripPlanner")} <ArrowRight className="size-4" />
          </Button>
        </div>
      </main>
    );
  return (
    <main className="mx-auto max-w-5xl p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#8a786c]">{t("package.stepOf", { n: 6, total: 7 })}</p>
        <Button variant="outline" className="h-9" onClick={() => router.push("/dashboard/invoices")}>
          <ArrowLeft className="size-4" />
          {t("package.backToInvoice")}
        </Button>
      </div>
      <Header eyebrow={t("payment.eyebrow")} title={t("payment.title")} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <h2 className="font-serif text-2xl font-bold">{t("payment.method")}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map((x) => (
              <button
                key={x}
                onClick={() => setMethod(x)}
                className={`rounded-xl border p-3 text-xs font-bold ${method === x ? "border-[#214b3b] bg-[#e7eee6]" : "border-[#d8caba]"}`}
              >
                {x}
              </button>
            ))}
          </div>
          {["Visa", "Mastercard"].includes(method) ? (
            <div className="mt-6 space-y-4">
              <Input placeholder={t("payment.cardholder")} />
              <Input placeholder={t("payment.cardNumber")} defaultValue="4242 4242 4242 4242" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder={t("payment.expiry")} />
                <Input placeholder={t("payment.cvc")} />
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl bg-[#f0e8dd] p-8 text-center text-sm">{t("payment.continueWith", { method })}</div>
          )}
          <label className="mt-5 flex items-center gap-2 text-xs">
            <input type="checkbox" defaultChecked />
            {t("payment.acceptTerms")}
          </label>
          <Button
            className="mt-6 w-full"
            onClick={() => {
              unlockJourneyStep(7);
              setSuccess(true);
            }}
          >
            <Lock className="size-4" />
            {t("payment.paySecurely", { amount: money(total) })}
          </Button>
        </Card>
        <Card className="h-fit p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8d7b6f]">{t("payment.summary")}</p>
          <h3 className="mt-3 font-serif text-2xl font-bold">{t("payment.sevenDays")}</h3>
          <p className="mt-1 text-sm text-[#847368]">{t("payment.summaryDates")}</p>
          <div className="my-5 space-y-3 border-y border-[#e4d9cb] py-5 text-sm">
            <div className="flex justify-between">
              <span>{t("payment.hostStay")}</span>
              <strong>{money(70350)}</strong>
            </div>
            <div className="flex justify-between">
              <span>{t("payment.activities")}</span>
              <strong>{money(27000)}</strong>
            </div>
            <div className="flex justify-between">
              <span>{t("payment.car")}</span>
              <strong>{money(22350)}</strong>
            </div>
          </div>
          <div className="flex justify-between">
            <strong>{t("common.total")}</strong>
            <strong className="font-serif text-3xl">{money(total)}</strong>
          </div>
          <p className="mt-4 flex gap-2 text-xs text-[#6e7e6d]">
            <ShieldCheck className="size-4" />
            {t("payment.protected")}
          </p>
        </Card>
      </div>
    </main>
  );
}

export function InvoicesPage() {
  const { t, money } = useI18n();
  const router = useRouter();
  const unlockJourneyStep = useAhlanaStore((s) => s.unlockJourneyStep);
  const bookings = useAhlanaStore((s) => s.bookings);
  const cancel = useAhlanaStore((s) => s.cancelBooking);
  return (
    <main className="mx-auto max-w-[1300px] p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold text-[#8a786c]">{t("package.stepOf", { n: 5, total: 7 })}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="h-9" onClick={() => router.push("/dashboard/contracts")}>
            <ArrowLeft className="size-4" />
            {t("package.backToContract")}
          </Button>
          <Button
            className="h-9"
            onClick={() => {
              unlockJourneyStep(6);
              router.push("/dashboard/payment");
            }}
          >
            {t("package.continuePayment")} <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
      <Header eyebrow={t("invoices.eyebrow")} title={t("invoices.title")} />
      <Card className="mt-8 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#e2d6c7] bg-[#eee6da] p-4 text-xs font-bold uppercase tracking-wider md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <span>{t("invoices.booking")}</span>
          <span className="hidden md:block">{t("invoices.date")}</span>
          <span>{t("invoices.status")}</span>
          <span>{t("invoices.amount")}</span>
        </div>
        {bookings.map((b) => (
          <div
            key={b.id}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[#eee5da] p-4 last:border-0 md:grid-cols-[1.5fr_1fr_1fr_1fr]"
          >
            <div>
              <strong className="text-sm">{b.title}</strong>
              <p className="text-xs text-[#8b7a6d]">{b.id}</p>
            </div>
            <span className="hidden text-sm md:block">{b.date}</span>
            <Badge className={b.status === "Cancelled" ? "bg-red-100 text-red-700" : ""}>{t(`status.${b.status}`)}</Badge>
            <div className="flex items-center gap-2">
              <strong>{money(b.total)}</strong>
              <Modal title={`${t("invoices.booking")} ${b.id}`} trigger={<button><Receipt className="size-4" /></button>}>
                <Invoice booking={b} />
              </Modal>
              {b.status !== "Cancelled" && (
                <button
                  onClick={() => {
                    cancel(b.id);
                    toast.success(t("toasts.cancelled"));
                  }}
                >
                  <Trash2 className="size-4 text-red-700" />
                </button>
              )}
            </div>
          </div>
        ))}
      </Card>
    </main>
  );
}

function Invoice({booking}:{booking:{id:string;title:string;total:number;date:string}}){
  const { t, money } = useI18n();
  const tax=booking.total*.09,commission=booking.total*(booking.title.includes("Family")?.1:.05);
  return <div className="bg-white p-6"><div className="flex justify-between"><div><h2 className="font-serif text-3xl font-bold">AHLANA</h2><p className="text-xs text-[#88766a]">{t("invoices.official")}</p></div><Badge>{t("invoices.paid")}</Badge></div><div className="mt-8 grid grid-cols-2 gap-5 text-sm"><div><strong>{t("invoices.billedTo")}</strong><p>Maya Laurent<br/>{t("invoices.travelerAccount")}</p></div><div><strong>{t("invoices.invoiceDetails")}</strong><p>{booking.id}<br/>{booking.date}</p></div></div><div className="mt-8 border-y border-[#ddd1c1] py-5"><div className="flex justify-between"><span>{booking.title}</span><strong>{money(booking.total)}</strong></div><div className="mt-3 flex justify-between text-sm"><span>{t("invoices.taxes")}</span><span>{money(tax)}</span></div><div className="mt-3 flex justify-between text-sm"><span>{t("invoices.commission")}</span><span>{money(commission)}</span></div></div><div className="mt-5 flex justify-between text-xl"><strong>{t("common.total")}</strong><strong>{money(booking.total+tax+commission)}</strong></div><Button className="mt-8 w-full" onClick={()=>toast.success(t("toasts.pdf"))}><Download className="size-4"/>{t("invoices.download")}</Button></div>;
}

export function ProfilePage() {
  const { t } = useI18n();
  const user=useAhlanaStore(s=>s.currentUser),update=useAhlanaStore(s=>s.updateProfile),bookings=useAhlanaStore(s=>s.bookings);const [editing,setEditing]=useState(false),[name,setName]=useState(user?.name??""),[bio,setBio]=useState(user?.bio??"");
  return <main className="mx-auto max-w-[1200px] p-5 md:p-8"><div className="relative overflow-hidden rounded-[2rem] bg-[#214b3b] p-8 text-white"><div className="flex flex-col items-center gap-5 sm:flex-row"><img src={user?.avatar} alt="" className="size-28 rounded-full border-4 border-white/30 object-cover"/><div><Badge className="bg-white/15 text-white"><BadgeCheck className="mr-1 size-3"/>{t("profile.verified")}</Badge><h1 className="mt-3 font-serif text-4xl font-bold">{user?.name}</h1><p className="mt-1 text-white/60">{user?.bio}</p></div><Button variant="secondary" className="sm:ml-auto" onClick={()=>setEditing(true)}>{t("profile.edit")}</Button></div></div>
    <div className="mt-6 grid gap-5 md:grid-cols-3"><Card className="p-5"><Globe2 className="text-[#214b3b]"/><strong className="mt-4 block text-2xl">{bookings.filter(b=>b.status==="Confirmed").length}</strong><span className="text-sm text-[#817064]">{t("profile.trips")}</span></Card><Card className="p-5"><Award className="text-[#c57b3e]"/><strong className="mt-4 block text-2xl">{t("profile.badges")}</strong><span className="text-sm text-[#817064]">{t("profile.explorer")}</span></Card><Card className="p-5"><Star className="text-[#c57b3e]"/><strong className="mt-4 block text-2xl">{t("profile.rating")}</strong><span className="text-sm text-[#817064]">{t("profile.fromHosts")}</span></Card></div>
    <Card className="mt-6 p-6"><h2 className="font-serif text-2xl font-bold">{t("profile.recent")}</h2>{bookings.slice(0,4).map(b=><div key={b.id} className="flex items-center gap-4 border-b border-[#eee5da] py-4 last:border-0"><span className="grid size-10 place-items-center rounded-xl bg-[#e8eee6]"><MapPin className="size-4"/></span><div className="flex-1"><strong className="text-sm">{b.title}</strong><p className="text-xs text-[#88776b]">{b.date}</p></div><Badge>{t(`status.${b.status}`)}</Badge></div>)}</Card>
    {editing&&<div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-5"><Card className="w-full max-w-md p-6"><h2 className="font-serif text-3xl font-bold">{t("profile.edit")}</h2><label className="mt-5 block text-sm">{t("profile.name")}<Input value={name} onChange={e=>setName(e.target.value)} className="mt-2"/></label><label className="mt-4 block text-sm">{t("profile.bio")}<textarea value={bio} onChange={e=>setBio(e.target.value)} className="mt-2 h-28 w-full rounded-xl border border-[#d8caba] p-3 outline-none"/></label><div className="mt-5 flex justify-end gap-2"><Button variant="ghost" onClick={()=>setEditing(false)}>{t("common.cancel")}</Button><Button onClick={()=>{update({name,bio});setEditing(false);toast.success(t("toasts.profileUpdated"))}}>{t("common.save")}</Button></div></Card></div>}
  </main>;
}

export function SettingsPage() {
  const { t } = useI18n();
  const theme = useAhlanaStore((s) => s.theme);
  const setTheme = useAhlanaStore((s) => s.setTheme);
  const notifications = useAhlanaStore((s) => s.notifications);
  const setNotifications = useAhlanaStore((s) => s.setNotifications);
  const language = useAhlanaStore((s) => s.language);
  const setLanguage = useAhlanaStore((s) => s.setLanguage);
  const currency = useAhlanaStore((s) => s.currency);
  const setCurrency = useAhlanaStore((s) => s.setCurrency);
  const settings: [LucideIcon, string, ReactNode][] = [
    [
      Palette,
      t("settings.theme"),
      <div key="theme" className="flex gap-2">
        {(["light", "dark"] as const).map((x) => (
          <button
            onClick={() => setTheme(x)}
            key={x}
            className={`rounded-full px-4 py-2 text-xs ${theme === x ? "bg-[#214b3b] text-white" : "bg-[#eee5da]"}`}
          >
            {t(`settings.${x}`)}
          </button>
        ))}
      </div>,
    ],
    [
      Globe2,
      t("common.language"),
      <select
        key="lang"
        value={language}
        onChange={(event) => setLanguage(event.target.value as "en" | "fr" | "ar")}
        className="rounded-xl border border-[#d9cbbb] bg-white p-2 text-sm"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>,
    ],
    [
      Receipt,
      t("common.currency"),
      <select
        key="currency"
        value={currency}
        onChange={(event) => setCurrency(event.target.value as "DZD" | "EUR" | "USD")}
        className="rounded-xl border border-[#d9cbbb] bg-white p-2 text-sm"
      >
        <option value="DZD">{t("settings.currencyDzd")}</option>
        <option value="EUR">{t("settings.currencyEur")}</option>
        <option value="USD">{t("settings.currencyUsd")}</option>
      </select>,
    ],
    [
      Bell,
      t("settings.notifications"),
      <button
        key="noti"
        onClick={() => setNotifications(!notifications)}
        className={`h-7 w-12 rounded-full p-1 ${notifications ? "bg-[#214b3b]" : "bg-[#c5b8a8]"}`}
      >
        <span className={`block size-5 rounded-full bg-white transition ${notifications ? "translate-x-5" : ""}`} />
      </button>,
    ],
    [Lock, t("settings.privacy"), <Button key="privacy" variant="outline">{t("settings.manage")}</Button>],
    [ShieldCheck, t("settings.security"), <Button key="security" variant="outline">{t("settings.review")}</Button>],
  ];
  return (
    <main className="mx-auto max-w-4xl p-5 md:p-8">
      <Header eyebrow={t("settings.eyebrow")} title={t("settings.title")} />
      <Card className="mt-8 divide-y divide-[#e8ded1]">
        {settings.map(([Icon, label, control]) => {
          const I = Icon as typeof User;
          return (
            <div key={String(label)} className="flex items-center gap-4 p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-[#e8eee6] text-[#214b3b]">
                <I className="size-5" />
              </span>
              <strong className="flex-1">{String(label)}</strong>
              {control}
            </div>
          );
        })}
      </Card>
    </main>
  );
}
