package user

import (
	"context"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/protobuf/types/known/emptypb"
	pb "usersrv/protos/user"
	"usersrv/utils/grpc_errors"
)

type userService struct {
	pb.UnimplementedUserServiceServer
	userUC UseCase
}

func NewUserService(uc UseCase) *userService {
	return &userService{UnimplementedUserServiceServer: pb.UnimplementedUserServiceServer{}, userUC: uc}
}

func hashPassword(newPassword string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

func (us *userService) GetAllUsers(ctx context.Context, _ *emptypb.Empty) (*pb.GetUsersResponse, error) {
	//TODO: Pagination ?
	users, err := us.userUC.GetAll()
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return users, nil
}

func (us *userService) CreateUser(ctx context.Context, newUser *pb.InternalNewUserRequest) (*pb.UserResponse, error) {
	hashedPassword, err := hashPassword(newUser.Password)
	if err != nil {
		return nil, err
	}

	newUser.Password = hashedPassword

	user, err := us.userUC.Create(newUser)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return user, nil
}

func (us *userService) DeleteUser(ctx context.Context, userId *pb.InternalDeleteUserRequest) (*emptypb.Empty, error) {
	if err := us.userUC.DeleteById(userId.Id); err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return new(emptypb.Empty), nil
}

func (us *userService) ChangeUserPrivilege(ctx context.Context, userPrivilege *pb.InternalChangePrivilegeRequest) (*emptypb.Empty, error) {
	err := us.userUC.ChangeUserStatus(userPrivilege.UserId, &userPrivilege.NewStatus)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return new(emptypb.Empty), nil
}

func (us *userService) VerifyPassword(ctx context.Context, credentials *pb.VerifyPasswordRequest) (*pb.VerifyPasswordResponse, error) {
	userDetails, err := us.userUC.GetUserByEmail(credentials.Email)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	err = bcrypt.CompareHashAndPassword([]byte(userDetails.password), []byte(credentials.Password))
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return &pb.VerifyPasswordResponse{
		UserId:   userDetails.id,
		Username: userDetails.username,
		UserRole: userDetails.role.String(),
	}, nil
}

func (us *userService) SearchForUsers(ctx context.Context, searchRequest *pb.InternalSearchRequest) (*pb.SearchResponse, error) {
	users, err := us.userUC.SearchUserByName(searchRequest.SearchQuery)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return users, nil
}

func (us *userService) ChangePassword(ctx context.Context, request *pb.InternalChangePasswordRequest) (*emptypb.Empty, error) {
	hashedPassword, err := hashPassword(request.NewPassword)
	if err != nil {
		return nil, err
	}

	request.NewPassword = hashedPassword

	if err := us.userUC.ChangeUserPassword(request.UserId, request.NewPassword); err != nil {
		return nil, err
	}

	return new(emptypb.Empty), nil
}
