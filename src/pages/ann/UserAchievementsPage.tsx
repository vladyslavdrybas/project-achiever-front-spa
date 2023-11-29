import React, {useState} from "react";
import ActionsBlock from "@/components/ann/action/ActionsBlock";
import {useRouteLoaderData} from "react-router-dom";
import {TPostsCollection, TProfileResponse} from "@/api/types";
import PostListCollection from "@/components/post/PostListCollection";

const UserAchievementsPage: React.FunctionComponent = () => {
  const { profile } = useRouteLoaderData('ann-user') as { profile: TProfileResponse };
  const { posts:loaderPosts } = useRouteLoaderData('ann-user-achievements-collection') as { posts: TPostsCollection };

  const [posts, setPosts] = useState<any>(loaderPosts);
  const [newPostId, setNewPostId] = useState<string|null>(null);
  console.log('UserAchievementsPage', posts);

  const postChanger = (posts: any, newPostId: string) => {
    setPosts(posts);
    setNewPostId(newPostId);
  }

  return (
    <>
      <ActionsBlock
        types={['achievement']}
        profile={profile}
        posts={posts}
        postChanger={postChanger}
      />
      {/*<PostMasonryCollection posts={posts} />*/}
      <PostListCollection posts={posts} />
    </>
  )
}

export default UserAchievementsPage;
