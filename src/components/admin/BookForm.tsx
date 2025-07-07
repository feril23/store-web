"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Save,
  Upload,
  X,
  ArrowLeft,
  Plus,
  Trash2,
  FileText,
  Image,
} from "lucide-react";

import { api, Book, Category } from "../../lib/supabase";

interface BookFormProps {
  bookId?: string;
}

const BookForm = ({ bookId }: BookFormProps) => {
  const router = useRouter();
  const isEdit = !!bookId;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    cover_image: "",
    price: 0,
    original_price: 0,
    is_discounted: false,
    is_featured: false,
    is_free: false,
    preview_file_url: "",
    preview_images: [] as string[],
    preview_content: "",
    preview_type: "images" as "images" | "markdown",
    category_id: "",
    pages: 0,
    recipes: 0,
    rating: 0,
    reviews: 0,
  });

  useEffect(() => {
    loadCategories();
    if (isEdit) {
      loadBook();
    }
  }, [bookId]);

  const loadCategories = async () => {
    try {
      const { data } = await api.getCategories();
      if (data) setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadBook = async () => {
    if (!bookId) return;

    try {
      setLoading(true);
      const { data } = await api.getBook(bookId);
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          description: data.description,
          cover_image: data.cover_image || "",
          price: data.price,
          original_price: data.original_price,
          is_discounted: data.is_discounted,
          is_featured: data.is_featured,
          is_free: data.is_free,
          preview_file_url: data.preview_file_url || "",
          preview_images: data.preview_images || [],
          preview_content: data.preview_content || "",
          preview_type: data.preview_type || "images",
          category_id: data.category_id || "",
          pages: data.pages,
          recipes: data.recipes,
          rating: data.rating,
          reviews: data.reviews,
        });
      }
    } catch (error) {
      console.error("Error loading book:", error);
      alert("Gagal memuat data buku");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Auto-generate slug from title
      if (name === "title") {
        setFormData((prev) => ({ ...prev, slug: generateSlug(value) }));
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileName = `${Date.now()}-${file.name}`;
      const publicUrl = await api.uploadFile(file, "book-covers", fileName);
      setFormData((prev) => ({ ...prev, cover_image: publicUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengupload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handlePreviewImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setUploading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileName = `preview-${Date.now()}-${file.name}`;
        return await api.uploadFile(file, "book-previews", fileName);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        preview_images: [...prev.preview_images, ...uploadedUrls],
      }));
    } catch (error) {
      console.error("Error uploading preview images:", error);
      alert("Gagal mengupload gambar preview");
    } finally {
      setUploading(false);
    }
  };

  const removePreviewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      preview_images: prev.preview_images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await api.updateBook(bookId!, formData);
        alert("Buku berhasil diupdate!");
      } else {
        await api.createBook(formData);
        alert("Buku berhasil ditambahkan!");
      }

      router.push("/admin/books");
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Gagal menyimpan buku");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.push("/admin/books")}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Buku" : "Tambah Buku Baru"}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Informasi Dasar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Buku *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan judul buku"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="slug-buku"
              />
              <p className="text-sm text-gray-500 mt-1">
                URL-friendly version dari judul
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Deskripsi lengkap tentang buku"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {uploading && (
                  <p className="text-sm text-blue-600">Mengupload...</p>
                )}
                {formData.cover_image && (
                  <div className="relative inline-block">
                    <img
                      src={formData.cover_image}
                      alt="Cover preview"
                      className="h-32 w-24 object-fit rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, cover_image: "" }))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Preview Buku
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Preview
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preview_type"
                    value="images"
                    checked={formData.preview_type === "images"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <Image className="h-4 w-4 mr-1" />
                  Gambar Preview
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preview_type"
                    value="markdown"
                    checked={formData.preview_type === "markdown"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <FileText className="h-4 w-4 mr-1" />
                  Konten Markdown
                </label>
              </div>
            </div>

            {formData.preview_type === "images" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Preview
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePreviewImageUpload}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  {formData.preview_images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.preview_images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-60 object-fit rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePreviewImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konten Preview (Markdown)
                </label>
                <textarea
                  name="preview_content"
                  value={formData.preview_content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Masukkan konten preview dalam format Markdown..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Gunakan format Markdown untuk styling (# untuk heading, **
                  untuk bold, dll.)
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text  -gray-700 mb-2">
                Preview File URL (PDF)
              </label>
              <input
                type="url"
                name="preview_file_url"
                value={formData.preview_file_url}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com/preview.pdf"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Harga & Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga (Rp) *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga Asli (Rp)
              </label>
              <input
                type="text"
                name="original_price"
                value={formData.original_price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Halaman
              </label>
              <input
                type="text"
                name="pages"
                value={formData.pages}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Resep
              </label>
              <input
                type="text"
                name="recipes"
                value={formData.recipes}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_discounted"
                    checked={formData.is_discounted}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Sedang Diskon
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Featured (Tampil di halaman utama)
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_free"
                    checked={formData.is_free}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Gratis
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/admin/books")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Menyimpan..." : isEdit ? "Update Buku" : "Simpan Buku"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
