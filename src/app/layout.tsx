import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creative Legazpi 2.0",
  description: "Creatives Legazpi",
  icons: {
    icon: {
      url: "/images/logo.png",
      type: "image/png",
      sizes: "45x16",
    }
  }
};


// src/app/layout.tsx
import React from 'react';
import { AuthProvider } from "@/context/authcontext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}