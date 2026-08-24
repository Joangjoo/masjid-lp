import React, { useState } from 'react';
import { apiService } from '../services/api';
import { ShieldAlert, Sparkles, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToWebsite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiService.login({ email, password });
      if (res.token) {
        localStorage.setItem('admin_token', res.token);
        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Login gagal. Periksa email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] flex items-center justify-center p-4 font-inter">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C49B5E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-[#0D1322] border border-slate-800/80 rounded-3xl w-full max-w-md p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C49B5E] to-[#E2C38A] p-0.5 mb-4 shadow-lg shadow-[#C49B5E]/15">
            <div className="w-full h-full bg-[#0D1322] rounded-[14px] flex items-center justify-center text-[#C49B5E]">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold font-playfair text-white tracking-wide">CMS Admin Masjid</h1>
          <p className="text-xs text-slate-400 mt-1">Masuk untuk mengelola konten dan kegiatan masjid</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3.5 rounded-xl text-xs flex items-center gap-2.5 mb-6">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Admin</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@masjid.com"
                className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#C49B5E] to-[#b0884d] hover:from-[#b0884d] hover:to-[#96723d] text-slate-950 font-semibold py-3 rounded-xl text-sm transition shadow-lg shadow-[#C49B5E]/15 disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? 'Memproses...' : 'Masuk CMS'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-800/80">
          <button
            onClick={onBackToWebsite}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Utama</span>
          </button>
        </div>
      </div>
    </div>
  );
};
