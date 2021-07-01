package server

import (
	"github.com/jackc/pgx/v4/pgxpool"
	"google.golang.org/grpc"
	"log"
	"net"
	"usersrv/protos/userService"
	"usersrv/user"
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

	userPgRepo := user.NewUserPGRepository(s.pgxPool)
	userGRPCService := user.NewUserService(userPgRepo)
	grpcServer := grpc.NewServer()
	userService.RegisterUserServiceServer(grpcServer, userGRPCService)

	if err := grpcServer.Serve(l); err != nil {
		log.Fatalf("Failed to serve gRPC server on port %s: %s", s.port, err)
	}
}
