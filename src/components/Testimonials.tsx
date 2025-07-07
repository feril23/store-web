import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import React from "react";

const Testimonials = ({
  testimonials,
  currentTestimonial,
  prevTestimonial,
  nextTestimonial,
}) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonialData =
    testimonials[currentTestimonial % testimonials.length];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-bold mb-6 animate-pulse">
            <MessageCircle className="h-6 w-6 mr-3" />
            BONUS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="text-green-600">Konsultasi Eksklusif</span> via
            WhatsApp
          </h2>
          <div className="text-xl text-green-600 font-semibold mb-2">
            (GRATIS!)
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dapatkan <strong>akses konsultasi pribadi langsung</strong> bersama
            tim ChikaRasa setelah pembelian eBook!
          </p>
        </div>
        {/* Main Image Slider */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-200">
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 md:h-[800px]">
                <img
                  src={currentTestimonialData.chat_image}
                  alt={currentTestimonialData.customer_name}
                  className="w-full h-full object-contain"
                />

                {/* Overlay with WhatsApp UI mockup */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

                {/* WhatsApp Header */}
                <div className="absolute top-0 left-0 right-0 bg-green-600 text-white p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold">Tim ChikaRasa</div>
                    </div>
                  </div>
                </div>

                {/* Value Badge */}
                <div className="absolute top-20 right-6">
                  <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    Senilai: Rp 486.000
                  </div>
                </div>

                {/* Free Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg animate-bounce">
                    GRATIS!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6">
            <button
              onClick={prevTestimonial}
              className="bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-green-200 hover:border-green-400"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-6">
            <button
              onClick={nextTestimonial}
              className="bg-white hover:bg-gray-50 text-gray-800 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-green-200 hover:border-green-400"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Dots Indicator */}
        <div className="flex justify-center space-x-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const diff = index - (currentTestimonial % testimonials.length);
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) nextTestimonial();
                } else if (diff < 0) {
                  for (let i = 0; i < Math.abs(diff); i++) prevTestimonial();
                }
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentTestimonial % testimonials.length
                  ? "bg-green-600 w-12 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>{" "}
      </div>
    </section>
  );
};

export default Testimonials;
