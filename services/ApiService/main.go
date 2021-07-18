package main

import (
	"apisrv/protos/api"
	"apisrv/protos/approx"
	"apisrv/protos/auth"
	"apisrv/protos/model"
	"apisrv/protos/user"
	"apisrv/server"
	"google.golang.org/grpc"
	"log"
	"net"
)

const (
	port = ":9090"
)

func dialService(addr string) *grpc.ClientConn {
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithInsecure())
	opts = append(opts, grpc.WithBlock())
	conn, err := grpc.Dial(addr, opts...)
	if err != nil {
		log.Fatalf("Failed to connect to Service at %s: %v", addr, err)
	}
	return conn
}

func main() {
	// Connect to AuthService
	log.Println("Connecting to AuthService")
	authAddr := "auth_svc:9091"
	authClient := auth.NewAuthServiceClient(dialService(authAddr))
	log.Println("Done!")

	// Connect to UserService
	log.Println("Connecting to UserService")
	userAddr := "user_svc:9092"
	userClient := user.NewUserServiceClient(dialService(userAddr))
	log.Println("Done!")

	// Connect to ModelService
	log.Println("Connecting to ModelService")
	modelAddr := "model_svc:9093"
	modelClient := model.NewModelServiceClient(dialService(modelAddr))
	log.Println("Done!")

	// Connect to ApproxService
	log.Println("Connecting to ApproxService")
	approxAddr := "approx_svc:9094"
	approxClient := approx.NewApproximationServiceClient(dialService(approxAddr))
	log.Println("Done!")

	// Server Listener
	log.Println("Serving ApiService")
	lis, err := net.Listen("tcp", "0.0.0.0"+port)
	if err != nil {
		log.Fatalf("Failed to listen on port %s (%v)", port, err)
	}

	// Serve ApiService
	s := grpc.NewServer()
	api.RegisterApiServiceServer(
		s,
		&server.Server{
			AuthClient:   authClient,
			UserClient:   userClient,
			ModelClient:  modelClient,
			ApproxClient: approxClient,
		},
	)
	log.Printf("Serving on port %s ...", port)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve on port %s (%v)", port, err)
	}
}
