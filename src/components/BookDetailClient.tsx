"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  BookOpen,
  Clock,
  MessageCircle,
  ShoppingCart,
  CheckCircle,
  Eye,
  Share2,
  Gift,
  Download,
  Shield,
} from "lucide-react";
import { Book, BonusEbook } from "../lib/supabase";
import { useAppContext } from "../context/AppContext";

interface BookDetailClientProps {
  book: Book;
  bonuses: BonusEbook[];
}

const BookDetailClient = ({ book, bonuses }: BookDetailClientProps) => {
  const { handleWhatsAppOrder } = useAppContext();
  const [activeTab, setActiveTab] = useState("description");

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book?.title,
        text: book?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  const discountPercentage =
    book.is_discounted && book.original_price > 0
      ? Math.round((1 - book.price / book.original_price) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/catalog"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali ke Katalog
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Bagikan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Book Cover & Purchase Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              {/* Cover Image */}
              <div className="relative mb-8">
                {book.cover_image ? (
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="w-full max-w-md mx-auto h-auto rounded-2xl shadow-lg"
                  />
                ) : (
                  <div className="w-full max-w-md mx-auto h-96 bg-gradient-to-br from-green-400 to-orange-400 rounded-2xl flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-white" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {book.is_featured && (
                    <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      BESTSELLER
                    </div>
                  )}
                  {book.is_discounted && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercentage}%
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase Card */}
              <div className="bg-gray-50 rounded-2xl p-6">
                {/* Pricing */}
                <div className="text-center mb-6">
                  {book.is_discounted && (
                    <div className="text-lg text-gray-500 line-through mb-1">
                      Rp {book.original_price.toLocaleString()}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {book.is_free
                      ? "GRATIS"
                      : `Rp ${book.price.toLocaleString()}`}
                  </div>
                  {book.is_discounted && (
                    <div className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block">
                      Hemat Rp{" "}
                      {(book.original_price - book.price).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-xl">
                    <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-gray-900">
                      {book.pages} Halaman
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-gray-900">
                      {book.recipes} Resep
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Pesan via WhatsApp
                  </button>

                  {book.preview_file_url && (
                    <a
                      href={book.preview_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      Lihat Preview
                    </a>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      Pembayaran 100% Aman
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-2 text-green-600" />
                      Download Langsung Setelah Bayar
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Akses Selamanya
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Title & Category */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                {book.category && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {book.category.name}
                  </span>
                )}
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  eBook Digital
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-500 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {book.rating} ({book.reviews} ulasan)
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {[
                  { id: "description", label: "Deskripsi" },
                  { id: "contents", label: "Isi Buku" },
                  { id: "bonuses", label: `Bonus (${bonuses.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                    {book.description.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "contents" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Preview Daftar Isi
                  </h3>
                  <div className="flex justify-center">
                    <div className="bg-gray-50 rounded-2xl p-6 max-w-2xl w-full">
                      <img
                        src={book?.preview_images?.[0]}
                        alt="Preview Daftar Isi"
                        className="w-full h-auto rounded-xl shadow-lg"
                        loading="lazy"
                      />
                      <div className="text-center mt-4 text-sm text-gray-500">
                        Preview Daftar Isi eBook
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "bonuses" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Bonus Eksklusif
                  </h3>
                  {bonuses.length > 0 ? (
                    <div className="space-y-6">
                      {bonuses.map((bonus, index) => (
                        <div
                          key={bonus.id}
                          className="border-2 border-yellow-200 rounded-2xl p-6 bg-yellow-50"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-yellow-500 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 mb-2">
                                {bonus.title}
                              </h4>
                              <p className="text-gray-700 mb-4">
                                {bonus.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-green-600 font-semibold">
                                  Senilai Rp {bonus.value.toLocaleString()}
                                </p>
                                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                  GRATIS HARI INI!
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Total Bonus Value */}
                      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                        <div className="text-center">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            Total Nilai Bonus
                          </h4>
                          <p className="text-3xl font-bold text-green-600">
                            Rp {bonuses.reduce((sum, bonus) => sum + bonus.value, 0).toLocaleString()}
                          </p>
                          <p className="text-gray-600 mt-2">
                            Semua bonus ini GRATIS untuk pembelian hari ini!
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Tidak ada bonus untuk buku ini
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Bottom CTA (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50">
          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Pesan Sekarang - Rp {book.price.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailClient;