package server

import (
	"apisrv/protos/approx"
	"context"
)

//FitCurves Secured (user, admin)
func (s *Server) FitCurves(ctx context.Context, request *approx.CurveFitRequest) (*approx.CurveFitResult, error) {
	resp, err := s.ApproxClient.FitCurves(context.Background(), request)
	if err != nil {
		return nil, err
	}
	return resp, nil
}
