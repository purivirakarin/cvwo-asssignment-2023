package controller

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/purivirakarin/cvwo-assignment-2023/server/database"
	"github.com/purivirakarin/cvwo-assignment-2023/server/models"
	"github.com/purivirakarin/cvwo-assignment-2023/server/util"
	"gorm.io/gorm"
)

func CreateComment(c *fiber.Ctx) error {
	var comment models.Comment
	if err := c.BodyParser(&comment); err != nil {
		fmt.Println("Unable to parse body")
	}
	comment.Date = time.Now().Unix()
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	comment.UserId = id
	if err := database.DB.Create(&comment).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload.",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Successfully created a comment.",
	})
}

func UpdateComment(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	userId, _ := util.Parsejwt(cookie)

	id, _ := strconv.Atoi(c.Params("id"))
	var comment models.Comment
	database.DB.Model(&comment).Where("id=?", id).First(&comment)
	if comment.UserId != userId {
		c.Status(401)
		return c.JSON(fiber.Map{
			"message": "Unauthorized access.",
		})
	}
	if err := c.BodyParser(&comment); err != nil {
		fmt.Println("Unable to parse body")
	}
	database.DB.Model(&comment).Updates(comment)
	return c.JSON(comment)
}

func UniqueComment(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var comment []models.Comment
	database.DB.Model(&comment).Where("forum_id=?", id).Preload("User").Preload("Forum").Find(&comment)
	return c.JSON(comment)
}

func DeleteComment(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	userId, _ := util.Parsejwt(cookie)

	id, _ := strconv.Atoi(c.Params("id"))
	var comment models.Comment
	database.DB.Model(&comment).Where("id=?", id).First(&comment)
	if comment.UserId != userId {
		c.Status(401)
		return c.JSON(fiber.Map{
			"message": "Unauthorized access.",
		})
	}
	deleteQuery := database.DB.Delete(&comment)
	if errors.Is(deleteQuery.Error, gorm.ErrRecordNotFound) {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Opps!, the post is invalid",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Post deleted succesfully.",
	})
}

func CommentByForumId(c *fiber.Ctx) error {
	forumId, _ := strconv.Atoi(c.Params("forumid"))

	var comments []models.Comment
	database.DB.Where("forum_id=?", forumId).Preload("User").Preload("Forum").Find(&comments)
	return c.JSON(comments)
}
