package main

import (
	_ "fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Account struct {
	Accounts_id   string `db:"accounts_id" json:"accounts_id"`
	Accounts_name string `db:"accounts_name" json:"accounts_name"`
	Accounts_user string `db:"accounts_user" json:"accounts_user"`
	Accounts_pwd  string `db:"accounts_pwd" json:"accounts_pwd"`
}

type AnimapHandler struct {
	DB *gorm.DB
}

// var db *sql.DB

func main() {
	// var err error
	// db, err = sql.Open("mysql", "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb")
	// if err != nil {
	// 	panic(err)
	// }

	// // See "Important settings" section.
	// db.SetConnMaxLifetime(time.Minute * 3)
	// db.SetMaxOpenConns(10)
	// db.SetMaxIdleConns(10)

	// router := gin.Default()
	// router.GET("/accounts", getAccounts)
	// router.GET("/account", createAccount)

	// router.Run("localhost:8080")

	r := setupRouter()
	r.Run()
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	h := AnimapHandler{}
	h.Initialize()

	r.GET("/accounts", h.GetAllAccounts)
	r.GET("/accounts/:id", h.GetAccount)
	r.POST("/accounts", h.SaveAccount)
	// r.PUT("/accounts/:id", h.UpdateAccount)
	// r.DELETE("/accounts/:id", h.DeleteAccount)

	return r

}

func (h *AnimapHandler) Initialize() {
	// db, err := gorm.Open("mysql", "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb")
	dsn := "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	// db.AutoMigrate(&Account{})

	h.DB = db
}

func (h *AnimapHandler) GetAllAccounts(c *gin.Context) {
	accounts := []Account{}
	// h.DB.Raw("SELECT accounts_id, accounts_name, accounts_user, accounts_pwd FROM animemapdb.accounts;").Scan(&accounts)
	rows, err := h.DB.Model(&Account{}).Select("accounts_id, accounts_name, accounts_user, accounts_pwd").Rows()
	defer rows.Close()

	for rows.Next() {
		var a Account
		err = rows.Scan(&a.Accounts_id, &a.Accounts_name, &a.Accounts_user, &a.Accounts_pwd)
		if err != nil {
			log.Fatal(err)
		}
		accounts = append(accounts, a)
		// do something
	}
	c.JSON(http.StatusOK, accounts)
}

func (h *AnimapHandler) GetAccount(c *gin.Context) {
	id := c.Param("id")
	account := Account{}
	row := h.DB.Table("accounts").Where("accounts_id = ?", &id).Select("accounts_id", "accounts_name", "accounts_user", "accounts_pwd").Row()
	row.Scan(&account.Accounts_id, &account.Accounts_name, &account.Accounts_user, &account.Accounts_pwd)
	c.JSON(http.StatusOK, account)

}

func (h *AnimapHandler) SaveAccount(c *gin.Context) {
	account := Account{}

	if err := c.ShouldBindJSON(&account); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if err := h.DB.Create(&account).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, account)

}

// // getAccounts responds with the list of all Accounts as JSON.
// func getAccounts(c *gin.Context) {
// 	var accounts []Account
// 	rows, err := db.Query("select accounts_id, accounts_name, accounts_user, accounts_pwd from accounts")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer rows.Close()
// 	for rows.Next() {
// 		var a Account
// 		err := rows.Scan(&a.Id, &a.Name, &a.User, &a.Pwd)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		// log.Println(id, name, user, pwd)
// 		accounts = append(accounts, a)
// 	}
// 	err = rows.Err()
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	c.IndentedJSON(http.StatusOK, accounts)
// }

// // create
// func createAccount(c *gin.Context) {
// 	Name := "plaitest"
// 	User := Name
// 	Pwd := Name
// 	rows, err := db.Query("INSERT INTO animemapdb.accounts (`accounts_name` ,`accounts_user` ,`accounts_pwd`) VALUES (? ,? ,?);", Name, User, Pwd)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer rows.Close()
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	err = rows.Err()
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	c.IndentedJSON(http.StatusOK, "insert success")
// }
