package routes

import (
	"github.com/akdevsaha-dev/inktr-backend/controllers"
	"github.com/akdevsaha-dev/inktr-backend/middleware"
	"github.com/gofiber/fiber/v2"
)

func RegisterPostRoutes(app *fiber.App) {

	postGroup := app.Group("/api/v1/post")
	postGroup.Post("/create-post", middleware.AuthMiddleware, controllers.CreatePost)
	postGroup.Put("/update-post/:id", controllers.UpdatePost)
	postGroup.Delete("/delete-post/:id", controllers.DeletePost)
	postGroup.Get("/get-posts", middleware.AuthMiddleware, controllers.GetPosts)
	postGroup.Get("/:id", middleware.AuthMiddleware, controllers.GetApost)
	postGroup.Post("/update-like/:id", middleware.AuthMiddleware, controllers.UpdateLike)
}
