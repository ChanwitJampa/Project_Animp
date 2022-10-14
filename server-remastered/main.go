package main

import (
	"animemap/api/controllers"
	"animemap/api/initializers"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/signup", controllers.Signup)
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.Run(os.Getenv("PORT"))

}
