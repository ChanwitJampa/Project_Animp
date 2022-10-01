package config

import (
	"database/sql"

	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func Connect() {
	db, err := sql.Open("mysql", "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb")
	if err != nil {
		panic(err)
	}

	db = db
}

func GetDB() *gorm.DB {
	return db
}
