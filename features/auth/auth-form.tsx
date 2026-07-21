"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Compass, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button, Input } from "@/components/ui";
import { useAhlanaStore } from "@/store/use-ahlana-store";
import type { Role } from "@/types";

const formSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(4, "At least 4 characters"),
  name: z.string().optional(),
  role: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;
const roles: Role[] = ["Traveler", "Host Family", "Artisan", "Car Rental", "Activity Provider"];

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const login = useAhlanaStore((state) => state.login);
  const signup = useAhlanaStore((state) => state.signup);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === "login" ? { email: "maya@ahlana.travel", password: "welcome", name: "", role: "Traveler" } : { role: "Traveler" },
  });

  const submit = (values: FormValues) => {
    if (mode === "login") {
      if (!login(values.email, values.password)) return toast.error("Email or password is incorrect");
      toast.success("Welcome back to Ahlana");
      router.push("/dashboard");
    } else {
      if (!values.name || values.name.length < 2) return toast.error("Please enter your full name");
      const success = signup({ name: values.name, email: values.email, password: values.password, role: (values.role ?? "Traveler") as Role });
      if (!success) return toast.error("An account with this email already exists");
      toast.success("Your Ahlana account is ready");
      router.push("/onboarding");
    }
  };

  return <main className="grid min-h-screen bg-[#f7f1e8] md:grid-cols-[.9fr_1.1fr] lg:grid-cols-[1.05fr_.95fr]">
    <section className="relative hidden min-h-screen overflow-hidden md:block">
      <div className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[12000ms] hover:scale-100" style={{backgroundImage:"linear-gradient(to top,rgba(30,20,14,.88),rgba(30,20,14,.08) 65%),url(/auth-oran.png)"}}/>
      <Link href="/" className="absolute left-10 top-9 flex items-center gap-2 text-white"><span className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur"><Compass/></span><span className="font-serif text-2xl font-bold">AHLANA</span></Link>
      <div className="absolute bottom-12 left-8 right-8 max-w-xl text-white lg:left-10"><p className="text-xs uppercase tracking-[.25em] text-[#f3c08c] lg:text-sm">The road feels different here</p><h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.03] lg:text-6xl">Every welcome begins with <em>ahlana.</em></h1><p className="mt-5 text-white/65">A word that means “you are among us.”</p></div>
    </section>
    <section className="flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-12 flex items-center gap-2 md:hidden"><Compass className="text-[#214b3b]"/><strong className="font-serif text-2xl">AHLANA</strong></Link>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b66c36]">{mode === "login" ? "Welcome back" : "Start your story"}</p>
        <h2 className="mt-3 font-serif text-5xl font-semibold">{mode === "login" ? "Sign in to Ahlana" : "Create your account"}</h2>
        <p className="mt-3 text-sm leading-6 text-[#7a6a5f]">{mode === "login" ? "Continue building a journey that feels like yours." : "Tell us who you are. We’ll make the rest feel personal."}</p>
        <form onSubmit={handleSubmit(submit)} className="mt-9 space-y-5">
          {mode === "signup" && <label className="block text-sm font-medium">Full name<Input {...register("name")} className="mt-2" placeholder="Maya Laurent"/><span className="mt-1 block text-xs text-red-700">{errors.name?.message}</span></label>}
          <label className="block text-sm font-medium">Email address<Input {...register("email")} type="email" className="mt-2" placeholder="you@example.com"/><span className="mt-1 block text-xs text-red-700">{errors.email?.message}</span></label>
          <label className="block text-sm font-medium">Password<div className="relative mt-2"><Input {...register("password")} type={showPassword ? "text" : "password"} className="pr-12" placeholder="••••••••"/><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-[#8a796d]">{showPassword ? <EyeOff className="size-5"/> : <Eye className="size-5"/>}</button></div><span className="mt-1 block text-xs text-red-700">{errors.password?.message}</span></label>
          {mode === "signup" && <label className="block text-sm font-medium">I’m joining as<select {...register("role")} className="mt-2 h-12 w-full rounded-xl border border-[#d8cab8] bg-white/80 px-4 outline-none">{roles.map(role=><option key={role}>{role}</option>)}</select></label>}
          {mode === "login" && <div className="flex justify-between text-xs"><label className="flex gap-2"><input type="checkbox" defaultChecked/>Remember me</label><button type="button" className="font-semibold text-[#214b3b]">Forgot password?</button></div>}
          <Button className="w-full" disabled={isSubmitting}>{mode === "login" ? "Sign in" : "Create account"}</Button>
        </form>
        <p className="mt-7 text-center text-sm text-[#79695e]">{mode === "login" ? "New to Ahlana?" : "Already have an account?"} <Link href={mode === "login" ? "/signup" : "/login"} className="font-bold text-[#214b3b]">{mode === "login" ? "Create an account" : "Sign in"}</Link></p>
      </div>
    </section>
  </main>;
}
