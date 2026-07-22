"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Slot } from "@radix-ui/react-slot";
import { X } from "lucide-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214b3b]/40 disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-[#214b3b] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#17392d]",
        variant === "secondary" && "bg-[#d59659] text-[#2e1d13] hover:bg-[#c98648]",
        variant === "ghost" && "text-[#523b2e] hover:bg-[#efe4d3]",
        variant === "outline" && "border border-[#cbbba6] bg-white/60 text-[#3d2b21] hover:bg-white",
        variant === "danger" && "bg-[#9c3f32] text-white hover:bg-[#7e3027]",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-[#e3ede5] px-2.5 py-1 text-xs font-semibold text-[#214b3b]", className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[1.5rem] border border-[#dccfbd] bg-white/80 shadow-[0_12px_45px_rgba(77,51,35,0.08)]", className)}>{children}</div>;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn("h-12 w-full rounded-xl border border-[#d8cab8] bg-white/80 px-4 text-sm text-[#2f241e] outline-none transition placeholder:text-[#9b8a7d] focus:border-[#214b3b] focus:ring-4 focus:ring-[#214b3b]/10", className)}
      {...props}
    />
  );
}

export function Modal({
  trigger,
  title,
  children,
  className,
  open,
  onOpenChange,
}: {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#17110d]/60 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content className={cn("fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[2rem] border border-white/30 bg-[#f8f2e8] p-6 shadow-2xl md:p-8", className)}>
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="font-serif text-2xl font-semibold text-[#342219]">{title}</Dialog.Title>
            <Dialog.Close className="rounded-full p-2 hover:bg-[#e8dccb]" aria-label="Close"><X className="size-5" /></Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-[#e4d8c8]", className)} />;
}
