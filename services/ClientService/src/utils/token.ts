type TokenData = {
  exp: number;
  user_id: number;
  user_role: string;
  username: string; // TODO: should be uuid?
};

class Token {
  private refreshTokenName = 'refresh_token';
  private accessTokenName = 'access_token';

  public refreshToken: string;
  public accessToken: string;

  constructor() {
    this.refreshToken = localStorage.getItem(this.refreshTokenName) || '';
    this.accessToken = localStorage.getItem(this.accessTokenName) || '';
  };

  public set setAccessToken(accessToken: string) {
    localStorage.setItem(this.accessTokenName, accessToken);
    this.accessToken = accessToken;
  };

  public set setRefreshToken(refreshToken: string) {
    localStorage.setItem(this.refreshTokenName, refreshToken);
    this.refreshToken = refreshToken;
  };

  public get decodedTokenData() {
    return JSON.parse(atob(this.accessToken.split('.')[1])) as TokenData;
  };

  public removeTokens() {
    localStorage.removeItem(this.refreshTokenName);
    localStorage.removeItem(this.accessTokenName);
    this.refreshToken = '';
    this.accessToken = '';
  };
}

export const token = new Token();