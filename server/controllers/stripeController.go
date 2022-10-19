package controllers

import (
	"fmt"
	"net/http"
	"os"
	"testAPI/initializers"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v73"
	"github.com/stripe/stripe-go/v73/charge"
)

// ChargeJSON incoming data for Stripe API
type ChargeJSON struct {
	Amount       int64  `json:"amount"`
	ReceiptEmail string `json:"receiptEmail"`
}

func Charges(c *gin.Context) {
	// we will bind our JSON body to the `json` var
	var json ChargeJSON
	c.BindJSON(&json)

	// Set Stripe API key
	apiKey := os.Getenv("SK_TEST_KEY")
	stripe.Key = apiKey

	// Attempt to make the charge.
	// We are setting the charge response to _
	// as we are not using it.
	response, err := charge.New(&stripe.ChargeParams{
		Amount:       stripe.Int64(json.Amount),
		Currency:     stripe.String(string(stripe.CurrencyUSD)),
		Source:       &stripe.PaymentSourceSourceParams{Token: stripe.String("tok_visa")}, // this should come from clientside
		ReceiptEmail: stripe.String(json.ReceiptEmail)})
	fmt.Println()
	if err != nil {
		// Handle any errors from attempt to charge
		c.JSON(http.StatusBadRequest, err)
		return
	}

	type toJSON struct {
		ID     string `json:"ID"`
		Status string `json:"Status"`
	}
	// send := toJSON{ID: response.ID, Status: string(response.Status)}
	StorePayment(c, response)
	// c.JSON(http.StatusCreated, send)
}

func StorePayment(c *gin.Context, response *stripe.Charge) {

	if err := initializers.DB.Exec("INSERT INTO donates (`donates_stripe_id`, `donates_status`, `donates_amount`) VALUES ( ? , ? , ? )", response.ID, response.Status, response.Amount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully charged",
	})
}
