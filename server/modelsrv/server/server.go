package server

import (
	"github.com/jackc/pgx/v4/pgxpool"
	"google.golang.org/grpc"
	"log"
	"modelsrv/model"
	"modelsrv/protos/modelService"
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

	userPgRepo := model.NewModelPGRepository(s.pgxPool)
	userGRPCService := model.NewModelService(userPgRepo)
	grpcServer := grpc.NewServer()
	modelService.RegisterModelServiceServer(grpcServer, userGRPCService)

	if err := grpcServer.Serve(l); err != nil {
		log.Fatalf("Failed to serve gRPC server on port %s: %s", s.port, err)
	}
}