package controllers

import (
	"log"
	"net/http"
	"testAPI/initializers"
	"testAPI/models"

	"github.com/gin-gonic/gin"
)

func Earn(c *gin.Context, wallet models.Wallet) {
	if err := initializers.DB.Exec("INSERT INTO wallets (`id`, `amount`, `user_id`, `status`) VALUES ( ? , ? , ? , ? )", wallet.ID, wallet.Amount, wallet.User_Id, wallet.Status).Error; err != nil {
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
	}

	if checkAmount(body.User_Id) < int(body.Amount) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Cannot discount",
		})
	}

	if err := initializers.DB.Exec("INSERT INTO wallets (`id`, `amount`, `user_id`, `status`) VALUES ( ? , ? , ? , ? )", body.ID, body.Amount, body.User_Id, body.Status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(http.StatusOK, "Success Discount")
}

func checkAmount(user_id int) int {
	var amount int
	row := initializers.DB.Exec("select earn.user_id, (earn - discount) as amount from ((select user_id, sum(amount) as earn from animemapmaster.wallets where user_id = ? and status = 'earn') as earn left join (select user_id, sum(amount) as discount from animemapmaster.wallets where user_id = ? and status = 'discount') as dis on dis.user_id = earn.user_id)", user_id, user_id).Row()
	if err := row.Err(); err != nil {
		log.Fatal(err)
	}
	row.Scan(&amount)

	return amount
}
