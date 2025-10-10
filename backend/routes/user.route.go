package routes

import (
	"github.com/akdevsaha-dev/inktr-backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func RegisterUserRoutes(app *fiber.App) {
	userGroup := app.Group("/api/v1/user")
	userGroup.Post("/signup", controllers.Signup)
	userGroup.Post("/signin", controllers.Singin)
	userGroup.Post("/signout", controllers.Signout)
}
