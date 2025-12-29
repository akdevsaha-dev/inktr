package controllers

import (
	"github.com/akdevsaha-dev/inktr-backend/config"
	"github.com/akdevsaha-dev/inktr-backend/helpers"
	"github.com/akdevsaha-dev/inktr-backend/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type PostResponse struct {
	models.Post
	TotalLikes int `json:"total_likes"`
}

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
		Find(&posts).Error

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Cannot load posts at the moment."})
	}

	response := make([]PostResponse, 0, len(posts))

	for _, post := range posts {
		totalLikes := config.DB.Model(&post).Association("LikedBy").Count()
		response = append(response, PostResponse{
			Post:       post,
			TotalLikes: int(totalLikes),
		})
	}

	return c.JSON(fiber.Map{"posts": response})
}
func GetApost(c *fiber.Ctx) error {
	postId := c.Params("id")

	var post models.Post
	if err := config.DB.Preload("Author").Where("id = ?", postId).First(&post).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Error loading post..."})
	}
	totalLikes := config.DB.
		Model(&post).
		Association("LikedBy").
		Count()
	userID, err := helpers.GetUserId(c)
	liked := false
	if err == nil {
		var user models.User
		if err := config.DB.First(&user, userID).Error; err == nil {
			var likedPosts []models.Post
			config.DB.Model(&user).Association("LikedPosts").Find(&likedPosts, "id = ?", post.ID)
			liked = len(likedPosts) > 0
		}
	}

	return c.Status(200).JSON(fiber.Map{"post": post, "total_likes": totalLikes, "liked": liked})
}

func UpdateLike(c *fiber.Ctx) error {
	user_id, err := helpers.GetUserId(c)
	postId := c.Params("id")

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": err.Error()})
	}
	var user models.User
	if err := config.DB.First(&user, user_id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not founf"})
	}
	var post models.Post
	if err := config.DB.First(&post, postId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "post not found"})
	}
	var likedPost []models.Post
	config.DB.Model(&user).Association("LikedPosts").Find(&likedPost, "id = ?", postId)
	liked := len(likedPost) > 0
	if liked {
		config.DB.Model(&user).Association("LikedPosts").Delete(&post)
		liked = false
	} else {
		config.DB.Model(&user).Association("LikedPosts").Append(&post)
		liked = true
	}

	totalLikes := config.DB.Model(&post).Association("LikedBy").Count()
	return c.Status(200).JSON(fiber.Map{
		"liked":       liked,
		"total_likes": totalLikes})
}
