package main

import (
	"modelsrv/server"
	"modelsrv/services"
	"os"
)

func main() {
	pgxPool := services.NewPgxConn()
	defer pgxPool.Close()

	s := server.NewServer(pgxPool, os.Getenv("PORT"))
	s.Run()
}
