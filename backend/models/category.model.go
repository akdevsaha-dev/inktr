package models

type Category struct {
	ID    uint   `gorm:"primaryKey" json:"id"`
	Name  string `gorm:"type:varchar(40);unique;not null" json:"name"`
	Posts []Post `gorm:"many2many:post_categories" json:"posts,omitempty"`
}
