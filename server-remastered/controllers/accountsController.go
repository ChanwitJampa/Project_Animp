package controllers

import (
	"animemap/api/initializers"
	"animemap/api/models"
	"fmt"
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
		c.JSON(http.StatusBadRequest, "Failed to read body")

		return
	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	fmt.Println(string(hash))

	if err != nil {
		c.JSON(http.StatusBadRequest, "Failed to hash Password")

		return
	}

	//create the account

	var a = models.Account{Name: body.Name, User: body.Username, Pwd: string(hash), Role: body.Role}
	fmt.Println(a.Pwd)
	if a.Role == "" {
		a.Role = "user"
	}
	// id := c.Param("id")
	// id := '1'
	// account := models.Account{}
	fmt.Println("Hello")
	var user string
	if row := initializers.DB.Exec("select accounts_user from animemapdb.accounts where accounts_id = 1").Scan(&user); row != nil {
		fmt.Println(user)
	}

	// if err := row.Err(); err != nil {
	// 	c.JSON(http.StatusBadRequest, "Failed to query")
	// 	return
	// }
	// row.Scan(&account.Id, &account.Name, &account.User, &account.Pwd, &account.Role)

	// c.JSON(http.StatusOK, account)
	// if err := initializers.DB.Exec("INSERT INTO `animemapdb`.`accounts` (`accounts_name`, `accounts_user`, `accounts_pwd`) VALUES (?, ?, ?, ?)", a.Name, a.User, a.Pwd, a.Role).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{
	// 		"error": "Failed to create account",
	// 	})
	// 	return
	// }

	//respone
	c.JSON(http.StatusOK, gin.H{})
}
