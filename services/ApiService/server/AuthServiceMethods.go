package server

import (
	"apisrv/protos/auth"
	"apisrv/protos/user"
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
	"log"
)

// Login Not Secured
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
		UserRole: verifiedUser.UserRole,
	})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

// Logout Not Secured
func (s *Server) Logout(ctx context.Context, request *auth.LogoutRequest) (*emptypb.Empty, error) {
	_, err := s.AuthClient.Logout(context.Background(), request)
	if err != nil {
		return nil, err
	}

	return new(emptypb.Empty), nil
}

// RefreshToken Not Secured
func (s Server) RefreshToken(ctx context.Context, request *auth.RefreshRequest) (*auth.RefreshResponse, error) {
	decodedToken, err := s.AuthClient.DecodeToken(context.Background(), &auth.DecodeTokenRequest{RefreshToken: request.RefreshToken})
	if err != nil {
		log.Println("Decode token error", err)
		return nil, err
	}

	userData, err := s.UserClient.GetUserById(context.Background(), &user.GetUserByIdRequest{UserId: decodedToken.UserId})
	if err != nil {
		log.Println("No user found", err)
		return nil, err
	}

	tokens, err := s.AuthClient.RefreshToken(context.Background(), &auth.InternalRefreshRequest{
		UserId:       decodedToken.UserId,
		UserRole:     userData.Role,
		RefreshToken: request.RefreshToken,
	})
	if err != nil {
		log.Println("Refresh token error", err)
		return nil, err
	}

	return &auth.RefreshResponse{
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	}, err
}
