package model

import pb "modelsrv/protos/model"

type UseCase interface {
	GetUserModels(userId uint32) (*pb.GetModelsResponse, error)
	AddModel(newModel *pb.InternalNewModelRequest) (*pb.NewModelResponse, error)
	DeleteModel(modelId uint32) error
	AddDefaultModels(userId uint32) error
	EditTag(modelId uint32, tag string) error
}
