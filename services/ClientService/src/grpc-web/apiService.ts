import { ApiServiceClient } from '../protos/ApiserviceServiceClientPb';
import {
  LoginRequest,
  LoginResponse,
  RefreshRequest
} from '../protos/authservice_pb';
import { token } from '../utils/token';
import {
  ChangePasswordRequest,
  ChangePrivilegeRequest,
  DeleteUserRequest,
  NewUserRequest,
  SearchRequest,
  SearchResponse,
  UserResponse
} from '../protos/userservice_pb';
import {
  DeleteModelRequest,
  EditTagRequest,
  GetModelsRequest,
  GetModelsResponse,
  NewModelRequest,
  NewModelResponse
} from '../protos/modelservice_pb';
import {
  CurveFitRequest,
  CurveFitResult,
  Expression,
  RequestExpressionParameter
} from '../protos/approximationservice_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { API_CLIENT } from '../constants/constants';
import { FitStateExpression } from '../types';
import { Role } from '../constants/role';

type Methods = 'changeUserPrivilege'
  | 'createUser'
  | 'deleteUser'
  | 'searchForUsers'
  | 'changePassword'
  | 'addModel'
  | 'editTag'
  | 'deleteModel'
  | 'getUserModels'
  | 'fitCurves';

type Request = NewUserRequest 
  | DeleteUserRequest 
  | SearchRequest 
  | ChangePasswordRequest 
  | NewModelRequest
  | EditTagRequest 
  | DeleteModelRequest 
  | GetModelsRequest 
  | CurveFitRequest;

class ApiService {
  private client: ApiServiceClient;

  constructor() {
    this.client = new ApiServiceClient(API_CLIENT);
  }

  private async withRetry(method: Methods, request: Request, metadata: null) {
    try {
      return await (this.client as any)[method](request, metadata);
    } catch (err: any) {
      if (err.code === 16) {
        if (err.message === 'token is expired') {
          await this.refreshToken(method, request, metadata);
        } else {
          this.deleteToken();
        }
      }
      throw err;
    };
  }

  private deleteToken() {
    token.removeTokens();
    window.location.href = '/';
  }

  private async refreshToken(method: any, request: any, metadata: any) {
    try {
      const authRequest = new RefreshRequest();
      authRequest.setRefreshToken(token.refreshToken);
      const response = await this.client.refreshToken(authRequest, null);

      const { refreshToken, accessToken } = response.toObject();
      token.setRefreshToken = refreshToken;
      token.setAccessToken = accessToken;
      request.setAccessToken(accessToken);
      
      return (this.client as any)[method](request, metadata);
    } catch (err: any) {
      this.deleteToken();
    } 
  }

  //Auth Service
  public async Login(email: string, password: string): Promise<LoginResponse> {
    const request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);
    
    const response = await this.client.login(request, null);

    const { accessToken, refreshToken } = response.toObject();
    token.setAccessToken = accessToken;
    token.setRefreshToken = refreshToken;

    return response;
  };

  // User Service
  public ChangeUserPrivilege(userId: number): Promise<Empty> {
    const request = new ChangePrivilegeRequest();
    request.setUserid(userId);
    request.setNewrole(Role.ADMIN);
    request.setAccessToken(token.accessToken);

    return this.withRetry('changeUserPrivilege', request, null);
  };

  public CreateUser(name: string, email: string, password: string): Promise<UserResponse> {
    const request = new NewUserRequest();
    request.setUsername(name);
    request.setEmail(email);
    request.setPassword(password);
    request.setRole(Role.USER);
    request.setAccessToken(token.accessToken);

    return this.withRetry('createUser', request, null);
  };

  public DeleteUser(userId: number): Promise<Empty> {
    const request = new DeleteUserRequest();
    request.setId(userId);
    request.setAccessToken(token.accessToken);

    return this.withRetry('deleteUser', request, null);
  };

  public SearchForUsers(userQuery: string, keySetVal: number): Promise<SearchResponse> {
    const request = new SearchRequest();
    request.setSearchquery(userQuery);
    request.setKeysetvalue(keySetVal);
    request.setAccessToken(token.accessToken);

    return this.withRetry('searchForUsers', request, null);
  };

  public ChangePassword(userId: number, newPassword: string): Promise<Empty> {
    const request = new ChangePasswordRequest();
    request.setUserid(userId)
    request.setNewpassword(newPassword);
    request.setAccessToken(token.accessToken);

    return this.withRetry('changePassword', request, null);
  };

  // Model Service
  public AddModel(name: string, expression: string, lexexpression: string, tag: string): Promise<NewModelResponse> {
    const request = new NewModelRequest();
    request.setName(name);
    request.setExpression(expression);
    request.setLexexpression(lexexpression);
    request.setTag(tag);
    request.setAccessToken(token.accessToken);

    return this.withRetry('addModel', request, null);
  };

  public EditTag(modelId: number, tag: string): Promise<Empty> {
    const request = new EditTagRequest();
    request.setAccessToken(token.accessToken);
    request.setModelid(modelId);
    request.setNewtag(tag);

    return this.withRetry('editTag', request, null);
  };

  public DeleteModel(modelId: number): Promise<Empty> {
    const request = new DeleteModelRequest();
    request.setModelid(modelId);
    request.setAccessToken(token.accessToken);

    return this.withRetry('deleteModel', request, null);
  };

  public GetUserModels(): Promise<GetModelsResponse> {
    const request = new GetModelsRequest();
    request.setAccessToken(token.accessToken);

    return this.withRetry('getUserModels', request, null);
  };

  // Approx Service
  public FitCurves(modelsList: FitStateExpression[], xData: number[], yData: number[]): Promise<CurveFitResult> {
    const expressions: Expression[] = [];

    modelsList.forEach(({ id, name, expression, lexexpression, params }) => {
      const parsedParams = params.map(param => {
        const requestParams = new RequestExpressionParameter();

        requestParams.setParamname(param.paramName);
        requestParams.setParamvalue(param.paramValue);
        requestParams.setMinbound(param.minBound);
        requestParams.setMaxbound(param.maxBound);

        return requestParams;
      });

      const newExpression = new Expression();

      newExpression.setId(id);
      newExpression.setName(name);
      newExpression.setExpression(expression);
      newExpression.setLexExpression(lexexpression);
      newExpression.setParametersList(parsedParams);

      expressions.push(newExpression);
    });

    const request = new CurveFitRequest();

    request.setExpressionsList(expressions);
    request.setXDataList(xData);
    request.setYDataList(yData);
    request.setAccessToken(token.accessToken);

    return this.withRetry('fitCurves', request, null);
  };
}

export const apiService = new ApiService();
