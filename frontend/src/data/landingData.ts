import type { NavLinkItem, StatItem, ServiceItem, FeaturedEvent, PrayerTime, TeamMember, ServiceCategory, ProgramItem, EventItem, TestimonialItem, VideoItem, GalleryPhoto, ContactInfoCard } from '../types';

export const navLinks: NavLinkItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Event', href: '/event' },
  { label: 'Testimoni', href: '/testimoni' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Kontak', href: '/kontak' },
];

export const statItems: StatItem[] = [
  { id: '1', value: '500+', label: 'Jamaah Aktif' },
  { id: '2', value: '15+', label: 'Program Keagamaan' },
  { id: '3', value: 'Sejak 2010', label: 'Berdiri Melayani' },
];

export const serviceItems: ServiceItem[] = [
  {
    id: 's1',
    title: 'Jadwal Sholat Real-time',
    description: 'Akses informasi jadwal sholat lima waktu yang akurat sesuai lokasi Anda untuk membantu menjaga ketepatan waktu ibadah.',
    iconName: 'clock',
    linkText: 'Lihat Selengkapnya',
    linkHref: '#jadwal',
  },
  {
    id: 's2',
    title: 'Kajian Ahad Pagi',
    description: 'Ikuti majelis ilmu rutin setiap hari Ahad pagi bersama asatidz terkemuka untuk memperdalam pemahaman agama.',
    iconName: 'book',
    linkText: 'Lihat Selengkapnya',
    linkHref: '#kajian',
  },
  {
    id: 's3',
    title: 'Konsultasi Keagamaan',
    description: 'Layanan tanya jawab seputar fiqh, muamalah, dan problematika umat yang dijawab langsung oleh ahlinya.',
    iconName: 'chat',
    linkText: 'Lihat Selengkapnya',
    linkHref: '#konsultasi',
  },
];

export const featuredEvent: FeaturedEvent = {
  dateTag: '15 Maret',
  title: 'Kajian Ramadhan',
  description: 'Menyambut bulan suci dengan persiapan spiritual dan keilmuan bersama Ustadz fulan. Terbuka untuk umum.',
  speaker: 'Ustadz Fulan, M.Ag',
  ctaText: 'Daftar Sekarang',
  ctaHref: '#daftar-event',
};

export const samplePrayerTimes: PrayerTime[] = [
  { name: 'Subuh', time: '04:38' },
  { name: 'Dzuhur', time: '11:58' },
  { name: 'Ashar', time: '15:15', isNext: true },
  { name: 'Maghrib', time: '18:02' },
  { name: 'Isya', time: '19:12' },
];

export const footerLinks: NavLinkItem[] = [
  { label: 'Kebijakan Privasi', href: '#privasi' },
  { label: 'Ketentuan Layanan', href: '#ketentuan' },
  { label: 'Peta Situs', href: '#sitemap' },
];

export const teamMembers: TeamMember[] = [
  {
    id: 't1',
    name: 'Bapak Ahmad',
    role: 'KETUA TAKMIR',
    description: 'Mengabdi dengan ketulusan hati untuk memajukan manajemen masjid.',
    imageUrl: 'https://i.pinimg.com/1200x/35/fb/ab/35fbab9dc42fd1fe4fd5777617508981.jpg',
  },
  {
    id: 't2',
    name: 'Ustadz Farid',
    role: 'IMAM BESAR',
    description: 'Menjaga kesucian ibadah dan membimbing spiritualitas jamaah.',
    imageUrl: 'https://i.pinimg.com/736x/3e/7c/20/3e7c20ff2ebbbb1feadc38282a7c1c71.jpg',
  },
  {
    id: 't3',
    name: 'Ibu Siti',
    role: 'KABID PENDIDIKAN',
    description: 'Mencetak generasi qurani melalui program edukasi yang inovatif.',
    imageUrl: 'https://i.pinimg.com/736x/26/1a/49/261a4937055808f2a39bfe0ab69e7521.jpg',
  },
];

export const serviceCategories: ServiceCategory[] = [
  { id: 'c1', name: 'Ibadah', badge: 'Tersedia', icon: 'home' },
  { id: 'c2', name: 'Pendidikan', badge: 'Tersedia', icon: 'book' },
  { id: 'c3', name: 'Sosial', badge: 'Tersedia', icon: 'users' },
  { id: 'c4', name: 'Konsultasi', badge: 'Tersedia', icon: 'message' },
];

export const programItems: ProgramItem[] = [
  {
    id: 'p1',
    title: 'Jadwal Sholat Real-time',
    description: 'Akses jadwal sholat yang akurat dan diperbarui secara real-time untuk wilayah sekitar masjid.',
    linkText: 'Cek Detail',
    linkHref: '#detail-jadwal',
    icon: 'clock',
  },
  {
    id: 'p2',
    title: 'Kajian Ahad Pagi',
    description: 'Kajian rutin mingguan membahas berbagai tema keislaman dengan narasumber kompeten.',
    linkText: 'Cek Detail',
    linkHref: '#detail-kajian',
    icon: 'users',
  },
  {
    id: 'p3',
    title: 'Program Hafalan Qur\'an',
    description: 'Program intensif tahfidz Qur\'an dengan metode komprehensif, dibimbing oleh ustadz dan ustadzah bersertifikat. Cocok untuk semua kalangan usia.',
    linkText: 'Daftar Program',
    linkHref: '#daftar-tahfidz',
    icon: 'book-open',
    featured: true,
  },
  {
    id: 'p4',
    title: 'Santunan Anak Yatim',
    description: 'Program penyaluran bantuan dan beasiswa rutin untuk anak yatim di lingkungan sekitar.',
    linkText: 'Cek Detail',
    linkHref: '#detail-santunan',
    icon: 'heart-handshake',
  },
  {
    id: 'p5',
    title: 'Konsultasi Keagamaan',
    description: 'Layanan konsultasi syariah, keluarga, dan persoalan hidup dengan asatidz berpengalaman.',
    linkText: 'Cek Detail',
    linkHref: '#detail-konsultasi',
    icon: 'help-circle',
  },
];

