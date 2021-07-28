package main

import (
	"authsrv/protos/auth"
	"authsrv/server"
	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"log"
	"net"
	"os"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .evn files")
	}

	rdb := redis.NewClient(&redis.Options{
		Addr: os.Getenv("REDIS_ADDR"),
	})

	serverPort := os.Getenv("PORT")
	lis, err := net.Listen("tcp", "0.0.0.0"+serverPort)
	if err != nil {
		log.Fatalf("Failed to listen on port %s (%v)", serverPort, err)
	}

	s := grpc.NewServer()
	auth.RegisterAuthServiceServer(s, &server.Server{RedisClient: rdb})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve on port %s (%v)", serverPort, err)
	}
}
