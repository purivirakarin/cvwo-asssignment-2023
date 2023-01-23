package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	Id        uint   `json:"id"`
	Username  string `json:username`
	Password  []byte `json:"-"`
}

func (user *User) SetPassword(password string) {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = hashedPassword
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}
