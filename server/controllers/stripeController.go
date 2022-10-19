package controllers

import (
	"net/http"
	"os"
	"testAPI/initializers"
	"testAPI/models"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v73"
	"github.com/stripe/stripe-go/v73/charge"
	"github.com/stripe/stripe-go/v73/token"
)

func Charges(c *gin.Context) {
	// we will bind our JSON body to the `json` var
	var json models.ChargeJSON
	if err := c.BindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}
	params := &stripe.TokenParams{
		Card: &stripe.CardParams{
			Number:   stripe.String(string(json.Number)),
			ExpMonth: stripe.String(string(json.ExpMonth)),
			ExpYear:  stripe.String(string(json.ExpYear)),
			CVC:      stripe.String(string(json.CVC)),
		},
	}
	t, err := token.New(params)

	// Set Stripe API key
	apiKey := os.Getenv("SK_TEST_KEY")
	stripe.Key = apiKey

	// Attempt to make the charge.
	// We are setting the charge response to _
	// as we are not using it.
	response, err := charge.New(&stripe.ChargeParams{
		Amount:       stripe.Int64(json.Amount),
		Currency:     stripe.String(string(stripe.CurrencyTHB)),
		Source:       &stripe.PaymentSourceSourceParams{Token: &t.ID}, // this should come from clientside
		ReceiptEmail: stripe.String(json.ReceiptEmail)})
	if err != nil {
		// Handle any errors from attempt to charge
		c.JSON(http.StatusBadRequest, err)
		return
	}

	StorePayment(c, response, json.User_id)
	wallet := models.Wallet{Amount: float64(response.Amount), User_Id: json.User_id, Status: "earn"}
	Earn(c, wallet)

	c.JSON(http.StatusOK, response)
}

func StorePayment(c *gin.Context, response *stripe.Charge, user_id int) {

	if err := initializers.DB.Exec("INSERT INTO topups (`topups_stripe_id`, `topups_status`, `topups_users_id`, `topups_amount`) VALUES ( ? , ? , ? , ? )", response.ID, response.Status, user_id, response.Amount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}
}
