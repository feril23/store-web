import {
  CheckCircle,
  Download,
  Shield,
  MessageCircle,
  Gift,
} from "lucide-react";

const CTASection = ({
  handleWhatsAppOrder,
  featuredBooks,
  bonuses,
  calculateTotal,
}) => {
  return (
    <section
      id="CTASection"
      className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="inline-flex items-center bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full text-lg font-bold mb-8">
            <Gift className="h-5 w-5 mr-2" />
            PENAWARAN TERBATAS
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Jangan Sampai Terlewat!
          </h2>

          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Dapatkan akses selamanya ke koleksi resep terlengkap dengan bonus
            eksklusif
          </p>

          {/* Package Summary */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">Yang Anda Dapatkan:</h3>
              <div className="space-y-3">
                {[
                  `${featuredBooks?.title}`,
                  `${bonuses?.length || 0} eBook Bonus Premium`,
                  "Konsultasi Gratis Selamanya",
                  "Akses Download Selamanya",
                  "Update Resep Terbaru",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-6 mb-6">
                <div className="text-lg opacity-80 mb-2">
                  Total Nilai Bonus:
                </div>
                <div className="text-3xl font-bold text-yellow-300 mb-4">
                  Rp {calculateTotal()?.toLocaleString() || "0"}
                </div>
                <div className="text-lg opacity-80 mb-2">Harga Hari Ini:</div>
                <div className="text-4xl font-bold text-yellow-300">
                  Rp {featuredBooks?.price?.toLocaleString() || "0"}
                </div>
              </div>

              <button
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-4"
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle className="h-6 w-6 inline mr-2" />
                PESAN SEKARANG!
              </button>

              <div className="flex items-center justify-center space-x-2 text-sm opacity-90">
                <Shield className="h-4 w-4" />
                <span>Pembayaran 100% Aman & Terpercaya</span>
              </div>
            </div>
          </div>

          {/* Urgency */}
          <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-6">
            <p className="text-lg font-semibold">
              ⚠️ PERHATIAN: Harga promo ini terbatas dan dapat berubah
              sewaktu-waktu!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
