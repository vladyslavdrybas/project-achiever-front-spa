import {GetRequest} from "@/api/ApiRequest";
import apiRoute from "@/api/ApiRouteCollection";
import {TUserViewCollection} from "@/api/types";

class UserListPublicViewRequest {
    _route: string;
    _response: TUserViewCollection = [];

    constructor(
      offset: number,
      limit: number
    ) {
      this._route = apiRoute(
        'userListPublic',
        {
          'offset': offset.toString(),
          'limit': limit.toString(),
        }
      );
    }

    get response(): TUserViewCollection
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new GetRequest(this._route);

        await request.sendWithAuthorization();

        this._response = request.response;
    }
}

export default UserListPublicViewRequest;
