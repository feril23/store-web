"use client";

import { Clock, MessageCircle, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FAQ, SiteSettings } from "../lib/supabase";

interface ContactClientProps {
  faqs: FAQ[];
  siteSettings: SiteSettings | null;
}

const ContactClient = ({ faqs, siteSettings }: ContactClientProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Contact Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Tim support kami siap membantu Anda 24/7
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Informasi Kontak
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                      <p className="text-gray-600">
                        {siteSettings?.whatsapp_number}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">
                        {siteSettings?.contact_email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Jam Operasional
                      </h3>
                      <p className="text-gray-600">
                        {siteSettings?.business_hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Konsultasi Gratis!</h3>
                <p className="mb-4">
                  Butuh rekomendasi resep yang sesuai selera keluarga? Chat
                  langsung dengan ahli kuliner kami!
                </p>
                <a
                  href={`https://wa.me/${siteSettings?.whatsapp_number.replace(
                    /\D/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center"
                >
                  <MessageCircle className="h-5 w-5 inline mr-2" />
                  Chat WhatsApp Sekarang
                </a>
              </div>
            </div>

            {/* FAQ Quick Access */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Pertanyaan Umum
              </h2>

              <div className="space-y-4">
                {faqs.slice(0, 3).map((faq, index) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-200"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      <span className="font-semibold text-gray-800">
                        {faq.question}
                      </span>
                      <div className="ml-4 flex-shrink-0">
                        {openFaq === index ? (
                          <Minus className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Plus className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/faq" className="text-blue-700 font-semibold">
                  Lihat Semua FAQ →
                </Link>
              </div>

              <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">
                  💡 Tips Cepat
                </h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Untuk pertanyaan teknis, gunakan WhatsApp</li>
                  <li>• Untuk keluhan, gunakan email dengan detail lengkap</li>
                  <li>• Sertakan nomor order jika ada masalah pembelian</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactClient;
