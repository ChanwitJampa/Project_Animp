package controllers

import (
	"net/http"
	"testAPI/initializers"
	"testAPI/models"

	"github.com/gin-gonic/gin"
)

// get animeDetails using user.ID
func GetAnimeDetailsByUsersId(c *gin.Context) {
	id := c.Param("id")
	animeDetailList := []models.AnimeDetailMore{}
	rows, err := initializers.DB.Raw("SELECT `animes_id`, `animes_name`, `animes_nameTH`, `animes_trailer`, `animes_episodes`, `animes_score`, `animes_image`, `animes_seasonal`, `animes_year`, `animes_content`, `animes_wallpaper`, `animes_duration`, `animes_studioes`, `animes_streaming`, `animedetails_score`, `animedetails_watchYear` FROM animemapmaster.animes as A right join animemapmaster.animedetails as D on A.animes_id = D.animeDetails_animes_id WHERE animeDetails_users_id = ? ", id).Rows()
	defer rows.Close()
	for rows.Next() {
		var animeDetail models.AnimeDetailMore
		err = rows.Scan(&animeDetail.Anime.Id, &animeDetail.Anime.Name, &animeDetail.Anime.Name_TH, &animeDetail.Anime.Trailer, &animeDetail.Anime.Episodes, &animeDetail.Anime.Score, &animeDetail.Anime.Image, &animeDetail.Anime.Seasonal, &animeDetail.Anime.Year, &animeDetail.Anime.Content, &animeDetail.Anime.Wallpaper,
			&animeDetail.Anime.Duration, &animeDetail.Anime.Studio, &animeDetail.Anime.Streaming, &animeDetail.Score, &animeDetail.WatchYear)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": err,
			})
		}
		animeDetailList = append(animeDetailList, animeDetail)
	}
	// c.JSON(http.StatusOK, gin.H{
	// 	"message": animeDetailList,
	// })
	c.JSON(http.StatusOK, animeDetailList)
}
