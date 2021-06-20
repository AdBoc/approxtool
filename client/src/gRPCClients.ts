import { UserServiceClient } from './protos/UserServiceClientPb';
import { ModelServiceClient } from './protos/ModelServiceClientPb';
import { ApproximationServiceClient } from './protos/ApproximationServiceClientPb';

export const gRPCClients = {
  userServiceClient: new UserServiceClient('http://localhost:8080'),
  modelServiceClient: new ModelServiceClient('http://localhost:8080'),
  approximationClient: new ApproximationServiceClient('http://localhost:8080'),
};