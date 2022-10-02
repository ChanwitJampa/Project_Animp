package config

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func Connect() {
	var err error
	db, err := sql.Open("mysql", "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb")
	if err != nil {
		panic(err)
	}

	db = db

}

func GetDB() *gorm.DB {
	return db
}
