package user

import pb "usersrv/protos/user"

type User struct {
	id       uint32
	username string
	password string
	role     pb.Role
}

type UseCase interface {
	Create(newUser *pb.InternalNewUserRequest) (*pb.UserResponse, error)
	GetUserByEmail(email string) (*User, error)
	GetUserById(userId uint32) (*pb.Role, error)
	DeleteById(userId uint32) error
	ChangeUserStatus(userId uint32, status *pb.Role) error
	SearchUserByName(userQuery string) (*pb.SearchResponse, error)
	ChangeUserPassword(userId uint32, newPassword string) error
}
