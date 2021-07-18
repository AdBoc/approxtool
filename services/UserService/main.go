package main

import (
	"usersrv/server"
	"usersrv/services"
)

const (
	port = ":9092"
)

func main() {
	pgxPool := services.NewPgxConn()
	defer pgxPool.Close()

	s := server.NewServer(pgxPool, port)
	s.Run()
}
