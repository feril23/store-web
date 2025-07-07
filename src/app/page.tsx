"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import {
  Award,
  BookOpen,
  CheckCircle,
  ChefHat,
  Clock,
  Gift,
  Heart,
  Timer,
  Zap,
  X,
  Star,
  Shield,
  Target,
  Utensils,
  Users,
  TrendingUp,
  Lightbulb,
  Flame,
  Coffee,
  Sparkles,
  Crown,
  Gem,
  Rocket,
  ThumbsUp,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Percent,
  ShoppingCart,
  Package,
  Truck,
  Home,
  Building,
  Store,
  Factory,
  Briefcase,
  GraduationCap,
  BookMarked,
  FileText,
  Image,
  Video,
  Music,
  Headphones,
  Camera,
  Smartphone,
  Laptop,
  Monitor,
  Printer,
  Wifi,
  Battery,
  Plug,
  Settings,
  PenTool as Tool,
  Wrench,
  Hammer,
  Scissors,
  PaintBucket,
  Palette,
  Brush,
  Pencil,
  Edit,
  Save,
  Download,
  Upload,
  Share,
  Link,
  Copy,
  Trash,
  Archive,
  Folder,
  File,
  Search,
  Filter,
  SortAsc as Sort,
  Grid,
  List,
  Menu,
  MoreHorizontal,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  RotateCw,
  RefreshCw as Refresh,
  Maximize,
  Minimize,
  Plus,
  Minus,
  Divide,
  Equal,
  Percent as PercentIcon,
  Hash,
  AtSign,
  Asterisk,
  Slash,
  Slack as Backslash,
  Pipette as Pipe,
  Ampersand,
} from "lucide-react";
import { api, ContentSection, WhatsAppTestimonial } from "../lib/supabase";

const iconMap = {
  Award,
  BookOpen,
  CheckCircle,
  ChefHat,
  Clock,
  Gift,
  Heart,
  Timer,
  Zap,
  X,
  Star,
  Shield,
  Target,
  Utensils,
  Users,
  TrendingUp,
  Lightbulb,
  Flame,
  Coffee,
  Sparkles,
  Crown,
  Gem,
  Rocket,
  ThumbsUp,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Percent,
  ShoppingCart,
  Package,
  Truck,
  Home,
  Building,
  Store,
  Factory,
  Briefcase,
  GraduationCap,
  BookMarked,
  FileText,
  Image,
  Video,
  Music,
  Headphones,
  Camera,
  Smartphone,
  Laptop,
  Monitor,
  Printer,
  Wifi,
  Battery,
  Plug,
  Settings,
  Tool,
  Wrench,
  Hammer,
  Scissors,
  PaintBucket,
  Palette,
  Brush,
  Pencil,
  Edit,
  Save,
  Download,
  Upload,
  Share,
  Link,
  Copy,
  Trash,
  Archive,
  Folder,
  File,
  Search,
  Filter,
  Sort,
  Grid,
  List,
  Menu,
  MoreHorizontal,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  RotateCw,
  Refresh,
  Maximize,
  Minimize,
  Plus,
  Minus,
  Divide,
  Equal,
  PercentIcon,
  Hash,
  AtSign,
  Asterisk,
  Slash,
  Backslash,
  Pipe,
  Ampersand,
};

