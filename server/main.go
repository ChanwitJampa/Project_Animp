package main

import (
	"os"
	"testAPI/controllers"
	"testAPI/initializers"
	"testAPI/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v73"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()

	stripe.Key = "sk_test_51LuGomLNgThWAHdr2rYAY8OgIGm99tbtttz4pc1UcsbQ5lGp7glM9HW7KmexL7sRSsQW2V8lNgphGoBg5pwoTzib004GRe8aaa"
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	// users table
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	// r.GET("/validate", middleware.RequireAuth, controllers.Validation)
	r.GET("/getAllUsers", middleware.RequireAuth, controllers.GetAllUsers)
	r.GET("/getUserById/:id", middleware.RequireAuth, controllers.GetUserById)

	// studioes table
	r.GET("/getAllStudioes", controllers.GetAllStudioes)
	r.GET("/getStudioById/:id", controllers.GetStudioById)
	r.GET("/getStudioByStudioName/:name", controllers.GetStudioByStudioName)

	// tag table
	r.GET("/getAllTags", controllers.GetAllTags)
	r.GET("/getTagById/:id", controllers.GetTagById)
	r.POST("/createTag", middleware.RequireAuth, controllers.CreateTag)
	r.PUT("/updateTag/:id", middleware.RequireAuth, controllers.UpdateTag)

	// tag detail table
	r.GET("/getAllTagDetails", controllers.GetAllTagDetails)
	r.POST("/createTagDetail", middleware.RequireAuth, controllers.CreateTagDetail)
	r.GET("/getAnimeByTag/:id", controllers.GetAnimesByTagId)
	r.GET("/getTagsByAnime/:id", controllers.GetTagsByAnimesId)

	// anime table
	r.GET("/getAllAnimes", controllers.GetAllAnimes)
	r.GET("/getAnimeById/:id", controllers.GetAnimeById)
	r.POST("/createAnime", middleware.RequireAuth, controllers.CreateAnime)

	// anime detail table
	r.GET("/countUsersByAnime/:id", controllers.GetCountUsersByAnimesId)
	r.GET("/getAnimeByUser/:id", controllers.GetAnimesByUsersId)
	r.POST("/createAnimeDetail", middleware.RequireAuth, controllers.CreateAnimeDetail)
	r.PUT("/updateAnimeDetail/:id", middleware.RequireAuth, controllers.UpdateAnimeDetail)

	// anime detail more
	r.GET("/getAnimeDetail/:id", controllers.GetAnimeDetailsByUsersId)

	// stripe
	r.POST("/api/charges", controllers.Charges)   // topup
	r.POST("/api/discount", controllers.Discount) // discount

	r.Run(os.Getenv("PORT"))
}
