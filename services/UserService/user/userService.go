package user

import (
	"context"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"net/mail"
	"usersrv/protos/user"
	"usersrv/utils/grpc_errors"
)

type userService struct {
	user.UnimplementedUserServiceServer
	userUC UseCase
}

func NewUserService(uc UseCase) *userService {
	return &userService{UnimplementedUserServiceServer: user.UnimplementedUserServiceServer{}, userUC: uc}
}

func hashPassword(newPassword string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hashedPassword), nil
}

func (us *userService) CreateUser(ctx context.Context, newUser *user.InternalNewUserRequest) (*user.UserResponse, error) {
	var valErr error
	if len(newUser.Username) > 100 {
		valErr = errors.New("username exceeds 100 char limit")
	} else if len(newUser.Password) > 255 {
		valErr = errors.New("password exceeds 255 char limit")
	} else if len(newUser.Email) > 100 {
		valErr = errors.New("email exceeds 100 char limit")
	}
	_, valErr = mail.ParseAddress(newUser.Email)
	if valErr != nil {
		return nil, status.Errorf(codes.InvalidArgument, "Validation Error: %s", valErr)
	}

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

func (us *userService) DeleteUser(ctx context.Context, userId *user.InternalDeleteUserRequest) (*emptypb.Empty, error) {
	if userId.Id == 1 {
		return nil, status.Error(codes.InvalidArgument, "Initial admin is not removable")
	}

	if err := us.userUC.DeleteById(userId.Id); err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return new(emptypb.Empty), nil
}

func (us *userService) ChangeUserPrivilege(ctx context.Context, userPrivilege *user.InternalChangePrivilegeRequest) (*emptypb.Empty, error) {
	err := us.userUC.ChangeUserStatus(userPrivilege.UserId, userPrivilege.NewRole)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return new(emptypb.Empty), nil
}

func (us *userService) VerifyPassword(ctx context.Context, credentials *user.VerifyPasswordRequest) (*user.VerifyPasswordResponse, error) {
	userDetails, err := us.userUC.GetUserByEmail(credentials.Email)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	err = bcrypt.CompareHashAndPassword([]byte(userDetails.password), []byte(credentials.Password))
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return &user.VerifyPasswordResponse{
		UserId:   userDetails.id,
		Username: userDetails.username,
		Role:     userDetails.role,
	}, nil
}

func (us *userService) SearchForUsers(ctx context.Context, searchRequest *user.InternalSearchRequest) (*user.SearchResponse, error) {
	if len(searchRequest.SearchQuery) > 100 {
		return nil, status.Errorf(codes.InvalidArgument, "Validation Error: Invalid Search Query")
	}

	users, err := us.userUC.SearchUserByName(searchRequest.SearchQuery)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return users, nil
}

func (us *userService) ChangePassword(ctx context.Context, request *user.InternalChangePasswordRequest) (*emptypb.Empty, error) {
	if len(request.NewPassword) > 255 {
		return nil, status.Errorf(codes.InvalidArgument, "Validation Error: Invalid Password length")
	}

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

func (us *userService) GetUserById(ctx context.Context, request *user.GetUserByIdRequest) (*user.GetUserByIdResponse, error) {
	role, err := us.userUC.GetUserById(request.UserId)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return &user.GetUserByIdResponse{Role: role}, nil
}
