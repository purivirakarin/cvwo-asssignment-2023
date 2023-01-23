package models

type Comment struct {
	Id      uint   `json:"id"`
	Desc    string `json:desc`
	Date    int64  `json:date`
	UserId  string `json:userid`
	ForumId string `json:forumid`
	User    User   `json:"user"; gorm:"foreignKey:UserID"`
	Forum   Forum  `json:"forum"; gorm:"foreignKey:ForumID"`
}
