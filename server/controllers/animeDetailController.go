package controllers

import (
	"net/http"
	"testAPI/initializers"
	"testAPI/models"

	"github.com/gin-gonic/gin"
)

// get count users using animes_id
func GetCountUsersByAnimesId(c *gin.Context) {
	id := c.Param("id")
	var count int

	if err := initializers.DB.Raw("select count(animeDetails_id) from animemapdb.animedetails").Where("animeDetails_animes_id = ? ", id).Scan(&count).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}
	// c.JSON(http.StatusOK, gin.H{
	// 	"message": count,
	// })
	c.JSON(http.StatusOK, count)
}

// get animes using user.ID
func GetAnimesByUsersId(c *gin.Context) {
	id := c.Param("id")
	animeList := []models.Anime{}
	rows, err := initializers.DB.Raw("SELECT `animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming` FROM animemapmaster.animes as A right join animemapmaster.animedetails as D on A.animes_id = D.animeDetails_animes_id WHERE animeDetails_users_id = ? ", id).Rows()
	defer rows.Close()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	for rows.Next() {
		var anime models.Anime
		err = rows.Scan(&anime.Id, &anime.Name, &anime.Name_TH, &anime.Trailer, &anime.Episodes, &anime.Score, &anime.Image, &anime.Seasonal, &anime.Year, &anime.Content, &anime.Wallpaper,
			&anime.Duration, &anime.Studio, &anime.Streaming)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err,
			})
			return
		}
		animeList = append(animeList, anime)
	}
	// c.JSON(http.StatusOK, gin.H{
	// 	"message": animeList,
	// })
	c.JSON(http.StatusOK, animeList)
}

// create animeDetails receive json -> animes_id, user.ID, watchYear, score
func CreateAnimeDetail(c *gin.Context) {
	var animeDetail = models.AnimeDetail{}
	if err := c.BindJSON(&animeDetail); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}
	// fmt.Println(animeDetail)
	if err := initializers.DB.Exec("INSERT INTO animemapmaster.animedetails (`animeDetails_animes_id`, `animeDetails_users_id`, `animedetails_watchYear`, `animedetails_score`) VALUES ( ? , ? , ? , ?)", animeDetail.Anime_id, animeDetail.User_id, animeDetail.WatchYear, animeDetail.Score).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Create animeDetail success",
	})
}

// update animeDetails using id in path parameter and receive json -> animes_id, user.ID
func UpdateAnimeDetail(c *gin.Context) {
	id := c.Param("id")
	animeDetail := models.AnimeDetail{}
	row := initializers.DB.Table("animedetails").Where("animeDetails_id = ?", id).Select("animeDetails_id", "animeDetails_users_id", "animeDetails_animes_id").Row()
	if err := row.Err(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}
	row.Scan(&animeDetail.Id, &animeDetail.User_id, &animeDetail.Anime_id)

	var newAnimeDetails = models.AnimeDetail{}
	if err := c.BindJSON(&newAnimeDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	if newAnimeDetails.User_id != animeDetail.User_id {
		animeDetail.User_id = newAnimeDetails.User_id
	}
	if newAnimeDetails.Anime_id != animeDetail.Anime_id {
		animeDetail.Anime_id = newAnimeDetails.Anime_id
	}

	if err := initializers.DB.Exec("UPDATE `animedetails` SET `animeDetails_animes_id` = ? ,`animeDetails_users_id` = ? WHERE `animeDetails_id` = ?;", animeDetail.Anime_id, animeDetail.User_id, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Update animeDetail success",
	})
}
