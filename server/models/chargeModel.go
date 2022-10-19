package models

// ChargeJSON incoming data for Stripe API
type ChargeJSON struct {
	User_id      int    `json:"user_id"`
	TokenId      string `json:"TokenId"`
	Amount       int64  `json:"amount"`
	ReceiptEmail string `json:"receiptEmail"`
	Number       string `json:"number"`
	ExpMonth     string `json:"expMonth"`
	ExpYear      string `json:"expYear"`
	CVC          string `json:"CVC"`
}
