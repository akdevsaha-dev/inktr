package models

import (
	"encoding/json"
	"time"

	"gorm.io/gorm"
)

type Post struct {
	ID         uint            `gorm:"primaryKey" json:"id"`
	Title      string          `gorm:"type:varchar(200);not null" json:"title"`
	Subtitle   string          `json:"subtitle,omitempty"`
	Content    json.RawMessage `gorm:"type:jsonb;not null" json:"content"`
	CreatedAt  time.Time       `json:"created_at"`
	UpdatedAt  time.Time       `json:"updated_at"`
	UserID     uint            `json:"user_id"`
	Author     User            `gorm:"foreignKey:UserID" json:"author"`
	DeletedAt  gorm.DeletedAt  `json:"-"`
	LikedBy    []User          `gorm:"many2many:post_likes;" json:"-"`
	Comments   []Comment       `gorm:"foreignKey:PostID" json:"-"`
	Categories []Category      `gorm:"many2many:post_categories;" json:"-"`
}
