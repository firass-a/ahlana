"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, CalendarDays, Clock, Filter, Gauge, Heart, Languages, MapPin, Play, Search, Star, Users, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Badge, Button, Input, Modal } from "@/components/ui";
import { useI18n } from "@/hooks/use-i18n";
import { activities, algerianCities, artisans, hosts, vehicles } from "@/mock/data";
import { useAhlanaStore } from "@/store/use-ahlana-store";

interface CatalogItem {
  id: string; title: string; city: string; cover: string; price: number; rating?: number;
  category: string; description: string; tags: string[]; gallery: string[]; verified?: boolean;
}

const normalized: Record<string, CatalogItem[]> = {
  hosts: hosts.map(item=>({id:item.id,title:item.name,city:item.city,cover:item.cover,price:item.price,rating:item.rating,category:item.environment,description:item.description,tags:[...item.languages,item.children?"Children welcome":"Adults only",item.pets?"Pets":"No pets",...item.experiences],gallery:item.gallery,verified:item.verified})),
  cars: vehicles.map(item=>({id:item.id,title:item.name,city:item.city,cover:item.cover,price:item.price,category:item.category,description:`A comfortable ${item.category.toLowerCase()} vehicle, ready for city streets and open roads. Driver service is available.`,tags:[item.transmission,item.fuel,`${item.seats} seats`,`${item.bags} bags`,item.driverOption?"Driver option":"Self-drive"],gallery:item.gallery})),
  artisans: artisans.map(item=>({id:item.id,title:item.name,city:item.city,cover:item.cover,price:item.price,rating:item.rating,category:item.craft,description:item.story,tags:[`${item.yearsExperience} years`,...item.materials],gallery:item.gallery,verified:item.verified})),
  activities: activities.map(item=>({id:item.id,title:item.title,city:item.city,cover:item.cover,price:item.price,rating:item.rating,category:item.category,description:item.description,tags:[item.difficulty,item.duration,`Age ${item.minimumAge}+`,...item.languages],gallery:item.gallery,verified:true})),
};

const sectionKeys = {
  hosts: { title: "marketplace.hostsTitle", headline: "marketplace.hostsHeadline", desc: "marketplace.hostsDesc", nav: "nav.hosts" },
  cars: { title: "marketplace.carsTitle", headline: "marketplace.carsHeadline", desc: "marketplace.carsDesc", nav: "nav.cars" },
  artisans: { title: "marketplace.artisansTitle", headline: "marketplace.artisansHeadline", desc: "marketplace.artisansDesc", nav: "nav.artisans" },
  activities: { title: "marketplace.activitiesTitle", headline: "marketplace.activitiesHeadline", desc: "marketplace.activitiesDesc", nav: "nav.experiences" },
} as const;

const SORT_OPTIONS = ["Recommended", "Price low", "Top rated"] as const;
const ALL_CATEGORY = "All";

export function MarketplacePage({ section }: { section: "hosts" | "cars" | "artisans" | "activities" }) {
  const { t, tOption, money } = useI18n();
  const searchParams = useSearchParams();
  const focusId = searchParams.get("id");
  const [search,setSearch]=useState("");
  const [category,setCategory]=useState(ALL_CATEGORY);
  const [sort,setSort]=useState<(typeof SORT_OPTIONS)[number]>("Recommended");
  const [page,setPage]=useState(1);
  const [openId,setOpenId]=useState<string|null>(focusId);
  const favorites=useAhlanaStore(state=>state.favorites);
  const toggleFavorite=useAhlanaStore(state=>state.toggleFavorite);
  const book=useAhlanaStore(state=>state.book);
  const categories=[ALL_CATEGORY,...new Set(normalized[section].map(item=>item.category))];
  const filtered=useMemo(()=>{
    let result=normalized[section].filter(item=>(category===ALL_CATEGORY||item.category===category)&&(item.title.toLowerCase().includes(search.toLowerCase())||item.city.toLowerCase().includes(search.toLowerCase())));
    if(sort==="Price low") result=[...result].sort((a,b)=>a.price-b.price);
    if(sort==="Top rated") result=[...result].sort((a,b)=>(b.rating??0)-(a.rating??0));
    return result;
  },[section,search,category,sort]);
  const visible=filtered.slice((page-1)*8,page*8);
  const keys=sectionKeys[section];
  const unitKey=section==="cars"?"common.day":section==="hosts"?"common.night":"common.person";
  const reserve=(item:CatalogItem)=>{book({kind:section==="hosts"?"host":section==="cars"?"car":section==="artisans"?"artisan":"activity",itemId:item.id,title:item.title,date:"2026-08-14",total:item.price});toast.success(t("toasts.addedJourney",{title:item.title}))};
  const focusItem = useMemo(() => normalized[section].find((item) => item.id === openId) ?? null, [section, openId]);

  useEffect(() => {
    if (focusId) setOpenId(focusId);
  }, [focusId]);

  return <main className="mx-auto max-w-[1500px] p-5 md:p-8">
    <div className="relative overflow-hidden rounded-[2rem] bg-[#214b3b] px-7 py-12 text-white md:px-12"><div className="absolute right-0 top-0 h-full w-2/5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.13),transparent_60%)]"/><p className="text-xs font-bold uppercase tracking-[.22em] text-[#e5b37d]">{t(keys.title)}</p><h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold">{t(keys.headline)}</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">{t(keys.desc)}</p></div>
    <div className="sticky top-[70px] z-20 -mx-2 mt-6 flex flex-col gap-3 rounded-2xl border border-[#ddcfbd] bg-[#f8f2e9]/95 p-3 backdrop-blur md:flex-row">
      <div className="relative min-w-0 flex-1"><Search className="absolute left-4 top-3.5 size-4 text-[#8b796c]"/><Input value={search} onChange={event=>{setSearch(event.target.value);setPage(1)}} placeholder={t("marketplace.searchPlaceholder",{section:t(keys.nav).toLowerCase()})} className="pl-10"/></div>
      <div className="flex gap-2 overflow-x-auto">{categories.map(item=><button key={item} onClick={()=>{setCategory(item);setPage(1)}} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${category===item?"bg-[#214b3b] text-white":"bg-white text-[#65554a]"}`}>{item===ALL_CATEGORY?t("common.all"):tOption(item)}</button>)}</div>
      <label className="flex items-center gap-2 rounded-xl bg-white px-3 text-xs"><Filter className="size-4"/><select value={sort} onChange={event=>setSort(event.target.value as typeof sort)} className="h-10 bg-transparent outline-none">{SORT_OPTIONS.map(option=><option key={option} value={option}>{tOption(option)}</option>)}</select></label>
    </div>
    <div className="mt-6 flex items-center justify-between"><p className="text-sm text-[#79695e]"><strong className="text-[#34251d]">{t("marketplace.results",{n:filtered.length})}</strong></p><p className="text-xs text-[#9a897c]">{t("marketplace.pricesShown",{unit:t(unitKey)})}</p></div>
    <AnimatePresence mode="popLayout"><motion.div layout className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{visible.map((item,index)=><motion.article layout initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:index*.035}} key={item.id} className="group overflow-hidden rounded-[1.55rem] border border-[#ded1c0] bg-white shadow-sm">
      <div className="relative h-56 overflow-hidden"><div className={`size-full bg-center transition duration-700 group-hover:scale-105 ${section==="cars"?"bg-[#e9e5de] bg-contain bg-no-repeat":"bg-cover"}`} style={{backgroundImage:`url(${item.cover})`}}/><div className="absolute left-3 top-3 flex gap-2"><Badge className="bg-white/90">{tOption(item.category)}</Badge>{item.verified&&<Badge className="bg-[#214b3b] text-white"><BadgeCheck className="mr-1 size-3"/>{t("common.verified")}</Badge>}</div><button onClick={()=>toggleFavorite(item.id)} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 shadow"><Heart className={`size-4 ${favorites.includes(item.id)?"fill-red-500 text-red-500":"text-[#49372c]"}`}/></button></div>
      <div className="p-5"><div className="flex items-start justify-between gap-2"><div><h2 className="font-serif text-xl font-bold">{item.title}</h2><p className="mt-1 flex items-center gap-1 text-xs text-[#857468]"><MapPin className="size-3"/>{item.city}, {t("common.algeria")}</p></div>{item.rating&&<span className="flex items-center gap-1 text-xs font-bold"><Star className="size-3.5 fill-[#c97f40] text-[#c97f40]"/>{item.rating}</span>}</div><div className="mt-4 flex gap-1.5 overflow-hidden">{item.tags.slice(0,3).map(tag=><span key={tag} className="whitespace-nowrap rounded-lg bg-[#f2ece3] px-2 py-1 text-[10px] text-[#6d5c51]">{tag}</span>)}</div><div className="mt-5 flex items-center justify-between"><p><strong className="text-lg">{money(item.price)}</strong><small className="text-[#8a796d]"> / {t(unitKey)}</small></p><Button variant="outline" className="h-9 px-4" onClick={()=>setOpenId(item.id)}>{t("common.view")}</Button></div></div>
    </motion.article>)}</motion.div></AnimatePresence>
    {!visible.length&&<div className="py-24 text-center"><Search className="mx-auto size-10 text-[#aa998b]"/><h3 className="mt-4 font-serif text-2xl font-bold">{t("marketplace.noMatches")}</h3><p className="mt-2 text-sm text-[#827165]">{t("marketplace.noMatchesBody")}</p></div>}
    {focusItem && (
      <Modal title={focusItem.title} open={!!openId} onOpenChange={(open)=>{if(!open)setOpenId(null)}} trigger={<span className="hidden" />}>
        <ItemDetail item={focusItem} section={section} onBook={()=>reserve(focusItem)}/>
      </Modal>
    )}
    <div className="mt-9 flex justify-center gap-2">{Array.from({length:Math.ceil(filtered.length/8)},(_,index)=><button key={index} onClick={()=>setPage(index+1)} className={`grid size-10 place-items-center rounded-full text-sm ${page===index+1?"bg-[#214b3b] text-white":"bg-white"}`}>{index+1}</button>)}</div>
  </main>;
}

function ItemDetail({item,section,onBook}:{item:CatalogItem;section:string;onBook:()=>void}) {
  const { t, money } = useI18n();
  const unitKey=section==="cars"?"common.day":section==="hosts"?"common.night":"common.person";
  const bookLabel=section==="hosts"?t("marketplace.bookStay"):section==="cars"?t("marketplace.reserveCar"):t("marketplace.bookExperience");
  return <div><div className="grid h-64 grid-cols-3 gap-2 overflow-hidden rounded-2xl"><div className={`col-span-2 row-span-2 bg-center ${section==="cars"?"bg-[#e9e5de] bg-contain bg-no-repeat":"bg-cover"}`} style={{backgroundImage:`url(${item.gallery[0]})`}}/>{item.gallery.slice(1,3).map((image,index)=><div key={`${image}-${index}`} className={`bg-center ${section==="cars"?"bg-[#e9e5de] bg-contain bg-no-repeat":"bg-cover"}`} style={{backgroundImage:`url(${image})`}}/>)}</div>
    <div className="mt-6 flex flex-wrap items-start justify-between gap-4"><div><p className="flex items-center gap-1 text-sm text-[#78675b]"><MapPin className="size-4"/>{item.city}, {t("common.algeria")}</p><p className="mt-4 max-w-lg leading-7 text-[#5f4e43]">{item.description}</p></div><p className="font-serif text-3xl font-bold">{money(item.price)}</p></div>
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{item.tags.slice(0,4).map((tag,index)=>{const Icon=[Languages,Users,Clock,Gauge][index];return <div key={tag} className="rounded-xl bg-white p-3 text-xs"><Icon className="mb-2 size-4 text-[#214b3b]"/>{tag}</div>})}</div>
    {section==="activities"&&<div className="mt-5 flex h-28 items-center justify-center rounded-2xl bg-[#2e2722] text-white"><Play className="mr-2"/>{t("marketplace.videoPreview")}</div>}
    <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#ded0bd] bg-white/70 p-4"><CalendarDays className="text-[#214b3b]"/><div className="min-w-48 flex-1"><strong className="text-sm">{t("marketplace.selectDate")}</strong><p className="text-xs text-[#86766a]">{t("marketplace.dateAvailable")}</p></div>{section==="hosts"&&<Button asChild variant="outline"><Link href={`/dashboard/hosts/${item.id}`}>{t("marketplace.fullProfile")}</Link></Button>}<Button onClick={onBook}>{bookLabel}</Button></div>
  </div>;
}

export function VRCitiesPage() {
  const { t } = useI18n();
  const [active,setActive]=useState<(typeof algerianCities)[number]|null>(null);
  useEffect(()=>{
    if(!active)return;
    const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setActive(null)};
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    window.addEventListener("keydown",close);
    return ()=>{document.body.style.overflow=previousOverflow;window.removeEventListener("keydown",close)};
  },[active]);
  return <main className="mx-auto max-w-[1500px] p-5 md:p-8"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#b76e39]">{t("vr.eyebrow")}</p><h1 className="mt-3 font-serif text-5xl font-semibold">{t("vr.title")}</h1><p className="mt-3 max-w-2xl text-[#79695d]">{t("vr.body")}</p>
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{algerianCities.map(city=><button key={city.name} onClick={()=>setActive(city)} className="group relative h-80 overflow-hidden rounded-[1.75rem] text-left text-white"><div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{backgroundImage:`url(${city.image})`}}/><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent"/><span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur"><Play className="size-4 fill-white"/></span><div className="absolute bottom-5 left-5"><Badge className="mb-2 bg-black/25 text-white backdrop-blur">{t("vr.real360",{provider:city.provider})}</Badge><h2 className="font-serif text-3xl font-bold">{city.name}</h2><p className="text-sm text-white/65">{city.subtitle}</p></div></button>)}</div>
    {active&&<motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 z-50 bg-[#17120f] p-2 text-white md:p-4">
      <div className="flex size-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#211914] shadow-2xl">
        <header className="relative z-20 flex h-18 shrink-0 items-center gap-4 border-b border-white/10 bg-[#211914] px-5">
          <span className="grid size-10 place-items-center rounded-full bg-[#d59659] text-[#2e2018]"><Play className="size-4 fill-current"/></span>
          <div className="min-w-0"><div className="flex items-center gap-2"><h2 className="truncate font-serif text-2xl font-bold">{active.name}</h2><Badge className="hidden bg-white/10 text-white sm:inline-flex">{active.provider}</Badge></div><p className="truncate text-xs text-white/55">{active.subtitle} · {t("vr.drag")}</p></div>
          <button onClick={()=>setActive(null)} className="ml-auto grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95" aria-label={t("vr.close")}><X className="size-5"/></button>
        </header>
        <iframe title={t("vr.aria",{city:active.name})} src={active.viewerUrl} className="min-h-0 w-full flex-1 border-0 bg-[#17120f]" loading="lazy" allow="accelerometer; gyroscope; fullscreen; xr-spatial-tracking" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/>
      </div>
    </motion.div>}
  </main>;
}
