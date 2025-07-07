"use client";
import { useState, useEffect } from "react";
import { Save, Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";

import {
  api,
  SiteSettings,
  ContentSection,
  SectionContentItem,
  WhatsAppTestimonial,
} from "../../../lib/supabase";

// Expanded icon options with preview
const iconOptions = [
  // Basic Actions
  { name: "Award", label: "🏆 Award" },
  { name: "BookOpen", label: "📖 Book Open" },
  { name: "CheckCircle", label: "✅ Check Circle" },
  { name: "ChefHat", label: "👨‍🍳 Chef Hat" },
  { name: "Clock", label: "⏰ Clock" },
  { name: "Gift", label: "🎁 Gift" },
  { name: "Heart", label: "❤️ Heart" },
  { name: "Timer", label: "⏱️ Timer" },
  { name: "Zap", label: "⚡ Zap" },
  { name: "X", label: "❌ X" },
  { name: "Star", label: "⭐ Star" },
  { name: "Shield", label: "🛡️ Shield" },
  { name: "Target", label: "🎯 Target" },
  { name: "Utensils", label: "🍴 Utensils" },
  { name: "Users", label: "👥 Users" },
  { name: "TrendingUp", label: "📈 Trending Up" },
  { name: "Lightbulb", label: "💡 Lightbulb" },
  { name: "Flame", label: "🔥 Flame" },
  { name: "Coffee", label: "☕ Coffee" },
  { name: "Sparkles", label: "✨ Sparkles" },
  { name: "Crown", label: "👑 Crown" },
  { name: "Gem", label: "💎 Gem" },
  { name: "Rocket", label: "🚀 Rocket" },
  { name: "ThumbsUp", label: "👍 Thumbs Up" },
  { name: "Eye", label: "👁️ Eye" },

  // Communication
  { name: "MessageCircle", label: "💬 Message Circle" },
  { name: "Phone", label: "📞 Phone" },
  { name: "Mail", label: "📧 Mail" },

  // Location & Time
  { name: "MapPin", label: "📍 Map Pin" },
  { name: "Calendar", label: "📅 Calendar" },

  // Money & Commerce
  { name: "DollarSign", label: "💲 Dollar Sign" },
  { name: "Percent", label: "% Percent" },
  { name: "ShoppingCart", label: "🛒 Shopping Cart" },
  { name: "Package", label: "📦 Package" },
  { name: "Truck", label: "🚚 Truck" },

  // Buildings & Places
  { name: "Home", label: "🏠 Home" },
  { name: "Building", label: "🏢 Building" },
  { name: "Store", label: "🏪 Store" },
  { name: "Factory", label: "🏭 Factory" },

  // Work & Education
  { name: "Briefcase", label: "💼 Briefcase" },
  { name: "GraduationCap", label: "🎓 Graduation Cap" },
  { name: "BookMarked", label: "📑 Book Marked" },

  // Media & Files
  { name: "FileText", label: "📄 File Text" },
  { name: "Image", label: "🖼️ Image" },
  { name: "Video", label: "🎥 Video" },
  { name: "Music", label: "🎵 Music" },
  { name: "Headphones", label: "🎧 Headphones" },
  { name: "Camera", label: "📷 Camera" },

  // Technology
  { name: "Smartphone", label: "📱 Smartphone" },
  { name: "Laptop", label: "💻 Laptop" },
  { name: "Monitor", label: "🖥️ Monitor" },
  { name: "Printer", label: "🖨️ Printer" },
  { name: "Wifi", label: "📶 Wifi" },
  { name: "Battery", label: "🔋 Battery" },
  { name: "Plug", label: "🔌 Plug" },

  // Tools
  { name: "Settings", label: "⚙️ Settings" },
  { name: "Tool", label: "🔧 Tool" },
  { name: "Wrench", label: "🔧 Wrench" },
  { name: "Hammer", label: "🔨 Hammer" },
  { name: "Scissors", label: "✂️ Scissors" },

  // Design
  { name: "PaintBucket", label: "🎨 Paint Bucket" },
  { name: "Palette", label: "🎨 Palette" },
  { name: "Brush", label: "🖌️ Brush" },
  { name: "Pencil", label: "✏️ Pencil" },

  // File Operations
  { name: "Edit", label: "✏️ Edit" },
  { name: "Save", label: "💾 Save" },
  { name: "Download", label: "⬇️ Download" },
  { name: "Upload", label: "⬆️ Upload" },
  { name: "Share", label: "📤 Share" },
  { name: "Link", label: "🔗 Link" },
  { name: "Copy", label: "📋 Copy" },
  { name: "Trash", label: "🗑️ Trash" },
  { name: "Archive", label: "📁 Archive" },
  { name: "Folder", label: "📁 Folder" },
  { name: "File", label: "📄 File" },

  // Search & Filter
  { name: "Search", label: "🔍 Search" },
  { name: "Filter", label: "🔽 Filter" },
  { name: "Sort", label: "🔀 Sort" },
  { name: "Grid", label: "⊞ Grid" },
  { name: "List", label: "☰ List" },

  // Navigation
  { name: "Menu", label: "☰ Menu" },
  { name: "MoreHorizontal", label: "⋯ More Horizontal" },
  { name: "MoreVertical", label: "⋮ More Vertical" },
  { name: "ChevronUp", label: "⌃ Chevron Up" },
  { name: "ChevronDown", label: "⌄ Chevron Down" },
  { name: "ChevronLeft", label: "⌃ Chevron Left" },
  { name: "ChevronRight", label: "⌃ Chevron Right" },
  { name: "ArrowUp", label: "↑ Arrow Up" },
  { name: "ArrowDown", label: "↓ Arrow Down" },
  { name: "ArrowLeft", label: "← Arrow Left" },
  { name: "ArrowRight", label: "→ Arrow Right" },

  // Transform
  { name: "RotateCcw", label: "↺ Rotate CCW" },
  { name: "RotateCw", label: "↻ Rotate CW" },
  { name: "Refresh", label: "🔄 Refresh" },
  { name: "Maximize", label: "⛶ Maximize" },
  { name: "Minimize", label: "⛶ Minimize" },

  // Math
  { name: "Plus", label: "+ Plus" },
  { name: "Minus", label: "- Minus" },
  { name: "Divide", label: "÷ Divide" },
  { name: "Equal", label: "= Equal" },
  { name: "PercentIcon", label: "% Percent Icon" },
  { name: "Hash", label: "# Hash" },

  // Symbols
  { name: "AtSign", label: "@ At Sign" },
  { name: "Asterisk", label: "* Asterisk" },
  { name: "Slash", label: "/ Slash" },
  { name: "Backslash", label: "\\ Backslash" },
  { name: "Pipe", label: "| Pipe" },
  { name: "Ampersand", label: "& Ampersand" },

  // Security
  { name: "Lock", label: "🔒 Lock" },
  { name: "Unlock", label: "🔓 Unlock" },
  { name: "Key", label: "🔑 Key" },
  { name: "Fingerprint", label: "👆 Fingerprint" },
  { name: "Scan", label: "📷 Scan" },
  { name: "QrCode", label: "📱 QR Code" },
  { name: "Barcode", label: "📊 Barcode" },

  // Finance
  { name: "CreditCard", label: "💳 Credit Card" },
  { name: "Banknote", label: "💵 Banknote" },
  { name: "Coins", label: "🪙 Coins" },
  { name: "Wallet", label: "👛 Wallet" },
  { name: "PiggyBank", label: "🐷 Piggy Bank" },
  { name: "Safe", label: "🔐 Safe" },
  { name: "Vault", label: "🏦 Vault" },
  { name: "Bank", label: "🏦 Bank" },

  // Math Tools
  { name: "Calculator", label: "🧮 Calculator" },
  { name: "Scale", label: "⚖️ Scale" },
  { name: "Ruler", label: "📏 Ruler" },
  { name: "Compass", label: "🧭 Compass" },

  // Shapes
  { name: "Triangle", label: "△ Triangle" },
  { name: "Square", label: "□ Square" },
  { name: "Circle", label: "○ Circle" },
  { name: "Diamond", label: "◇ Diamond" },
  { name: "Pentagon", label: "⬟ Pentagon" },
  { name: "Hexagon", label: "⬢ Hexagon" },
  { name: "Octagon", label: "⯃ Octagon" },

  // 3D Shapes
  { name: "Cube", label: "🧊 Cube" },
  { name: "Sphere", label: "🌐 Sphere" },
  { name: "Cylinder", label: "🥫 Cylinder" },
  { name: "Cone", label: "🍦 Cone" },
  { name: "Pyramid", label: "🔺 Pyramid" },

  // Math Functions
  { name: "Wave", label: "〰️ Wave" },
  { name: "Infinity", label: "∞ Infinity" },
  { name: "Pi", label: "π Pi" },
  { name: "Sigma", label: "Σ Sigma" },
  { name: "Delta", label: "Δ Delta" },
  { name: "Alpha", label: "α Alpha" },
  { name: "Beta", label: "β Beta" },
  { name: "Gamma", label: "γ Gamma" },
  { name: "Theta", label: "θ Theta" },
  { name: "Lambda", label: "λ Lambda" },
  { name: "Omega", label: "Ω Omega" },
];

const colorOptions = [
  { name: "text-green-500", label: "🟢 Green", preview: "bg-green-500" },
  { name: "text-blue-500", label: "🔵 Blue", preview: "bg-blue-500" },
  { name: "text-red-500", label: "🔴 Red", preview: "bg-red-500" },
  { name: "text-yellow-500", label: "🟡 Yellow", preview: "bg-yellow-500" },
  { name: "text-purple-500", label: "🟣 Purple", preview: "bg-purple-500" },
  { name: "text-orange-500", label: "🟠 Orange", preview: "bg-orange-500" },
  { name: "text-pink-500", label: "🩷 Pink", preview: "bg-pink-500" },
  { name: "text-gray-500", label: "⚫ Gray", preview: "bg-gray-500" },
  { name: "text-indigo-500", label: "🔷 Indigo", preview: "bg-indigo-500" },
  { name: "text-teal-500", label: "🟦 Teal", preview: "bg-teal-500" },
  { name: "text-cyan-500", label: "🔷 Cyan", preview: "bg-cyan-500" },
  { name: "text-lime-500", label: "🟢 Lime", preview: "bg-lime-500" },
  { name: "text-emerald-500", label: "💚 Emerald", preview: "bg-emerald-500" },
  { name: "text-rose-500", label: "🌹 Rose", preview: "bg-rose-500" },
  { name: "text-amber-500", label: "🟨 Amber", preview: "bg-amber-500" },
  { name: "text-violet-500", label: "🟣 Violet", preview: "bg-violet-500" },
  { name: "text-fuchsia-500", label: "🩷 Fuchsia", preview: "bg-fuchsia-500" },
  { name: "text-sky-500", label: "🔵 Sky", preview: "bg-sky-500" },
  { name: "text-slate-500", label: "⚫ Slate", preview: "bg-slate-500" },
  { name: "text-zinc-500", label: "⚫ Zinc", preview: "bg-zinc-500" },
];

const SiteSetting = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [whatsappTestimonials, setWhatsappTestimonials] = useState<
    WhatsAppTestimonial[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [uploading, setUploading] = useState(false);

  // Section Form State
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionFormData, setSectionFormData] = useState({
    section_key: "",
    title: "",
    subtitle: "",
    content: "",
    is_active: true,
    order_index: 0,
  });

  // Content Item Form State
  const [showContentForm, setShowContentForm] = useState(false);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const [contentFormData, setContentFormData] = useState({
    section_id: "",
    title: "",
    description: "",
    icon_name: "CheckCircle",
    icon_color: "text-green-500",
  });

  // WhatsApp Testimonial Form State
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<
    string | null
  >(null);
  const [testimonialFormData, setTestimonialFormData] = useState({
    customer_name: "",
    chat_image: "",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [settingsRes, sectionsRes, testimonialsRes] = await Promise.all([
        api.getSiteSettings(),
        api.getAllContentSections(),
        api.getAllWhatsAppTestimonials(),
      ]);

      if (settingsRes.data) setSettings(settingsRes.data);
      if (sectionsRes.data) setContentSections(sectionsRes.data);
      if (testimonialsRes.data) setWhatsappTestimonials(testimonialsRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      await api.updateSiteSettings(settings);
      alert("Pengaturan berhasil disimpan!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Gagal menyimpan pengaturan");
    } finally {
      setSaving(false);
    }
  };

  const handleSectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingSectionId) {
        await api.updateContentSection(editingSectionId, sectionFormData);
      } else {
        await api.createContentSection(sectionFormData);
      }

      setShowSectionForm(false);
      setEditingSectionId(null);
      setSectionFormData({
        section_key: "",
        title: "",
        subtitle: "",
        content: "",
        is_active: true,
        order_index: 0,
      });
      loadData();
    } catch (error) {
      console.error("Error saving section:", error);
      alert("Gagal menyimpan section");
    }
  };

  const handleEditSection = (section: ContentSection) => {
    setSectionFormData({
      section_key: section.section_key,
      title: section.title,
      subtitle: section.subtitle || "",
      content: section.content || "",
      is_active: section.is_active,
      order_index: section.order_index,
    });
    setEditingSectionId(section.id);
    setShowSectionForm(true);
  };

  const handleDeleteSection = async (id: string) => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus section ini? Semua content items di dalamnya juga akan terhapus."
      )
    )
      return;

    try {
      await api.deleteContentSection(id);
      loadData();
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Gagal menghapus section");
    }
  };

  const toggleSectionStatus = async (section: ContentSection) => {
    try {
      await api.updateContentSection(section.id, {
        is_active: !section.is_active,
      });
      loadData();
    } catch (error) {
      console.error("Error updating section status:", error);
      alert("Gagal mengupdate status section");
    }
  };

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingContentId) {
        await api.updateSectionContentItem(editingContentId, contentFormData);
      } else {
        await api.createSectionContentItem(contentFormData);
      }

      setShowContentForm(false);
      setEditingContentId(null);
      setContentFormData({
        section_id: "",
        title: "",
        description: "",
        icon_name: "CheckCircle",
        icon_color: "text-green-500",
      });
      loadData();
    } catch (error) {
      console.error("Error saving content item:", error);
      alert("Gagal menyimpan content item");
    }
  };

  const handleDeleteContentItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;

    try {
      await api.deleteSectionContentItem(id);
      loadData();
    } catch (error) {
      console.error("Error deleting content item:", error);
      alert("Gagal menghapus content item");
    }
  };

  const handleTestimonialImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileName = `testimonial-${Date.now()}-${file.name}`;
      const publicUrl = await api.uploadFile(file, "testimonials", fileName);
      setTestimonialFormData((prev) => ({ ...prev, chat_image: publicUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengupload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonialId) {
        await api.updateWhatsAppTestimonial(
          editingTestimonialId,
          testimonialFormData
        );
      } else {
        await api.createWhatsAppTestimonial(testimonialFormData);
      }

      setShowTestimonialForm(false);
      setEditingTestimonialId(null);
      setTestimonialFormData({
        customer_name: "",
        chat_image: "",
        description: "",
        is_active: true,
      });
      loadData();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Gagal menyimpan testimonial");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) return;

    try {
      await api.deleteWhatsAppTestimonial(id);
      loadData();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Gagal menghapus testimonial");
    }
  };

  const toggleTestimonialStatus = async (testimonial: WhatsAppTestimonial) => {
    try {
      await api.updateWhatsAppTestimonial(testimonial.id, {
        is_active: !testimonial.is_active,
      });
      loadData();
    } catch (error) {
      console.error("Error updating testimonial status:", error);
      alert("Gagal mengupdate status testimonial");
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
        <p className="text-gray-600">
          Kelola konten dan pengaturan landing page
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: "basic", label: "Pengaturan Dasar" },
            { id: "sections", label: "Kelola Section" },
            { id: "content", label: "Konten Dinamis" },
            { id: "testimonials", label: "Chat WhatsApp" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
      {activeTab === "basic" && settings && (
        <form
          onSubmit={handleSaveSettings}
          className="bg-white rounded-lg shadow p-6 space-y-6"
        >
          <h2 className="text-lg font-medium text-gray-900">
            Pengaturan Dasar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp_number: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+62 812-3456-7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Kontak
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) =>
                  setSettings({ ...settings, contact_email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="info@chikarasa.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Promo (Rp)
              </label>
              <input
                type="number"
                value={settings.promo_price}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    promo_price: parseInt(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Asli (Rp)
              </label>
              <input
                type="number"
                value={settings.harga_asli || 0}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    harga_asli: parseInt(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Hero
              </label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) =>
                  setSettings({ ...settings, hero_title: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle Hero
              </label>
              <input
                type="text"
                value={settings.hero_subtitle}
                onChange={(e) =>
                  setSettings({ ...settings, hero_subtitle: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teks CTA
              </label>
              <input
                type="text"
                value={settings.cta_text}
                onChange={(e) =>
                  setSettings({ ...settings, cta_text: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teks Footer
              </label>
              <textarea
                value={settings.footer_text}
                onChange={(e) =>
                  setSettings({ ...settings, footer_text: e.target.value })
                }
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Menyimpan..." : "Simpan Pengaturan"}
            </button>
          </div>
        </form>
      )}

      {activeTab === "sections" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Kelola Section Konten
            </h2>
            <button
              onClick={() => setShowSectionForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Section
            </button>
          </div>

          {/* Section Form */}
          {showSectionForm && (
            <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingSectionId ? "Edit Section" : "Tambah Section Baru"}
              </h3>

              <form onSubmit={handleSectionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Key *
                    </label>
                    <input
                      type="text"
                      value={sectionFormData.section_key}
                      onChange={(e) =>
                        setSectionFormData((prev) => ({
                          ...prev,
                          section_key: e.target.value,
                        }))
                      }
                      required
                      disabled={!!editingSectionId}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                      placeholder="section_key_unique"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Identifier unik untuk section (tidak bisa diubah setelah
                      dibuat)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Index
                    </label>
                    <input
                      type="number"
                      value={sectionFormData.order_index}
                      onChange={(e) =>
                        setSectionFormData((prev) => ({
                          ...prev,
                          order_index: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul Section *
                  </label>
                  <input
                    type="text"
                    value={sectionFormData.title}
                    onChange={(e) =>
                      setSectionFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Judul section"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={sectionFormData.subtitle}
                    onChange={(e) =>
                      setSectionFormData((prev) => ({
                        ...prev,
                        subtitle: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Subtitle section (opsional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konten
                  </label>
                  <textarea
                    value={sectionFormData.content}
                    onChange={(e) =>
                      setSectionFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Konten section (opsional)"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sectionFormData.is_active}
                    onChange={(e) =>
                      setSectionFormData((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Aktif (tampil di landing page)
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSectionForm(false);
                      setEditingSectionId(null);
                      setSectionFormData({
                        section_key: "",
                        title: "",
                        subtitle: "",
                        content: "",
                        is_active: true,
                        order_index: 0,
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 inline mr-2" />
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingSectionId ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-6">
            {contentSections.map((section) => (
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Key: {section.section_key}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSectionStatus(section)}
                      className={`p-2 rounded-full ${
                        section.is_active
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                      title={section.is_active ? "Nonaktifkan" : "Aktifkan"}
                    >
                      {section.is_active ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditSection(section)}
                      className="p-2 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="p-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {section.subtitle && (
                  <p className="text-gray-600 mb-2">{section.subtitle}</p>
                )}

                {section.content && (
                  <p className="text-gray-700 mb-4">{section.content}</p>
                )}

                {/* Content Items */}
                {section.content_items && section.content_items.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Content Items:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {section.content_items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${item.icon_color
                                  .replace("text-", "bg-")
                                  .replace("-500", "-100")}`}
                              >
                                <span className="text-xs">🔸</span>
                              </div>
                              <div className="flex-1">
                                <h5 className="text-sm font-medium text-gray-900">
                                  {item.title}
                                </h5>
                                <p className="text-xs text-gray-600 mt-1">
                                  {item.description}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className="text-xs text-gray-500">
                                    Icon: {item.icon_name}
                                  </span>
                                  <span
                                    className={`w-3 h-3 rounded-full ${item.icon_color.replace(
                                      "text-",
                                      "bg-"
                                    )}`}
                                  ></span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => {
                                  setContentFormData({
                                    section_id: section.id,
                                    title: item.title,
                                    description: item.description,
                                    icon_name: item.icon_name,
                                    icon_color: item.icon_color,
                                  });
                                  setEditingContentId(item.id);
                                  setShowContentForm(true);
                                }}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteContentItem(item.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "content" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Konten Dinamis
            </h2>
            <button
              onClick={() => setShowContentForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Content Item
            </button>
          </div>

          {/* Content Form */}
          {showContentForm && (
            <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingContentId
                  ? "Edit Content Item"
                  : "Tambah Content Item Baru"}
              </h3>

              <form onSubmit={handleContentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section *
                  </label>
                  <select
                    value={contentFormData.section_id}
                    onChange={(e) =>
                      setContentFormData((prev) => ({
                        ...prev,
                        section_id: e.target.value,
                      }))
                    }
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih Section</option>
                    {contentSections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul *
                    </label>
                    <input
                      type="text"
                      value={contentFormData.title}
                      onChange={(e) =>
                        setContentFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Judul content item"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <select
                      value={contentFormData.icon_name}
                      onChange={(e) =>
                        setContentFormData((prev) => ({
                          ...prev,
                          icon_name: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon.name} value={icon.name}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Warna Icon
                  </label>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() =>
                          setContentFormData((prev) => ({
                            ...prev,
                            icon_color: color.name,
                          }))
                        }
                        className={`p-2 rounded-lg border-2 transition-all ${
                          contentFormData.icon_color === color.name
                            ? "border-gray-900 ring-2 ring-gray-300"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        title={color.label}
                      >
                        <div
                          className={`w-6 h-6 rounded-full ${color.preview}`}
                        ></div>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Dipilih:{" "}
                    {
                      colorOptions.find(
                        (c) => c.name === contentFormData.icon_color
                      )?.label
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi *
                  </label>
                  <textarea
                    value={contentFormData.description}
                    onChange={(e) =>
                      setContentFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    required
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Deskripsi content item"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowContentForm(false);
                      setEditingContentId(null);
                      setContentFormData({
                        section_id: "",
                        title: "",
                        description: "",
                        icon_name: "CheckCircle",
                        icon_color: "text-green-500",
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 inline mr-2" />
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingContentId ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Content Items List by Section */}
          <div className="space-y-6">
            {contentSections.map((section) => (
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>

                {section.content_items && section.content_items.length > 0 ? (
                  <div className="space-y-3">
                    {section.content_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${item.icon_color
                              .replace("text-", "bg-")
                              .replace("-500", "-100")}`}
                          >
                            <span className="text-xs">🔸</span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {item.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">
                                Icon: {item.icon_name}
                              </span>
                              <span
                                className={`w-3 h-3 rounded-full ${item.icon_color.replace(
                                  "text-",
                                  "bg-"
                                )}`}
                              ></span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  item.is_active
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {item.is_active ? "Aktif" : "Nonaktif"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setContentFormData({
                                section_id: section.id,
                                title: item.title,
                                description: item.description,
                                icon_name: item.icon_name,
                                icon_color: item.icon_color,
                              });
                              setEditingContentId(item.id);
                              setShowContentForm(true);
                            }}
                            className="p-2 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContentItem(item.id)}
                            className="p-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada content items untuk section ini
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "testimonials" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Chat WhatsApp Testimonials
            </h2>
            <button
              onClick={() => setShowTestimonialForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Testimonial
            </button>
          </div>

          {/* Testimonial Form */}
          {showTestimonialForm && (
            <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTestimonialId
                  ? "Edit Testimonial"
                  : "Tambah Testimonial Baru"}
              </h3>

              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Screenshot Chat WhatsApp *
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleTestimonialImageUpload}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {uploading && (
                      <p className="text-sm text-blue-600">Mengupload...</p>
                    )}
                    {testimonialFormData.chat_image && (
                      <div className="relative inline-block">
                        <img
                          src={testimonialFormData.chat_image}
                          alt="Chat preview"
                          className="h-40 w-auto object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setTestimonialFormData((prev) => ({
                              ...prev,
                              chat_image: "",
                            }))
                          }
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={testimonialFormData.is_active}
                    onChange={(e) =>
                      setTestimonialFormData((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Aktif (tampil di landing page)
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTestimonialForm(false);
                      setEditingTestimonialId(null);
                      setTestimonialFormData({
                        customer_name: "",
                        chat_image: "",
                        description: "",
                        is_active: true,
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 inline mr-2" />
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingTestimonialId ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Testimonials List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatsappTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={testimonial.chat_image}
                    alt={testimonial.customer_name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => toggleTestimonialStatus(testimonial)}
                      className={`p-2 rounded-full ${
                        testimonial.is_active
                          ? "bg-green-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                      title={testimonial.is_active ? "Nonaktifkan" : "Aktifkan"}
                    >
                      {testimonial.is_active ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {testimonial.customer_name}
                  </h3>
                  {testimonial.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {testimonial.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        testimonial.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {testimonial.is_active ? "Aktif" : "Nonaktif"}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setTestimonialFormData({
                            customer_name: testimonial.customer_name,
                            chat_image: testimonial.chat_image,
                            description: testimonial.description || "",
                            is_active: testimonial.is_active,
                          });
                          setEditingTestimonialId(testimonial.id);
                          setShowTestimonialForm(true);
                        }}
                        className="p-2 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="p-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {whatsappTestimonials.length === 0 && (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Tidak ada testimonial
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Mulai dengan menambahkan testimonial WhatsApp pertama Anda
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setShowTestimonialForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Testimonial
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div />
    </div>
  );
};

export default SiteSetting;
