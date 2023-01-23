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

func CreatePost(c *fiber.Ctx) error {
	var forum models.Forum
	if err := c.BodyParser(&forum); err != nil {
		fmt.Println("Unable to parse body")
	}
	forum.Date = time.Now().Unix()
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	forum.UserId = id
	if err := database.DB.Model(&forum).Create(&forum).Error; err != nil {
		fmt.Println(err)
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
	tag := c.Query("tag")
	var forum []models.Forum
	if tag != "" {
		database.DB.Model(&forum).Where("tag=?", tag).Preload("User").Find(&forum)
	} else {
		database.DB.Model(&forum).Preload("User").Find(&forum)
	}
	return c.JSON(forum)
}

func DetailPost(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var forum models.Forum
	database.DB.Where("id=?", id).Preload("User").First(&forum)
	return c.JSON(forum)
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
	tag := c.Query("tag")
	var forum []models.Forum
	if tag != "" {
		database.DB.Model(&forum).Where("user_id=?", id).Where("tag=?", tag).Preload("User").Find(&forum)
	} else {
		database.DB.Model(&forum).Where("user_id=?", id).Preload("User").Find(&forum)
	}
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
