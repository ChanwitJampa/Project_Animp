package controllers

import (
	"animapDB/api/pkg/models"
	"animapDB/api/pkg/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

var NewAccount models.Account

func GetAccount(w http.ResponseWriter, r *http.Request) {
	newAccounts := models.GetAllAccounts()
	res, _ := json.Marshal(newAccounts)
	w.Header().Set("Content-Type", "pkglication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetAccountById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	account_id := vars["accounts_id"]
	Id, err := strconv.ParseInt(account_id, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	accountDetails, _ := models.GetAccountById(Id)
	res, _ := json.Marshal(accountDetails)
	w.Header().Set("Content-Type", "pkglication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func CreateAccount(w http.ResponseWriter, r *http.Request) {
	CreateAccount := &models.Account{}
	utils.ParseBody(r, CreateAccount)
	a := CreateAccount.CreateAccount()
	res, _ := json.Marshal(a)
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteAccount(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	account_id := vars["accounts_id"]
	Id, err := strconv.ParseInt(account_id, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	account := models.DeleteAccount(Id)
	res, _ := json.Marshal(account)
	w.Header().Set("Content-Type", "pkglication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func UpdateAccount(w http.ResponseWriter, r *http.Request) {
	var updateAccount = &models.Account{}
	vars := mux.Vars(r)
	account_id := vars["accounts_id"]
	Id, err := strconv.ParseInt(account_id, 0, 0)
	if err != nil {
		fmt.Println("error while parsing")
	}
	accountDetails, db := models.GetAccountById(Id)
	if updateAccount.Name != "" {
		accountDetails.Name = updateAccount.Name
	}
	if updateAccount.User != "" {
		accountDetails.User = updateAccount.User
	}
	if updateAccount.Pwd != "" {
		accountDetails.Pwd = updateAccount.Pwd
	}
	db.Save(&accountDetails)
	res, _ := json.Marshal(accountDetails)
	w.Header().Set("Content-Type", "pkglication/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
