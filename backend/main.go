package main

import (
	"log"

	"github.com/akdevsaha-dev/inktr-backend/config"
	"github.com/akdevsaha-dev/inktr-backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	if err := config.ConnectDB(); err != nil {
		log.Fatal(err)
	}
	routes.RegisterUserRoutes(app)
	log.Fatal(app.Listen(":3000"))
}
