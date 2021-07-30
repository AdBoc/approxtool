import { ApiServiceClient } from '../protos/ApiserviceServiceClientPb';
import { RefreshRequest } from '../protos/authservice_pb';
import { token } from '../utils/token';

// import * as grpcWeb from 'grpc-web';
// import { ApiServiceClient } from '../protos/ApiserviceServiceClientPb';
// class MyUnaryInterceptor implements grpcWeb.UnaryInterceptor<any, any> {
//   intercept(request: grpcWeb.Request<any, any>,
//             invoker: (request: grpcWeb.Request<any, any>) =>
//               Promise<grpcWeb.UnaryResponse<any, any>>) {
//     // const reqMsg = request.getRequestMessage();
//     // reqMsg.setMessage('[-out-]' + reqMsg.getMessage());
//     return invoker(request).then((response: grpcWeb.UnaryResponse<any, any>) => {
//       let result = '<-InitialMetadata->';
//       let initialMetadata = response.getMetadata();
//       for (let i in initialMetadata) {
//         result += i + ': ' + initialMetadata[i];
//       }
//       result += '<-TrailingMetadata->';
//       let trailingMetadata = response.getStatus().metadata;
//       for (let i in trailingMetadata) {
//         result += i + ': ' + trailingMetadata[i];
//       }
//       console.log(result);
//       const responseMsg = response.getResponseMessage();
//       // result += '[-in-]' + responseMsg.getMessage();
//       // responseMsg.setMessage(result);
//       return response;
//     });
//   }
// }
//
// const opts = {'unaryInterceptors': [new MyUnaryInterceptor()]};
//
// export const apiSrv = new ApiServiceClient('http://localhost:8080', null, opts);


export const apiSrv = new ApiServiceClient('http://localhost:8080');

export async function fetchWithAuthRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (e.code === 16 && (e.message === 'no access token was found' || e.message === 'invalid token')) {
      try {
        await handleRefresh();
        return await fn();
      } catch (e) {
        token.removeTokens();
        window.location.href = '/'; // TODO: Try using react history
        throw new Error('Auth Error');
      }
    }
    throw (e);
  }
}

async function handleRefresh() {
  const request = new RefreshRequest();
  request.setAccessToken(token.accessToken);
  request.setRefreshToken(token.refreshToken);
  const response = await apiSrv.refreshToken(request, null);
  const tokens = response.toObject();
  token.setRefreshToken = tokens.refreshToken;
  token.setAccessToken = tokens.accessToken
}