package main

import (
	_ "AnimapDB/api/models"
	"database/sql"
	"time"

	"github.com/gin-gonic/gin"
)

var db *sql.DB
var accountServices models

func main() {
	var err error
	db, err = sql.Open("mysql", "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb")
	if err != nil {
		panic(err)
	}

	// See "Important settings" section.
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	router := gin.Default()
	router.GET("/accounts", models.)

	router.Run("localhost:8080")
}
