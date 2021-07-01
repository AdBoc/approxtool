package model

import pb "modelsrv/protos/modelService"

type UseCase interface {
	GetUserModels(userId uint32) (*pb.GetModelsResponse, error)
	AddModel(newModel *pb.NewModelRequest) error
	DeleteModel(modelId uint32) error
}