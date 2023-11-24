import {GetRequest} from "@/api/ApiRequest";
import DateW3c from "@/util/DateW3c";
import apiRoute from "@/api/ApiRouteCollection";
import {TAchievementViewResponse} from "@/api/types";

class AchievementViewRequest {
    _route: string;
    _response: TAchievementViewResponse|null = null;

    constructor(
      achievementListId: string,
      achievementId: string
    ) {
      this._route = apiRoute(
        'achievementView',
        {
          'listId': achievementListId,
          'achievementId': achievementId,
        }
      );
    }

    get response(): TAchievementViewResponse|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new GetRequest(this._route);

        await request.sendWithAuthorization();

        let response: any = request.response;

        response.doneAt = null !== response.doneAt ? new DateW3c(response.doneAt) : null;
        response.createdAt = new DateW3c(response.createdAt);
        response.updatedAt = new DateW3c(response.updatedAt);

        this._response = response;
    }
}

export default AchievementViewRequest;
