// app/dashboard/layout.tsx (or layout.js)

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const dynamicMenuItems = [
  { name: "Home", link: "/pofcon-landing-page" },
  { name: "Directory", link: "/creative-dashboard" },
  { name: "Gallery", link: "/g-visitor" },
  { name: "Faqs", link: "/faqs" },
];

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div>
      <main className="bg-secondary-1">
        <Header
          menuItems={dynamicMenuItems}
          backgroundColor="bg-secondary-1"
          textColor="text-secondary-2"
          buttonName="Account"
          linkName="profile"
          paddingLeftCustom="pl-0"
          roundedCustom="rounded-bl-none"
        />
        {children}
        <Footer />
      </main>
    </div>
  );
}
