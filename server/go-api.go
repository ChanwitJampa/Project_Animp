package main

import (
	"database/sql"
	_ "fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Account struct {
	Id   string `db:"accounts_id" json:"accounts_id"`
	Name string `db:"accounts_name" json:"accounts_name"`
	User string `db:"accounts_user" json:"accounts_user"`
	Pwd  string `db:"accounts_pwd" json:"accounts_pwd"`
}

// var accounts = []Account{
// 	{ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
// 	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
// 	{ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
// }

var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("mysql", "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb")
	if err != nil {
		panic(err)
	}

	// See "Important settings" section.
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	router := gin.Default()
	router.GET("/accounts", getAccounts)

	router.Run("localhost:8080")
}

// getAccounts responds with the list of all Accounts as JSON.
func getAccounts(c *gin.Context) {
	var accounts []Account
	rows, err := db.Query("select accounts_id, accounts_name, accounts_user, accounts_pwd from accounts")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		var a Account
		err := rows.Scan(&a.Id, &a.Name, &a.User, &a.Pwd)
		if err != nil {
			log.Fatal(err)
		}
		// log.Println(id, name, user, pwd)
		accounts = append(accounts, a)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	c.IndentedJSON(http.StatusOK, accounts)
}
