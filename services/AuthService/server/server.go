package server

import (
	"authsrv/protos/auth"
	token "authsrv/utils"
	"context"
	"github.com/go-redis/redis/v8"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"os"
)

type Server struct {
	auth.UnimplementedAuthServiceServer
	RedisClient *redis.Client
}

func (s *Server) GetSession(ctx context.Context, request *auth.GetSessionRequest) (*auth.GetSessionResponse, error) {
	parsedToken, err := token.DecodeToken(request.AccessToken, os.Getenv("ACCESS_SECRET"))
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "invalid token")
	}

	// Look for access token in redis
	if err = token.LookupToken(s.RedisClient, parsedToken.Uuid); err != nil {
		return nil, status.Error(codes.Unauthenticated, "no access token was found")
	}

	return &auth.GetSessionResponse{
		UserId:   parsedToken.UserId,
		UserRole: parsedToken.UserRole,
	}, nil
}

func (s *Server) Login(ctx context.Context, request *auth.InternalLoginRequest) (*auth.LoginResponse, error) {
	accessToken, refreshToken, err := token.CreateToken(s.RedisClient, request.UserId, request.UserRole)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "Error creating token")
	}

	return &auth.LoginResponse{AccessToken: accessToken, RefreshToken: refreshToken}, nil
}

func (s *Server) Logout(ctx context.Context, request *auth.LogoutRequest) (*auth.LogoutResponse, error) {
	err := token.DeleteToken(s.RedisClient, request.AccessToken, os.Getenv("ACCESS_SECRET"))
	if err != nil {
		return &auth.LogoutResponse{Success: false}, err
	}

	return &auth.LogoutResponse{Success: true}, nil
}

func (s *Server) RefreshToken(ctx context.Context, request *auth.RefreshRequest) (*auth.RefreshResponse, error) {
	// Validate token
	decodedToken, err := token.DecodeToken(request.RefreshToken, os.Getenv("REFRESH_SECRET"))
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "invalid token")
	}

	// Delete tokens
	if err = token.DeleteToken(s.RedisClient, request.RefreshToken, os.Getenv("REFRESH_SECRET")); err != nil {
		return nil, err
	}

	// Create new tokens
	acToken, rtToken, err := token.CreateToken(s.RedisClient, decodedToken.UserId, decodedToken.UserRole)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "token could not be created")
	}

	return &auth.RefreshResponse{
		AccessToken:  acToken,
		RefreshToken: rtToken,
	}, nil
}

// TODO: SHOULD I CREATE MY OWN CTX OR USE FROM FUNC??
