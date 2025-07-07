import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import { api } from "../lib/supabase";
import { AppProvider } from "../context/AppContext";
import LayoutWrapper from "../components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChikaRasa Web",
  description: "Website ChikaRasa berisi semua e-book yang anda butuhkan",
};

export const revalidate = 3600; // 1 hour ISR

async function getLayoutData() {
  try {
    const settingsRes = await api.getSiteSettings();
    const booksRes = await api.getFeaturedBooks();
    const featuredBook = booksRes.data?.[0] || null;

    let bonuses = [];
    if (featuredBook) {
      const bonusRes = await api.getBonusEbooks();
      bonuses =
        bonusRes.data?.filter((b) => b.linked_book_id === featuredBook.id) ||
        [];
    }

    return {
      siteSettings: settingsRes.data,
      featuredBooks: featuredBook,
      bonuses,
    };
  } catch (error) {
    console.error("Error fetching layout data:", error);
    return {
      siteSettings: null,
      featuredBooks: null,
      bonuses: [],
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteSettings, featuredBooks, bonuses } = await getLayoutData();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AppProvider
          siteSettings={siteSettings}
          featuredBooks={featuredBooks}
          bonuses={bonuses}
        >
          <LayoutWrapper
            siteSettings={siteSettings}
            featuredBooks={featuredBooks}
            bonuses={bonuses}
          >
            {children}
          </LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
