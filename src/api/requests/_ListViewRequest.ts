import {GetRequest} from "@/api/ApiRequest";
import DateW3c from "@/util/DateW3c";
import {TAchievementListViewResponse} from "@/api/types";
import apiRoute from "@/api/ApiRouteCollection";

class _ListViewRequest {
  _route: string;
  _response: TAchievementListViewResponse|null = null;

  constructor(
    list: string,
  ) {
    this._route = apiRoute(
      'listView',
      {
        'list': list,
      }
    );
  }

  get response(): TAchievementListViewResponse
  {
    return this._response;
  }

  send = async (): Promise<void> => {
    const request = new GetRequest(this._route);

    await request.sendWithAuthorization();

    let response: any = request.response;

    response.createdAt = new DateW3c(response.createdAt);
    response.updatedAt = new DateW3c(response.updatedAt);

    this._response = response;
  }
}

export default _ListViewRequest;
