package database

import (
	// "crypto/tls"
	// "crypto/x509"
	// "io/ioutil"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/purivirakarin/cvwo-assignment-2023/server/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// It loads the .env file, connects to the database, and migrates the models
func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error load .env file")
	}
	dsn := os.Getenv("DSN")
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		//		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic("Could not connect to the database")
	} else {
		log.Println("Connect successfully")
	}
	DB = database
	database.AutoMigrate(
		&models.User{},
		&models.Forum{},
		&models.Comment{},
	)
}
