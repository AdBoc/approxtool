package server

import (
	"apisrv/protos/approx"
	"context"
)

//FitCurves Secured (user, admin)
func (s *Server) FitCurves(ctx context.Context, request *approx.CurveFitRequest) (*approx.CurveFitResult, error) {
	_, err := s.secureRpc(request.AccessToken)
	if err != nil {
		return nil, err
	}

	resp, err := s.ApproxClient.FitCurves(context.Background(), &approx.InternalCurveFitRequest{
		XData:       request.XData,
		YData:       request.YData,
		Expressions: request.Expressions,
	})

	if err != nil {
		return nil, err
	}
	return resp, nil
}
