import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin } from 'lucide-react';
import { Button } from '../common/Button';

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section className="py-20 md:py-24 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Kirim Pesan Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_30px_-5px_rgba(19,41,75,0.08)] border border-[#13294B]/5 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#13294B] mb-1">
                Kirim Pesan untuk Kami
              </h2>
              <p className="text-xs md:text-sm text-[#7A7A7A] mb-8 font-medium">
                Kami akan merespon dalam waktu 24 jam
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-[#C49B5E]/15 border border-[#C49B5E]/30 text-[#13294B] text-sm font-medium">
                  Terima kasih! Pesan/Doa Anda telah kami terima dengan baik.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#13294B] mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1E1E24] focus:outline-none focus:border-[#C49B5E] focus:ring-1 focus:ring-[#C49B5E] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#13294B] mb-2">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Masukkan alamat email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1E1E24] focus:outline-none focus:border-[#C49B5E] focus:ring-1 focus:ring-[#C49B5E] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#13294B] mb-2">
                    Pesan / Doa
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis pesan atau doa Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#1E1E24] focus:outline-none focus:border-[#C49B5E] focus:ring-1 focus:ring-[#C49B5E] transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3.5 text-sm font-semibold bg-[#8C6428] text-white hover:bg-[#785420] border-none shadow-md flex items-center justify-center gap-2"
                >
                  <span>Kirim Pesan</span>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Mock Card & Address Badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between gap-6"
          >
            {/* Map Canvas Frame (Sesuai image6.png) */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_10px_30px_-5px_rgba(19,41,75,0.08)] border border-[#13294B]/5 flex-1 relative min-h-[360px] flex flex-col justify-between overflow-hidden">
              {/* Map Illustration Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')`,
                  filter: 'contrast(90%) brightness(105%) opacity(85%)'
                }}
              />
              <div className="absolute inset-0 bg-[#FAF7F2]/60 rounded-xl" />

              {/* Map Pin Box Center */}
              <div className="relative z-10 my-auto flex justify-center">
                <div className="bg-white rounded-xl p-4 shadow-xl border border-[#C49B5E]/30 text-center max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-[#13294B] text-[#C49B5E] flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                    🕌
                  </div>
                  <h4 className="font-playfair font-bold text-[#13294B] text-base">
                    Masjid Al-Hikmah
                  </h4>
                  <p className="text-[11px] text-[#7A7A7A] mt-1">
                    Jl. Masjid Al-Hikmah No. 15, Kota Berkah
                  </p>
                </div>
              </div>
            </div>

            {/* Address Badge Bottom */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#13294B]/5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C49B5E]/15 text-[#C49B5E] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#13294B] uppercase tracking-wider">
                  Alamat Utama
                </h4>
                <p className="text-xs md:text-sm text-[#7A7A7A] mt-1 leading-relaxed font-medium">
                  Jl. Masjid Al-Hikmah No. 15, Kelurahan Iman, Kecamatan Taqwa, Kota Berkah 12345
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
