// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package approx

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ApproximationServiceClient is the client API for ApproximationService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ApproximationServiceClient interface {
	FitCurves(ctx context.Context, in *InternalCurveFitRequest, opts ...grpc.CallOption) (*CurveFitResult, error)
}

type approximationServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewApproximationServiceClient(cc grpc.ClientConnInterface) ApproximationServiceClient {
	return &approximationServiceClient{cc}
}

func (c *approximationServiceClient) FitCurves(ctx context.Context, in *InternalCurveFitRequest, opts ...grpc.CallOption) (*CurveFitResult, error) {
	out := new(CurveFitResult)
	err := c.cc.Invoke(ctx, "/protos.ApproximationService/FitCurves", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ApproximationServiceServer is the server API for ApproximationService service.
// All implementations must embed UnimplementedApproximationServiceServer
// for forward compatibility
type ApproximationServiceServer interface {
	FitCurves(context.Context, *InternalCurveFitRequest) (*CurveFitResult, error)
	mustEmbedUnimplementedApproximationServiceServer()
}

// UnimplementedApproximationServiceServer must be embedded to have forward compatible implementations.
type UnimplementedApproximationServiceServer struct {
}

func (UnimplementedApproximationServiceServer) FitCurves(context.Context, *InternalCurveFitRequest) (*CurveFitResult, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FitCurves not implemented")
}
func (UnimplementedApproximationServiceServer) mustEmbedUnimplementedApproximationServiceServer() {}

// UnsafeApproximationServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ApproximationServiceServer will
// result in compilation errors.
type UnsafeApproximationServiceServer interface {
	mustEmbedUnimplementedApproximationServiceServer()
}

func RegisterApproximationServiceServer(s grpc.ServiceRegistrar, srv ApproximationServiceServer) {
	s.RegisterService(&ApproximationService_ServiceDesc, srv)
}

func _ApproximationService_FitCurves_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(InternalCurveFitRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApproximationServiceServer).FitCurves(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/protos.ApproximationService/FitCurves",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApproximationServiceServer).FitCurves(ctx, req.(*InternalCurveFitRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ApproximationService_ServiceDesc is the grpc.ServiceDesc for ApproximationService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ApproximationService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "protos.ApproximationService",
	HandlerType: (*ApproximationServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "FitCurves",
			Handler:    _ApproximationService_FitCurves_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "approximationservice.proto",
}
