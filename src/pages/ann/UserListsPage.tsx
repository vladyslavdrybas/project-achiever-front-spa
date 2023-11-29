import React, {useState} from "react";
import ActionsBlock from "@/components/ann/action/ActionsBlock";
import {useRouteLoaderData} from "react-router-dom";
import {TProfileResponse} from "@/api/types";
import PostListCollection from "@/components/post/PostListCollection";

const UserListsPage: React.FunctionComponent = () => {
  const { profile } = useRouteLoaderData('ann-user') as { profile: TProfileResponse };
  const { posts:loaderPosts } = useRouteLoaderData('ann-user-lists-collection') as { posts: any };

  const [posts, setPosts] = useState<any>(loaderPosts);
  const [newPostId, setNewPostId] = useState<string|null>(null);
  console.log('UserListsPage', posts);

  const postChanger = (posts: any, newPostId: string) => {
    setPosts(posts);
    setNewPostId(newPostId);
  }

  return (
    <>
      <ActionsBlock
        types={['list']}
        profile={profile}
        posts={posts}
        postChanger={postChanger}
      />
      {/*<PostMasonryCollection posts={posts} />*/}
      <PostListCollection posts={posts} />
    </>
  )
}

export default UserListsPage;
