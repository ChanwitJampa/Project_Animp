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
	Accounts_id   int    `db:"accounts_id" json:"accounts_id"`
	Accounts_name string `db:"accounts_name" json:"accounts_name"`
	Accounts_user string `db:"accounts_user" json:"accounts_user"`
	Accounts_pwd  string `db:"accounts_pwd" json:"accounts_pwd"`
}

type Anime struct {
	Id        int    `db:"animes_id" json:"animes_id"`
	Name      string `db:"animes_name" json:"animes_name"`
	Name_TH   string `db:"animes_nameTH" json:"animes_nameTH"`
	Year      string `db:"animes_year" json:"animes_year"`
	Studioes  []Studio
	Trailer   string  `db:"animes_trailer" json:"animes_trailer"`
	Episodes  int     `db:"animes_episodes" json:"animes_episodes"`
	Fix_score float64 `db:"animes_score" json:"animes_score"`
	Score     float64
	Image     string `db:"animes_image" json:"animes_image"`
	Seasonal  string `db:"animes_seasonal" json:"animes_seasonal"`
	Content   string `db:"animes_content" json:"animes_content"`
	Wallpaper string `db:"animes_wallpaper" json:"animes_wallpaper"`
	Duration  string `db:"animes_duration" json:"animes_duration"`
	Streaming string `db:"animes_streaming" json:"animes_streaming"`
}

type Studio struct {
	Id          int    `db:"studioes_id" json:"studioes_id"`
	Name        string `db:"studioes_name" json:"studioes_name"`
	Logo        string `db:"studioes_logo" json:"studioes_logo"`
	Established string `db:"studioes_established" json:"studioes_established"`
	Description string `db:"studioes_description" json:"studioes_description"`
	Image       string `db:"studioes_image" json:"studioes_image"`
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
	r.DELETE("/accounts/:id", h.DeleteAccount)

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
	var a = Account{}
	if err := c.BindJSON(&a); err != nil {
		return
	}

	if err := h.DB.Create(&a).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, "insert success")

}

func (h *AnimapHandler) DeleteAccount(c *gin.Context) {
	id := c.Param("id")
	account := Account{}

	if err := h.DB.Find(&account, id).Error; err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	if err := h.DB.Exec("DELETE FROM accounts WHERE accounts_id = ?", id).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, "delete success")
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
