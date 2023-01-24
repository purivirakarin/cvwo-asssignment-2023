package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/purivirakarin/cvwo-assignment-2023/server/database"
	"github.com/purivirakarin/cvwo-assignment-2023/server/routes"
)

// It connects to the database, loads the .env file, sets the port, sets up the app, 
// and listens on the port.
func main() {

	database.Connect()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env files")
	}
	port := os.Getenv("PORT")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: os.Getenv("FRONTEND"),
		AllowCredentials: true,
		AllowMethods: "GET, POST, PATCH, PUT, DELETE, OPTIONS",
		AllowHeaders: "Origin, Content-Type, X-Auth-Token",
	}))
	routes.Setup(app)
	app.Listen(":"+port)
}