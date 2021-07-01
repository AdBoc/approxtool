package services

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
)

func NewPgxConn() *pgxpool.Pool {
	ctx := context.Background()
	poolCfg, err := pgxpool.ParseConfig("postgres://postgres:postgres@postgres:5432/approx_tool?sslmode=disable")
	if err != nil {
		log.Fatal("error configuring the database: ", err)
	}

	conn, err := pgxpool.ConnectConfig(ctx, poolCfg)
	if err != nil {
		log.Fatal("error connecting to the database: ", err)
	}

	return conn
}
