import {GetRequest} from "@/api/ApiRequest";
import apiRoute from "@/api/ApiRouteCollection";
import {TProfileResponse} from "@/api/types";

class _ProfileRequest {
    _route: string;
    _response: TProfileResponse|null = null;

    constructor(userId: string) {
      this._route = apiRoute(
        'userProfile',
        {
          'userId': userId,
        }
      );
    }

    get response(): TProfileResponse|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new GetRequest(this._route);

        await request.sendWithAuthorization();

        this._response = request.response;
    }
}

export default _ProfileRequest;