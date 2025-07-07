"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Save,
  X,
  Upload,
} from "lucide-react";

import { api, BonusEbook, Book } from "../../../lib/supabase";

const BonusManagement = () => {
  const [bonuses, setBonuses] = useState<BonusEbook[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cover_image: "",
    value: 0,
    linked_book_id: "",
    order_index: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bonusRes, booksRes] = await Promise.all([
        api.getBonusEbooks(),
        api.getBooks(),
      ]);

      if (bonusRes.data) setBonuses(bonusRes.data);
      if (booksRes.data) setBooks(booksRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileName = `bonus-${Date.now()}-${file.name}`;
      const publicUrl = await api.uploadFile(file, "bonus-covers", fileName);
      setFormData((prev) => ({ ...prev, cover_image: publicUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Gagal mengupload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.updateBonusEbook(editingId, formData);
        setEditingId(null);
      } else {
        const newOrderIndex =
          Math.max(...bonuses.map((b) => b.order_index), 0) + 1;
        await api.createBonusEbook({ ...formData, order_index: newOrderIndex });
        setShowAddForm(false);
      }

      setFormData({
        title: "",
        description: "",
        cover_image: "",
        value: 0,
        linked_book_id: "",
        order_index: 0,
      });
      loadData();
    } catch (error) {
      console.error("Error saving bonus:", error);
      alert("Gagal menyimpan bonus eBook");
    }
  };

  const handleEdit = (bonus: BonusEbook) => {
    setFormData({
      title: bonus.title,
      description: bonus.description,
      cover_image: bonus.cover_image || "",
      value: bonus.value,
      linked_book_id: bonus.linked_book_id || "",
      order_index: bonus.order_index,
    });
    setEditingId(bonus.id);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus bonus eBook ini?")) return;

    try {
      await api.deleteBonusEbook(id);
      setBonuses(bonuses.filter((bonus) => bonus.id !== id));
    } catch (error) {
      console.error("Error deleting bonus:", error);
      alert("Gagal menghapus bonus eBook");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      title: "",
      description: "",
      cover_image: "",
      value: 0,
      linked_book_id: "",
      order_index: 0,
    });
  };

  const moveItem = async (id: string, direction: "up" | "down") => {
    const currentIndex = bonuses.findIndex((bonus) => bonus.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= bonuses.length) return;

    const newBonuses = [...bonuses];
    const [movedItem] = newBonuses.splice(currentIndex, 1);
    newBonuses.splice(newIndex, 0, movedItem);

    // Update order_index for all items
    const updates = newBonuses.map((bonus, index) => ({
      id: bonus.id,
      order_index: index + 1,
    }));

    try {
      await Promise.all(
        updates.map((update) =>
          api.updateBonusEbook(update.id, { order_index: update.order_index })
        )
      );
      setBonuses(newBonuses);
    } catch (error) {
      console.error("Error reordering bonuses:", error);
      alert("Gagal mengubah urutan bonus");
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Manajemen Bonus eBook
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Bonus
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? "Edit Bonus eBook" : "Tambah Bonus eBook Baru"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Judul bonus eBook"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nilai (Rp) *
                </label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      value: parseInt(e.target.value) || 0,
                    }))
                  }
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="67000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Deskripsi singkat tentang bonus eBook"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terkait dengan Buku
              </label>
              <select
                value={formData.linked_book_id}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    linked_book_id: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Pilih Buku (Opsional)</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Bonus ini akan ditampilkan di halaman detail buku yang dipilih
              </p>
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
                      className="h-32 w-24 object-cover rounded-lg"
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

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
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
                {editingId ? "Update" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bonus List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Daftar Bonus eBook
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Drag untuk mengubah urutan tampilan di landing page
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {bonuses.map((bonus, index) => (
            <div key={bonus.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => moveItem(bonus.id, "up")}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <button
                    onClick={() => moveItem(bonus.id, "down")}
                    disabled={index === bonuses.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>

                <div className="flex-shrink-0">
                  {bonus.cover_image ? (
                    <img
                      src={bonus.cover_image}
                      alt={bonus.title}
                      className="h-20 w-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="h-20 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {bonus.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {bonus.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-semibold text-green-600">
                          Rp {bonus.value.toLocaleString()}
                        </span>
                        {bonus.linked_book && (
                          <span className="text-gray-500">
                            Terkait: {bonus.linked_book.title}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(bonus)}
                        className="p-2 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(bonus.id)}
                        className="p-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bonuses.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Tidak ada bonus eBook
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Mulai dengan menambahkan bonus eBook pertama Anda
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Bonus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BonusManagement;
