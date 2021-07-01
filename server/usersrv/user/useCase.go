package user

import pb "usersrv/protos/userService"

type UseCase interface {
	Create(newUser *pb.NewUserRequest) error
	GetById(id uint32) (*pb.GetUserResponse, error)
	GetPasswordByEmail(email string) (string, error)
	GetAll() (*pb.GetUsersResponse, error)
	DeleteById(id uint32) error
	ChangeUserStatus(user *pb.GetUserResponse, status *pb.Role) error
}
