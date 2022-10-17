package initializers

import (
	"testAPI/models"
)

func SyncDatabase() {
	// AutoMirage
	DB.AutoMigrate(&models.User{})
}
