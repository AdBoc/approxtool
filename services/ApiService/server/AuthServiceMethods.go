package server

import (
	"apisrv/protos/auth"
	"apisrv/protos/user"
	"context"
)

// Login use user data to generate tokens
func (s *Server) Login(ctx context.Context, request *auth.LoginRequest) (*auth.LoginResponse, error) {
	verifiedUser, err := s.UserClient.VerifyPassword(context.Background(), &user.VerifyPasswordRequest{
		Email:    request.Email,
		Password: request.Password,
	})
	if err != nil {
		return nil, err
	}

	resp, err := s.AuthClient.Login(context.Background(), &auth.InternalLoginRequest{
		UserId:   verifiedUser.UserId,
		UserRole: verifiedUser.Role,
	})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

// RefreshToken use user data to update access token
func (s Server) RefreshToken(ctx context.Context, request *auth.RefreshRequest) (*auth.RefreshResponse, error) {
	decodedToken, err := s.AuthClient.VerifyRefreshToken(context.Background(), &auth.VerifyRefreshTokenRequest{RefreshToken: request.RefreshToken})
	if err != nil {
		return nil, err
	}

	userData, err := s.UserClient.GetUserById(context.Background(), &user.GetUserByIdRequest{UserId: decodedToken.UserId})
	if err != nil {
		return nil, err
	}

	tokens, err := s.AuthClient.RefreshToken(context.Background(), &auth.InternalRefreshRequest{
		UserId:   decodedToken.UserId,
		UserRole: userData.Role,
	})
	if err != nil {
		return nil, err
	}

	return &auth.RefreshResponse{
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	}, nil
}
