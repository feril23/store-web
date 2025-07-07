"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, GripVertical, Save, X } from "lucide-react";

import { api, FAQ } from "../../../lib/supabase";

const FAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order_index: 0,
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const { data } = await api.getFAQs();
      if (data) setFaqs(data);
    } catch (error) {
      console.error("Error loading FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.updateFAQ(editingId, formData);
        setEditingId(null);
      } else {
        const newOrderIndex =
          Math.max(...faqs.map((f) => f.order_index), 0) + 1;
        await api.createFAQ({ ...formData, order_index: newOrderIndex });
        setShowAddForm(false);
      }

      setFormData({ question: "", answer: "", order_index: 0 });
      loadFAQs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("Gagal menyimpan FAQ");
    }
  };

  const handleEdit = (faq: FAQ) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order_index: faq.order_index,
    });
    setEditingId(faq.id);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) return;

    try {
      await api.deleteFAQ(id);
      setFaqs(faqs.filter((faq) => faq.id !== id));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Gagal menghapus FAQ");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ question: "", answer: "", order_index: 0 });
  };

  const moveItem = async (id: string, direction: "up" | "down") => {
    const currentIndex = faqs.findIndex((faq) => faq.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= faqs.length) return;

    const newFaqs = [...faqs];
    const [movedItem] = newFaqs.splice(currentIndex, 1);
    newFaqs.splice(newIndex, 0, movedItem);

    // Update order_index for all items
    const updates = newFaqs.map((faq, index) => ({
      id: faq.id,
      order_index: index + 1,
    }));

    try {
      await Promise.all(
        updates.map((update) =>
          api.updateFAQ(update.id, { order_index: update.order_index })
        )
      );
      setFaqs(newFaqs);
    } catch (error) {
      console.error("Error reordering FAQs:", error);
      alert("Gagal mengubah urutan FAQ");
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
        <h1 className="text-2xl font-bold text-gray-900">Manajemen FAQ</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah FAQ
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? "Edit FAQ" : "Tambah FAQ Baru"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pertanyaan *
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    question: e.target.value,
                  }))
                }
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan pertanyaan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jawaban *
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, answer: e.target.value }))
                }
                required
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan jawaban lengkap"
              />
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

      {/* FAQ List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Daftar FAQ</h2>
          <p className="text-sm text-gray-500 mt-1">
            Drag untuk mengubah urutan, atau gunakan tombol panah
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => moveItem(faq.id, "up")}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <button
                    onClick={() => moveItem(faq.id, "down")}
                    disabled={index === faqs.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="p-2 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
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

        {faqs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Tidak ada FAQ
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Mulai dengan menambahkan FAQ pertama Anda
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah FAQ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQManagement;
