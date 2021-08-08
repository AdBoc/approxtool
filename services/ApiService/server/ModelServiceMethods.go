package server

import (
	"apisrv/protos/model"
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
)

//AddModel Secured (user, admin)
func (s *Server) AddModel(ctx context.Context, request *model.NewModelRequest) (*model.NewModelResponse, error) {
	token, err := s.secureRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.ModelClient.AddModel(context.Background(), &model.InternalNewModelRequest{
		Name:          request.Name,
		Expression:    request.Expression,
		LexExpression: request.LexExpression,
		Tag:           request.Tag,
		UserId:        token.UserId,
	})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

//DeleteModel Secured (user, admin)
func (s *Server) DeleteModel(ctx context.Context, request *model.DeleteModelRequest) (*emptypb.Empty, error) {
	_, err := s.secureRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.ModelClient.DeleteModel(context.Background(), &model.InternalDeleteModelRequest{ModelId: request.ModelId})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

//GetUserModels Secured (user, admin)
func (s *Server) GetUserModels(ctx context.Context, request *model.GetModelsRequest) (*model.GetModelsResponse, error) {
	token, err := s.secureRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.ModelClient.GetUserModels(context.Background(), &model.InternalGetModelsRequest{UserId: token.UserId})
	if err != nil {
		return nil, err
	}

	return resp, nil
}

func (s *Server) EditTag(ctx context.Context, request *model.EditTagRequest) (*emptypb.Empty, error) {
	_, err := s.secureRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	_, err = s.ModelClient.EditTag(context.Background(), &model.InternalEditTagRequest{ModelId: request.ModelId, NewTag: request.NewTag})
	if err != nil {
		return nil, err
	}

	return new(emptypb.Empty), nil
}
