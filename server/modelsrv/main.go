package main

import (
	"modelsrv/server"
	"modelsrv/services"
)

const (
	port = ":9001"
)

func main() {
	pgxPool := services.NewPgxConn()
	defer pgxPool.Close()

	s := server.NewServer(pgxPool, port)
	s.Run()
}
