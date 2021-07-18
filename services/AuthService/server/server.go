package server

import (
	"authsrv/protos/auth"
	"context"
)

type Server struct {
	auth.UnimplementedAuthServiceServer
}

func (s *Server) GetSession(ctx context.Context, request *auth.GetSessionRequest) (*auth.GetSessionResponse, error) {
	return nil, nil
}
func (s *Server) Login(ctx context.Context, request *auth.LoginRequest) (*auth.LoginResponse, error) {
	response := auth.LoginResponse{AuthToken: "Hello word"}
	return &response, nil
}
func (s *Server) Logout(ctx context.Context, request *auth.LogoutRequest) (*auth.LogoutResponse, error) {
	return nil, nil
}
