package server

import (
	"context"
	"fmt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	pb "modelsrv/protos/model"
)

type Server struct {
	pb.UnimplementedModelServiceServer
}

func (s *Server) GetUserModels(ctx context.Context, user *pb.UserId) (*pb.Models, error) {
	fmt.Printf("Get model for id with user %v", user.Id)
	var models = []*pb.Model {{Model: "Model1"}, {Model: "Model2"}}
	return &pb.Models{Models: models}, nil
}

func (s *Server) AddModel(ctx context.Context, newModel *pb.NewModelRequest) (*emptypb.Empty, error) {
	fmt.Printf("Add new newModel %s to user with id %v", newModel.Model, newModel.UserId)
	return nil, status.Errorf(codes.Unimplemented, "Model creation is not implemented")
}

func (s *Server) DeleteModel(ctx context.Context, model *pb.ModelId) (*emptypb.Empty, error) {
	fmt.Printf("Delete model with id %v", model.Id)
	return nil, status.Errorf(codes.Unimplemented, "Model delete is not implemented")
}
