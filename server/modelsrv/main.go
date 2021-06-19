package main

import (
	"google.golang.org/grpc"
	"log"
	"modelsrv/protos/model"
	"modelsrv/server"
	"net"
)

const (
	port = ":9001"
)

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatal("Failed to create listener on port", port, err)
	}

	s := server.Server{}
	grpcServer := grpc.NewServer()
	model.RegisterModelServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatal("Failed to serve gRPC server on port", port, err)
	}
}
