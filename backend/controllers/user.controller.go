package controllers

import (
	"os"
	"time"

	"github.com/akdevsaha-dev/inktr-backend/config"
	"github.com/akdevsaha-dev/inktr-backend/helpers"
	"github.com/akdevsaha-dev/inktr-backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte(os.Getenv("SECRET_KEY"))

func Signup(c *fiber.Ctx) error {

	var data struct {
		Username string `json:"username"`
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
		Username: data.Username,
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
		SameSite: "Lax",
		Secure:   false,
		Path:     "/",
	})
	return c.JSON(fiber.Map{
		"message": "Signup successful",
		"user": fiber.Map{
			"id":         user.ID,
			"username":   user.Username,
			"email":      user.Email,
			"created_at": user.CreatedAt,
		},
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
		SameSite: "Lax", //none for production
		Secure:   false, //true
		Path:     "/",
	})
	return c.JSON(fiber.Map{"message": "signin successful",
		"user": fiber.Map{
			"id":         existingUser.ID,
			"username":   existingUser.Username,
			"email":      existingUser.Email,
			"created_at": existingUser.CreatedAt,
		},
	})
}

func Signout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		SameSite: "Lax",
		Secure:   false,
	})
	return c.JSON(fiber.Map{
		"error": "Signed out successfully",
	})
}

func Status(c *fiber.Ctx) error {
	userId, err := helpers.GetUserId(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}
	var user models.User
	if err := config.DB.First(&user, userId).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not found",
		},
		)
	}
	return c.JSON(fiber.Map{
		"user": fiber.Map{
			"id":         user.ID,
			"username":   user.Username,
			"email":      user.Email,
			"created_at": user.CreatedAt,
			"avatar_url": user.AvatarUrl,
		},
	})
}
