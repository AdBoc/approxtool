package main

import (
	"google.golang.org/grpc"
	"grpcTest/protos/user"
	"grpcTest/server"
	"log"
	"net"
)

const (
	port = ":9000"
)

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatal("Failed to create listener on port", port, err)
	}

	s := server.Server{}
	grpcServer := grpc.NewServer()
	user.RegisterUserServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatal("Failed to serve gRPC server on port", port, err)
	}
}
