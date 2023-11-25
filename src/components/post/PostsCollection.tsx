import React from "react";
import {useRouteLoaderData} from "react-router-dom";
import {TPostsCollection} from "@/api/types";
import PostView from "@/components/post/PostView";


const PostsCollection: React.FunctionComponent = () => {
    const { posts } = useRouteLoaderData('ann-user-posts-collection') as { posts: TPostsCollection };

    console.log('UserPostsCollection', posts);

    return (
        <>
            {
                posts.map(p => (
                    <PostView post={p} key={`post-${p.id}`}/>
                ))
            }
        </>
    )
}

export default PostsCollection;