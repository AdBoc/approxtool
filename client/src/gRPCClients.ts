import { UserServiceClient } from './protos/UserServiceClientPb';

export type GRPCClients = {
  userServiceClient: UserServiceClient;
};

export const gRPCClients = {
  userServiceClient: new UserServiceClient('http://localhost:8080')
};