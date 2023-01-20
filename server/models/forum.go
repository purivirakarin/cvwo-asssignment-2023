package models

type Forum struct {
	Id     uint   `json:"id"`
	Title  string `json:title`
	Desc   string `json:desc`
	UserId string `json:userid`
	Tag    string `json:tag`
	User   User   `json:"user"; gorm:"foreignKey:UserID"`
}
