import {StorageKeys} from "@/types/StorageKeys";
import _RefreshTokenRequest from "@/api/requests/_RefreshTokenRequest";
import {jwt_decode} from "@/util/Jwt";

enum ApiRequestMethods {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE",
}

export enum ApiRequestStatus {
    HTTP_OK = 200,
    HTTP_CREATED = 201,
    HTTP_ACCEPTED = 202,
    HTTP_BAD_REQUEST = 400,
    HTTP_UNAUTHORIZED = 401,
    HTTP_FORBIDDEN = 403,
    HTTP_NOT_FOUND = 405,
    HTTP_METHOD_NOT_ALLOWED = 405,
    HTTP_REQUEST_TIMEOUT = 408,
    HTTP_PRECONDITION_FAILED = 412,
    HTTP_INTERNAL_SERVER_ERROR = 500,
    HTTP_NOT_IMPLEMENTED = 501,
    HTTP_BAD_GATEWAY = 502,
    HTTP_SERVICE_UNAVAILABLE = 503,
    HTTP_GATEWAY_TIMEOUT = 504,
    HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511,
}

interface IApiRequest {
    route: string;
    method: ApiRequestMethods;
    headers: Record<string, string>;
    body: string;
    response: any;
    accessToken(): string;
    refreshTokenIfExpired(): Promise<void>;
    send(): Promise<any>;
    sendWithAuthorization(): Promise<any>;
    addHeader(header: IHeaderKeyPair): Record<string, string>;
    addAuthorizationHeader(): void;
    removeHeader(key: string): Record<string, string>;
    setMethod(value: ApiRequestMethods): void;
    isStatusOk(): boolean;
}

interface IHeaderKeyPair {
    key: string;
    value: string;
}

type TApiRequestErrorInput = {
    message: string;
    status: number;
    route?: string;
}

export class ApiRequestError extends Error {
    _status: number;
    _route: string;

    constructor(body: TApiRequestErrorInput) {
        super(body.message);

        this._status = body.status;
        this._route = body.route ?? '';
    }

    get status(): number
    {
        return this._status;
    }

    get route(): string
    {
        return this._route;
    }

    toString = (): string => {
        return this.message;
    }
}

class ApiRequest {
    _headers: Record<string, string>;
    _route: string;
    _body: string;
    _status: number;
    _response: any;
    _method: ApiRequestMethods;

    constructor(
        route: string,
        body: string,
        mtd: ApiRequestMethods = ApiRequestMethods.Get
    ) {
        this._method = mtd;
        this._route = route;
        this._body = body;
        this._status = 404;
        this._headers = {};
        this._response = null;
        this.addHeader({key: "Content-Type", value: "application/json"});
        this.addHeader({key: "Access-Control-Allow-Origin", value: "*"});
        this.addHeader({key: "ngrok-skip-browser-warning", value: "69420"});
    }

    get status(): number
    {
        return this._status;
    }

    get route(): string
    {
        return this._route;
    }

    get body(): string
    {
        return this._body;
    }

    get response(): any
    {
        return this._response;
    }

    get headers(): Record<string, string>
    {
        return this._headers;
    }

    get method(): ApiRequestMethods
    {
        return this._method;
    }

    accessToken = (): string => {
        throw new ApiRequestError(
            {
                message: "Access token required.",
                status: ApiRequestStatus.HTTP_UNAUTHORIZED,
                route: this.route,
            }
        )
    }

    addHeader = (header: IHeaderKeyPair): Record<string, string> => {
        this._headers[header.key] = header.value;
        return this._headers;
    }

    addAuthorizationHeader = (): void => {
        this.addHeader({key: "Authorization", value: "Bearer " + this.accessToken()});
    }

    removeHeader = (key: string): Record<string, string> => {
        delete this._headers[key];
        return this._headers;
    }

    setMethod = (value: ApiRequestMethods): void => {
        this._method = value;
    }

    isStatusOk = (): boolean => {
        return !(this.status < 200 || this.status > 299 || this.response === null);
    }

    refreshTokenIfExpired = async (): Promise<void> => {
        const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN) ?? null;

        if (null === refreshToken) {
            return;
        }

