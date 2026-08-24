package config

import (
	"fmt"
	"log"
	"os"

	"backend/models"

	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	_ = godotenv.Load()

	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "localhost"
	}
	user := os.Getenv("DB_USER")
	if user == "" {
		user = "postgres"
	}
	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "postgrespassword"
	}
	dbname := os.Getenv("DB_NAME")
	if dbname == "" {
		dbname = "masjid_db"
	}
	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "5437"
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta", host, user, password, dbname, port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to PostgreSQL database: %v", err)
	}

	log.Println("Connected to PostgreSQL successfully!")
	DB = db

	// Auto Migrate
	err = DB.AutoMigrate(
		&models.User{},
		&models.MasjidProfile{},
		&models.ServiceCategory{},
		&models.Service{},
		&models.Event{},
		&models.Program{},
		&models.TeamMember{},
		&models.Testimonial{},
		&models.GalleryItem{},
		&models.ContactMessage{},
	)
	if err != nil {
		log.Println("Auto migration failed:", err)
	}

	seedData()
}

func seedData() {
	if DB == nil {
		return
	}

	// 1. Seed Admin
	var userCount int64
	DB.Model(&models.User{}).Count(&userCount)
	if userCount == 0 {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
		admin := models.User{
			Name:     "Administrator Masjid",
			Email:    "admin@masjid.com",
			Password: string(hashedPassword),
			Role:     "admin",
		}
		DB.Create(&admin)
		log.Println("Default admin user created: admin@masjid.com / admin123")
	}

	// 2. Seed Services
	var serviceCount int64
	DB.Model(&models.Service{}).Count(&serviceCount)
	if serviceCount == 0 {
		services := []models.Service{
			{
				Title:       "Jadwal Sholat Real-time",
				Description: "Akses informasi jadwal sholat lima waktu yang akurat sesuai lokasi Anda untuk membantu menjaga ketepatan waktu ibadah.",
				IconName:    "clock",
				LinkText:    "Lihat Selengkapnya",
				LinkHref:    "#jadwal",
			},
			{
				Title:       "Kajian Ahad Pagi",
				Description: "Ikuti majelis ilmu rutin setiap hari Ahad pagi bersama asatidz terkemuka untuk memperdalam pemahaman agama.",
				IconName:    "book",
				LinkText:    "Lihat Selengkapnya",
				LinkHref:    "#kajian",
			},
			{
				Title:       "Konsultasi Keagamaan",
				Description: "Layanan tanya jawab seputar fiqh, muamalah, dan problematika umat yang dijawab langsung oleh ahlinya.",
				IconName:    "chat",
				LinkText:    "Lihat Selengkapnya",
				LinkHref:    "#konsultasi",
			},
		}
		DB.Create(&services)
		log.Println("Seeded initial services data")
	}

	// 3. Seed Events
	var eventCount int64
	DB.Model(&models.Event{}).Count(&eventCount)
	if eventCount == 0 {
		events := []models.Event{
			{
				Title:       "Kajian Ramadhan",
				DateBadge:   "15 Maret",
				Speaker:     "Ustadz Fulan, M.Ag",
				Description: "Menyambut bulan suci dengan persiapan spiritual dan keilmuan bersama Ustadz fulan. Terbuka untuk umum.",
				IsFeatured:  true,
				LinkText:    "Daftar Sekarang",
				LinkHref:    "#daftar-event",
			},
			{
				Title:       "Kajian Rutin Subuh Berjamaah",
				DateBadge:   "Setiap Ahad",
				Time:        "05:00 - 06:30 WIB",
				Location:    "Ruang Utama Masjid",
				Speaker:     "KH. Ahmad Dahlan",
				Description: "Pembahasan kitab Riyadhus Shalihin dan sarapan bersama jamaah.",
				ImageURL:    "https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&q=80&w=800",
				IsFeatured:  false,
				LinkText:    "Detail Agenda",
				LinkHref:    "#detail",
			},
			{
				Title:       "Tabligh Akbar Menyambut Nuzulul Qur'an",
				DateBadge:   "17 Ramadhan",
				Time:        "19:30 WIB - Selesai",
				Location:    "Halaman Utama Masjid",
				Speaker:     "Ustadz Hanan Attaki",
				Description: "Refleksi keagungan Al-Qur'an dan doa bersama seluruh jamaah.",
				ImageURL:    "https://images.unsplash.com/photo-1590076205586-76a7a7dd235f?auto=format&fit=crop&q=80&w=800",
				IsFeatured:  false,
				LinkText:    "Detail Agenda",
				LinkHref:    "#detail",
			},
		}
		DB.Create(&events)
		log.Println("Seeded initial events data")
	}

	// 4. Seed Programs
	var programCount int64
	DB.Model(&models.Program{}).Count(&programCount)
	if programCount == 0 {
		programs := []models.Program{
			{
				Title:       "Taman Pendidikan Al-Qur'an (TPQ)",
				Description: "Pembinaan membaca Al-Qur'an dan akhlak bagi anak-anak usia dini hingga remaja.",
				Icon:        "book",
				LinkText:    "Pelajari Selengkapnya",
				LinkHref:    "#tpq",
				IsFeatured:  true,
			},
			{
				Title:       "Santunan Anak Yatim & Dhuafa",
				Description: "Program penyaluran bantuan rutin bulanan untuk anak-anak yatim dan keluarga kurang mampu.",
				Icon:        "heart",
				LinkText:    "Pelajari Selengkapnya",
				LinkHref:    "#santunan",
				IsFeatured:  true,
			},
			{
				Title:       "Kajian Remaja Masjid (RISMA)",
				Description: "Wadah kegiatan pemuda-pemudi untuk mengasah kepemimpinan dan wawasan keislaman.",
				Icon:        "users",
				LinkText:    "Pelajari Selengkapnya",
				LinkHref:    "#risma",
				IsFeatured:  false,
			},
		}
		DB.Create(&programs)
		log.Println("Seeded initial programs data")
	}

	// 5. Seed Team Members
	var teamCount int64
	DB.Model(&models.TeamMember{}).Count(&teamCount)
	if teamCount == 0 {
		team := []models.TeamMember{
			{
				Name:        "Bapak Ahmad",
				Role:        "KETUA TAKMIR",
				Description: "Mengabdi dengan ketulusan hati untuk memajukan manajemen masjid.",
				ImageURL:    "https://i.pinimg.com/1200x/35/fb/ab/35fbab9dc42fd1fe4fd5777617508981.jpg",
			},
			{
				Name:        "Ustadz Farid",
				Role:        "IMAM BESAR",
				Description: "Menjaga kesucian ibadah dan membimbing spiritualitas jamaah.",
				ImageURL:    "https://i.pinimg.com/736x/3e/7c/20/3e7c20ff2ebbbb1feadc38282a7c1c71.jpg",
			},
			{
				Name:        "Ibu Siti",
				Role:        "KABID PENDIDIKAN",
				Description: "Mencetak generasi qurani melalui program edukasi yang inovatif.",
				ImageURL:    "https://i.pinimg.com/736x/26/1a/49/261a4937055808f2a39bfe0ab69e7521.jpg",
			},
		}
		DB.Create(&team)
		log.Println("Seeded initial team members data")
	}

	// 6. Seed Testimonials
	var testCount int64
	DB.Model(&models.Testimonial{}).Count(&testCount)
	if testCount == 0 {
		testimonials := []models.Testimonial{
			{
				Name:       "H. Abdullah",
				Role:       "Jamaah Tetap",
				Quote:      "Suasana masjid sangat kondusif dan program-program kajian sangat bermanfaat untuk menambah pemahaman agama keluarga kami.",
				Rating:     5,
				IsFeatured: true,
			},
			{
				Name:       "Rina Rahmawati",
				Role:       "Orang Tua Santri TPQ",
				Quote:      "Anak saya jadi lebih rajin mengaji dan hafal surah-surah pendek setelah mengikuti program TPQ di Masjid Al-Hikmah.",
				Rating:     5,
				IsFeatured: true,
			},
		}
		DB.Create(&testimonials)
		log.Println("Seeded initial testimonials data")
	}

	// 7. Seed Gallery
	var galleryCount int64
	DB.Model(&models.GalleryItem{}).Count(&galleryCount)
	if galleryCount == 0 {
		gallery := []models.GalleryItem{
			{
				Title:        "Sholat Idul Fitri 1445 H",
				Subtitle:     "Pelaksanaan Sholat Id Berjamaah",
				Type:         "photo",
				ImageURL:     "https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&q=80&w=800",
				ThumbnailURL: "https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&q=80&w=800",
				IsFeatured:   true,
			},
			{
				Title:        "Dokumentasi Kajian Akbar",
				Subtitle:     "Suasana Keakraban Jamaah",
				Type:         "video",
				ImageURL:     "https://images.unsplash.com/photo-1590076205586-76a7a7dd235f?auto=format&fit=crop&q=80&w=800",
				ThumbnailURL: "https://images.unsplash.com/photo-1590076205586-76a7a7dd235f?auto=format&fit=crop&q=80&w=800",
				VideoURL:     "https://www.youtube.com/watch?v=sample",
				IsFeatured:   true,
			},
		}
		DB.Create(&gallery)
		log.Println("Seeded initial gallery data")
	}

	// 8. Seed Profile
	var profCount int64
	DB.Model(&models.MasjidProfile{}).Count(&profCount)
	if profCount == 0 {
		prof := models.MasjidProfile{
			Name:            "Masjid Baiturahim",
			Address:         "Jl. Utama Masjid No. 123",
			Phone:           "+62 812 3456 7890",
			Email:           "info@masjidbaiturahim.com",
			Vision:          "Menjadi pusat peradaban Islam yang menyejukkan, membina umat, dan menyebarkan rahmat bagi alam semesta.",
			Mission:         "Menyediakan tempat ibadah yang nyaman, menyelenggarakan pendidikan Al-Qur'an, dan membantu sosial kemasyarakatan.",
			ActiveJamaah:    "500+",
			TotalPrograms:   "15+",
			EstablishedYear: "Sejak 2010",
		}
		DB.Create(&prof)
		log.Println("Seeded initial profile data")
	}
}