export const weeklyEvents: EventItem[] = [
  {
    id: 'e1',
    dateBadge: '21 Maret',
    title: 'Kajian Ahad Pagi',
    time: '06:00 - 08:00 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=600&auto=format&fit=crop',
    linkText: 'Detail & Daftar',
    linkHref: '#daftar-kajian',
  },
  {
    id: 'e2',
    dateBadge: '22 Maret',
    title: 'Buka Puasa Bersama',
    time: '17:30 - Selesai',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    linkText: 'Detail & Daftar',
    linkHref: '#daftar-bukber',
  },
  {
    id: 'e3',
    dateBadge: '23 Maret',
    title: 'Santunan Anak Yatim',
    time: '10:00 - 12:00 WIB',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
    linkText: 'Detail & Daftar',
    linkHref: '#daftar-santunan',
  },
];

export const featuredTestimonials: TestimonialItem[] = [
  {
    id: 'ft1',
    quote: 'Sejak pindah ke sini, Masjid Baiturahim menjadi ruang belajar, bersosialisasi, dan tempat anak-anak saya tumbuh dalam nilai-nilai Islam. Rasanya seperti memiliki keluarga baru.',
    name: 'Ibu Fatimah',
    role: 'Ketua PKK',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'ft2',
    quote: 'Saya menemukan kedamaian di sini. Para ustadz sabar membimbing saya dari nol hingga bisa sholat dengan khusyuk. Ini bukan sekadar masjid, ini rumah bagi saya.',
    name: 'Bapak Darmawan',
    role: 'Mualaf 2023',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    featured: true,
  },
];

export const perspectiveTestimonials: TestimonialItem[] = [
  {
    id: 'pt1',
    quote: 'Lingkungan yang sangat suportif. Saya tidak pernah merasa sendirian.',
    name: 'Ahmad',
    role: 'Mualaf 2024',
    rating: 5,
  },
  {
    id: 'pt2',
    quote: 'Program kajian pemuda membuka wawasan saya tentang Islam moderat.',
    name: 'Siti Rahayu',
    role: 'Mahasiswa UNPAD',
    rating: 5,
  },
  {
    id: 'pt3',
    quote: 'Masjid ini selalu ramah kepada lansia. Ada kursi khusus dan tempat wudhu yang mudah dijangkau.',
    name: 'Haji Umar',
    role: 'Pensiunan Guru',
    rating: 5,
  },
  {
    id: 'pt4',
    quote: 'Anak-anak saya betah di TPA sini. Pengajarnya sabar dan penuh kasih sayang.',
    name: 'Fatimah Zahra',
    role: 'Ibu Rumah Tangga',
    rating: 5,
  },
];

export const videoMoments: VideoItem[] = [
  {
    id: 'v1',
    title: 'Kajian Ramadhan',
    thumbnailUrl: 'https://i.ytimg.com/vi/sX-kePnlgy4/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAHIBb&rs=AOn4CLBKXWjC1_h6OOCF7zVdFFY9L1z6fA',
  },
  {
    id: 'v2',
    title: 'Buka Puasa Bersama',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop',
    active: true,
  },
  {
    id: 'v3',
    title: 'Santunan Anak Yatim',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'g1',
    imageUrl: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'g2',
    imageUrl: 'https://i.pinimg.com/1200x/f5/15/0c/f5150c00d61c81eecafc4be534ffbd0c.jpg',
  },
  {
    id: 'g3',
    title: 'Buka Puasa Bersama',
    subtitle: 'Momen penuh berkah di pelataran masjid.',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'g4',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'g5',
    imageUrl: 'https://i.pinimg.com/736x/3c/96/9d/3c969d4031eabeb596fe59920aef73f7.jpg',
  },
  {
    id: 'g6',
    imageUrl: 'https://i.pinimg.com/736x/56/97/cb/5697cbfc814711d9345cc0c52bf2e212.jpg',
  },
];

export const contactInfoCards: ContactInfoCard[] = [
  {
    id: 'ci1',
    title: 'Alamat',
    value: 'Jl. Masjid Baiturahim No. 15',
    subvalue: 'Kota Berkah',
    icon: 'map-pin',
  },
  {
    id: 'ci2',
    title: 'Telepon',
    value: '+62 812 3456 7890',
    subvalue: 'Senin - Minggu',
    icon: 'phone',
  },
  {
    id: 'ci3',
    title: 'Email',
    value: 'info@masjidalhikmah.com',
    subvalue: 'Balasan 24 Jam',
    icon: 'mail',
  },
  {
    id: 'ci4',
    title: 'Jam Operasional',
    value: 'Buka 24 Jam',
    subvalue: 'Untuk Ibadah',
    icon: 'clock',
  },
];
