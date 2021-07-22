package main

import (
	"authsrv/protos/auth"
	"authsrv/server"
	"github.com/go-redis/redis/v8"
	"google.golang.org/grpc"
	"log"
	"net"
	"os"
)

const (
	port = ":9091"
)

func main() {
	os.Setenv("ACCESS_SECRET", "____VERY-SECRET-ACCESS-SECRET____") // TODO: Externalize secret
	os.Setenv("REFRESH_SECRET", "____VERY-SECRET-REFRESH-SECRET____")

	rdb := redis.NewClient(&redis.Options{
		Addr: "redis:6379",
	})

	log.Println("Trying to serve AuthService")
	lis, err := net.Listen("tcp", "0.0.0.0"+port)
	if err != nil {
		log.Fatalf("Failed to listen on port %s (%v)", port, err)
	}

	s := grpc.NewServer()
	auth.RegisterAuthServiceServer(s, &server.Server{RedisClient: rdb})
	log.Printf("Serving on port %s ...", port)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve on port %s (%v)", port, err)
	}
}
