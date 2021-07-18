package server

import (
	"apisrv/protos/api"
	"apisrv/protos/approx"
	"apisrv/protos/auth"
	"apisrv/protos/model"
	"apisrv/protos/user"
)

type Server struct {
	api.UnimplementedApiServiceServer
	AuthClient   auth.AuthServiceClient
	UserClient   user.UserServiceClient
	ModelClient  model.ModelServiceClient
	ApproxClient approx.ApproximationServiceClient
}
