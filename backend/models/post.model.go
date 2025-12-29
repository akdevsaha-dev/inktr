package models

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	ID         uint           `gorm:"primaryKey" json:"id"`
	Title      string         `gorm:"type:varchar(200);not null" json:"title"`
	Subtitle   string         `json:"subtitle,omitempty" `
	Content    string         `gorm:"type:text;not null"  json:"content"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	UserID     uint           `json:"user_id"`
	Author     User           `gorm:"foreignKey:UserID" json:"author"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
	Comments   []Comment      `gorm:"foreignKey:PostID" json:"comments,omitempty"`
	Categories []Category     `gorm:"many2many:post_categories;" json:"categories,omitempty"`
	LikedBy    []User         `gorm:"many2many:post_likes;" json:"liked_by"`
}
