package main

import (
	"animemap/api/controllers"
	"animemap/api/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
}

func main() {
	r := gin.Default()
	r.POST("signup", controllers.Signup())

	r.Run()
}
