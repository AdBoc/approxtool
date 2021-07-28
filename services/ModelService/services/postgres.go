package services

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
	"os"
)

func NewPgxConn() *pgxpool.Pool {
	ctx := context.Background()

	dbUser := os.Getenv("DB_USER")
    dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
    dbName := os.Getenv("DB_NAME")
    dbPort := os.Getenv("DB_PORT")
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", dbUser, dbPass, dbHost, dbPort, dbName)

	poolCfg, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		log.Fatal("error configuring the database: ", err)
	}

	connPool, err := pgxpool.ConnectConfig(ctx, poolCfg)
	if err != nil {
		log.Fatal("error connecting to the database: ", err)
	}

	return connPool
}
