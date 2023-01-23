package controller

import (
	"fmt"
	"log"
	"regexp"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/purivirakarin/cvwo-assignment-2023/server/database"
	"github.com/purivirakarin/cvwo-assignment-2023/server/models"
	"github.com/purivirakarin/cvwo-assignment-2023/server/util"
)

func validateEmail(email string) bool {
	Re := regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z0-9._%+\-]+\.[a-z0-9._%+\-]`)
	return Re.MatchString(email)
}

func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.User
	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to parse body")
	}
	//Check if password is less than 6 characters
	if len(data["password"].(string)) <= 6 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password must be greater than 6 character.",
		})
	}
	//Check if email already exist in database
	database.DB.Where("username=?", data["username"].(string)).First(&userData)
	if userData.Id != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Username already exist.",
		})
	}
	user := models.User{
		Username:  data["username"].(string),
	}
	user.SetPassword(data["password"].(string))
	err := database.DB.Create(&user)
	if err != nil {
		log.Println(err)
	}
	c.Status(200)
	return c.JSON(fiber.Map{
		"user":    user,
		"message": "Account created succesfully.",
	})

}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to parse body")
	}
	var user models.User
	database.DB.Where("username=?", data["username"]).First(&user)
	if user.Id == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Username does not exist, kindly create an account.",
		})
	}
	if err := user.ComparePassword(data["password"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Incorrect username/password.",
		})
	}
	token, err := util.GenerateJwt(strconv.Itoa(int(user.Id)))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "You have succesfully logged in.",
	})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	userId, err := util.Parsejwt(cookie)

	if err != nil {
		c.Status(401)
		return c.JSON(fiber.Map{
			"message": "Unauthorized access.",
		})
	}

	var user models.User
	database.DB.Where("id = ?", userId).First(&user)

	return c.JSON(fiber.Map{
		"user": user,
	})
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie {
		Name: "jwt",
		Value: "",
		Expires: time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Logged out successfully.",
	})
}

type Claim struct {
	jwt.StandardClaims
}
