package server

import (
	"authsrv/protos/auth"
	token "authsrv/utils"
	"context"
	"github.com/go-redis/redis/v8"
	"google.golang.org/protobuf/types/known/emptypb"
	"os"
)

type Server struct {
	auth.UnimplementedAuthServiceServer
	RedisClient *redis.Client
}

func (s *Server) GetSession(ctx context.Context, request *auth.GetSessionRequest) (*auth.GetSessionResponse, error) {
	parsedToken, err := token.DecodeToken(request.AccessToken, os.Getenv("ACCESS_SECRET"))
	if err != nil {
		return nil, err
	}

	if err = token.LookupToken(s.RedisClient, parsedToken.Uuid); err != nil {
		return nil, err
	}

	return &auth.GetSessionResponse{
		UserId:   parsedToken.UserId,
		UserRole: parsedToken.UserRole,
	}, nil
}

func (s *Server) Login(ctx context.Context, request *auth.InternalLoginRequest) (*auth.LoginResponse, error) {
	accessToken, refreshToken, err := token.CreateToken(s.RedisClient, request.UserId, request.UserRole)
	if err != nil {
		return nil, err
	}

	return &auth.LoginResponse{AccessToken: accessToken, RefreshToken: refreshToken}, nil
}

func (s *Server) Logout(ctx context.Context, request *auth.LogoutRequest) (*emptypb.Empty, error) {
	err := token.DeleteToken(s.RedisClient, request.AccessToken, os.Getenv("ACCESS_SECRET"))
	if err != nil {
		return nil, err
	}

	return new(emptypb.Empty), nil
}

func (s *Server) RefreshToken(ctx context.Context, request *auth.InternalRefreshRequest) (*auth.RefreshResponse, error) {
	// Delete refresh token (access is already deleted)
	if err := token.DeleteToken(s.RedisClient, request.RefreshToken, os.Getenv("REFRESH_SECRET")); err != nil {
		return nil, err
	}

	// Create new tokens
	acToken, rtToken, err := token.CreateToken(s.RedisClient, request.UserId, request.UserRole)
	if err != nil {
		return nil, err
	}

	return &auth.RefreshResponse{
		AccessToken:  acToken,
		RefreshToken: rtToken,
	}, nil
}

func (s *Server) DecodeToken(ctx context.Context, request *auth.DecodeTokenRequest) (*auth.DecodeTokenResponse, error) {
	decodedToken, err := token.DecodeToken(request.RefreshToken, os.Getenv("REFRESH_SECRET"))
	if err != nil {
		return nil, err
	}

	return &auth.DecodeTokenResponse{UserId: decodedToken.UserId}, nil
}

// TODO: SHOULD I CREATE MY OWN CTX OR USE FROM FUNC??
