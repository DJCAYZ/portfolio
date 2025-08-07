import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import React from "react";
import { PortfolioSidebar } from "./portfolio-sidebar";

export const metadata: Metadata = {
  title: 'Portfolio',
}

export default function PortfolioLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <PortfolioSidebar />
      <main className="w-full min-h-screen relative">
        {children}
      </main>
    </SidebarProvider>
  );
}