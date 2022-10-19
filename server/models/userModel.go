package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email string `gorm:"unique"`
	Pwd   string
	Role  string
	Name  string
}
