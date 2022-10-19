package controllers

import (
	"net/http"
	"testAPI/initializers"
	"testAPI/models"

	"github.com/gin-gonic/gin"
)

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
