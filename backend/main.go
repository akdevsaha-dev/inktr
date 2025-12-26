package main

import (
	"log"

	"github.com/akdevsaha-dev/inktr-backend/config"
	"github.com/akdevsaha-dev/inktr-backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		AllowCredentials: true,
	}))
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	if err := config.ConnectDB(); err != nil {
		log.Fatal(err)
	}
	routes.RegisterUserRoutes(app)
	routes.RegisterPostRoutes(app)
	log.Fatal(app.Listen(":3001"))
}
