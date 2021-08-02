package main

import (
	"os"
	"usersrv/server"
	"usersrv/services"
)

func main() {
	pgxPool := services.NewPgxConn()
	defer pgxPool.Close()

	s := server.NewServer(pgxPool, os.Getenv("PORT"))
	s.Run()
}
