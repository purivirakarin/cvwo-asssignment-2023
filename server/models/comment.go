package models

type Comment struct {
	Id      uint   `json:"id"`
	Title   string `json:title`
	Desc    string `json:desc`
	UserId  string `json:userid`
	ForumId string `json:forumid`
	User    User   `json:"user"; gorm:"foreignKey:UserID"`
	Forum   Forum  `json:"forum"; gorm:"foreignKey:ForumID"`
}
