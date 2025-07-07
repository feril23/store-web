"use client";

import { MessageCircle, Minus, Plus, Search, HelpCircle } from "lucide-react";
import { useState } from "react";
import { FAQ, SiteSettings } from "../lib/supabase";

interface FaqClientProps {
  faqs: FAQ[];
  siteSettings: SiteSettings | null;
}

const FaqClient = ({ faqs, siteSettings }: FaqClientProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4 mr-2" />
            Pusat Bantuan
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Temukan jawaban untuk semua pertanyaan Anda tentang eBook resep ayam
            kami
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-4 text-gray-600">
              Menampilkan {filteredFaqs.length} dari {faqs.length} pertanyaan
            </div>
          )}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 text-lg pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openFaq === index ? (
                        <Minus className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Plus className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Tidak ada pertanyaan ditemukan
              </h3>
              <p className="text-gray-500 mb-6">
                Coba ubah kata kunci pencarian
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Masih Ada Pertanyaan?</h3>
            <p className="text-lg mb-6 opacity-90">
              Tim support kami siap membantu Anda 24/7 melalui WhatsApp
            </p>
            <a
              href={`https://wa.me/${siteSettings?.whatsapp_number?.replace(
                /\D/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat WhatsApp Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tips Cepat
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-yellow-800 mb-3">
                💡 Untuk Pertanyaan Teknis
              </h4>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Gunakan WhatsApp untuk respon cepat</li>
                <li>• Sertakan screenshot jika ada masalah</li>
                <li>• Jelaskan langkah yang sudah dicoba</li>
              </ul>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-green-800 mb-3">
                📧 Untuk Keluhan atau Saran
              </h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Gunakan email dengan detail lengkap</li>
                <li>• Sertakan nomor order jika ada</li>
                <li>• Tim kami akan merespon dalam 24 jam</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqClient;
