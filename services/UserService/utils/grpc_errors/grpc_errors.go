package grpc_errors

import (
	"errors"
	"fmt"
	"github.com/jackc/pgx/v4"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func parsePgToGRPCStatusCode(err error) codes.Code {
	switch {
	case errors.Is(err, pgx.ErrNoRows):
		return codes.NotFound
	case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
		return codes.Unauthenticated
	default:
		return codes.Internal
	}
}

func ErrorResponse(err error, msg string) error {
	return status.Errorf(parsePgToGRPCStatusCode(err), fmt.Sprintf("%s %v", msg, err))
}

//to long char error: value too long for type character varying(50) (SQLSTATE 22001) ERROR: value too long for type character varying(50) (SQLSTATE 22001)"
