"use client";

import { Command } from "cmdk";
import {
  CalendarDays, Car, CircleHelp, Compass, CreditCard, FileSignature, Gem, Hammer, HeartHandshake,
  Home, Map, Menu, MessageCircle, Package, Receipt, Search, Sparkles, User, X, Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAhlanaStore } from "@/store/use-ahlana-store";

const topLinks = [
  ["Hosts","hosts",Home],["Cars","cars",Car],["Artisans","artisans",Hammer],["Activities","activities",Compass],
  ["VR Cities","vr-cities",Zap],["Journal","journal",Sparkles],["Support SOS","support",CircleHelp],
  ["Hidden Gems","hidden-gems",Gem],["Host Premium","host-premium",HeartHandshake],["Profile","profile",User],
] as const;
const sideLinks = [
  ["Build Package","build-package",Package],["Calendar","calendar",CalendarDays],["Unified Chat","chat",MessageCircle],
  ["Digital Contract","contracts",FileSignature],["Trip Planner","trip-map",Map],["Payment","payment",CreditCard],
  ["Invoices","invoices",Receipt],
] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const currentUser = useAhlanaStore((state) => state.currentUser);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen((value) => !value); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  const navigate = (slug: string) => { router.push(`/dashboard/${slug}`); setCommandOpen(false); setMobile(false); };

  return <div className="min-h-screen bg-[#f5efe6]">
    <header className="sticky top-0 z-40 border-b border-[#dacdbb] bg-[#f8f2e9]/90 backdrop-blur-xl">
      <div className="flex h-[70px] items-center gap-5 px-4 lg:px-7">
        <Link href="/" className="flex shrink-0 items-center gap-2"><span className="grid size-9 place-items-center rounded-full bg-[#214b3b] text-white"><Compass className="size-5"/></span><strong className="hidden font-serif text-2xl tracking-wide xl:block">AHLANA</strong></Link>
        <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto lg:flex">{topLinks.map(([label,slug])=><Link key={slug} href={`/dashboard/${slug}`} className={cn("whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition hover:bg-white",pathname.includes(slug)?"bg-[#214b3b] text-white hover:bg-[#214b3b]":"text-[#69594e]")}>{label}</Link>)}</nav>
        <button onClick={()=>setCommandOpen(true)} className="ml-auto hidden items-center gap-2 rounded-full border border-[#d7c9b7] bg-white/70 px-3 py-2 text-xs text-[#8a796d] sm:flex"><Search className="size-4"/>Search <kbd className="rounded bg-[#eee5d9] px-1.5 py-0.5">⌘K</kbd></button>
        <Link href="/dashboard/profile" className="size-9 overflow-hidden rounded-full border-2 border-white shadow"><img src={currentUser?.avatar} alt="" className="size-full object-cover"/></Link>
        <button className="lg:hidden" onClick={()=>setMobile(true)}><Menu/></button>
      </div>
    </header>

    <div className="flex">
      <aside className="sticky top-[70px] hidden h-[calc(100vh-70px)] w-[230px] shrink-0 border-r border-[#dacdbb] bg-[#efe5d8]/70 p-4 lg:block">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#998677]">Start your journey</p>
        <nav className="space-y-1">{sideLinks.map(([label,slug,Icon])=><Link key={slug} href={`/dashboard/${slug}`} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",pathname.includes(slug)?"bg-white text-[#214b3b] shadow-sm":"text-[#6f5f54] hover:bg-white/60")}><Icon className="size-4.5"/>{label}</Link>)}</nav>
        <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-[#214b3b] p-4 text-white"><Sparkles className="size-5 text-[#e9b87b]"/><p className="mt-3 font-serif text-lg font-bold">Your trip is 72% ready</p><div className="mt-3 h-1.5 rounded-full bg-white/15"><div className="h-full w-[72%] rounded-full bg-[#e1a968]"/></div></div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>

    {mobile && <div className="fixed inset-0 z-50 bg-[#f5eee4] p-5 lg:hidden"><div className="flex items-center justify-between"><strong className="font-serif text-2xl">AHLANA</strong><button onClick={()=>setMobile(false)}><X/></button></div><div className="mt-8 grid grid-cols-2 gap-2">{[...topLinks,...sideLinks].map(([label,slug,Icon])=><button key={slug} onClick={()=>navigate(slug)} className="flex items-center gap-2 rounded-xl bg-white p-4 text-left text-sm"><Icon className="size-4"/>{label}</button>)}</div></div>}

    {commandOpen && <div className="fixed inset-0 z-[60] bg-black/45 p-4 pt-[15vh] backdrop-blur-sm" onMouseDown={()=>setCommandOpen(false)}><Command className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-[#fbf7f0] shadow-2xl" onMouseDown={(e)=>e.stopPropagation()}>
      <div className="flex items-center gap-3 border-b border-[#dfd3c3] px-5"><Search className="size-5 text-[#8d7d70]"/><Command.Input autoFocus placeholder="Search destinations, hosts, or pages..." className="h-16 flex-1 bg-transparent outline-none"/><button onClick={()=>setCommandOpen(false)}><X className="size-4"/></button></div>
      <Command.List className="max-h-80 overflow-auto p-2"><Command.Empty className="p-8 text-center text-sm text-[#88776b]">No journeys found.</Command.Empty><Command.Group heading="Navigate" className="p-2 text-xs text-[#988577]">{[...topLinks,...sideLinks].map(([label,slug,Icon])=><Command.Item key={slug} onSelect={()=>navigate(slug)} className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm text-[#49382e] data-[selected=true]:bg-[#e8eee5]"><Icon className="size-4"/>{label}</Command.Item>)}</Command.Group></Command.List>
    </Command></div>}
  </div>;
}
