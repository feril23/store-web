import { Utensils } from "lucide-react";
import React from "react";
import { SiteSettings } from "../lib/supabase";

interface FooterProps {
  siteSettings: SiteSettings | null;
}

const Footer = ({ siteSettings }: FooterProps) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Utensils className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">ChikaRasa</span>
            </div>
            <p className="text-gray-400">
              {siteSettings?.footer_text ||
                "Platform #1 untuk resep kuliner terlengkap dan terpercaya di Indonesia. Sudah dipercaya 50,000+ chef dan pebisnis kuliner."}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <div className="space-y-2 text-gray-400">
              <p>📧 {siteSettings?.contact_email || "info@chikarasa.com"}</p>
              <p>
                📱 WhatsApp:{" "}
                {siteSettings?.whatsapp_number || "+62 812-3456-7891"}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Jaminan</h3>
            <div className="space-y-2 text-gray-400">
              <p>✅ Konsultasi Gratis Selamanya</p>
              <p>✅ Update Resep Terbaru</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ChikaRasa. Semua hak dilindungi undang-undang.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
