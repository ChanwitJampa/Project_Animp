package main

import (
	_ "fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// database handle
type AnimapHandler struct {
	DB *gorm.DB
}

func main() {
	r := setupRouter()
	r.Run()
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	h := AnimapHandler{}
	h.Initialize()

	//account API
	r.GET("/accounts", h.GetAllAccounts)
	r.GET("/accounts/:id", h.GetAccount)
	r.POST("/accounts", h.SaveAccount)
	r.PUT("/accounts/:id", h.UpdateAccount)
	r.DELETE("/accounts/:id", h.DeleteAccount)

	//studio API
	r.GET("/studioes", h.GetAllStudioes)
	r.GET("/studioes/:id", h.GetStudio)

	return r

}

// initializer
func (h *AnimapHandler) Initialize() {
	dsn := "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	h.DB = db
}

// accounts Table
type Account struct {
	Id   int    `db:"accounts_id" json:"accounts_id"`
	Name string `db:"accounts_name" json:"accounts_name"`
	User string `db:"accounts_user" json:"accounts_user"`
	Pwd  string `db:"accounts_pwd" json:"accounts_pwd"`
}

// get all accounts
func (h *AnimapHandler) GetAllAccounts(c *gin.Context) {
	accounts := []Account{}
	rows, err := h.DB.Model(&Account{}).Select("accounts_id, accounts_name, accounts_user, accounts_pwd").Rows()
	defer rows.Close()

	for rows.Next() {
		var a Account
		err = rows.Scan(&a.Id, &a.Name, &a.User, &a.Pwd)
		if err != nil {
			log.Fatal(err)
		}
		accounts = append(accounts, a)
	}
	c.JSON(http.StatusOK, accounts)
}

// get account using accounts_id
func (h *AnimapHandler) GetAccount(c *gin.Context) {
	id := c.Param("id")
	account := Account{}
	row := h.DB.Table("accounts").Where("accounts_id = ?", &id).Select("accounts_id", "accounts_name", "accounts_user", "accounts_pwd").Row()
	if err := row.Err(); err != nil {
		log.Fatal(err)
	}
	row.Scan(&account.Id, &account.Name, &account.User, &account.Pwd)

	c.JSON(http.StatusOK, account)

}

// create account receive json -> accounts_name, accounts_user, accounts_pwd
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

// update account using id in path parameter and receive json -> accounts_name, accounts_user, accounts_pwd
func (h *AnimapHandler) UpdateAccount(c *gin.Context) {
	id := c.Param("id")
	account := Account{}
	row := h.DB.Table("accounts").Where("accounts_id = ?", &id).Select("accounts_id", "accounts_name", "accounts_user", "accounts_pwd").Row()
	if err := row.Err(); err != nil {
		c.Status(http.StatusNotFound)
		return
	}
	row.Scan(&account.Id, &account.Name, &account.User, &account.Pwd)

	var newAccount = Account{}
	if err := c.BindJSON(&newAccount); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if newAccount.Name != "" {
		account.Name = newAccount.Name
	}
	if newAccount.User != "" {
		account.User = newAccount.User
	}
	if newAccount.Pwd != "" {
		account.Pwd = newAccount.Pwd
	}
	if err := h.DB.Exec("UPDATE `accounts` SET `accounts_name` = ? ,`accounts_user` = ? ,`accounts_pwd` = ? WHERE `accounts_id` = ?;", account.Name, account.User, account.Pwd, id).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, "update success")

}

// delete account using id
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

// studioes Table
type Studio struct {
	Id          int    `db:"studioes_id" json:"studioes_id"`
	Name        string `db:"studioes_name" json:"studioes_name"`
	Logo        string `db:"studioes_logo" json:"studioes_logo"`
	Established string `db:"studioes_established" json:"studioes_established"`
	Description string `db:"studioes_description" json:"studioes_description"`
	Image       string `db:"studioes_image" json:"studioes_image"`
}

// get all studioes
func (h *AnimapHandler) GetAllStudioes(c *gin.Context) {
	studioes := []Studio{}
	rows, err := h.DB.Raw("SELECT studioes_id, studioes_name, studioes_logo, studioes_established, studioes_description, studioes_image FROM studioes").Rows()
	defer rows.Close()

	for rows.Next() {
		var s Studio
		err = rows.Scan(&s.Id, &s.Name, &s.Logo, &s.Established, &s.Description, &s.Image)
		if err != nil {
			log.Fatal(err)
		}
		studioes = append(studioes, s)
	}

	c.JSON(http.StatusOK, studioes)
}

// get studio using studioes_id
func (h *AnimapHandler) GetStudio(c *gin.Context) {
	id := c.Param("id")
	s := Studio{}
	row := h.DB.Table("studioes").Where("studioes_id = ?", &id).Select("studioes_id", "studioes_name", "studioes_logo", "studioes_established", "studioes_description", "studioes_image").Row()
	if err := row.Err(); err != nil {
		log.Fatal(err)
	}
	row.Scan(&s.Id, &s.Name, &s.Logo, &s.Established, &s.Description, &s.Image)

	c.JSON(http.StatusOK, s)

}

// animes Table
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
