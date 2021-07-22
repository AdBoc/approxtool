package server

import (
	"apisrv/protos/api"
	"apisrv/protos/approx"
	"apisrv/protos/auth"
	"apisrv/protos/model"
	"apisrv/protos/user"
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"log"
)

type Server struct {
	api.UnimplementedApiServiceServer
	AuthClient   auth.AuthServiceClient
	UserClient   user.UserServiceClient
	ModelClient  model.ModelServiceClient
	ApproxClient approx.ApproximationServiceClient
}

func (s *Server) secureRpc(accessToken string) (*auth.GetSessionResponse, error) {
	token, err := s.AuthClient.GetSession(context.Background(), &auth.GetSessionRequest{AccessToken: accessToken})
	if err != nil {
		log.Println(err)
		return nil, status.Error(codes.Unauthenticated, "invalid token")
	}

	return token, nil
}

func (s *Server) secureAdminRpc(accessToken string) (*auth.GetSessionResponse, error) {
	token, err := s.AuthClient.GetSession(context.Background(), &auth.GetSessionRequest{AccessToken: accessToken})
	if err != nil {
		log.Println(err)
		return nil, status.Error(codes.Unauthenticated, "invalid token")
	}
	if token.UserRole != "ADMIN" {
		return nil, status.Error(codes.Unauthenticated, "no admin privileges")
	}

	return token, nil
}
