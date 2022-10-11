package models

type Account struct {
	Id   int    `db:"accounts_id" json:"accounts_id"`
	Name string `db:"accounts_name" json:"accounts_name"`
	User string `db:"accounts_user" json:"accounts_user"`
	Pwd  string `db:"accounts_pwd" json:"accounts_pwd"`
	Role string `db:"accounts_role" json:"accounts_role"`
}
