package model

import (
	"context"
	"google.golang.org/protobuf/types/known/emptypb"
	pb "modelsrv/protos/model"
	"modelsrv/utils/grpc_errors"
)

type modelService struct {
	pb.UnimplementedModelServiceServer
	modelUc UseCase
}

func NewModelService(uc UseCase) *modelService {
	return &modelService{UnimplementedModelServiceServer: pb.UnimplementedModelServiceServer{}, modelUc: uc}
}

func (us *modelService) GetUserModels(ctx context.Context, userId *pb.InternalGetModelsRequest) (*pb.GetModelsResponse, error) {
	users, err := us.modelUc.GetUserModels(userId.UserId)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return users, nil
}

func (us *modelService) AddModel(ctx context.Context, newModel *pb.InternalNewModelRequest) (*pb.NewModelResponse, error) {
	model, err := us.modelUc.AddModel(newModel)
	if err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return model, nil
}

func (us *modelService) DeleteModel(ctx context.Context, model *pb.InternalDeleteModelRequest) (*emptypb.Empty, error) {
	if err := us.modelUc.DeleteModel(model.ModelId); err != nil {
		return nil, grpc_errors.ErrorResponse(err, err.Error())
	}

	return new(emptypb.Empty), nil
}

func (us *modelService) AddDefaultModels(ctx context.Context, request *pb.AddDefaultModelRequest) (*emptypb.Empty, error) {
	if err := us.modelUc.AddDefaultModels(request.UserId); err != nil {
		return nil, err
	}

	return new(emptypb.Empty), nil
}
