package server

import (
	"context"
	"fmt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	pb "usersrv/protos/user"
)

type Server struct {
	pb.UnimplementedUserServiceServer
}

func (s *Server) GetUser(ctx context.Context, user *pb.UserId) (*pb.UserResponse, error) {
	fmt.Println("Server received user id: ", user.Id)
	return &pb.UserResponse{Id: 2}, nil
}

func (s *Server) GetAllUsers(ctx context.Context, _ *emptypb.Empty) (*pb.UsersResponse, error) {
	fmt.Println("Server received get all users call")
	var users = []*pb.UserResponse {{Id: 1}, {Id: 2}, {Id: 3}}
	return &pb.UsersResponse{Users: users}, nil
}

func (s *Server) CreateUser(ctx context.Context, newUser *pb.NewUserRequest) (*emptypb.Empty, error) {
	fmt.Printf("Create user has been called %s %s %s", newUser.Login, newUser.Password, newUser.Role)
	return nil, status.Errorf(codes.Unimplemented, "User creation is not implemented")
}

func (s *Server) DeleteUser(ctx context.Context, user *pb.UserId) (*emptypb.Empty, error) {
	fmt.Printf("Delete user with id %v is called", user.Id)
	return nil, status.Errorf(codes.Unimplemented, "Delete is not implemented")
}

func (s *Server) ChangeUserPrivilege(ctx context.Context, userPrivilege *pb.UserPrivilegeRequest) (*emptypb.Empty, error) {
	fmt.Println("Change user privilege is set")
	return nil, status.Errorf(codes.Unimplemented, "Change privilege is not implemented")
}