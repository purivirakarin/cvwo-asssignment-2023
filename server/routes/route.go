package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/purivirakarin/cvwo-assignment-2023/server/controller"
	"github.com/purivirakarin/cvwo-assignment-2023/server/middleware"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)

	app.Use(middleware.IsAuthenticate)
	app.Post("/api/post", controller.CreatePost)
	app.Get("/api/allpost", controller.AllPost)
	app.Get("/api/allpost/:tag", controller.TagPost)
	app.Get("/api/allpost/:id", controller.DetailPost)
	app.Put("/api/updatepost/:id", controller.UpdatePost)
	app.Get("/api/uniquepost", controller.UniquePost)
	app.Delete("/api/deletepost/:id", controller.DeletePost)

	app.Post("/api/comment", controller.CreateComment)
	app.Put("/api/updatecomment/:id", controller.UpdateComment)
	app.Get("/api/uniquecomment/:id", controller.UniqueComment)
	app.Delete("/api/deletecomment/:id", controller.DeleteComment)

	app.Static("/api/uploads", "./uploads")
}
