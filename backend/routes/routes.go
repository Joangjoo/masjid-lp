package routes

import (
	"backend/controllers"
	"backend/middlewares"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) {
	// Public routes
	api := r.Group("/api/v1")
	{
		api.POST("/auth/login", controllers.Login)

		// Public Content Endpoints
		api.GET("/profile-info", controllers.GetProfileInfo)
		api.GET("/events", controllers.GetEvents)
		api.GET("/services", controllers.GetServices)
		api.GET("/programs", controllers.GetPrograms)
		api.GET("/team", controllers.GetTeamMembers)
		api.GET("/testimonials", controllers.GetTestimonials)
		api.GET("/gallery", controllers.GetGalleryItems)
		api.POST("/contact", controllers.CreateContactMessage)

		// Protected Admin Routes
		admin := api.Group("/admin")
		admin.Use(middlewares.AuthMiddleware())
		{
			// Profile CMS
			admin.GET("/profile", controllers.GetProfile)
			admin.PUT("/profile-info", controllers.UpdateProfileInfo)

			// File Upload Endpoint
			admin.POST("/upload", controllers.UploadFile)

			// Events CMS
			admin.POST("/events", controllers.CreateEvent)
			admin.PUT("/events/:id", controllers.UpdateEvent)
			admin.DELETE("/events/:id", controllers.DeleteEvent)

			// Services CMS
			admin.POST("/services", controllers.CreateService)
			admin.PUT("/services/:id", controllers.UpdateService)
			admin.DELETE("/services/:id", controllers.DeleteService)

			// Programs CMS
			admin.POST("/programs", controllers.CreateProgram)
			admin.PUT("/programs/:id", controllers.UpdateProgram)
			admin.DELETE("/programs/:id", controllers.DeleteProgram)

			// Team CMS
			admin.POST("/team", controllers.CreateTeamMember)
			admin.PUT("/team/:id", controllers.UpdateTeamMember)
			admin.DELETE("/team/:id", controllers.DeleteTeamMember)

			// Testimonials CMS
			admin.POST("/testimonials", controllers.CreateTestimonial)
			admin.PUT("/testimonials/:id", controllers.UpdateTestimonial)
			admin.DELETE("/testimonials/:id", controllers.DeleteTestimonial)

			// Gallery CMS
			admin.POST("/gallery", controllers.CreateGalleryItem)
			admin.DELETE("/gallery/:id", controllers.DeleteGalleryItem)

			// Messages CMS
			admin.GET("/messages", controllers.GetContactMessages)
		}
	}
}
