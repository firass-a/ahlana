"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, Compass, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { hosts } from "@/mock/data";
import { formatCurrency } from "@/lib/utils";
import { useAhlanaStore } from "@/store/use-ahlana-store";
import type { QuizAnswers } from "@/types";

const steps = ["Traveler profile", "Host preferences", "Experience", "Transportation", "Artisan", "Activities", "Budget"];

function Choice({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`flex min-h-14 items-center justify-between rounded-2xl border px-5 py-3 text-left text-sm font-medium transition ${selected ? "border-[#214b3b] bg-[#e3ece5] text-[#214b3b] shadow-sm" : "border-[#d8cab8] bg-white/65 hover:border-[#aa9680] hover:bg-white"}`}><span>{label}</span>{selected && <span className="grid size-6 place-items-center rounded-full bg-[#214b3b] text-white"><Check className="size-3.5"/></span>}</button>;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const quiz = useAhlanaStore((state) => state.quiz);
  const update = useAhlanaStore((state) => state.updateQuiz);
  const finish = useAhlanaStore((state) => state.finishOnboarding);
  const score = useAhlanaStore((state) => state.matchScore);
  const pick = (key: keyof QuizAnswers, value: string) => update({ [key]: value });
  const toggle = (key: "languages" | "workshopPreferences" | "interests", value: string) => {
    const values = quiz[key];
    update({ [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] });
  };
  const next = () => { if (step === 6) { finish(); setStep(7); } else setStep(step + 1); };

  const groups: Array<{ title: string; subtitle: string; fields: Array<{ label: string; key: keyof QuizAnswers; options: string[]; multi?: boolean; conditional?: boolean }> }> = [
    { title: "Who are you traveling with?", subtitle: "This helps us find spaces that fit everyone comfortably.", fields: [
      {label:"Companions",key:"companions",options:["Solo traveler","Couple","Family","Friends","Organized group"]},
      {label:"Number of travelers",key:"number",options:["1","2","3–4","5–6","More than 6"]},
      {label:"Age range",key:"age",options:["Under 18","18–25","26–35","36–50","51+"]},
      {label:"Languages you speak",key:"languages",options:["Arabic","French","English","Spanish","Other"],multi:true},
      {label:"Preferred host language",key:"hostLanguage",options:["Arabic","French","English","No preference"]},
    ]},
    { title: "What feels like home to you?", subtitle: "Comfort and compatibility are at the heart of a good stay.", fields: [
      {label:"Gender compatibility",key:"genderCompatibility",options:["Family household","Same-gender solo host","Host couple","No preference"]},
      {label:"Level of privacy",key:"privacy",options:["Very important","Important","Moderate","Not important"]},
      {label:"Children in the home",key:"children",options:["Yes","No","No preference"]},
      {label:"Pets in the home",key:"pets",options:["Yes","No","No preference"]},
      {label:"Preferred atmosphere",key:"environment",options:["Calm and relaxing","Balanced","Active and social"]},
    ]},
    { title: "How do you want to experience Algeria?", subtitle: "There is no right rhythm — only yours.", fields: [
      {label:"Type of immersion",key:"immersion",options:["Cultural immersion","Family experience","Adventure","Relaxation","Mixed"]},
      {label:"Amount of activities",key:"activityAmount",options:["None","1–2","3–5","More than 5"]},
    ]},
    { title: "How would you like to move?", subtitle: "We can match transport to your route.", fields: [
      {label:"Need a rental car?",key:"carNeeded",options:["Yes","No"]},
      {label:"Vehicle type",key:"vehicleType",options:["Economy","Family","SUV","Luxury"],conditional:true},
      {label:"Need a driver?",key:"driver",options:["Yes","No"]},
    ]},
    { title: "Make something to remember", subtitle: "Learn an ancestral skill directly from a local artisan.", fields: [
      {label:"Join a local workshop?",key:"workshop",options:["Yes","No"]},
      {label:"Workshop preferences",key:"workshopPreferences",options:["Pottery","Wood carving","Traditional cooking","No preference"],multi:true,conditional:true},
    ]},
    { title: "What sparks your curiosity?", subtitle: "Choose as many interests as you like.", fields: [
      {label:"Interests",key:"interests",options:["Cultural tours","Historic sites","Coastal activities","Hiking","Mountain excursions","Cooking classes","Local festivals","Craft workshops"],multi:true},
      {label:"Travel rhythm",key:"rhythm",options:["Very relaxed","Moderately active","Very active"]},
    ]},
    { title: "Set your comfort range", subtitle: "We’ll only recommend experiences that respect it.", fields: [
      {label:"Accommodation per night",key:"nightBudget",options:["Under 4,500 DA","4,500–7,500 DA","7,500–15,000 DA","More than 15,000 DA"]},
      {label:"Overall trip budget",key:"overallBudget",options:["Eco traveler","Moderate budget","Premium budget","Luxury budget"]},
    ]},
  ];

  if (step === 7) return <main className="min-h-screen bg-[#eee5d8] px-6 py-12">
    <div className="mx-auto max-w-6xl">
      <div className="text-center"><div className="mx-auto grid size-16 place-items-center rounded-full bg-[#214b3b] text-white"><Sparkles/></div><p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-[#b46d38]">Your matches are ready</p><h1 className="mt-3 font-serif text-5xl font-semibold">People you&apos;re likely to love</h1><p className="mx-auto mt-4 max-w-xl text-[#75665a]">Your profile is <strong className="text-[#214b3b]">{score}% complete</strong>. These homes best match your pace, language, and idea of belonging.</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{hosts.slice(0,3).map((host,index)=><motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:index*.12}} key={host.id} className="overflow-hidden rounded-[1.75rem] bg-white shadow-xl"><div className="relative h-60 bg-cover bg-center" style={{backgroundImage:`url(${host.cover})`}}><Badge className="absolute left-4 top-4 bg-white text-[#214b3b]">{score-index*2}% match</Badge></div><div className="p-5"><div className="flex items-center gap-2"><h2 className="font-serif text-2xl font-bold">{host.name}</h2><BadgeCheck className="size-5 text-[#214b3b]"/></div><p className="mt-1 text-sm text-[#827267]">{host.city} · {host.environment} home</p><p className="mt-4 line-clamp-2 text-sm leading-6 text-[#716157]">{host.description}</p><div className="mt-5 flex items-center justify-between"><span className="flex items-center gap-1 text-sm"><Star className="size-4 fill-[#c88240] text-[#c88240]"/>{host.rating}</span><strong>{formatCurrency(host.price)}<small className="font-normal text-[#827267]"> / night</small></strong></div></div></motion.div>)}</div>
      <div className="mt-10 text-center"><Button asChild className="px-8"><Link href="/dashboard/hosts">Explore my matches <ArrowRight className="size-4"/></Link></Button></div>
    </div>
  </main>;

  const current = groups[step];
  return <main className="min-h-screen bg-[#f7f1e8]">
    <header className="flex items-center justify-between border-b border-[#ded1c0] px-6 py-5 lg:px-10"><Link href="/" className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-full bg-[#214b3b] text-white"><Compass className="size-5"/></span><strong className="font-serif text-2xl">AHLANA</strong></Link><span className="text-sm text-[#79695e]">Step {step+1} of 7</span><button className="text-sm font-semibold text-[#214b3b]" onClick={()=>setStep(7)}>Skip for now</button></header>
    <div className="h-1.5 bg-[#e5dbcd]"><motion.div animate={{width:`${((step+1)/7)*100}%`}} className="h-full bg-[#d59659]"/></div>
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-10 lg:grid-cols-[240px_1fr] lg:py-14">
      <aside className="hidden lg:block"><p className="mb-6 text-xs font-bold uppercase tracking-[.2em] text-[#9a8474]">Your matching journey</p>{steps.map((label,index)=><div key={label} className={`mb-1 flex items-center gap-3 rounded-xl p-3 text-sm ${index===step?"bg-white font-semibold text-[#214b3b] shadow-sm":index<step?"text-[#567362]":"text-[#a49488]"}`}><span className={`grid size-7 place-items-center rounded-full text-xs ${index<=step?"bg-[#214b3b] text-white":"bg-[#e4d9cb]"}`}>{index<step?<Check className="size-3.5"/>:index+1}</span>{label}</div>)}</aside>
      <section>
        <AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,x:25}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-25}}>
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#b36b38]">{steps[step]}</p><h1 className="mt-3 font-serif text-5xl font-semibold leading-tight">{current.title}</h1><p className="mt-3 text-[#7c6c60]">{current.subtitle}</p>
          <div className="mt-9 space-y-8">{current.fields.filter(field=>!field.conditional || (field.key==="vehicleType"?quiz.carNeeded==="Yes":quiz.workshop==="Yes")).map(field=><div key={field.label}><h3 className="mb-3 text-sm font-semibold">{field.label}</h3><div className="grid gap-3 sm:grid-cols-2">{field.options.map(option=>{const value=quiz[field.key];const selected=field.multi ? (value as string[]).includes(option) : value===option;return <Choice key={option} label={option} selected={selected} onClick={()=>field.multi?toggle(field.key as "languages"|"workshopPreferences"|"interests",option):pick(field.key,option)}/>})}</div></div>)}</div>
        </motion.div></AnimatePresence>
        <div className="mt-10 flex justify-between border-t border-[#dfd3c3] pt-6"><Button variant="ghost" disabled={step===0} onClick={()=>setStep(step-1)}><ArrowLeft className="size-4"/>Back</Button><Button onClick={next}>{step===6?"Reveal my matches":"Continue"}<ArrowRight className="size-4"/></Button></div>
      </section>
    </div>
  </main>;
}
