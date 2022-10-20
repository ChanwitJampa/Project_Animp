package controllers

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"testAPI/initializers"
	"testAPI/models"

	"github.com/gin-gonic/gin"
)

func Earn(c *gin.Context, wallet models.Wallet) {
	if err := initializers.DB.Exec("INSERT INTO wallets (`id`, `amount`, `user_id`, `wallets_status`) VALUES ( ? , ? , ? , ? )", wallet.ID, wallet.Amount, wallet.User_Id, wallet.Status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, "Success TopUp")
}

func Discount(c *gin.Context) {
	body := models.Wallet{}
	body.Status = "discount"
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	if checkAmount(body.User_Id) < int(body.Amount) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Cannot discount",
		})
		return
	}

	if err := initializers.DB.Exec("INSERT INTO wallets (`id`, `amount`, `user_id`, `wallets_status`) VALUES ( ? , ? , ? , ? )", body.ID, body.Amount, body.User_Id, body.Status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, "Success Discount")
}

func checkAmount(user_id int) int {
	var earn int
	row := initializers.DB.Raw("SELECT sum(amount) from animemapmaster.wallets WHERE user_id = ? AND wallets_status = 'earn'", user_id).Row()
	if err := row.Err(); err != nil {
		log.Fatal(err)
	}

	row.Scan(&earn)

	var discount int
	row = initializers.DB.Raw("SELECT sum(amount) from animemapmaster.wallets WHERE user_id = ? AND wallets_status = 'discount'", user_id).Row()
	if err := row.Err(); err != nil {
		log.Fatal(err)
	}
	row.Scan(&discount)

	total := earn - discount
	fmt.Println("total: earn - discount")
	fmt.Println(total, " ", earn, " ", discount)

	return total
}

func MyCoin(c *gin.Context) {
	id := c.Param("id")
	ID, err := strconv.Atoi(id)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("ID: ", ID)
	amount := checkAmount(ID)

	c.JSON(http.StatusOK, amount)
}
