package server

import (
	"github.com/jackc/pgx/v4/pgxpool"
	"google.golang.org/grpc"
	"log"
	"modelsrv/model"
	modelService "modelsrv/protos/model"
	"net"
)

type server struct {
	pgxPool *pgxpool.Pool
	port    string
}

func NewServer(pgxPool *pgxpool.Pool, port string) *server {
	return &server{pgxPool: pgxPool, port: port}
}

func (s *server) Run() {
	l, err := net.Listen("tcp", s.port)
	if err != nil {
		log.Fatalf("Failed to create listener on port %s: %s", s.port, err)
	}

	modelPgRepo := model.NewModelPGRepository(s.pgxPool)
	modelGrpcService := model.NewModelService(modelPgRepo)
	grpcServer := grpc.NewServer()
	modelService.RegisterModelServiceServer(grpcServer, modelGrpcService)

	if err := grpcServer.Serve(l); err != nil {
		log.Fatalf("Failed to serve gRPC server on port %s: %s", s.port, err)
	}
}
