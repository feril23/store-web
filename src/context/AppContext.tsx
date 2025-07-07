"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book, BonusEbook, SiteSettings } from "../lib/supabase";

interface AppContextType {
  siteSettings: SiteSettings | null;
  featuredBooks: Book | null;
  bonuses: BonusEbook[];
  handleWhatsAppOrder: () => void;
  calculateTotalBonus: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({
  children,
  siteSettings,
  featuredBooks,
  bonuses,
}: {
  children: ReactNode;
  siteSettings: SiteSettings | null;
  featuredBooks: Book | null;
  bonuses: BonusEbook[];
}) => {
  const handleWhatsAppOrder = () => {
    if (!featuredBooks || !siteSettings) return;

    const message = `Halo! Saya tertarik untuk membeli eBook "${
      featuredBooks.title
    }" dengan harga promo Rp ${featuredBooks.price.toLocaleString()}. Bagaimana cara pemesanannya?`;
    const whatsappUrl = `https://wa.me/${siteSettings.whatsapp_number.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const calculateTotalBonus = () => {
    return bonuses.reduce((sum, bonus) => sum + bonus.value, 0);
  };

  const value = {
    siteSettings,
    featuredBooks,
    bonuses,
    handleWhatsAppOrder,
    calculateTotalBonus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
