"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { AppProviderProps } from "../context/AppContext";

interface LayoutWrapperProps extends AppProviderProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({
  children,
  siteSettings,
  featuredBooks,
  bonuses,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <NavBar />}
      <main className="min-h-screen">{children}</main>
      {!isAdminPage && <Footer siteSettings={siteSettings} />}
    </>
  );
}
