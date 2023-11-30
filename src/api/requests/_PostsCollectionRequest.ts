import {GetRequest} from "@/api/ApiRequest";
import DateW3c from "@/util/DateW3c";
import {TPostsCollection} from "@/api/types";
import apiRoute from "@/api/ApiRouteCollection";

class _PostsCollectionRequest {
    _route: string;
    _response: TPostsCollection = [];

    constructor(
        username: string,
        timestamp: number,
        offset: number,
        limit: number,
        variant: string
    ) {
        this._route = apiRoute(
            'postsCollection',
            {
                'user': username,
                'timestamp': timestamp.toString(),
                'offset': offset.toString(),
                'limit': limit.toString(),
                'variant': variant,
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
            item.createdAt = new DateW3c(item.createdAt);
            item.updatedAt = new DateW3c(item.updatedAt);
            item.data.doneAt = null !== item.data.doneAt ? new DateW3c(item.data.doneAt) : null;
            item.data.createdAt = new DateW3c(item.data.createdAt);
            item.data.updatedAt = new DateW3c(item.data.updatedAt);

            return item;
        });
    }
}

export default _PostsCollectionRequest;
