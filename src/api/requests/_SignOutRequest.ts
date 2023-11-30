import {ApiRequestError, ApiRequestStatus, PostRequest} from "@/api/ApiRequest";
import {StorageKeys} from "@/types/StorageKeys";
import apiRoute from "@/api/ApiRouteCollection";

class _SignOutRequest {
    _route: string;
    _response: any = null;

    constructor() {
      this._route = apiRoute('logout');
    }

    get response(): any
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

        await request.send();

        localStorage.removeItem(StorageKeys.LOGGED_USER_ID);
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(StorageKeys.REFRESH_TOKEN);

        this._response = request.response;
    }
}

export default _SignOutRequest;
