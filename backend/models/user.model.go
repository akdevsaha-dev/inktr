package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Username  string    `gorm:"type:varchar(50);not null" json:"username"`
	Email     string    `gorm:"uniqueIndex;not null" json:"email"`
	AvatarUrl *string   `gorm:"type:varchar(255)" json:"avatar_url"`
	CreatedAt time.Time `json:"created_at"`

	Password  string         `json:"-"`
	UpdatedAt time.Time      `json:"-"`
	DeletedAt gorm.DeletedAt `json:"-"`

	Posts      []Post    `gorm:"foreignKey:UserID" json:"-"`
	LikedPosts []Post    `gorm:"many2many:post_likes;" json:"-"`
	Comments   []Comment `gorm:"foreignKey:UserID" json:"-"`
}
