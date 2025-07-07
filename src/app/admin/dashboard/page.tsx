"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Gift,
  Settings,
  TrendingUp,
  Eye,
} from "lucide-react";
import {
  api,
  Book,
  FAQ,
  BonusEbook,
  SiteSettings,
} from "../../../lib/supabase";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    featuredBooks: 0,
    totalFAQs: 0,
    totalBonuses: 0,
  });
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [booksRes, faqsRes, bonusRes, settingsRes] = await Promise.all([
        api.getBooks(),
        api.getFAQs(),
        api.getBonusEbooks(),
        api.getSiteSettings(),
      ]);

      if (booksRes.data) {
        setStats((prev) => ({
          ...prev,
          totalBooks: booksRes.data.length,
          featuredBooks: booksRes.data.filter((book) => book.is_featured)
            .length,
        }));
        setRecentBooks(booksRes.data.slice(0, 5));
      }

      if (faqsRes.data) {
        setStats((prev) => ({ ...prev, totalFAQs: faqsRes.data.length }));
      }

      if (bonusRes.data) {
        setStats((prev) => ({ ...prev, totalBonuses: bonusRes.data.length }));
      }

      if (settingsRes.data) {
        setSiteSettings(settingsRes.data);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-orange-500 rounded-lg shadow-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Selamat Datang di Dashboard Admin
          </h1>
          <p className="opacity-90">
            Kelola konten landing page eBook resep marinasi ayam Anda
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Buku</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalBooks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Buku Featured
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.featuredBooks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <HelpCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total FAQ</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalFAQs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bonus eBook</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalBonuses}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Books */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Buku Terbaru
                </h3>
                <Link
                  href="/admin/books"
                  className="text-sm text-green-600 hover:text-green-500"
                >
                  Lihat Semua
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentBooks.length > 0 ? (
                <div className="space-y-4">
                  {recentBooks.map((book) => (
                    <div key={book.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {book.cover_image ? (
                          <img
                            src={book.cover_image}
                            alt={book.title}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {book.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          Rp {book.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {book.is_featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Featured
                          </span>
                        )}
                        {book.is_discounted && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Diskon
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Belum ada buku</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Aksi Cepat</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <Link
                  href="/admin/books/new"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <BookOpen className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Tambah Buku Baru
                    </p>
                    <p className="text-sm text-gray-500">
                      Buat eBook baru untuk dijual
                    </p>
                  </div>
                </Link>

                <Link
                  href="/admin/faqs"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Kelola FAQ
                    </p>
                    <p className="text-sm text-gray-500">
                      Update pertanyaan umum
                    </p>
                  </div>
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <Settings className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Pengaturan Site
                    </p>
                    <p className="text-sm text-gray-500">
                      Update kontak & promo
                    </p>
                  </div>
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Eye className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Preview Landing Page
                    </p>
                    <p className="text-sm text-gray-500">
                      Lihat tampilan website
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Current Settings Preview */}
        {siteSettings && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Pengaturan Saat Ini
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">WhatsApp</p>
                  <p className="text-lg text-gray-900">
                    {siteSettings.whatsapp_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Harga Promo
                  </p>
                  <p className="text-lg text-gray-900">
                    Rp {siteSettings.promo_price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Hero Title
                  </p>
                  <p className="text-lg text-gray-900">
                    {siteSettings.hero_title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default AdminDashboard;
