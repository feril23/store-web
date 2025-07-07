import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";

const TestimonialsPage = ({
  testimonials,
  currentTestimonial,
  prevTestimonial,
  nextTestimonial,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
    {/* Testimonials Header */}
    <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Testimoni Pelanggan
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Lihat apa kata 2,847+ pelanggan yang sudah merasakan manfaat eBook
          kami
        </p>
      </div>
    </section>

    {/* Testimonials Content */}
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {testimonials[currentTestimonial].name}
                </h3>
                <div className="flex items-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-500 fill-current"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-xl italic leading-relaxed">
              "{testimonials[currentTestimonial].message}"
            </p>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors shadow-lg"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">2,847+</div>
            <div className="text-gray-600">Pelanggan Puas</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl font-bold text-orange-500 mb-2">4.9/5</div>
            <div className="text-gray-600">Rating Rata-rata</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">99.8%</div>
            <div className="text-gray-600">Tingkat Kepuasan</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Bergabunglah dengan Ribuan Pelanggan Puas!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Dapatkan akses ke koleksi resep terlengkap dan mulai masak ayam
              yang lezat hari ini
            </p>
            <button className="bg-white text-green-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              <ShoppingCart className="h-5 w-5 inline mr-2" />
              Pesan eBook Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default TestimonialsPage;