        const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN) ?? '';
        const jwt = jwt_decode(accessToken);

        if (null === jwt) {
            const request = new _RefreshTokenRequest();
            await request.send();
        }
    }

    sendWithAuthorization = async (): Promise<any> => {
        await this.refreshTokenIfExpired();

        (new AccessTokenReader()).decorate(this);
        this.addAuthorizationHeader();

        await this.send();
    }

    send = async (): Promise<any> => {
        if (this.route === '') {
            throw new ApiRequestError(
                {
                    message: "Cannot send to empty route.",
                    status: ApiRequestStatus.HTTP_NOT_FOUND,
                    route: this.route,
                }
            );
        }

        const init: any = {
            method: this.method,
            headers: this.headers,
        };

        if (this.method !== ApiRequestMethods.Get) {
            init.body = this.body;
        }

        console.log({
            requestHeaders: this.headers,
            requestRoute: this.route,
            requestBody: this.body,
            requestMethod: this.method,
        })

        const response = await fetch(this.route, init);

        if (response.headers.get("Content-type") === "application/json") {
            this._response = await response.json();

            console.log({
                status: response.status,
                body: this._response,
                responseHeaders: response.headers,
                requestHeaders: this.headers,
                requestRoute: this.route,
            })
        }
        this._status = response.status;

        if (!this.isStatusOk()) {
            console.log({
                status: response.status,
                body: response.body,
                responseHeaders: response.headers,
                requestHeaders: this.headers,
                requestRoute: this.route,
            })

            throw new ApiRequestError(
                {
                    message: this.response?.message ?? "Request failed.",
                    status: response.status,
                    route: this.route,
                }
            );
        }

        return this.response;
    }
}

interface IRequestDecorator {
    decorate(request: IApiRequest): void;
}

interface IAccessTokenReader {}
class AccessTokenReader implements IRequestDecorator, IAccessTokenReader {
    decorate = (request: IApiRequest): void => {
        request.accessToken = (): string => {
            const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN) ?? null;
            if (null === accessToken) {
                throw new ApiRequestError(
                    {
                        message: "Access token is not set.",
                        status: ApiRequestStatus.HTTP_UNAUTHORIZED,
                        route: request.route,
                    }
                )
            }

            return accessToken;
        };
    }
}

interface IAccessTokenWriter{}
class AccessTokenWriter implements IRequestDecorator, IAccessTokenWriter {
    decorate = (request: IApiRequest): void => {
        request.accessToken = (): string => {
            const response = request.response;

            if (!response.hasOwnProperty('token')) {
                throw new ApiRequestError(
                    {
                        message: "Access token is not received.",
                        status: ApiRequestStatus.HTTP_UNAUTHORIZED,
                        route: request.route,
                    }
                )
            }

            if (!response.hasOwnProperty('refresh_token')) {
                throw new ApiRequestError(
                    {
                        message: "Refresh token is not received.",
                        status: ApiRequestStatus.HTTP_UNAUTHORIZED,
                        route: request.route,
                    }
                )
            }

            const payload = jwt_decode(response.token);

            localStorage.setItem(StorageKeys.LOGGED_USER_ID, payload.id);
            localStorage.setItem(StorageKeys.LOGGED_USER_USERNAME, payload.username);
            localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.token);
            localStorage.setItem(StorageKeys.REFRESH_TOKEN, response.refresh_token);

            const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN) ?? null;
            if (null === accessToken) {
                throw new ApiRequestError(
                    {
                        message: "Access token is not set.",
                        status: ApiRequestStatus.HTTP_UNAUTHORIZED,
                        route: request.route,
                    }
                )
            }

            return accessToken;
        }
    }
}

interface IGetRequest {}
class GetRequest extends ApiRequest implements IGetRequest {
    constructor(
        route: string
    ) {
        super(route, '', ApiRequestMethods.Get);
    }
}

interface IPostRequest {}
class PostRequest extends ApiRequest implements IPostRequest {
    constructor(
        route: string,
        body: string
    ) {
        super(route, body, ApiRequestMethods.Post);
    }
}

interface IPutRequest {}
class PutRequest extends ApiRequest implements IPutRequest {
    constructor(
        route: string,
        body: string
    ) {
        super(route, body, ApiRequestMethods.Put);
    }
}

interface IDeleteRequest {}
class DeleteRequest extends ApiRequest implements IDeleteRequest {
    constructor(
        route: string
    ) {
        super(route, '', ApiRequestMethods.Delete);
    }
}

export type {
    IRequestDecorator,
    IApiRequest,
}

export {
    AccessTokenReader,
    AccessTokenWriter,
    ApiRequest,
    GetRequest,
    PostRequest,
    PutRequest,
    DeleteRequest,
};
