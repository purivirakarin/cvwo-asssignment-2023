package controller

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/purivirakarin/cvwo-assignment-2023/server/database"
	"github.com/purivirakarin/cvwo-assignment-2023/server/models"
	"github.com/purivirakarin/cvwo-assignment-2023/server/util"
	"gorm.io/gorm"
)

func CreatePost(c *fiber.Ctx) error {
	var forum models.Forum
	if err := c.BodyParser(&forum); err != nil {
		fmt.Println("Unable to parse body")
	}
	if err := database.DB.Create(&forum).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Congratulation!, You post is live!",
	})
}

func AllPost(c *fiber.Ctx) error {
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit := 5
	offset := (page - 1) * limit
	var total int64
	var forum []models.Forum
	database.DB.Preload("User").Offset(offset).Limit(limit).Find(&forum)
	database.DB.Model(&models.Forum{}).Count(&total)
	return c.JSON(fiber.Map{
		"data": forum,
		"meta": fiber.Map{
			"total":     total,
			"page":      page,
			"last_page": (float64(int(total) / limit)),
		},
	})
}

func TagPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("tag"))
	var forum models.Forum
	database.DB.Where("tag=?", id).Preload("User").First(&forum)
	return c.JSON(fiber.Map{
		"data": forum,
	})
}

func DetailPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var forum models.Forum
	database.DB.Where("id=?", id).Preload("User").First(&forum)
	return c.JSON(fiber.Map{
		"data": forum,
	})
}

func UpdatePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	forum := models.Forum{
		Id: uint(id),
	}
	if err := c.BodyParser(&forum); err != nil {
		fmt.Println("Unable to parse body")
	}
	database.DB.Model(&forum).Updates(forum)
	return c.JSON(fiber.Map{
		"message": "Post updated successfully",
		"data":    forum,
	})
}

func UniquePost(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	var forum []models.Forum
	database.DB.Model(&forum).Where("user_id=?", id).Preload("User").Find(&forum)
	return c.JSON(forum)
}

func DeletePost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	forum := models.Forum{
		Id: uint(id),
	}
	deleteQuery := database.DB.Delete(&forum)
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
