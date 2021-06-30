package main

import (
	"context"
	"modelsrv/server"
	"modelsrv/services"
)

const (
	port = ":9000"
)

func main() {
	pgxPool := services.NewPgxConn()
	defer pgxPool.Close(context.Background())

	s := server.NewServer(pgxPool, port)
	s.Run()
}
