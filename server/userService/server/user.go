package server

import (
	"context"
	"fmt"
	pb "grpcTest/userService/protos/user"
)

type Server struct {
	pb.UnimplementedUserServiceServer
}

func (s *Server) GetUserId(ctx context.Context, user *pb.UserData) (*pb.UserData, error) {
	fmt.Println("Received message from client", user.UserId)
	return &pb.UserData{UserId: 2}, nil
}
