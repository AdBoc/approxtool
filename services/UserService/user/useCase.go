package user

import "usersrv/protos/user"

type User struct {
	id       uint32
	username string
	password string
	role     string
}

type UseCase interface {
	Create(newUser *user.InternalNewUserRequest) (*user.UserResponse, error)
	GetUserByEmail(email string) (*User, error)
	GetUserById(userId uint32) (string, error)
	DeleteById(userId uint32) error
	ChangeUserStatus(userId uint32, status string) error
	SearchUserByName(userQuery string) (*user.SearchResponse, error)
	ChangeUserPassword(userId uint32, newPassword string) error
}
