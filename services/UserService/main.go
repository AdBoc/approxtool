package main

import (
	"usersrv/server"
	"usersrv/services"
	"os"
)

func main() {
	pgxPool := services.NewPgxConn()
	defer pgxPool.Close()

	s := server.NewServer(pgxPool, os.Getenv("PORT"))
	s.Run()
}
