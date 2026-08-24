# MASTER DESIGN SYSTEM V2 - MASJID AL-HIKMAH (MIDNIGHT OASIS)
## 1. IDENTITAS VISUAL
- **Soul / Mood:** Tenang, Kontemplatif, Eksklusif namun Terbuka. Menggambarkan keteduhan malam dan kehangatan cahaya masjid.
- **Inspirasi Arsitektur:** Lengkungan bergaya Moor/Ottoman dengan sentuhan modern minimalis.

## 2. PALET WARNA (WAJIB & MUTLAK)
| Peran | Kode Hex | Penggunaan |
|-------|----------|------------|
| **Primary (Navy Deep)** | `#13294B` | Navbar scroll, Footer, Background gelap, Heading utama |
| **Secondary (Desert Sand)** | `#C49B5E` | Tombol CTA Utama, Border aktif, Highlight, Bullet point |
| **Tertiary (Soft Slate)** | `#2E4A62` | Background kartu gelap, efek layer |
| **Background (Warm White)** | `#F8F6F3` | Latar belakang utama (off-white hangat) |
| **Text Dark** | `#1E1E24` | Teks body gelap |
| **Text Muted** | `#7A7A7A` | Teks sekunder, tanggal, deskripsi |

## 3. TIPOGRAFI
- **Heading (Agung):** `Playfair Display` (weight: 700). Ukuran: H1 (52px), H2 (38px), H3 (26px).
- **Body (Modern):** `Inter` (weight: 400, 600). Ukuran: Paragraf (17px), Label (14px).
- **Arab:** `Noto Sans Arabic` (weight: 700).

## 4. LAYOUT & SPACING
- **Container:** Max-width `1280px`, margin `0 auto`.
- **Padding:** `padding: 80px 60px` (Desktop), `40px 20px` (Mobile).
- **Border Radius:** Kartu & Gambar `rounded-2xl (16px)`, Tombol CTA `rounded-full (50px)`.
- **Efek:** Bayangan menggunakan `rgba(19, 41, 75, 0.08)` untuk kesan elegan.

## 5. KOMPONEN UI (WAJIB)
- **Navbar:** Sticky. Saat di atas hero: transparan dengan blur. Saat scroll: background `#13294B` (solid) dengan shadow.
- **Tombol Primary (CTA):** Background `#C49B5E`, Text `#F8F6F3` (putih hangat). Padding `14px 40px`. Hover: scale(1.05), tambah bayangan.
- **Tombol Secondary:** Border `2px solid #C49B5E`, text `#C49B5E`. Hover: background `#C49B5E`, text putih.
- **Kartu:** Background `#FFFFFF`, border-radius `20px`, shadow lembut. Hover: translateY(-8px) dengan shadow lebih tebal.
- **Divider:** Menggunakan motif lengkung khas Timur Tengah (SVG) berwarna `#C49B5E` atau `#13294B`.
