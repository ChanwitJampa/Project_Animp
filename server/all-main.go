package main

import (
	_ "fmt"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
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
	r.Use(cors.Default())

	// account API
	accounts := r.Group("/accounts")
	{
		accounts.GET("", h.GetAllAccounts)
		accounts.GET("/:id", h.GetAccount)
		accounts.POST("", h.SaveAccount)
		accounts.PUT("/:id", h.UpdateAccount)
		accounts.DELETE("/:id", h.DeleteAccount)
	}

	// studio API
	r.GET("/studioes", h.GetAllStudioes)
	r.GET("/studioes/:id", h.GetStudio)

	// anime API
	r.GET("/animes", h.GetAllAnimes)
	r.GET("/animes/:id", h.GetAnime)

	// tag API
	tags := r.Group("/tags")
	{
		tags.GET("", h.GetAllTags)
		tags.GET("/:id", h.GetTag)
		tags.POST("", h.SaveTag)
		tags.PUT("/:id", h.UpdateTag)
		tags.DELETE("/:id", h.DeleteTag)
	}

	// tagDetails API
	tagDetails := r.Group("/tagsDetails")
	{
		tagDetails.GET("/animes/:id", h.GetAnimesByTagId)
		tagDetails.GET("/tags/:id", h.GetTagsByAnimesId)
	}

	// animeDetails API
	animeDetails := r.Group("/animeDetails")
	{
		animeDetails.GET("/count/:id", h.GetCountAccountsByAnimesId)
		animeDetails.GET("/account/:id", h.GetAnimesByAccountsId)
	}

	r.Run(":5000")
	return r

}

// initializer
func (h *AnimapHandler) Initialize() {
	dsn := "adminPlai:@6220504801plai@tcp(20.194.171.207:3306)/animemapdb?charset=utf8&parseTime=True&loc=Local"
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

// studioDetails Table
type studioDetail struct {
	Id     int `db:"studioDetails_id" json:"studioDetails_id"`
	Anime  int `db:"studioDetails_animes_id" json:"studioDetails_animes_id"`
	Studio int `db:"studioDetails_studioes_id" json:"studioDetails_studioes_id"`
}

// animes Table
type Anime struct {
	Id        int    `db:"animes_id" json:"animes_id"`
	Name      string `db:"animes_name" json:"animes_name"`
	Name_TH   string `db:"animes_nameTH" json:"animes_nameTH"`
	Year      string `db:"animes_year" json:"animes_year"`
	Studioes  []Studio
	Studio    string  `db:"animes_studio json:"animes_studio"`
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

// get all animes (temp)
func (h *AnimapHandler) GetAllAnimes(c *gin.Context) {
	animes := []Anime{}
	rows, err := h.DB.Raw("SELECT `animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming` FROM `animes`").Rows()
	defer rows.Close()

	for rows.Next() {
		var anime Anime
		err = rows.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Fix_score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
			&anime.Duration, &anime.Studio, &anime.Streaming)
		if err != nil {
			log.Fatal(err)
		}
		animes = append(animes, anime)
	}

	c.JSON(http.StatusOK, animes)
}

// get anime using animes_id (temp)
func (h *AnimapHandler) GetAnime(c *gin.Context) {
	id := c.Param("id")
	anime := Anime{}
	row := h.DB.Raw("SELECT `animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming` FROM `animes`").Where("animes_id = ? ", id).Row()
	if err := row.Err(); err != nil {
		log.Fatal(err)
	}
	row.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Fix_score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
		&anime.Duration, &anime.Studio, &anime.Streaming)

	c.JSON(http.StatusOK, anime)
}

// tag Table
type Tag struct {
	Id              int    `db:"tags_id" json:"tags_id"`
	Name            string `db:"tags_name" json:"tags_name"`
	Universe_status bool   `db:"tags_universe_status" json:"tags_universe_status"`
	Wallpaper       string `db:"tags_wallpaper" json:"tags_wallpaper"`
}

// get all tags
func (h *AnimapHandler) GetAllTags(c *gin.Context) {
	tags := []Tag{}
	rows, err := h.DB.Raw("SELECT `tags_id`, `tags_name`, `tags_universe_status`, `tags_wallpaper` FROM `tags`").Rows()
	defer rows.Close()

	for rows.Next() {
		var t Tag
		err = rows.Scan(&t.Id, &t.Name, &t.Universe_status, &t.Wallpaper)
		if err != nil {
			log.Fatal(err)
		}
		tags = append(tags, t)
	}

	c.JSON(http.StatusOK, tags)
}

// get tag using tags_id
func (h *AnimapHandler) GetTag(c *gin.Context) {
	id := c.Param("id")
	t := Tag{}
	row := h.DB.Table("tags").Where("tags_id = ? ", &id).Select("tags_id", "tags_name", "tags_universe_status", "tags_wallpaper").Row()
	if err := row.Err(); err != nil {
		log.Fatal(err)
	}
	row.Scan(&t.Id, &t.Name, &t.Universe_status, &t.Wallpaper)

	c.JSON(http.StatusOK, t)

}

