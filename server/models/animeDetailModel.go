package models

type AnimeDetail struct {
	Id        int     `db:"animeDetails_id" json:"animeDetails_id"`
	Anime_id  int     `db:"animeDetails_animes_id" json:"animeDetails_animes_id"`
	User_id   int     `db:"animeDetails_users_id" json:"animeDetails_users_id"`
	WatchYear string  `db:"animedetails_watchYear" json:"animedetails_watchYear"`
	Score     float64 `db:"animedetails_score" json:"animedetails_score"`
}
