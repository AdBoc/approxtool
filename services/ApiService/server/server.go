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
)

type Server struct {
	api.UnimplementedApiServiceServer
	AuthClient   auth.AuthServiceClient
	UserClient   user.UserServiceClient
	ModelClient  model.ModelServiceClient
	ApproxClient approx.ApproximationServiceClient
}

func (s *Server) secureRpc(accessToken string) (*auth.VerifyAccessTokenResponse, error) {
	token, err := s.AuthClient.VerifyAccessToken(context.Background(), &auth.VerifyAccessTokenRequest{AccessToken: accessToken})
	if err != nil {
		return nil, err
	}

	return token, nil
}

func (s *Server) secureAdminRpc(accessToken string) (*auth.VerifyAccessTokenResponse, error) {
	token, err := s.AuthClient.VerifyAccessToken(context.Background(), &auth.VerifyAccessTokenRequest{AccessToken: accessToken})
	if err != nil {
		return nil, err
	}
	if token.UserRole != "ADMIN" {
		return nil, status.Error(codes.Unauthenticated, "no admin privileges")
	}

	return token, nil
}
