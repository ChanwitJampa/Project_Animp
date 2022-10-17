package models

type AnimeDetailMore struct {
	Anime     Anime   `json:anime`
	Score     float64 `json:animedetails_score`
	WatchYear string  `json:animedetails_watchYear`
}