// create tag receive json -> tags_name, tags_universe_status, tags_wallpaper
func (h *AnimapHandler) SaveTag(c *gin.Context) {
	var t = Tag{}
	if err := c.BindJSON(&t); err != nil {
		return
	}

	if err := h.DB.Create(&t).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, "insert success")

}

// update tag using id in path parameter and receive json -> tags_name, tags_universe_status, tags_wallpaper
func (h *AnimapHandler) UpdateTag(c *gin.Context) {
	id := c.Param("id")
	tag := Tag{}
	row := h.DB.Table("tags").Where("tags_id = ?", &id).Select("tags_id", "tags_name", "tags_universe_status", "tags_wallpaper").Row()
	if err := row.Err(); err != nil {
		c.Status(http.StatusNotFound)
		return
	}
	row.Scan(&tag.Id, &tag.Name, &tag.Universe_status, &tag.Wallpaper)

	var newTag = Tag{}
	if err := c.BindJSON(&newTag); err != nil {
		c.Status(http.StatusBadRequest)
		return
	}

	if newTag.Name != "" {
		tag.Name = newTag.Name
	}
	if newTag.Universe_status != tag.Universe_status {
		tag.Universe_status = newTag.Universe_status
	}
	if newTag.Wallpaper != "" {
		tag.Wallpaper = newTag.Wallpaper
	}
	if err := h.DB.Exec("UPDATE `tags` SET `tags_name` = ? ,`tags_universe_status` = ? ,`tags_wallpaper` = ? WHERE `tags_id` = ?;", tag.Name, tag.Universe_status, tag.Wallpaper, id).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, "update success")

}

// delete tag using id
func (h *AnimapHandler) DeleteTag(c *gin.Context) {
	id := c.Param("id")

	if err := h.DB.Raw("SELECT `tags_id`, `tags_name`, `tags_universe_status`, `tags_wallpaper` FROM `tags`;").Error; err != nil {
		c.Status(http.StatusNotFound)
		return
	}

	if err := h.DB.Exec("DELETE FROM tags WHERE tags_id = ? ", &id).Error; err != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, "delete success")
}

// tagDetails Table
// get all animes using tags_id
func (h *AnimapHandler) GetAnimesByTagId(c *gin.Context) {
	id := c.Param("id")
	animes := []Anime{}
	rows, err := h.DB.Raw("SELECT `animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming` FROM animemapdb.animes as A right join animemapdb.tagdetails as T on A.animes_id = T.tagDetails_animes_id ").Where("animes_id = ? ", &id).Rows()
	defer rows.Close()

	for rows.Next() {
		var anime Anime
		err = rows.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Fix_score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
			&anime.Duration, &anime.Studio, &anime.Streaming)
		if err != nil {
			log.Fatal(err)
		}
		animes = append(animes, anime)
	}

	c.JSON(http.StatusOK, animes)

}

// get all tags using animes_id
func (h *AnimapHandler) GetTagsByAnimesId(c *gin.Context) {
	id := c.Param("id")
	tags := []Tag{}
	rows, err := h.DB.Raw("SELECT `tags_id`, `tags_name`, `tags_universe_status`, `tags_wallpaper` FROM animemapdb.tags as T right join animemapdb.tagdetails as D on T.tags_id = D.tagDetails_tags_id").Where("tags_id = ? ", &id).Rows()
	defer rows.Close()

	for rows.Next() {
		var t Tag
		err = rows.Scan(&t.Id, &t.Name, &t.Universe_status, &t.Wallpaper)
		if err != nil {
			log.Fatal(err)
		}
		tags = append(tags, t)
	}

	c.JSON(http.StatusOK, tags)
}

// studioDetails Table
// get all animes using studioes_id
// get all studios using animes_id

// animeDetails Table
// get count accounts using animes_id
func (h *AnimapHandler) GetCountAccountsByAnimesId(c *gin.Context) {
	id := c.Param("id")
	var count int

	if err := h.DB.Raw("select count(animeDetails_id) from animemapdb.animedetails").Where("animeDetails_animes_id = ? ", &id).Scan(&count).Error; err != nil {
		log.Fatal(err)
		return
	}
	c.JSON(http.StatusOK, count)
}

// get animes using accounts_id
func (h *AnimapHandler) GetAnimesByAccountsId(c *gin.Context) {
	id := c.Param("id")
	animes := []Anime{}
	rows, err := h.DB.Raw("SELECT `animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming` FROM animemapdb.animes as A right join animemapdb.animedetails as D on A.animes_id = D.animeDetails_animes_id ").Where("animeDetails_accounts_id = ? ", &id).Rows()
	defer rows.Close()

	for rows.Next() {
		var anime Anime
		err = rows.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Fix_score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
			&anime.Duration, &anime.Studio, &anime.Streaming)
		if err != nil {
			log.Fatal(err)
		}
		animes = append(animes, anime)
	}

	c.JSON(http.StatusOK, animes)

}
