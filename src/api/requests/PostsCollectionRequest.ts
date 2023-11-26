import {GetRequest} from "@/api/ApiRequest";
import DateW3c from "@/util/DateW3c";
import {TPostsCollection} from "@/api/types";
import apiRoute from "@/api/ApiRouteCollection";

class PostsCollectionRequest {
    _route: string;
    _response: TPostsCollection = [];

    constructor(
        username: string,
        offset: number,
        limit: number
    ) {
        this._route = apiRoute(
            'postsCollection',
            {
                'user': username,
                'offset': offset.toString(),
                'limit': limit.toString(),
            }
        );
    }

    get response(): TPostsCollection
    {
        return this._response;
    }

    send = async (): Promise<void> => {
        const request = new GetRequest(this._route);

        await request.sendWithAuthorization();
        this._response = request.response;

        this._response = this._response.map((item: any) => {
            item.data.doneAt = null !== item.data.doneAt ? new DateW3c(item.data.doneAt) : null;
            item.data.createdAt = new DateW3c(item.data.createdAt);
            item.data.updatedAt = new DateW3c(item.data.updatedAt);

            return item;
        });
    }
}

export default PostsCollectionRequest;