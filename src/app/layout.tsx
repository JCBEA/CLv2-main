// app/layout.tsx

import './globals.css';
import Header from '@/components/_header';
import { AuthProvider } from "@/context/authcontext";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
      <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}





