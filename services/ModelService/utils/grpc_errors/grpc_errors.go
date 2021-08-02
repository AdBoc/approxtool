package grpc_errors

import (
	"errors"
	"fmt"
	"github.com/jackc/pgx/v4"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func parsePgToGRPCStatusCode(err error) codes.Code {
	switch {
	case errors.Is(err, pgx.ErrNoRows):
		return codes.NotFound
	default:
		return codes.Internal
	}
}

func ErrorResponse(err error, msg string) error {
	return status.Errorf(parsePgToGRPCStatusCode(err), fmt.Sprintf("message: %s, original error: %v", msg, err))
}
