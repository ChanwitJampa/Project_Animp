package models

type Wallet struct {
	ID      int     `json:"id"`
	Amount  float64 `json:"amount"`
	User_Id int     `json:"user_id"`
	Status  string  `json:"wallets_status"`
}
