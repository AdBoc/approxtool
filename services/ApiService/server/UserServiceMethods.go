package server

import (
	"apisrv/protos/user"
	"context"
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
	_, err := s.secureAdminRpc(request.AccessToken)
	if err != nil {
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

	return resp, nil
}

//DeleteUser Secured (admin)
func (s *Server) DeleteUser(ctx context.Context, request *user.DeleteUserRequest) (*emptypb.Empty, error) {
	_, err := s.secureAdminRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.UserClient.DeleteUser(context.Background(), &user.InternalDeleteUserRequest{
		Id: request.Id,
	})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

//GetAllUsers Secured (admin)
func (s *Server) GetAllUsers(ctx context.Context, request *user.GetAllUsersRequest) (*user.GetUsersResponse, error) {
	_, err := s.secureAdminRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.UserClient.GetAllUsers(context.Background(), new(emptypb.Empty))
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
