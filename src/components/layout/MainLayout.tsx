// components/layout/MainLayout.tsx

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <Header
        menuItems={[
          { name: "Home", link: "/" },
          { name: "Login", link: "/signin" },
          { name: "Signup", link: "/signup" },
        ]}
      /> */}
      <main className="bg-white min-h-screen p-4">{children}</main>
      <Footer />
    </div>
  );
}