const HomePage = () => {
  const {
    siteSettings,
    featuredBooks,
    bonuses,
    handleWhatsAppOrder,
    calculateTotalBonus,
  } = useAppContext();

  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [whatsappTestimonials, setWhatsappTestimonials] = useState<
    WhatsAppTestimonial[]
  >([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);

  const nextTestimonial = () => {
    if (whatsappTestimonials.length === 0) return;
    setCurrentTestimonial((prev) => (prev + 1) % whatsappTestimonials.length);
  };

  const prevTestimonial = () => {
    if (whatsappTestimonials.length === 0) return;
    setCurrentTestimonial(
      (prev) =>
        (prev - 1 + whatsappTestimonials.length) % whatsappTestimonials.length
    );
  };

  useEffect(() => {
    const loadDynamicContent = async () => {
      setLoading(true);
      try {
        const [sectionsRes, testimonialsRes] = await Promise.all([
          api.getContentSections(),
          api.getWhatsAppTestimonials(),
        ]);

        if (sectionsRes.data) setContentSections(sectionsRes.data);
        if (testimonialsRes.data) setWhatsappTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error("Error loading dynamic content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDynamicContent();
  }, []);

  const getSectionByKey = (key: string) => {
    return contentSections.find((section) => section.section_key === key);
  };

  const renderIcon = (iconName: string, colorClass: string) => {
    const IconComponent = iconMap[iconName] || CheckCircle;
    return <IconComponent className={`h-6 w-6 ${colorClass}`} />;
  };

  const problemSection = getSectionByKey("problem_section");
  const marinasiSection = getSectionByKey("marinasi_explanation");
  const restaurantSection = getSectionByKey("restaurant_quality");
  const whyMustHaveSection = getSectionByKey("why_must_have");

  if (loading || !siteSettings || !featuredBooks) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat konten...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section - Clean & Elegant */}
      <section className="relative bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              {/* Trust Badge */}
              <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Star className="h-4 w-4 mr-2 fill-current" />
                {siteSettings.cta_text}
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-green-600">
                  {siteSettings?.hero_title}
                </span>
              </h1>

              {/* Value Proposition */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {siteSettings?.hero_subtitle}
              </p>

              {/* Pricing */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Harga Normal</p>
                    <p className="text-lg text-gray-400 line-through">
                      Rp {siteSettings?.harga_asli?.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 mb-1">Harga Promo</p>
                    <p className="text-3xl font-bold text-green-600">
                      Rp {siteSettings?.promo_price?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Bonus:</span> {bonuses.length}{" "}
                    eBook senilai Rp {calculateTotalBonus().toLocaleString()} -
                    GRATIS!
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                Pesan Sekarang via WhatsApp
              </button>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Pembayaran Aman
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Akses Selamanya
                </div>
              </div>
            </div>

            {/* Right Content - eBook Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <span className="inline-flex items-center bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Daftar Isi
                  </span>
                </div>

                <div className="relative max-w-sm mx-auto">
                  <img
                    src={featuredBooks?.preview_images?.[0]}
                    alt="Preview eBook"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>

                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    <span className="font-semibold text-green-600">
                      {featuredBooks?.recipes} Resep
                    </span>{" "}
                    •
                    <span className="font-semibold text-orange-600">
                      {" "}
                      {featuredBooks?.pages} Halaman
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      {problemSection && (
        <section className="py-20 bg-red-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {problemSection.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {problemSection.content}
              </p>
            </div>

            {problemSection.content_items &&
              problemSection.content_items.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {problemSection.content_items.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-6 shadow-sm"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          {renderIcon(item.icon_name, "text-red-600")}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </section>
      )}

      {/* Solution Section */}
      {marinasiSection && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {marinasiSection.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                <span className="font-semibold">
                  {marinasiSection.subtitle}
                </span>{" "}
                {marinasiSection.content}
              </p>
            </div>

            {marinasiSection.content_items &&
              marinasiSection.content_items.length > 0 && (
                <div className="grid md:grid-cols-3 gap-8">
                  {marinasiSection.content_items.map((item) => (
                    <div key={item.id} className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                        {renderIcon(item.icon_name, "text-green-600")}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </section>
      )}

      {/* Process Section */}
      {restaurantSection && (
        <section className="py-20 bg-orange-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {restaurantSection.title}
              </h2>
              <p className="text-xl text-gray-600">
                {restaurantSection.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Process Steps */}
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Ayam Segar",
                    description: "Pilih ayam berkualitas terbaik",
                    icon: <ChefHat className="w-5 h-5" />,
                  },
                  {
                    step: 2,
                    title: "Bumbu Marinasi",
                    description: "Racikan bumbu rahasia dengan takaran tepat",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    step: 3,
                    title: "Proses Marinasi",
                    description: "Didiamkan hingga meresap sempurna",
                    icon: <Clock className="w-5 h-5" />,
                  },
                  {
                    step: 4,
                    title: "Ayam Siap Masak",
                    description: "Siap diolah menjadi hidangan lezat",
                    icon: <CheckCircle className="w-5 h-5" />,
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-orange-600 mr-2">
                          {step.icon}
                        </span>
                        <h5 className="font-semibold text-gray-900">
                          {step.title}
                        </h5>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl p-8 text-white text-center">
                <div className="text-6xl mb-4">🍗</div>
                <h4 className="text-2xl font-bold mb-4">Hasil Akhir</h4>
                <p className="text-lg mb-6">
                  Ayam yang juicy, empuk, dan penuh rasa yang bikin keluarga
                  ketagihan!
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                    ⭐ Premium Quality
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {whyMustHaveSection && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {whyMustHaveSection.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {whyMustHaveSection.subtitle}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* eBook Preview */}
              <div className="order-2 lg:order-1">
                <div className="max-w-md mx-auto">
                  <img
                    src={featuredBooks?.preview_images?.[0]}
                    alt="Preview eBook"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Benefits List */}
              <div className="order-1 lg:order-2 space-y-6">
                {whyMustHaveSection.content_items &&
                  whyMustHaveSection.content_items.length > 0 &&
                  whyMustHaveSection.content_items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {renderIcon(item.icon_name, "text-blue-600")}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bonus Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gift className="h-4 w-4 mr-2" />
              Bonus Eksklusif
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Dapatkan <span className="text-green-600">GRATIS</span>{" "}
              {bonuses.length} eBook Premium
            </h2>
            <p className="text-xl text-gray-600">
              Total nilai bonus:{" "}
              <span className="font-bold text-green-600">
                Rp {calculateTotalBonus().toLocaleString()}
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {bonuses.map((bonus, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border-2 border-yellow-200"
              >
                <div className="text-center">
                  <div className="w-full h-52 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <img
                      src={bonus.cover_image || "/placeholder-book.png"}
                      alt={bonus.title}
                      className="w-full h-full object-[fit]"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {bonus.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {bonus.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-gray-400 line-through">
                      Rp {bonus.value.toLocaleString()}
                    </p>
                    <div className="bg-green-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                      GRATIS HARI INI!
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Value */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Ringkasan Total Package
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-gray-500 mb-2">Produk Utama</p>
                <p className="text-2xl font-bold text-gray-400 line-through">
                  Rp {siteSettings.harga_asli.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-2">Total Bonus</p>
                <p className="text-2xl font-bold text-green-600">
                  Rp {calculateTotalBonus().toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-2">Harga Hari Ini</p>
                <p className="text-3xl font-bold text-green-600">
                  Rp {siteSettings.promo_price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <p className="text-lg text-gray-700 mb-4">
                Total penghematan:{" "}
                <span className="font-bold text-green-600">
                  Rp{" "}
                  {(
                    siteSettings.harga_asli -
                    siteSettings.promo_price +
                    calculateTotalBonus()
                  ).toLocaleString()}
                </span>
              </p>
              <button
                onClick={handleWhatsAppOrder}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
              >
                Ambil Penawaran Ini Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials
        testimonials={whatsappTestimonials}
        currentTestimonial={currentTestimonial}
        prevTestimonial={prevTestimonial}
        nextTestimonial={nextTestimonial}
      />

      {/* Final CTA */}
      <CTASection
        featuredBooks={featuredBooks}
        bonuses={bonuses}
        calculateTotal={calculateTotalBonus}
        handleWhatsAppOrder={handleWhatsAppOrder}
      />
    </>
  );
};

export default HomePage;
