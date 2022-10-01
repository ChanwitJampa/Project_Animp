package routes

import (
	"animapDB/api/pkg/controllers"

	"github.com/gorilla/mux"
)

var RegisterAccountRoutes = func(router *mux.Router) {
	router.HandleFunc("/account/", controllers.GetAccount).Methods("GET")
	router.HandleFunc("/account/", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/account/{account_id}", controllers.GetAccountById).Methods("GET")
	router.HandleFunc("/account/{account_id}", controllers.UpdateAccount).Methods("PUT")
	router.HandleFunc("/account/{account_id}", controllers.DeleteAccount).Methods("DELETE")

}
