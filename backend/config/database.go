package config

import (
	"fmt"
	"github.com/akdevsaha-dev/inktr-backend/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var DB *gorm.DB

func ConnectDB() error {

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		return fmt.Errorf("environment variable DATABASE_URL not set")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Printf("Failed to connect to the database: %v", err)
		return fmt.Errorf("failed to connect to the database; %w", err)
	}

	err = db.AutoMigrate(&models.User{}, &models.Post{}, &models.Comment{}, &models.Category{})

	if err != nil {
		fmt.Printf("Failed to migrate database: %v", err)
		return fmt.Errorf("failed to migrate database: %w", err)
	}
	DB = db
	log.Println("Database connected and migrated successfully")
	return nil
}
