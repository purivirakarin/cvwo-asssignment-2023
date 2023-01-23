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

// func Connect() {
// 	err := godotenv.Load()
// 	if err != nil {
// 		log.Fatal("Error load .env file")
// 	}
// 	dsn := os.Getenv("DSN")
	
// 	isTLS := false

// 	if mysqlClientKey != "" && mysqlCaCert != ""  && mysqlClientCert != "" {
// 		isTLS = true
// 		rootCertPool := x509.NewCertPool()
// 		pem, err := ioutil.ReadFile("/path/mysqlCaCert")
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		if ok := rootCertPool.AppendCertsFromPEM(pem); !ok {
// 			log.Fatal("Failed to append PEM.")
// 		}
// 		clientCert := make([]tls.Certificate, 0, 1)
// 		certs, err := tls.LoadX509KeyPair("/path/mysqlClientCert", "/path/mysqlClientKey")
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		clientCert = append(clientCert, certs)
// 		mysql.RegisterTLSConfig("custom", &tls.Config{
// 			RootCAs:      rootCertPool,
// 			Certificates: clientCert,
// 		})
// 	}

// 	// try to connect to mysql database.
// 	cfg := mysql.Config{
// 		User:   username,
// 		Passwd: password,
// 		Addr:   server, //IP:PORT
// 		Net:    "tcp",
// 		DBName: database,
// 		Loc: time.Local,
// 		AllowNativePasswords: true,
// 		Params: o,
// 	}
// 	if isTLS == true {
// 		cfg.TLSConfig = "custom"
// 	}
// 	str := cfg.FormatDSN()
// 	db, err := gorm.Open("mysql", str)
// 	if err != nil {
// 		panic("Could not connect to the database")
// 	} else {
// 		log.Println("Connect successfully")
// 	}
// 	db.AutoMigrate(
// 		&models.User{},
// 		&models.Forum{},
// 		&models.Comment{},
// 	)
// }


func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error load .env file")
	}
	dsn := os.Getenv("DSN")
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
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
