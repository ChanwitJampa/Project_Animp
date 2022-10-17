package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"testAPI/initializers"
	"testAPI/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	// get the emal/pass off req body
	var body struct {
		Username string
		Password string
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	fmt.Println(string(hash))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})

		return
	}
	fmt.Println(hash)
	//create the account
	user := models.User{Email: body.Username, Pwd: string(hash)}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})

		return
	}

	//respone
	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	// get the email and pass req body
	var body struct {
		Username string
		Password string
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	fmt.Println(body.Username)
	fmt.Println(body.Password)

	// look up requested user
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Username)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return
	}

	// compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Pwd), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid username or password",
		})
		return
	}

	// generate a jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// sign and get the complete encode token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		log.Fatal(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	// send it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		// "token": tokenString,
	})

}

func Validation(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}

// get all users
func GetAllUsers(c *gin.Context) {
	userList := []models.User{}
	// Get all records
	result := initializers.DB.Find(&userList)
	if err := result.Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}
	// c.JSON(http.StatusOK, gin.H{
	// 	"message": userList,
	// })
	c.JSON(http.StatusOK, userList)
}

// get user using ID
func GetUserById(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	initializers.DB.First(&user, "id = ?", id)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "User not found",
		})
		return
	}
	// c.JSON(http.StatusOK, gin.H{
	// 	"message": user,
	// })
	c.JSON(http.StatusOK, user)
}
