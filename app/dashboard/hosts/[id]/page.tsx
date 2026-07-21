"use client";

import { BadgeCheck, Bike, Heart, Languages, MapPin, Shirt, Star, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button, Card } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { hosts } from "@/mock/data";
import { useAhlanaStore } from "@/store/use-ahlana-store";

export default function HostProfilePage() {
  const { id } = useParams<{id:string}>();
  const host=hosts.find(item=>item.id===id)??hosts[0];
  const favorites=useAhlanaStore(s=>s.favorites),toggle=useAhlanaStore(s=>s.toggleFavorite),book=useAhlanaStore(s=>s.book);
  return <main className="mx-auto max-w-[1350px] p-5 md:p-8"><div className="grid h-[440px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[2rem]"><div className="col-span-4 row-span-1 bg-cover bg-center md:col-span-2 md:row-span-2" style={{backgroundImage:`url(${host.gallery[0]})`}}/>{host.gallery.slice(1).map(image=><div key={image} className="hidden bg-cover bg-center md:block" style={{backgroundImage:`url(${image})`}}/>)}</div>
    <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_350px]"><section><div className="flex items-center gap-2"><h1 className="font-serif text-5xl font-semibold">{host.name}</h1><BadgeCheck className="size-7 text-[#214b3b]"/></div><p className="mt-2 flex items-center gap-1 text-[#79695e]"><MapPin className="size-4"/>{host.city}, {host.country} · <Star className="ml-2 size-4 fill-[#c77d3e] text-[#c77d3e]"/>{host.rating}</p><p className="mt-6 max-w-3xl text-lg leading-8 text-[#645349]">{host.description}</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">{[[Languages,host.languages.join(", ")],[Users,host.children?"Family with children":"Adult household"],[Shirt,host.traditionalClothes?"Traditional clothes available":"Cultural wardrobe nearby"],[Bike,host.bikeRental?"Bikes available":"Walking routes nearby"]].map(([Icon,text])=>{const I=Icon as typeof Languages;return <Card key={String(text)} className="flex items-center gap-3 p-4"><I className="text-[#214b3b]"/><span className="text-sm">{String(text)}</span></Card>})}</div>
      <h2 className="mt-10 font-serif text-3xl font-bold">What travelers remember</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{host.reviews.map(review=><Card key={review.id} className="p-5"><div className="flex items-center gap-3"><img src={review.avatar} alt="" className="size-10 rounded-full"/><div><strong className="text-sm">{review.author}</strong><div className="flex text-[#c77d3e]">{"★★★★★".slice(0,review.rating)}</div></div></div><p className="mt-4 text-sm leading-6 text-[#716157]">{review.comment}</p></Card>)}</div>
    </section><Card className="sticky top-24 h-fit p-6"><div className="flex items-end justify-between"><p><strong className="font-serif text-3xl">{formatCurrency(host.price)}</strong><small> / night</small></p><button onClick={()=>toggle(host.id)}><Heart className={favorites.includes(host.id)?"fill-red-500 text-red-500":""}/></button></div><label className="mt-5 block text-xs font-semibold">DATES<input type="date" defaultValue="2026-08-12" className="mt-2 h-12 w-full rounded-xl border border-[#d8cab8] bg-white px-3"/></label><label className="mt-4 block text-xs font-semibold">GUESTS<select className="mt-2 h-12 w-full rounded-xl border border-[#d8cab8] bg-white px-3"><option>2 travelers</option><option>1 traveler</option><option>3–4 travelers</option></select></label><Button className="mt-5 w-full" onClick={()=>{book({kind:"host",itemId:host.id,title:host.name,date:"2026-08-12",total:host.price*7});toast.success("Stay confirmed in your journey")}}>Book this home</Button><p className="mt-3 text-center text-xs text-[#87766a]">Payment is completed after your stay is confirmed.</p><div className="mt-5 border-t border-[#e5dbcf] pt-5 text-sm"><div className="flex justify-between"><span>7 nights</span><span>{formatCurrency(host.price*7)}</span></div><div className="mt-2 flex justify-between"><span>Ahlana service</span><span>{formatCurrency(host.price*.7)}</span></div></div></Card></div>
  </main>;
}
