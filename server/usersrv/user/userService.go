package user

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	pb "usersrv/protos/userService"
	"usersrv/utils/grpc_errors"
)

type userService struct {
	pb.UnimplementedUserServiceServer
	userUC UseCase
}

func NewUserService(uc UseCase) *userService {
	return &userService{UnimplementedUserServiceServer: pb.UnimplementedUserServiceServer{}, userUC: uc}
}

func (us *userService) GetUser(ctx context.Context, userId *pb.GetUserRequest) (*pb.GetUserResponse, error) {
	user, err := us.userUC.GetById(userId.Id)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return user, nil
}

func (us *userService) GetAllUsers(ctx context.Context, _ *emptypb.Empty) (*pb.GetUsersResponse, error) {
	users, err := us.userUC.GetAll()
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return users, nil
}

func (us *userService) CreateUser(ctx context.Context, newUser *pb.NewUserRequest) (*emptypb.Empty, error) {
	if err := us.userUC.Create(newUser); err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return new(emptypb.Empty), nil
}

func (us *userService) DeleteUser(ctx context.Context, userId *pb.DeleteUserRequest) (*emptypb.Empty, error) {
	if err := us.userUC.DeleteById(userId.Id); err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return new(emptypb.Empty), nil
}

func (us *userService) ChangeUserPrivilege(ctx context.Context, userPrivilege *pb.ChangePrivilegeRequest) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "Change privilege is not implemented")
}
