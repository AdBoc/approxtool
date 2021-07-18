package server

import (
	"apisrv/protos/model"
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
)

//AddModel Secured (user, admin)
func (s *Server) AddModel(ctx context.Context, request *model.NewModelRequest) (*model.NewModelResponse, error) {
	resp, err := s.ModelClient.AddModel(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//DeleteModel Secured (user, admin)
func (s *Server) DeleteModel(ctx context.Context, request *model.DeleteModelRequest) (*emptypb.Empty, error) {
	resp, err := s.ModelClient.DeleteModel(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}

//GetUserModels Secured (user, admin)
func (s *Server) GetUserModels(ctx context.Context, request *model.GetModelsRequest) (*model.GetModelsResponse, error) {
	resp, err := s.ModelClient.GetUserModels(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}
