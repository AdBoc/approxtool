package server

import (
	"apisrv/protos/user"
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
)

//ChangeUserPrivilege Secured (admin)
func (s *Server) ChangeUserPrivilege(ctx context.Context, request *user.ChangePrivilegeRequest) (*emptypb.Empty, error) {
	resp, err := s.UserClient.ChangeUserPrivilege(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//CompareCredentials Secured (admin)
func (s *Server) CompareCredentials(ctx context.Context, request *user.CompareCredentialsRequest) (*emptypb.Empty, error) {
	resp, err := s.UserClient.CompareCredentials(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//CreateUser Secured (admin)
func (s *Server) CreateUser(ctx context.Context, request *user.NewUserRequest) (*user.UserResponse, error) {
	resp, err := s.UserClient.CreateUser(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//DeleteUser Secured (admin)
func (s *Server) DeleteUser(ctx context.Context, request *user.DeleteUserRequest) (*emptypb.Empty, error) {
	resp, err := s.UserClient.DeleteUser(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//GetAllUsers Secured (admin)
func (s *Server) GetAllUsers(ctx context.Context, request *emptypb.Empty) (*user.GetUsersResponse, error) {
	resp, err := s.UserClient.GetAllUsers(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//SearchForUsers Secured (admin)
func (s *Server) SearchForUsers(ctx context.Context, request *user.SearchRequest) (*user.SearchResponse, error) {
	resp, err := s.UserClient.SearchForUsers(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}
