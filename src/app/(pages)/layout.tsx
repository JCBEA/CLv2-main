import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header
          menuItems={dynamicMenuItems}
          linkName="/events"
          roundedCustom="lg:rounded-bl-3xl"
          paddingLeftCustom="lg:pl-14"
          buttonName="Join Mukna"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}

const dynamicMenuItems = [
  { name: "directory", link: "/creative-dashboard" },
  { name: "gallery", link: "/g-visitor" },
  { name: "faqs", link: "/faqs" },
  { name: "Log in", link: "/signin" },
];
