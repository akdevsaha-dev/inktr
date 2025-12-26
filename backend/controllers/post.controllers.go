package controllers

import (
	"github.com/akdevsaha-dev/inktr-backend/config"
	"github.com/akdevsaha-dev/inktr-backend/helpers"
	"github.com/akdevsaha-dev/inktr-backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreatePost(c *fiber.Ctx) error {

	user_id, err := helpers.GetUserId(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}

	var data struct {
		Title   string `json:"title"`
		Content string `json:"content"`
		Subtite string `json:"subtitle"`
	}

	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	post := models.Post{
		Title:    data.Title,
		Content:  data.Content,
		Subtitle: data.Subtite,
		UserID:   uint(user_id),
	}
	err = config.DB.Create(&post).Error

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "cannot create post",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(post)
}

func UpdatePost(c *fiber.Ctx) error {
	postId := c.Params("id")

	var data struct {
		Title   *string `json:"title"`
		Content *string `json:"content"`
	}

	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Cannot parse JSON data"})
	}

	var Post models.Post

	if err := config.DB.First(&Post, postId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Post not found"})
	}
	if data.Title != nil {
		Post.Title = *data.Title
	}
	if data.Content != nil {
		Post.Content = *data.Content
	}
	if err := config.DB.Save(&Post).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update post"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message":      "Post updated successfully",
		"updated_post": Post})
}
func DeletePost(c *fiber.Ctx) error {
	postId := c.Params("id")

	var post models.Post

	if err := config.DB.First(&post, postId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "post not found"})
	}
	if err := config.DB.Delete(&post, postId).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "cannot delete post"})
	}
	return c.Status(200).JSON(fiber.Map{"message": "post deleted successfully"})
}
func GetPosts(c *fiber.Ctx) error {

	var posts []models.Post

	err := config.DB.
		Preload("Author", func(db *gorm.DB) *gorm.DB {
			return db.Select("username", "email", "id", "created_at")
		}).
		Preload("Comments").
		Preload("Categories").
		Preload("LikedBy").
		Find(&posts).Error

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Cannot load posts at the moment."})
	}

	return c.Status(200).JSON(fiber.Map{"posts": posts})
}
func GetApost(c *fiber.Ctx) error {
	postId := c.Params("id")

	var post models.Post

	if err := config.DB.Where("ID = ?", postId).First(&post).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Error loading post..."})
	}
	return c.Status(200).JSON(fiber.Map{"post": post})
}
