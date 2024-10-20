// app/dashboard/layout.tsx
import React, { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        backgroundColor="bg-secondary-1"
        textColor="text-secondary-2"
        linkName="/profile"
        paddingLeftCustom="pl-0"
        roundedCustom="rounded-bl-none"
      />
      <main className="flex-grow bg-secondary-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}