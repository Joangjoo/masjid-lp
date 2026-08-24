package controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"backend/config"
	"backend/models"

	"github.com/gin-gonic/gin"
)

// --- Dynamic CMS Handlers ---

// Profile / Settings
func GetProfileInfo(c *gin.Context) {
	var profile models.MasjidProfile
	if err := config.DB.First(&profile).Error; err != nil {
		c.JSON(http.StatusOK, models.MasjidProfile{
			Name:            "Masjid Baiturahim",
			Address:         "Jl. Utama Masjid No. 123",
			Phone:           "+62 812 3456 7890",
			Email:           "info@masjidbaiturahim.com",
			Vision:          "Menjadi pusat peradaban Islam yang menyejukkan, membina umat, dan menyebarkan rahmat bagi alam semesta.",
			ActiveJamaah:    "500+",
			TotalPrograms:   "15+",
			EstablishedYear: "Sejak 2010",
		})
		return
	}
	c.JSON(http.StatusOK, profile)
}

func UpdateProfileInfo(c *gin.Context) {
	var profile models.MasjidProfile
	config.DB.First(&profile)
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&profile)
	c.JSON(http.StatusOK, profile)
}

// Events
func GetEvents(c *gin.Context) {
	var events []models.Event
	config.DB.Order("created_at desc").Find(&events)
	c.JSON(http.StatusOK, events)
}

func CreateEvent(c *gin.Context) {
	var item models.Event
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateEvent(c *gin.Context) {
	id := c.Param("id")
	var item models.Event
	if err := config.DB.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteEvent(c *gin.Context) {
	id := c.Param("id")
	config.DB.Delete(&models.Event{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Event deleted successfully"})
}

// Services
func GetServices(c *gin.Context) {
	var services []models.Service
	config.DB.Find(&services)
	c.JSON(http.StatusOK, services)
}

func CreateService(c *gin.Context) {
	var item models.Service
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateService(c *gin.Context) {
	id := c.Param("id")
	var item models.Service
	if err := config.DB.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteService(c *gin.Context) {
	id := c.Param("id")
	config.DB.Delete(&models.Service{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Service deleted successfully"})
}

// Programs
func GetPrograms(c *gin.Context) {
	var programs []models.Program
	config.DB.Find(&programs)
	c.JSON(http.StatusOK, programs)
}

func CreateProgram(c *gin.Context) {
	var item models.Program
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateProgram(c *gin.Context) {
	id := c.Param("id")
	var item models.Program
	if err := config.DB.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Program not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteProgram(c *gin.Context) {
	id := c.Param("id")
	config.DB.Delete(&models.Program{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Program deleted successfully"})
}

// Team Members
func GetTeamMembers(c *gin.Context) {
	var members []models.TeamMember
	config.DB.Find(&members)
	c.JSON(http.StatusOK, members)
}

func CreateTeamMember(c *gin.Context) {
	var item models.TeamMember
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateTeamMember(c *gin.Context) {
	id := c.Param("id")
	var item models.TeamMember
	if err := config.DB.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team member not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteTeamMember(c *gin.Context) {
	id := c.Param("id")
	config.DB.Delete(&models.TeamMember{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Team member deleted successfully"})
}

// Testimonials
func GetTestimonials(c *gin.Context) {
	var items []models.Testimonial
	config.DB.Find(&items)
	c.JSON(http.StatusOK, items)
}

func CreateTestimonial(c *gin.Context) {
	var item models.Testimonial
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateTestimonial(c *gin.Context) {
	id := c.Param("id")
	var item models.Testimonial
	if err := config.DB.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Testimonial not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteTestimonial(c *gin.Context) {
	id := c.Param("id")
	config.DB.Delete(&models.Testimonial{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Testimonial deleted successfully"})
}

// Upload File
func UploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded: " + err.Error()})
		return
	}

	ext := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	uploadPath := filepath.Join("uploads", filename)

	if err := c.SaveUploadedFile(file, uploadPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file: " + err.Error()})
		return
	}

	fileURL := "/uploads/" + filename
	c.JSON(http.StatusOK, gin.H{
		"url":      fileURL,
		"filename": filename,
	})
}

// Gallery
func GetGalleryItems(c *gin.Context) {
	var items []models.GalleryItem
	config.DB.Find(&items)
	c.JSON(http.StatusOK, items)
}

func CreateGalleryItem(c *gin.Context) {
	var item models.GalleryItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func DeleteGalleryItem(c *gin.Context) {
	id := c.Param("id")
	config.DB.Delete(&models.GalleryItem{}, id)
	c.JSON(http.StatusOK, gin.H{"message": "Gallery item deleted successfully"})
}

// Contact Messages
func GetContactMessages(c *gin.Context) {
	var messages []models.ContactMessage
	config.DB.Order("created_at desc").Find(&messages)
	c.JSON(http.StatusOK, messages)
}

func CreateContactMessage(c *gin.Context) {
	var item models.ContactMessage
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}
