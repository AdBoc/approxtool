import { UserServiceClient } from './protos/userService/protos/UserServiceClientPb';

export type GRPCClients = {
  userServiceClient: UserServiceClient;
};

// TODO: Wrong port?
export const gRPCClients = {
  userServiceClient: new UserServiceClient('http://localhost:3000')
};