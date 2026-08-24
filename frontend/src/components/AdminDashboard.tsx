import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';
import {
  Calendar,
  BookOpen,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Users,
  Edit3,
  Image as ImageIcon,
  Settings,
  FileUp,
  Loader2,
  ExternalLink,
  ChevronRight,
  LayoutGrid,
  Search
} from 'lucide-react';
import { Toast } from './common/Toast';
import { ConfirmModal } from './common/ConfirmModal';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'events' | 'programs' | 'team' | 'services' | 'testimonials' | 'gallery' | 'messages'>('events');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; message: string; onConfirm: () => void }>({
    isOpen: false,
    message: '',
    onConfirm: () => {},
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Forms State
  const [profileForm, setProfileForm] = useState({ name: '', address: '', phone: '', email: '', vision: '', mission: '', active_jamaah: '', total_programs: '', established_year: '' });
  const [eventForm, setEventForm] = useState({ title: '', speaker: '', date_badge: '', description: '', location: '', time: '', link_href: '#detail' });
  const [programForm, setProgramForm] = useState({ title: '', description: '', icon: 'book', link_href: '#detail' });
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon_name: 'clock', link_text: 'Lihat Selengkapnya', link_href: '#layanan' });
  const [teamForm, setTeamForm] = useState({ name: '', role: '', description: '', image_url: '' });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', quote: '', rating: 5 });
  const [galleryForm, setGalleryForm] = useState({ title: '', subtitle: '', type: 'photo', image_url: '', video_url: '' });
  const [uploading, setUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
    setEditingId(null);
    setSearchQuery('');
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'profile') {
        const data = await apiService.getProfileInfo();
        setProfileForm({
          name: data.name || '',
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          vision: data.vision || '',
          mission: data.mission || '',
          active_jamaah: data.active_jamaah || data.activeJamaah || '500+',
          total_programs: data.total_programs || data.totalPrograms || '15+',
          established_year: data.established_year || data.establishedYear || 'Sejak 2010',
        });
      } else if (activeTab === 'events') {
        const data = await apiService.getEvents();
        setItems(data || []);
      } else if (activeTab === 'programs') {
        const data = await apiService.getPrograms();
        setItems(data || []);
      } else if (activeTab === 'services') {
        const data = await apiService.getServices();
        setItems(data || []);
      } else if (activeTab === 'team') {
        const data = await apiService.getTeamMembers();
        setItems(data || []);
      } else if (activeTab === 'testimonials') {
        const data = await apiService.getTestimonials();
        setItems(data || []);
      } else if (activeTab === 'gallery') {
        const data = await apiService.getGallery();
        setItems(data || []);
      } else if (activeTab === 'messages') {
        const data = await apiService.getMessages();
        setItems(data || []);
      }
    } catch (err) {
      console.error("Failed to fetch CMS data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      showToast("Format file harus berupa gambar atau video", "error");
      return;
    }
    setUploading(true);
    try {
      const res = await apiService.uploadFile(file);
      const host = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api/v1', '') : 'http://localhost:8081';
      const fullURL = `${host}${res.url}`;
      setGalleryForm((prev) => ({ ...prev, image_url: fullURL }));
      showToast("File berhasil diunggah!", "success");
    } catch (err: any) {
      showToast(err.message || "Gagal mengunggah file", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const requestConfirm = (message: string, action: () => void) => {
    setConfirmState({
      isOpen: true,
      message,
      onConfirm: () => {
        setConfirmState((prev) => ({ ...prev, isOpen: false }));
        action();
      },
    });
  };

  // Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.updateProfileInfo(profileForm);
      showToast("Informasi profil masjid berhasil diperbarui!", "success");
    } catch (err: any) {
      showToast("Gagal memperbarui profil: " + err.message, "error");
    }
  };

  // Event
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateEvent(editingId, eventForm);
        showToast("Event berhasil diperbarui!", "success");
      } else {
        await apiService.createEvent(eventForm);
        showToast("Event baru berhasil ditambahkan!", "success");
      }
      setEventForm({ title: '', speaker: '', date_badge: '', description: '', location: '', time: '', link_href: '#detail' });
      setEditingId(null);
      loadData();
    } catch (err: any) {
      showToast("Gagal menyimpan event: " + err.message, "error");
    }
  };

  const handleEditEvent = (item: any) => {
    setEditingId(item.id);
    setEventForm({
      title: item.title || '',
      speaker: item.speaker || '',
      date_badge: item.date_badge || item.dateBadge || '',
      description: item.description || '',
      location: item.location || '',
      time: item.time || '',
      link_href: item.link_href || '#detail',
    });
  };

  const handleDeleteEvent = (id: number) => {
    requestConfirm("Apakah Anda yakin ingin menghapus event ini secara permanen?", async () => {
      try {
        await apiService.deleteEvent(id);
        showToast("Event berhasil dihapus", "info");
        loadData();
      } catch (err) {
        showToast("Gagal menghapus event", "error");
      }
    });
  };

  // Program
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateProgram(editingId, programForm);
        showToast("Program berhasil diperbarui!", "success");
      } else {
        await apiService.createProgram(programForm);
        showToast("Program baru berhasil ditambahkan!", "success");
      }
      setProgramForm({ title: '', description: '', icon: 'book', link_href: '#detail' });
      setEditingId(null);
      loadData();
    } catch (err: any) {
      showToast("Gagal menyimpan program: " + err.message, "error");
    }
  };

  const handleEditProgram = (item: any) => {
    setEditingId(item.id);
    setProgramForm({
      title: item.title || '',
      description: item.description || '',
      icon: item.icon || 'book',
      link_href: item.link_href || '#detail',
    });
  };

  const handleDeleteProgram = (id: number) => {
    requestConfirm("Apakah Anda yakin ingin menghapus program ini secara permanen?", async () => {
      try {
        await apiService.deleteProgram(id);
        showToast("Program berhasil dihapus", "info");
        loadData();
      } catch (err) {
        showToast("Gagal menghapus program", "error");
      }
    });
  };

  // Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateService(editingId, serviceForm);
        showToast("Layanan berhasil diperbarui!", "success");
      } else {
        await apiService.createService(serviceForm);
        showToast("Layanan baru berhasil ditambahkan!", "success");
      }
      setServiceForm({ title: '', description: '', icon_name: 'clock', link_text: 'Lihat Selengkapnya', link_href: '#layanan' });
      setEditingId(null);
      loadData();
    } catch (err: any) {
      showToast("Gagal menyimpan layanan: " + err.message, "error");
    }
  };

  const handleEditService = (item: any) => {
    setEditingId(item.id);
    setServiceForm({
      title: item.title || '',
      description: item.description || '',
      icon_name: item.icon_name || item.iconName || 'clock',
      link_text: item.link_text || item.linkText || 'Lihat Selengkapnya',
      link_href: item.link_href || item.linkHref || '#layanan',
    });
  };

  const handleDeleteService = (id: number) => {
    requestConfirm("Apakah Anda yakin ingin menghapus layanan ini secara permanen?", async () => {
      try {
        await apiService.deleteService(id);
        showToast("Layanan berhasil dihapus", "info");
        loadData();
      } catch (err) {
        showToast("Gagal menghapus layanan", "error");
      }
    });
  };

  // Team
  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateTeamMember(editingId, teamForm);
        showToast("Pengurus berhasil diperbarui!", "success");
      } else {
        await apiService.createTeamMember(teamForm);
        showToast("Pengurus baru berhasil ditambahkan!", "success");
      }
      setTeamForm({ name: '', role: '', description: '', image_url: '' });
      setEditingId(null);
      loadData();
    } catch (err: any) {
      showToast("Gagal menyimpan pengurus: " + err.message, "error");
    }
  };

  const handleEditTeam = (item: any) => {
    setEditingId(item.id);
    setTeamForm({
      name: item.name || '',
      role: item.role || '',
      description: item.description || '',
      image_url: item.image_url || item.imageUrl || '',
    });
  };

  const handleDeleteTeam = (id: number) => {
    requestConfirm("Apakah Anda yakin ingin menghapus pengurus ini secara permanen?", async () => {
      try {
        await apiService.deleteTeamMember(id);
        showToast("Pengurus berhasil dihapus", "info");
        loadData();
      } catch (err) {
        showToast("Gagal menghapus pengurus", "error");
      }
    });
  };

  // Testimonial
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateTestimonial(editingId, testimonialForm);
        showToast("Testimoni berhasil diperbarui!", "success");
      } else {
        await apiService.createTestimonial(testimonialForm);
        showToast("Testimoni baru berhasil ditambahkan!", "success");
      }
      setTestimonialForm({ name: '', role: '', quote: '', rating: 5 });
      setEditingId(null);
      loadData();
    } catch (err: any) {
      showToast("Gagal menyimpan testimoni: " + err.message, "error");
    }
  };

  const handleDeleteTestimonial = (id: number) => {
    requestConfirm("Apakah Anda yakin ingin menghapus testimoni ini secara permanen?", async () => {
      try {
        await apiService.deleteTestimonial(id);
        showToast("Testimoni berhasil dihapus", "info");
        loadData();
      } catch (err) {
        showToast("Gagal menghapus testimoni", "error");
      }
    });
  };

  // Gallery
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createGalleryItem(galleryForm);
      showToast("Galeri baru berhasil ditambahkan!", "success");
      setGalleryForm({ title: '', subtitle: '', type: 'photo', image_url: '', video_url: '' });
      loadData();
    } catch (err: any) {
      showToast("Gagal menyimpan galeri: " + err.message, "error");
    }
  };

  const handleDeleteGallery = (id: number) => {
    requestConfirm("Apakah Anda yakin ingin menghapus item galeri ini secara permanen?", async () => {
      try {
        await apiService.deleteGalleryItem(id);
        showToast("Galeri berhasil dihapus", "info");
        loadData();
      } catch (err) {
        showToast("Gagal menghapus galeri", "error");
      }
    });
  };

  // Filter items by search
  const filteredItems = items.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.speaker && item.speaker.toLowerCase().includes(q)) ||
      (item.role && item.role.toLowerCase().includes(q))
    );
  });

  const navItems = [
    { key: 'profile', label: 'Profil & Stats', icon: Settings },
    { key: 'events', label: 'Event & Agenda', icon: Calendar },
    { key: 'services', label: 'Layanan Masjid', icon: LayoutGrid },
    { key: 'programs', label: 'Program Keagamaan', icon: BookOpen },
    { key: 'team', label: 'Struktur Pengurus', icon: Users },
    { key: 'testimonials', label: 'Testimoni Jamaah', icon: MessageSquare },
    { key: 'gallery', label: 'Galeri Foto/Video', icon: ImageIcon },
    { key: 'messages', label: 'Pesan & Usulan', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col md:flex-row font-inter selection:bg-[#C49B5E] selection:text-slate-950">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#0D1322] p-6 flex flex-col justify-between border-r border-slate-800/80 shrink-0">
        <div>
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3 mb-8 px-2">
            <div>
              <h2 className="font-playfair font-bold text-lg text-white tracking-wide">CMS Masjid</h2>
              <p className="text-[11px] text-slate-400 font-medium">Control Panel Admin</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C49B5E] to-[#b0884d] text-slate-950 font-semibold shadow-md shadow-[#C49B5E]/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-[#C49B5E]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-slate-950 opacity-70" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800/40 hover:text-amber-300 transition group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#C49B5E]" />
              Lihat Website Live
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 border border-transparent hover:border-rose-900/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        {/* Custom UI Modal Confirm */}
        <ConfirmModal
          isOpen={confirmState.isOpen}
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
        />

        {/* Floating Toasts */}
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} />
          ))}
        </div>

        {/* Top Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800/60">
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#C49B5E] uppercase">CMS Dashboard</span>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-playfair mt-0.5 capitalize">
              {activeTab === 'profile' && 'Profil & Pengaturan Masjid'}
              {activeTab === 'events' && 'Manajemen Event & Agenda'}
              {activeTab === 'services' && 'Manajemen Layanan Masjid'}
              {activeTab === 'programs' && 'Program Keagamaan & Edukasi'}
              {activeTab === 'team' && 'Struktur Pengurus Takmir'}
              {activeTab === 'testimonials' && 'Kisah & Testimoni Jamaah'}
              {activeTab === 'gallery' && 'Galeri Dokumentasi Foto/Video'}
              {activeTab === 'messages' && 'Pesan Masuk & Usulan Event'}
            </h1>
          </div>

          {activeTab !== 'profile' && activeTab !== 'messages' && (
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0D1322] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C49B5E]/60 transition"
              />
            </div>
          )}
        </header>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl space-y-6">
            <form onSubmit={handleSaveProfile} className="bg-[#0D1322] p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#C49B5E]" /> Informasi Utama Masjid
                </h3>
                <p className="text-xs text-slate-400 mt-1">Pengaturan identitas yang ditampilkan pada Navbar, Hero, dan Footer</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nama Masjid</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Resmi</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">No. Telepon / WhatsApp</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Statistik Jamaah Aktif</label>
                  <input
                    type="text"
                    value={profileForm.active_jamaah}
                    onChange={(e) => setProfileForm({ ...profileForm, active_jamaah: e.target.value })}
                    placeholder="500+"
                    className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Alamat Lengkap</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Visi Utama Masjid</label>
                <textarea
                  rows={3}
                  value={profileForm.vision}
                  onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C49B5E] transition resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#C49B5E] to-[#b0884d] hover:from-[#b0884d] hover:to-[#96723d] text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm transition shadow-lg shadow-[#C49B5E]/15 cursor-pointer"
                >
                  Simpan Perubahan Profil
                </button>
              </div>
            </form>
          </div>
        )}

        {/* EVENT TAB */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <form onSubmit={handleSaveEvent} className="bg-[#0D1322] p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  {editingId ? <Edit3 className="w-4 h-4 text-[#C49B5E]" /> : <Plus className="w-4 h-4 text-[#C49B5E]" />}
                  {editingId ? 'Edit Data Event' : 'Tambah Agenda Event Baru'}
                </h3>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setEventForm({ title: '', speaker: '', date_badge: '', description: '', location: '', time: '', link_href: '#detail' }); }}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                  >
                    + Batal Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Event</label>
                  <input
                    type="text"
                    placeholder="Cth: Kajian Akbar Ramadhan"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Penceramah / Speaker</label>
                  <input
                    type="text"
                    placeholder="Cth: Ustadz Adi Hidayat, Lc"
                    value={eventForm.speaker}
                    onChange={(e) => setEventForm({ ...eventForm, speaker: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tanggal</label>
                  <input
                    type="text"
                    placeholder="Cth: 15 Maret"
                    value={eventForm.date_badge}
                    onChange={(e) => setEventForm({ ...eventForm, date_badge: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Waktu Acara</label>
                  <input
                    type="text"
                    placeholder="Cth: 08:00 - selesai"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Singkat Agenda</label>
                <textarea
                  placeholder="Tuliskan deskripsi lengkap event..."
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition resize-none"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#C49B5E] to-[#b0884d] hover:from-[#b0884d] hover:to-[#96723d] text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-[#C49B5E]/15"
              >
                {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingId ? 'Update Event' : 'Simpan Event'}</span>
              </button>
            </form>

            <div className="bg-[#0D1322] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 font-bold text-sm text-slate-200">Daftar Event Tersimpan</div>
              {loading ? (
                <div className="p-8 text-center text-slate-400 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-[#C49B5E]" /> Memuat data event...
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Tidak ada data event ditemukan.</div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {filteredItems.map((ev) => (
                    <div key={ev.id} className="p-5 flex items-center justify-between hover:bg-slate-800/30 transition">
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-base">{ev.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="text-[#C49B5E] font-semibold">{ev.date_badge || ev.dateBadge}</span>
                          <span>•</span>
                          <span>Speaker: {ev.speaker || 'Umum'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(ev)}
                          className="p-2 text-amber-400 hover:bg-amber-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <form onSubmit={handleSaveService} className="bg-[#0D1322] p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  {editingId ? <Edit3 className="w-4 h-4 text-[#C49B5E]" /> : <Plus className="w-4 h-4 text-[#C49B5E]" />}
                  {editingId ? 'Edit Layanan' : 'Tambah Layanan Baru'}
                </h3>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setServiceForm({ title: '', description: '', icon_name: 'clock', link_text: 'Lihat Selengkapnya', link_href: '#layanan' }); }}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                  >
                    + Batal Edit
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Layanan</label>
                <input
                  type="text"
                  placeholder="Cth: Jadwal Sholat Real-time"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Layanan</label>
                <textarea
                  placeholder="Deskripsi..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition resize-none"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#C49B5E] to-[#b0884d] text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-[#C49B5E]/15"
              >
                {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingId ? 'Update Layanan' : 'Simpan Layanan'}</span>
              </button>
            </form>

            <div className="bg-[#0D1322] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 font-bold text-sm text-slate-200">Daftar Layanan Tersimpan</div>
              {loading ? (
                <div className="p-8 text-center text-slate-400">Memuat data...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Belum ada layanan tersimpan.</div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {filteredItems.map((svc) => (
                    <div key={svc.id} className="p-5 flex items-center justify-between hover:bg-slate-800/30 transition">
                      <div>
                        <h4 className="font-bold text-white text-base">{svc.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{svc.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditService(svc)}
                          className="p-2 text-amber-400 hover:bg-amber-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(svc.id)}
                          className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROGRAM TAB */}
        {activeTab === 'programs' && (
          <div className="space-y-8">
            <form onSubmit={handleSaveProgram} className="bg-[#0D1322] p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  {editingId ? <Edit3 className="w-4 h-4 text-[#C49B5E]" /> : <Plus className="w-4 h-4 text-[#C49B5E]" />}
                  {editingId ? 'Edit Program' : 'Tambah Program Keagamaan Baru'}
                </h3>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setProgramForm({ title: '', description: '', icon: 'book', link_href: '#detail' }); }}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                  >
                    + Batal Edit
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Program</label>
                <input
                  type="text"
                  placeholder="Cth: Taman Pendidikan Al-Qur'an (TPQ)"
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Program</label>
                <textarea
                  placeholder="Deskripsi..."
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition resize-none"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#C49B5E] to-[#b0884d] text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-[#C49B5E]/15"
              >
                {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingId ? 'Update Program' : 'Simpan Program'}</span>
              </button>
            </form>

            <div className="bg-[#0D1322] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 font-bold text-sm text-slate-200">Daftar Program Tersimpan</div>
              {loading ? (
                <div className="p-8 text-center text-slate-400">Memuat data...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Belum ada program tersimpan.</div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {filteredItems.map((pg) => (
                    <div key={pg.id} className="p-5 flex items-center justify-between hover:bg-slate-800/30 transition">
                      <div>
                        <h4 className="font-bold text-white text-base">{pg.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{pg.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProgram(pg)}
                          className="p-2 text-amber-400 hover:bg-amber-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(pg.id)}
                          className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            <form onSubmit={handleSaveTeam} className="bg-[#0D1322] p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  {editingId ? <Edit3 className="w-4 h-4 text-[#C49B5E]" /> : <Plus className="w-4 h-4 text-[#C49B5E]" />}
                  {editingId ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}
                </h3>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setTeamForm({ name: '', role: '', description: '', image_url: '' }); }}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                  >
                    + Batal Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Pengurus</label>
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Jabatan / Role</label>
                  <input
                    type="text"
                    placeholder="Cth: KETUA TAKMIR"
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Foto Profil (https://...)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={teamForm.image_url}
                  onChange={(e) => setTeamForm({ ...teamForm, image_url: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Singkat</label>
                <textarea
                  placeholder="Keterangan..."
                  value={teamForm.description}
                  onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition resize-none"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#C49B5E] to-[#b0884d] text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-[#C49B5E]/15"
              >
                {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingId ? 'Update Pengurus' : 'Simpan Pengurus'}</span>
              </button>
            </form>

            <div className="bg-[#0D1322] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 font-bold text-sm text-slate-200">Daftar Pengurus Tersimpan</div>
              {loading ? (
                <div className="p-8 text-center text-slate-400">Memuat data...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Belum ada pengurus tersimpan.</div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {filteredItems.map((tm) => (
                    <div key={tm.id} className="p-5 flex items-center justify-between hover:bg-slate-800/30 transition">
                      <div className="flex items-center gap-4">
                        {tm.image_url && <img src={tm.image_url} alt="" className="w-10 h-10 rounded-full object-cover border border-[#C49B5E]" />}
                        <div>
                          <h4 className="font-bold text-white text-base">{tm.name}</h4>
                          <p className="text-xs font-semibold text-[#C49B5E]">{tm.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTeam(tm)}
                          className="p-2 text-amber-400 hover:bg-amber-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(tm.id)}
                          className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <form onSubmit={handleSaveTestimonial} className="bg-[#0D1322] p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#C49B5E]" /> Tambah Testimoni Jamaah
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Jamaah</label>
                  <input
                    type="text"
                    placeholder="Nama"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status / Peran Jamaah</label>
                  <input
                    type="text"
                    placeholder="Cth: Jamaah Tetap / Santri"
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kutipan Kesan & Pesan</label>
                <textarea
                  placeholder="Kutipan testimoni..."
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition resize-none"
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#C49B5E] to-[#b0884d] text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-[#C49B5E]/15"
              >
                <Plus className="w-4 h-4" /> Simpan Testimoni
              </button>
            </form>

            <div className="bg-[#0D1322] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 font-bold text-sm text-slate-200">Daftar Testimoni Jamaah</div>
              {loading ? (
                <div className="p-8 text-center text-slate-400">Memuat data...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Belum ada testimoni.</div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {filteredItems.map((ts) => (
                    <div key={ts.id} className="p-5 flex items-center justify-between hover:bg-slate-800/30 transition">
                      <div className="space-y-1 pr-4">
                        <h4 className="font-bold text-white text-base">{ts.name} <span className="text-xs text-[#C49B5E] font-medium">({ts.role})</span></h4>
                        <p className="text-xs text-slate-300 italic">"{ts.quote}"</p>
                      </div>
                      <button
                        onClick={() => handleDeleteTestimonial(ts.id)}
                        className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <form onSubmit={handleSaveGallery} className="bg-[#0D1322] p-6 md:p-8 rounded-2xl border border-slate-800/80 shadow-xl space-y-5">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#C49B5E]" /> Tambah Dokumentasi Galeri
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Judul Media</label>
                  <input
                    type="text"
                    placeholder="Cth: Dokumentasi Sholat Idul Fitri"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tipe Media</label>
                  <select
                    value={galleryForm.type}
                    onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                    className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition"
                  >
                    <option value="photo">Foto (Photo)</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              {/* Drag & Drop Upload Zone */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Upload File Media (Drag & Drop)</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                    dragActive
                      ? 'border-[#C49B5E] bg-[#C49B5E]/15 scale-[1.01]'
                      : 'border-slate-800 bg-[#050811] hover:border-[#C49B5E]/50 hover:bg-slate-900/60'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                    className="hidden"
                    accept="image/*,video/*"
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2 text-[#C49B5E]">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="text-xs font-semibold">Mengunggah file ke server...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-[#C49B5E]/10 border border-[#C49B5E]/30 text-[#C49B5E] flex items-center justify-center">
                        <FileUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Tarik & Lepas File di Sini</p>
                        <p className="text-xs text-slate-400 mt-1">atau <span className="text-[#C49B5E] font-semibold underline">pilih dari komputer</span></p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">URL Media (Terisi Otomatis Saat Upload)</label>
                <input
                  type="text"
                  placeholder="https://... atau /uploads/..."
                  value={galleryForm.image_url}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                  className="w-full bg-[#050811] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C49B5E] transition font-mono text-xs"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#C49B5E] to-[#b0884d] text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition cursor-pointer shadow-lg shadow-[#C49B5E]/15"
              >
                <Plus className="w-4 h-4" /> Simpan Galeri
              </button>
            </form>

            <div className="bg-[#0D1322] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 font-bold text-sm text-slate-200">Daftar Galeri Tersimpan</div>
              {loading ? (
                <div className="p-8 text-center text-slate-400">Memuat data...</div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400">Belum ada galeri foto/video.</div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {filteredItems.map((gl) => (
                    <div key={gl.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition">
                      <div className="flex items-center gap-4">
                        {gl.image_url && <img src={gl.image_url} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />}
                        <div>
                          <h4 className="font-bold text-white text-sm">{gl.title} <span className="text-[10px] font-bold uppercase text-[#C49B5E] bg-[#C49B5E]/10 px-2 py-0.5 rounded-md ml-2">{gl.type}</span></h4>
                          <p className="text-xs text-slate-400 line-clamp-1">{gl.image_url}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteGallery(gl.id)}
                        className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="bg-[#0D1322] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 font-bold text-sm text-slate-200 flex items-center justify-between">
              <span>Pesan & Doa Masuk dari Jamaah</span>
              <span className="text-xs text-[#C49B5E] font-semibold">{filteredItems.length} Pesan</span>
            </div>
            {loading ? (
              <div className="p-8 text-center text-slate-400">Memuat data...</div>
            ) : filteredItems.length === 0 ? (
              <div className="p-8 text-center text-slate-400">Belum ada pesan dari jamaah.</div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {filteredItems.map((msg) => (
                  <div key={msg.id} className="p-6 space-y-2 hover:bg-slate-800/20 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-white text-sm">{msg.name} <span className="text-xs font-normal text-slate-400">({msg.email})</span></span>
                      <span className="text-[11px] text-slate-500 font-medium">{new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#C49B5E]">{msg.subject || 'Pesan / Doa Jamaah'}</p>
                    <p className="text-sm text-slate-300 leading-relaxed bg-[#050811] p-4 rounded-xl border border-slate-800/60">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
