package services

import (
	"context"
	"github.com/jackc/pgx/v4"
	"log"
)

func NewPgxConn() *pgx.Conn {
	ctx := context.Background()
	poolCfg, err := pgx.ParseConfig("postgres://postgres:postgres@postgres:5432/model_service?sslmode=disable")
	if err != nil {
		log.Fatal("error configuring the database: ", err)
	}

	conn, err := pgx.ConnectConfig(ctx, poolCfg)
	if err != nil {
		log.Fatal("error connecting to the database: ", err)
	}

	return conn
}
