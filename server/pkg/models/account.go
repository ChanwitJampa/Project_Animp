package models

import (
	"animapDB/api/pkg/config"

	"github.com/jinzhu/gorm"
)

var db *gorm.DB

type Account struct {
	gorm.Model
	Name string `db:"accounts_name" json:"accounts_name"`
	User string `db:"accounts_user" json:"accounts_user"`
	Pwd  string `db:"accounts_pwd" json:"accounts_pwd"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Account{})
}

func (a *Account) CreateAccount() *Account {
	db.NewRecord(a)
	db.Create(&a)
	return a
}
func GetAllAccounts() []Account {
	var Accounts []Account
	db.Find(&Accounts)
	return Accounts
}

func GetAccountById(Id int64) (*Account, *gorm.DB) {
	var getAccount Account
	db := db.Where("accounts_id=?", Id).Find(&getAccount)
	return &getAccount, db
}

func DeleteAccount(Id int64) Account {
	var account Account
	db.Where("accounts_id=?", Id).Delete(account)
	return account
}
