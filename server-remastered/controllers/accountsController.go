package controllers

import (
	_ "animemap/api/initializers"
	"animemap/api/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	// get the emal/pass off req body
	var body struct {
		Name     string
		Username string
		Password string
		Role     string
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash Password",
		})

		return
	}

	//create the account

	var a = models.Account{Name: body.Name, User: body.Username, Pwd: string(hash), Role: body.Role}
	if a.Role == "" {
		a.Role = "user"
	}

	if err := initializers.db.Exec("insert into animemapdb.accounts (`accounts_name`, `accounts_user`, `accounts_pwd`, `accounts_role`) VALUES (?, ?, ?, ?)", a.Name, a.User, a.Pwd, a.Role).Error; err != nil {
		c.Status(http.StatusBadRequest, gin.H{
			"error": "Failed to create account",
		})
		return
	}

	//respone
	c.JSON(http.StatusOK, gin.H{})
}
