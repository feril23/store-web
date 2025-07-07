"use client";

import {
  BookOpen,
  Eye,
  Search,
  ShoppingCart,
  Star,
  Filter,
  Grid,
  List,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import CTASection from "./CTASection";
import { Book, Category } from "../lib/supabase";
import { useAppContext } from "../context/AppContext";

interface CatalogClientProps {
  books: Book[];
  categories: Category[];
}

const CatalogClient = ({ books, categories }: CatalogClientProps) => {
  const { handleWhatsAppOrder, featuredBooks, bonuses, calculateTotalBonus } =
    useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Katalog eBook Resep
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Koleksi lengkap resep ayam terbaik dari chef profesional
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari resep ayam..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="newest">Terbaru</option>
                  <option value="price-low">Harga Terendah</option>
                  <option value="price-high">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode */}
              <div className="flex bg-white border border-gray-300 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Menampilkan {sortedBooks.length} dari {books.length} eBook
          </div>
        </div>
      </section>

      {/* Books Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedBooks.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-6"
              }
            >
              {sortedBooks.map((book) => (
                <BookCard key={book.id} book={book} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Tidak ada eBook ditemukan
              </h3>
              <p className="text-gray-500 mb-6">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection
        handleWhatsAppOrder={handleWhatsAppOrder}
        featuredBooks={featuredBooks}
        bonuses={bonuses}
        calculateTotal={calculateTotalBonus}
      />
    </div>
  );
};

// Book Card Component
const BookCard = ({
  book,
  viewMode,
}: {
  book: Book;
  viewMode: "grid" | "list";
}) => {
  const discountPercentage =
    book.is_discounted && book.original_price > 0
      ? Math.round((1 - book.price / book.original_price) * 100)
      : 0;

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <div className="w-48 h-32 flex-shrink-0">
            {book.cover_image ? (
              <img
                src={book.cover_image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-orange-400 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>{book.recipes} Resep</span>
                  <span>{book.pages} Halaman</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span>
                      {book.rating} ({book.reviews})
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right ml-6">
                {book.is_discounted && (
                  <div className="text-sm text-gray-500 line-through mb-1">
                    Rp {book.original_price.toLocaleString()}
                  </div>
                )}
                <div className="text-xl font-bold text-green-600 mb-2">
                  {book.is_free
                    ? "GRATIS"
                    : `Rp ${book.price.toLocaleString()}`}
                </div>
                {book.is_discounted && (
                  <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    HEMAT {discountPercentage}%
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {book.is_featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Bestseller
                  </span>
                )}
                {book.category && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {book.category.name}
                  </span>
                )}
              </div>

              <Link
                href={`/book/${book.slug}`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        {book.cover_image ? (
          <img
            src={book.cover_image}
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-green-400 to-orange-400 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-white" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {book.is_featured && (
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Bestseller
            </div>
          )}
          {book.is_discounted && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {book.recipes} Resep
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/book/${book.slug}`}
            className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Eye className="h-4 w-4 inline mr-2" />
            Lihat Detail
          </Link>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-500 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({book.reviews})</span>
          </div>
          <div className="text-xs text-gray-500">{book.pages} halaman</div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            {book.is_discounted && (
              <div className="text-sm text-gray-500 line-through">
                Rp {book.original_price.toLocaleString()}
              </div>
            )}
            <div className="text-xl font-bold text-green-600">
              {book.is_free ? "GRATIS" : `Rp ${book.price.toLocaleString()}`}
            </div>
          </div>
          {book.is_discounted && (
            <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
              HEMAT {discountPercentage}%
            </div>
          )}
        </div>

        <Link
          href={`/book/${book.slug}`}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default CatalogClient;
