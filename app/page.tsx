"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Car, Compass, HeartHandshake, MapPin, Menu, Sparkles, Star, Users } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { activities, artisans, hosts, vehicles } from "@/mock/data";
import { Badge, Button } from "@/components/ui";

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: .6 } };

function Logo({ light = false }: { light?: boolean }) {
  return <Link href="/" className="flex items-center gap-2"><span className={`grid size-9 place-items-center rounded-full ${light ? "bg-white/15" : "bg-[#214b3b]"} text-white`}><Compass className="size-5"/></span><span className={`font-serif text-2xl font-bold tracking-wide ${light ? "text-white" : "text-[#3a281e]"}`}>AHLANA</span></Link>;
}

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, dragFree: false });

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = window.setInterval(() => emblaApi.scrollNext(), 3500);
    return () => window.clearInterval(autoplay);
  }, [emblaApi]);

  return <main className="overflow-hidden bg-[#f5eee4]">
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0 scale-105 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(90deg,rgba(29,20,14,.84),rgba(29,20,14,.34),rgba(29,20,14,.08)),url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2000&q=90)" }}/>
      <nav className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-7 lg:px-10">
        <Logo light/><div className="hidden gap-8 text-sm text-white/90 md:flex"><a href="#experiences">Experiences</a><a href="#matching">Smart matching</a><a href="#stories">Stories</a></div>
        <div className="hidden gap-3 sm:flex"><Button asChild variant="ghost" className="text-white hover:bg-white/10"><Link href="/login">Sign in</Link></Button><Button asChild variant="secondary"><Link href="/signup">Create account</Link></Button></div><Menu className="text-white sm:hidden"/>
      </nav>
      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-[1400px] items-center px-6 lg:px-10">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"><Sparkles className="size-4 text-[#f0b879]"/>Algeria, through the people who call it home</div>
          <h1 className="font-serif text-6xl font-semibold leading-[.94] tracking-[-.03em] text-white sm:text-7xl lg:text-[96px]">Don&apos;t just visit.<br/><em className="text-[#edbd87]">Feel at home.</em></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">Meet local families, makers, and guides. Ahlana matches your travel rhythm with authentic Algerian experiences.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="secondary" className="h-13 px-7"><Link href="/signup">Find my perfect match <ArrowRight className="size-4"/></Link></Button><Button asChild variant="outline" className="h-13 border-white/30 bg-white/10 px-7 text-white backdrop-blur-md hover:bg-white/20"><Link href="/dashboard">Explore Algeria</Link></Button></div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 z-10 hidden w-[42%] rounded-tl-[2.5rem] bg-[#f4ede2]/92 px-8 py-6 backdrop-blur-xl lg:block"><div className="grid grid-cols-3 gap-5">{[["20+","Verified homes"],["30+","Local adventures"],["4.9","Traveler rating"]].map(([a,b])=><div key={b}><div className="font-serif text-3xl font-bold text-[#2e4b3c]">{a}</div><div className="text-xs uppercase tracking-wider text-[#78685c]">{b}</div></div>)}</div></div>
    </section>

    <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10" id="experiences">
      <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#b66c36]">A different way to travel</p><h2 className="max-w-2xl font-serif text-5xl font-semibold leading-tight">Your journey, woven by locals.</h2></div><p className="max-w-md leading-7 text-[#716055]">From a family table in Constantine to a pottery wheel in Ghardaïa, every connection is personal and yours to shape.</p></motion.div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[
        [Users,"Stay with heart","Live with welcoming families chosen around your preferences."],
        [HeartHandshake,"Meet the makers","Learn traditions directly from master artisans."],
        [Compass,"Go beyond maps","Discover hidden places through trusted local guides."],
        [Car,"Move your way","Choose the right ride, with or without a local driver."],
      ].map(([Icon,title,text],i)=>{const I=Icon as typeof Users;return <motion.div {...reveal} transition={{delay:i*.08}} key={String(title)} className="group rounded-[1.75rem] border border-[#d9cbb8] bg-white/65 p-7 transition hover:-translate-y-2 hover:bg-white hover:shadow-xl"><div><div className="mb-7 grid size-12 place-items-center rounded-2xl bg-[#e1ebe3] text-[#214b3b]"><I/></div><h3 className="font-serif text-2xl font-bold">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-[#79685b]">{String(text)}</p></div></motion.div>})}</div>
    </section>

    <section id="matching" className="bg-[#234638] py-24 text-white"><div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-10">
      <motion.div {...reveal}><Badge className="bg-white/10 text-[#f2c48f]">Smart Matching</Badge><h2 className="mt-6 font-serif text-5xl font-semibold leading-tight">Not a search engine.<br/>A travel intuition.</h2><p className="mt-6 max-w-lg leading-7 text-white/65">We consider language, pace, privacy, interests, transport, and budget to connect you with people you’ll genuinely click with.</p><Button asChild variant="secondary" className="mt-8"><Link href="/onboarding">Try the matching quiz <ArrowRight className="size-4"/></Link></Button></motion.div>
      <motion.div {...reveal} className="rounded-[2rem] border border-white/15 bg-white/8 p-6"><div className="mb-5 flex justify-between"><span className="text-sm text-white/60">Your top match</span><Badge className="bg-[#d59659] text-[#2d2019]">96% compatible</Badge></div><div className="grid gap-6 sm:grid-cols-[180px_1fr]"><div className="h-52 rounded-2xl bg-cover bg-center" style={{backgroundImage:`url(${hosts[1].cover})`}}/><div><div className="flex items-center gap-2"><h3 className="font-serif text-3xl font-semibold">{hosts[1].name}</h3><BadgeCheck className="size-5 text-[#e5b273]"/></div><p className="mt-1 flex items-center gap-1 text-sm text-white/55"><MapPin className="size-3.5"/>{hosts[1].city}</p><div className="mt-5 flex flex-wrap gap-2">{["French speaking","Calm home","Cultural immersion"].map(x=><span key={x} className="rounded-full bg-white/10 px-3 py-1.5 text-xs">{x}</span>)}</div><div className="mt-6 flex items-center gap-2 text-sm"><Star className="size-4 fill-[#e9b87b] text-[#e9b87b]"/><strong>4.9</strong><span className="text-white/45">· 48 reviews</span></div></div></div></motion.div>
    </div></section>

    <section className="py-24" id="stories"><div className="mx-auto max-w-[1400px] px-6 lg:px-10"><motion.div {...reveal} className="mb-10"><p className="text-xs font-bold uppercase tracking-[.25em] text-[#b66c36]">Curated for you</p><h2 className="mt-3 font-serif text-5xl font-semibold">Stay. Make. Wander.</h2></motion.div><div className="overflow-hidden" ref={emblaRef}><div className="-ml-5 flex">{[hosts[0],artisans[2],activities[4],vehicles[3],hosts[6]].map((item,i)=>{const title="title" in item?item.title:item.name;return <div className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_48%] lg:flex-[0_0_31%]" key={`${title}-${i}`}><Link href="/dashboard" className="group block overflow-hidden rounded-[1.7rem] bg-white shadow-sm"><div className="h-72 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{backgroundImage:`url(${item.cover})`}}/><div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#a86738]">Local experience</p><h3 className="mt-2 font-serif text-2xl font-bold">{title}</h3><p className="mt-2 flex items-center gap-1 text-sm text-[#817064]"><MapPin className="size-3.5"/>{item.city}</p></div></Link></div>})}</div></div></div></section>

    <section className="mx-auto max-w-[1400px] px-6 pb-24 lg:px-10"><motion.div {...reveal} className="relative overflow-hidden rounded-[2.5rem] bg-[#d7a066] px-7 py-16 text-center"><p className="text-xs font-bold uppercase tracking-[.25em]">Your invitation is waiting</p><h2 className="mx-auto mt-4 max-w-3xl font-serif text-5xl font-semibold leading-tight">Come as a traveler.<br/>Leave as part of the story.</h2><Button asChild className="mt-8"><Link href="/signup">Create your free account <ArrowRight className="size-4"/></Link></Button></motion.div></section>
    <footer className="wood-texture text-white"><div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-4 lg:px-10"><div><Logo light/><p className="mt-5 text-sm text-white/55">Immersive travel and the warmth of Algerian hospitality.</p></div>{["Explore","Ahlana","Support"].map((x)=><div key={x}><h4 className="font-semibold">{x}</h4><p className="mt-4 text-sm leading-7 text-white/50">Stories<br/>Trust & safety<br/>Help center<br/>Contact</p></div>)}</div><div className="border-t border-white/10 py-5 text-center text-xs text-white/40">© 2026 Ahlana · Travel deeper</div></footer>
  </main>;
}
