package user

import pb "usersrv/protos/user"

type UseCase interface {
	Create(newUser *pb.NewUserRequest) (*pb.UserResponse, error)
	GetPasswordByEmail(email string) (string, error)
	GetAll() (*pb.GetUsersResponse, error)
	DeleteById(userId uint32) error
	ChangeUserStatus(userId uint32, status *pb.Role) error
	SearchUserByName(userQuery string) (*pb.SearchResponse, error)
}
