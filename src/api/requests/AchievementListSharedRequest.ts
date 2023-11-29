import {GetRequest} from "@/api/ApiRequest";
import DateW3c from "@/util/DateW3c";
import {TAchievementListCollectionResponse} from "@/api/types";
import apiRoute from "@/api/ApiRouteCollection";

class AchievementListOwnedRequest {
  _route: string;
  _response: TAchievementListCollectionResponse = [];

  constructor(
    username: string,
    offset: number,
    limit: number
  ) {
    this._route = apiRoute(
      'achievementListShared',
      {
        'user': username,
        'offset': offset.toString(),
        'limit': limit.toString(),
      }
    );
  }

  get response(): TAchievementListCollectionResponse
  {
    return this._response;
  }

  send = async (): Promise<void> => {
    const request = new GetRequest(this._route);

    await request.sendWithAuthorization();

    this._response = request.response.map((item: any) => {
      item.createdAt = new DateW3c(item.createdAt);
      item.updatedAt = new DateW3c(item.updatedAt);
      item.data.createdAt = new DateW3c(item.data.createdAt);
      item.data.updatedAt = new DateW3c(item.data.updatedAt);

      return item;
    });
  }
}

export default AchievementListOwnedRequest;
