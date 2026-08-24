package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `gorm:"size:255;not null" json:"name"`
	Email     string         `gorm:"size:255;uniqueIndex;not null" json:"email"`
	Password  string         `gorm:"size:255;not null" json:"-"`
	Role      string         `gorm:"size:50;default:'admin'" json:"role"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type MasjidProfile struct {
	ID               uint   `gorm:"primaryKey" json:"id"`
	Name             string `gorm:"size:255" json:"name"`
	Address          string `gorm:"type:text" json:"address"`
	Phone            string `gorm:"size:50" json:"phone"`
	Email            string `gorm:"size:255" json:"email"`
	Vision           string `gorm:"type:text" json:"vision"`
	Mission          string `gorm:"type:text" json:"mission"`
	ActiveJamaah     string `gorm:"size:50" json:"active_jamaah"`
	TotalPrograms    string `gorm:"size:50" json:"total_programs"`
	EstablishedYear  string `gorm:"size:50" json:"established_year"`
}

type ServiceCategory struct {
	ID    uint   `gorm:"primaryKey" json:"id"`
	Name  string `gorm:"size:255;not null" json:"name"`
	Badge string `gorm:"size:100" json:"badge"`
	Icon  string `gorm:"size:100" json:"icon"`
}

type Service struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	CategoryID  *uint  `json:"category_id"`
	Title       string `gorm:"size:255;not null" json:"title"`
	Description string `gorm:"type:text" json:"description"`
	IconName    string `gorm:"size:100" json:"icon_name"`
	LinkText    string `gorm:"size:100" json:"link_text"`
	LinkHref    string `gorm:"size:255" json:"link_href"`
}

type Event struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Title       string    `gorm:"size:255;not null" json:"title"`
	DateBadge   string    `gorm:"size:100" json:"date_badge"`
	Speaker     string    `gorm:"size:255" json:"speaker"`
	Time        string    `gorm:"size:100" json:"time"`
	Location    string    `gorm:"size:255" json:"location"`
	Description string    `gorm:"type:text" json:"description"`
	ImageURL    string    `gorm:"size:500" json:"image_url"`
	IsFeatured  bool      `gorm:"default:false" json:"is_featured"`
	LinkText    string    `gorm:"size:100" json:"link_text"`
	LinkHref    string    `gorm:"size:255" json:"link_href"`
	CreatedAt   time.Time `json:"created_at"`
}

type Program struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Title       string `gorm:"size:255;not null" json:"title"`
	Description string `gorm:"type:text" json:"description"`
	Icon        string `gorm:"size:100" json:"icon"`
	LinkText    string `gorm:"size:100" json:"link_text"`
	LinkHref    string `gorm:"size:255" json:"link_href"`
	IsFeatured  bool   `gorm:"default:false" json:"is_featured"`
}

type TeamMember struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `gorm:"size:255;not null" json:"name"`
	Role        string `gorm:"size:100" json:"role"`
	Description string `gorm:"type:text" json:"description"`
	ImageURL    string `gorm:"size:500" json:"image_url"`
}

type Testimonial struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	Name       string `gorm:"size:255;not null" json:"name"`
	Role       string `gorm:"size:100" json:"role"`
	Quote      string `gorm:"type:text" json:"quote"`
	AvatarURL  string `gorm:"size:500" json:"avatar_url"`
	Rating     int    `gorm:"default:5" json:"rating"`
	IsFeatured bool   `gorm:"default:false" json:"is_featured"`
}

type GalleryItem struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Title        string `gorm:"size:255" json:"title"`
	Subtitle     string `gorm:"size:255" json:"subtitle"`
	Type         string `gorm:"size:50;default:'photo'" json:"type"` // photo | video
	ImageURL     string `gorm:"size:500" json:"image_url"`
	ThumbnailURL string `gorm:"size:500" json:"thumbnail_url"`
	VideoURL     string `gorm:"size:500" json:"video_url"`
	IsFeatured   bool   `gorm:"default:false" json:"is_featured"`
}

type ContactMessage struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"size:255;not null" json:"name"`
	Email     string    `gorm:"size:255" json:"email"`
	Phone     string    `gorm:"size:50" json:"phone"`
	Subject   string    `gorm:"size:255" json:"subject"`
	Message   string    `gorm:"type:text;not null" json:"message"`
	Type      string    `gorm:"size:50;default:'contact'" json:"type"` // contact | event_proposal
	Status    string    `gorm:"size:50;default:'unread'" json:"status"` // unread | read
	CreatedAt time.Time `json:"created_at"`
}
