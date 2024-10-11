// app/layout.tsx
import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header
          linkName="/events"
          roundedCustom="lg:rounded-bl-3xl"
          paddingLeftCustom="lg:pl-14"
          buttonName="Join Mukna"
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}