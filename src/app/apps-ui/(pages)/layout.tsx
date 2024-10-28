// app/layout.tsx
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <Header
        linkName="/apps-ui/signin"
        roundedCustom="lg:rounded-bl-3xl"
        paddingLeftCustom="lg:pl-14"
        buttonName="Log in"
      />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </main>
  );
}
