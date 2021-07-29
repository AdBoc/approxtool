import { ApiServiceClient } from '../protos/ApiserviceServiceClientPb';
import { RefreshRequest } from '../protos/authservice_pb';
import { token } from '../utils/token';

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
        window.location.href = "/"; // TODO: Try using react history
        throw new Error('Auth Error');
      }
    }
    throw new Error(e)
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