package controllers

import (
	"os"
	"time"

	"github.com/akdevsaha-dev/inktr-backend/config"
	"github.com/akdevsaha-dev/inktr-backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(os.Getenv("SECRET_KEY"))

func Signup(c *fiber.Ctx) error {

	var data struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}

	var exsitingUser models.User

	if err := config.DB.Where("email = ?", data.Email).First(&exsitingUser).Error; err == nil {
		return c.Status(400).JSON(fiber.Map{"error": "User with this email already exists!"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(data.Password), 15)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
	}

	user := models.User{
		Name:     data.Name,
		Email:    data.Email,
		Password: string(hashedPassword),
	}
	err = config.DB.Create(&user).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Cannot create user!"})
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"user_id": user.ID,
			"exp":     time.Now().Add(time.Hour * 24).Unix(),
		},
	)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to create token"})
	}
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    tokenString,
		HTTPOnly: true,
		Expires:  time.Now().Add(30 * 24 * time.Hour),
		Secure:   os.Getenv("APP_ENV") == "production",
		SameSite: "strict",
	})
	return c.JSON(fiber.Map{
		"message": "Signup successful",
		"token":   tokenString,
	})
}

func Singin(c *fiber.Ctx) error {
	var data struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON"})
	}
	var existingUser models.User

	if err := config.DB.Where("email = ? ", data.Email).First(&existingUser).Error; err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Credentials"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(data.Password)); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid credentials."})
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"user_id": existingUser.ID,
			"exp":     time.Now().Add(time.Hour * 24).Unix(),
		},
	)
	tokenString, err := token.SignedString(jwtSecret)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create token",
		})
	}
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  time.Now().Add(30 * 24 * time.Hour),
		HTTPOnly: true,
		Secure:   os.Getenv("APP_ENV") == "production",
		SameSite: "strict",
	})
	return c.JSON(fiber.Map{"message": "signin successful",
		"token": tokenString,
	})
}
