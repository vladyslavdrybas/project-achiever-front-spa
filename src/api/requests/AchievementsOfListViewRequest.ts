import {GetRequest} from "@/api/ApiRequest";
import DateW3c from "@/util/DateW3c";
import {TAchievementsCollectionResponse} from "@/api/types";
import apiRoute from "@/api/ApiRouteCollection";

class AchievementsOfListViewRequest {
  _route: string;
  _response: TAchievementsCollectionResponse = [];

  constructor(
    listId: string,
    offset: number,
    limit: number
  ) {
    this._route = apiRoute(
      'achievementsOfListView',
      {
        'listId': listId,
        'offset': offset.toString(),
        'limit': limit.toString(),
      }
    );
  }

  get response(): TAchievementsCollectionResponse
  {
    return this._response;
  }

  send = async (): Promise<void> => {
    const request = new GetRequest(this._route);

    await request.sendWithAuthorization();

    this._response = request.response.map((item: any) => {
      item.doneAt = null !== item.doneAt ? new DateW3c(item.doneAt) : null;
      item.createdAt = new DateW3c(item.createdAt);
      item.updatedAt = new DateW3c(item.updatedAt);

      return item;
    });
  }
}

export default AchievementsOfListViewRequest;
