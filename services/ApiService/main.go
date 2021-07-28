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
	"os"
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
	authAddr := os.Getenv("AUTH_ADDR")
	authClient := auth.NewAuthServiceClient(dialService(authAddr))

	// Connect to UserService
	userAddr := os.Getenv("USER_ADDR")
	userClient := user.NewUserServiceClient(dialService(userAddr))

	// Connect to ModelService
	modelAddr := os.Getenv("MODEL_ADDR")
	modelClient := model.NewModelServiceClient(dialService(modelAddr))

	// Connect to ApproxService
	approxAddr := os.Getenv("APPROX_ADDR")
	approxClient := approx.NewApproximationServiceClient(dialService(approxAddr))

	// Server Listener
	serverPort := os.Getenv("PORT")
	lis, err := net.Listen("tcp", "0.0.0.0"+serverPort)
	if err != nil {
		log.Fatalf("Failed to listen on port %s (%v)", serverPort, err)
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

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve on port %s (%v)", serverPort, err)
	}
}
