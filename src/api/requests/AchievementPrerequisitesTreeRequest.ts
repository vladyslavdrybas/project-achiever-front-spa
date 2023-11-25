import {GetRequest} from "@/api/ApiRequest";
import apiRoute from "@/api/ApiRouteCollection";
import {TAchievementPrerequisites} from "@/api/types";

class AchievementPrerequisitesViewRequest {
    _route: string;
    _response: TAchievementPrerequisites|null = null;

    constructor(
      achievementId: string
    ) {
      this._route = apiRoute(
        'achievementPrerequisitesTree',
        {
          'achievementId': achievementId,
        }
      );
    }

    get response(): TAchievementPrerequisites|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new GetRequest(this._route);

        await request.sendWithAuthorization();

        this._response = request.response;
    }
}

export default AchievementPrerequisitesViewRequest;
