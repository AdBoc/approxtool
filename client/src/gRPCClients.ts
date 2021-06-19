import { UserServiceClient } from './protos/UserServiceClientPb';
import { ModelServiceClient } from './protos/ModelServiceClientPb';

export const gRPCClients = {
  userServiceClient: new UserServiceClient('http://localhost:8080'),
  modelServiceClient: new ModelServiceClient('http://localhost:8080'),
};