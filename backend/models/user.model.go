package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	Name       string         `gorm:"type:varchar(50);not null" json:"name"`
	Email      string         `gorm:"uniqueIndex;not null" json:"email"`
	Password   string         `gorm:"not null" json:"-"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
	Posts      []Post         `gorm:"foreignKey:UserID" json:"posts,omitempty"`
	LikedPosts []Post         `gorm:"many2many:post_likes;" json:"linked_posts"`
	Comments   []Comment      `gorm:"foreignKey:UserID" json:"comments,omitempty"`
}
