package helpers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func GetUserId(c *fiber.Ctx) (uint, error) {
	userIdVal := c.Locals("user_id")
	if userIdVal == nil {
		return 0, fmt.Errorf("unauthorized")
	}
	userId, ok := userIdVal.(float64)
	if !ok {
		return 0, fmt.Errorf("invalid user_id type")
	}
	return uint(userId), nil
}
