import {
    AccessTokenWriter,
    ApiRequestError,
    ApiRequestStatus,
    PostRequest
} from "@/api/ApiRequest";
import {StorageKeys} from "@/types/StorageKeys";
import apiRoute from "@/api/ApiRouteCollection";
import {TSignInResponse} from "@/api/types";

class RefreshTokenRequest {
    _route: string;
    _response: TSignInResponse|null = null;

    constructor() {
      this._route = apiRoute('accessTokenRefresh');
    }

    get response(): TSignInResponse|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN) ?? null;

        if (null === refreshToken) {
            localStorage.removeItem(StorageKeys.LOGGED_USER_ID);
            localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
            localStorage.removeItem(StorageKeys.REFRESH_TOKEN);

            throw new ApiRequestError(
                {
                    message: "Refreshing. Refresh token is not set.",
                    status: ApiRequestStatus.HTTP_UNAUTHORIZED,
                    route: this._route,
                }
            )
        }

        const request = new PostRequest(
            this._route,
            JSON.stringify({
                "refresh_token": refreshToken,
            })
        );

        try {
            (new AccessTokenWriter()).decorate(request);

            await request.send();

            request.accessToken();
        } catch (e) {
            console.log(e);
            console.log(request.status);
            if (request.status === ApiRequestStatus.HTTP_UNAUTHORIZED) {
                localStorage.removeItem(StorageKeys.LOGGED_USER_ID);
                localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
                localStorage.removeItem(StorageKeys.REFRESH_TOKEN);

                window.location.href= '/signin';
            }

            throw e;
        }

        this._response = {
          accessToken: request.response.token,
          refreshToken: request.response.refresh_token,
        };
    }
}

export default RefreshTokenRequest;
