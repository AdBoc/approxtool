package server

import (
	"authsrv/protos/auth"
	token "authsrv/utils"
	"context"
	"os"
)

type Server struct {
	auth.UnimplementedAuthServiceServer
}

// VerifyAccessToken GetSession Decode access token
func (s *Server) VerifyAccessToken(ctx context.Context, request *auth.VerifyAccessTokenRequest) (*auth.VerifyAccessTokenResponse, error) {
	parsedToken, err := token.VerifyToken(request.AccessToken, os.Getenv("ACCESS_SECRET"))
	if err != nil {
		return nil, err
	}

	return &auth.VerifyAccessTokenResponse{
		UserId:   parsedToken.UserId,
		UserRole: parsedToken.UserRole,
	}, nil
}

// Login Create access and refresh token
func (s *Server) Login(ctx context.Context, request *auth.InternalLoginRequest) (*auth.LoginResponse, error) {
	accessToken, refreshToken, err := token.CreateTokens(request.UserId, request.UserRole)
	if err != nil {
		return nil, err
	}

	return &auth.LoginResponse{AccessToken: accessToken, RefreshToken: refreshToken}, nil
}

// RefreshToken Refresh access token with new data
func (s *Server) RefreshToken(ctx context.Context, request *auth.InternalRefreshRequest) (*auth.RefreshResponse, error) {
	acToken, rtToken, err := token.CreateTokens(request.UserId, request.UserRole)
	if err != nil {
		return nil, err
	}

	return &auth.RefreshResponse{
		AccessToken:  acToken,
		RefreshToken: rtToken,
	}, nil
}

// VerifyRefreshToken DecodeToken Decode refresh token
func (s *Server) VerifyRefreshToken(ctx context.Context, request *auth.VerifyRefreshTokenRequest) (*auth.VerifyRefreshTokenResponse, error) {
	decodedToken, err := token.VerifyToken(request.RefreshToken, os.Getenv("REFRESH_SECRET"))
	if err != nil {
		return nil, err
	}

	return &auth.VerifyRefreshTokenResponse{UserId: decodedToken.UserId}, nil
}
