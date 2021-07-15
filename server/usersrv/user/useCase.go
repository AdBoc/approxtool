package user

import pb "usersrv/protos/userService"

type UseCase interface {
	Create(newUser *pb.NewUserRequest) (*pb.GetUserResponse, error)
	GetPasswordByEmail(email string) (string, error)
	GetAll() (*pb.GetUsersResponse, error)
	DeleteById(userId uint32) error
	ChangeUserStatus(userId uint32, status *pb.Role) error
}
