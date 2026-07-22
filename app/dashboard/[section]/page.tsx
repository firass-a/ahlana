import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ChatPage, ContractsPage, HiddenGemsPage, InvoicesPage, JournalPage, PackagePage, PaymentPage,
  PremiumPage, ProfilePage, SettingsPage, SupportPage, TripMapPage,
} from "@/features/dashboard/modules";
import { MarketplacePage, VRCitiesPage } from "@/features/marketplace/marketplace-page";

export default async function DashboardSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (section === "hosts" || section === "cars" || section === "artisans" || section === "activities") {
    return (
      <Suspense fallback={<div className="p-8 text-sm text-[#88776b]">Loading…</div>}>
        <MarketplacePage section={section} />
      </Suspense>
    );
  }
  if (section === "vr-cities") return <VRCitiesPage/>;
  if (section === "journal") return <JournalPage/>;
  if (section === "support") return <SupportPage/>;
  if (section === "hidden-gems") return <HiddenGemsPage/>;
  if (section === "host-premium") return <PremiumPage/>;
  if (section === "build-package") return <PackagePage/>;
  if (section === "calendar") return <PackagePage calendarOnly/>;
  if (section === "chat") return <ChatPage/>;
  if (section === "contracts") return <ContractsPage/>;
  if (section === "trip-map") return <TripMapPage/>;
  if (section === "payment") return <PaymentPage/>;
  if (section === "invoices") return <InvoicesPage/>;
  if (section === "profile") return <ProfilePage/>;
  if (section === "settings") return <SettingsPage/>;
  notFound();
}
