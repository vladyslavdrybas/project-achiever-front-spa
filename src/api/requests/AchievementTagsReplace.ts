import {PutRequest} from "@/api/ApiRequest";
import DateW3c from "@/util/DateW3c";
import {TAchievementViewResponse} from "@/api/types";


class AchievementTagsReplace {
    _host: string;
    _tags: string[];
    _route: string;
    _response: TAchievementViewResponse|null = null;

    constructor(achievementId: string, tags: string[]) {
        this._host = process.env.NEXT_PUBLIC_HOST_ROUTE ?? '';
        this._route = process.env.NEXT_PUBLIC_ACHIEVEMENTS_TAGS_REPLACE_ROUTE ?? '';
        this._route = this._route.replace('{{achievement_id}}', achievementId);
        this._route = this._host + this._route;
        this._tags = tags;
        this._response = null;
    }

    get response(): TAchievementViewResponse|null
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new PutRequest(
            this._route,
            JSON.stringify({
                "tags": this._tags
            })
        );

        await request.sendWithAuthorization();

        let response: any = request.response;

        response.doneAt = null !== response.doneAt ? new DateW3c(response.doneAt) : null;
        response.createdAt = new DateW3c(response.createdAt);
        response.updatedAt = new DateW3c(response.updatedAt);

        this._response = response;
    }
}

export default AchievementTagsReplace;
