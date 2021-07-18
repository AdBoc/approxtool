package main

import (
	"google.golang.org/grpc"
	"log"
	"authsrv/protos/auth"
	"authsrv/server"
	"net"
)

const (
	port = ":9091"
)

func main() {
	log.Println("Trying to serve AuthService")
	lis, err := net.Listen("tcp", "0.0.0.0"+port)
	if err != nil {
		log.Fatalf("Failed to listen on port %s (%v)", port, err)
	}

	s := grpc.NewServer()
	auth.RegisterAuthServiceServer(s, &server.Server{})
	log.Printf("Serving on port %s ...", port)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve on port %s (%v)", port, err)
	}
}
