import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image?: string;
  price: number;
  original_price: number;
  is_discounted: boolean;
  is_featured: boolean;
  is_free: boolean;
  preview_file_url?: string;
  preview_images?: string[];
  preview_content?: string;
  preview_type: "images" | "markdown";
  category_id?: string;
  pages: number;
  recipes: number;
  rating: number;
  reviews: number;
  created_at: string;
  category?: Category;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
}

export interface BonusEbook {
  id: string;
  title: string;
  description: string;
  cover_image?: string;
  value: number;
  linked_book_id?: string;
  order_index: number;
  created_at: string;
  linked_book?: Book;
}

export interface SiteSettings {
  id: string;
  whatsapp_number: string;
  cta_text: string;
  hero_title: string;
  hero_subtitle: string;
  promo_price: number;
  harga_asli: number;
  promo_deadline: string;
  footer_text: string;
  contact_email: string;
  business_hours: string;
  updated_at: string;
}

export interface ContentSection {
  id: string;
  section_key: string;
  title: string;
  subtitle?: string;
  content?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
  content_items?: SectionContentItem[];
}

export interface SectionContentItem {
  id: string;
  section_id: string;
  title: string;
  description: string;
  icon_name: string;
  icon_color: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WhatsAppTestimonial {
  id: string;
  customer_name: string;
  chat_image: string;
  description?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

// API functions
export const api = {
  // Categories
  getCategories: () => supabase.from("categories").select("*").order("name"),

  // Books
  getBooks: () =>
    supabase
      .from("books")
      .select(
        `
    *,
    category:categories(*)
  `
      )
      .order("created_at", { ascending: false }),

  getFeaturedBooks: () =>
    supabase
      .from("books")
      .select(
        `
    *,
    category:categories(*)
  `
      )
      .eq("is_featured", true),

  getBook: (id: string) =>
    supabase
      .from("books")
      .select(
        `
    *,
    category:categories(*)
  `
      )
      .eq("id", id)
      .single(),

  createBook: (book: Partial<Book>) =>
    supabase.from("books").insert(book).select().single(),

  updateBook: (id: string, book: Partial<Book>) =>
    supabase.from("books").update(book).eq("id", id).select().single(),

  deleteBook: (id: string) => supabase.from("books").delete().eq("id", id),

  // FAQs
  getFAQs: () => supabase.from("faqs").select("*").order("order_index"),

  createFAQ: (faq: Partial<FAQ>) =>
    supabase.from("faqs").insert(faq).select().single(),

  updateFAQ: (id: string, faq: Partial<FAQ>) =>
    supabase.from("faqs").update(faq).eq("id", id).select().single(),

  deleteFAQ: (id: string) => supabase.from("faqs").delete().eq("id", id),

  // Bonus eBooks
  getBonusEbooks: () =>
    supabase
      .from("bonus_ebooks")
      .select(
        `
    *,
    linked_book:books(*)
  `
      )
      .order("order_index"),

  createBonusEbook: (bonus: Partial<BonusEbook>) =>
    supabase.from("bonus_ebooks").insert(bonus).select().single(),

  updateBonusEbook: (id: string, bonus: Partial<BonusEbook>) =>
    supabase.from("bonus_ebooks").update(bonus).eq("id", id).select().single(),

  deleteBonusEbook: (id: string) =>
    supabase.from("bonus_ebooks").delete().eq("id", id),

  // Site Settings
  getSiteSettings: () => supabase.from("site_settings").select("*").single(),

  updateSiteSettings: (settings: Partial<SiteSettings>) =>
    supabase
      .from("site_settings")
      .update(settings)
      .eq("id", settings.id)
      .select()
      .single(),

  // Content Sections
  getContentSections: () =>
    supabase
      .from("content_sections")
      .select(
        `
        *,
        content_items:section_content_items(*)
      `
      )
      .eq("is_active", true)
      .order("order_index"),

  getAllContentSections: () =>
    supabase
      .from("content_sections")
      .select(
        `
        *,
        content_items:section_content_items(*)
      `
      )
      .order("order_index"),

  createContentSection: (section: Partial<ContentSection>) =>
    supabase.from("content_sections").insert(section).select().single(),

  updateContentSection: (id: string, section: Partial<ContentSection>) =>
    supabase
      .from("content_sections")
      .update(section)
      .eq("id", id)
      .select()
      .single(),

  deleteContentSection: (id: string) =>
    supabase.from("content_sections").delete().eq("id", id),

  // Section Content Items
  getSectionContentItems: (sectionId: string) =>
    supabase
      .from("section_content_items")
      .select("*")
      .eq("section_id", sectionId)
      .eq("is_active", true)
      .order("order_index"),

  getAllSectionContentItems: (sectionId: string) =>
    supabase
      .from("section_content_items")
      .select("*")
      .eq("section_id", sectionId)
      .order("order_index"),

  createSectionContentItem: (item: Partial<SectionContentItem>) =>
    supabase.from("section_content_items").insert(item).select().single(),

  updateSectionContentItem: (id: string, item: Partial<SectionContentItem>) =>
    supabase
      .from("section_content_items")
      .update(item)
      .eq("id", id)
      .select()
      .single(),

  deleteSectionContentItem: (id: string) =>
    supabase.from("section_content_items").delete().eq("id", id),

  // WhatsApp Testimonials
  getWhatsAppTestimonials: () =>
    supabase
      .from("whatsapp_testimonials")
      .select("*")
      .eq("is_active", true)
      .order("order_index"),

  getAllWhatsAppTestimonials: () =>
    supabase.from("whatsapp_testimonials").select("*").order("order_index"),

  createWhatsAppTestimonial: (testimonial: Partial<WhatsAppTestimonial>) =>
    supabase
      .from("whatsapp_testimonials")
      .insert(testimonial)
      .select()
      .single(),

  updateWhatsAppTestimonial: (
    id: string,
    testimonial: Partial<WhatsAppTestimonial>
  ) =>
    supabase
      .from("whatsapp_testimonials")
      .update(testimonial)
      .eq("id", id)
      .select()
      .single(),

  deleteWhatsAppTestimonial: (id: string) =>
    supabase.from("whatsapp_testimonials").delete().eq("id", id),

  // File upload
  uploadFile: async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return publicUrl;
  },
};
