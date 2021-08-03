package server

import (
	"apisrv/protos/model"
	"apisrv/protos/user"
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

//ChangeUserPrivilege Secured (admin)
func (s *Server) ChangeUserPrivilege(ctx context.Context, request *user.ChangePrivilegeRequest) (*emptypb.Empty, error) {
	_, err := s.secureAdminRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.UserClient.ChangeUserPrivilege(context.Background(), &user.InternalChangePrivilegeRequest{NewStatus: 0})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

//CreateUser Secured (admin)
func (s *Server) CreateUser(ctx context.Context, request *user.NewUserRequest) (*user.UserResponse, error) {
	if _, err := s.secureAdminRpc(request.AccessToken); err != nil {
		return nil, err
	}

	resp, err := s.UserClient.CreateUser(context.Background(), &user.InternalNewUserRequest{
		Username: request.Username,
		Password: request.Password,
		Email:    request.Email,
		Status:   request.Status,
	})
	if err != nil {
		return nil, err
	}

	if _, err = s.ModelClient.AddDefaultModels(context.Background(), &model.AddDefaultModelRequest{UserId: resp.Id}); err != nil {
		return nil, err
	}

	return resp, nil
}

//DeleteUser Secured (admin)
func (s *Server) DeleteUser(ctx context.Context, request *user.DeleteUserRequest) (*emptypb.Empty, error) {
	token, err := s.secureAdminRpc(request.AccessToken)
	if err != nil {
		return nil, err
	} else if token.UserId == request.Id {
		return nil, status.Error(codes.PermissionDenied, "User id for deletion is the same as sender id")
	} else if token.UserId == 1 {
		return nil, status.Error(codes.PermissionDenied, "Initial admin is not removable")
	}

	resp, err := s.UserClient.DeleteUser(context.Background(), &user.InternalDeleteUserRequest{
		Id: request.Id,
	})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

//SearchForUsers Secured (admin)
func (s *Server) SearchForUsers(ctx context.Context, request *user.SearchRequest) (*user.SearchResponse, error) {
	_, err := s.secureAdminRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.UserClient.SearchForUsers(context.Background(), &user.InternalSearchRequest{SearchQuery: request.SearchQuery})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

// ChangePassword Secured (admin)
func (s Server) ChangePassword(ctx context.Context, request *user.ChangePasswordRequest) (*emptypb.Empty, error) {
	if _, err := s.secureAdminRpc(request.AccessToken); err != nil {
		return nil, err
	}

	if _, err := s.UserClient.ChangePassword(context.Background(), &user.InternalChangePasswordRequest{
		UserId:      request.UserId,
		NewPassword: request.NewPassword,
	}); err != nil {
		return nil, err
	}

	return new(emptypb.Empty), nil
}
