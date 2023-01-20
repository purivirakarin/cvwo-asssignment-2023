package controller

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/purivirakarin/cvwo-assignment-2023/server/database"
	"github.com/purivirakarin/cvwo-assignment-2023/server/models"
	"gorm.io/gorm"
)

func CreateComment(c *fiber.Ctx) error {
	var comment models.Comment
	if err := c.BodyParser(&comment); err != nil {
		fmt.Println("Unable to parse body")
	}
	if err := database.DB.Create(&comment).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Congratulation!, You post is live!",
	})
}

func UpdateComment(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	comment := models.Comment{
		Id: uint(id),
	}
	if err := c.BodyParser(&comment); err != nil {
		fmt.Println("Unable to parse body")
	}
	database.DB.Model(&comment).Updates(comment)
	return c.JSON(fiber.Map{
		"message": "Post updated successfully",
		"data":    comment,
	})
}

func UniqueComment(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var comment []models.Comment
	database.DB.Model(&comment).Where("forum_id=?", id).Preload("Forum").Find(&comment)
	return c.JSON(comment)
}

func DeleteComment(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	comment := models.Comment{
		Id: uint(id),
	}
	deleteQuery := database.DB.Delete(&comment)
	if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Opps!, the post is invalid",
		})
	}

	return c.JSON(fiber.Map{
		"message": "post deleted succesfully",
	})
}
