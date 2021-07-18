package server

import (
	"apisrv/protos/auth"
	"context"
)

//GetSession Not Secured
func (s *Server) GetSession(ctx context.Context, request *auth.GetSessionRequest) (*auth.GetSessionResponse, error) {
	resp, err := s.AuthClient.GetSession(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//Login Not Secured
func (s *Server) Login(ctx context.Context, request *auth.LoginRequest) (*auth.LoginResponse, error) {
	resp, err := s.AuthClient.Login(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//Logout Not Secured
func (s *Server) Logout(ctx context.Context, request *auth.LogoutRequest) (*auth.LogoutResponse, error) {
	resp, err := s.AuthClient.Logout(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}
