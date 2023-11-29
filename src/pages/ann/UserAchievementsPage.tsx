import React, {useState} from "react";
import ActionsBlock from "@/components/ann/action/ActionsBlock";
import {useRouteLoaderData} from "react-router-dom";
import {TPostsCollection, TProfileResponse} from "@/api/types";
import PostListCollection from "@/components/post/PostListCollection";
import ShowMorePostsButton from "@/components/post/ShowMorePostsButton";

const UserAchievementsPage: React.FunctionComponent = () => {
  const { profile } = useRouteLoaderData('ann-user') as { profile: TProfileResponse };
  const { posts:loaderPosts } = useRouteLoaderData('ann-user-achievements-collection') as { posts: TPostsCollection };

  const [posts, setPosts] = useState<any>(loaderPosts);
  const [stateChangeTrigger, setStateChangeTrigger] = useState<boolean>(false);
  console.log('UserAchievementsPage', posts);

  const postChanger = (posts: any) => {
    setPosts(posts);
    setStateChangeTrigger(!stateChangeTrigger);
  }

  return (
    <>
      <ActionsBlock
        types={['achievement']}
        profile={profile}
        posts={posts}
        postChanger={postChanger}
      />
      <ShowMorePostsButton
        variant={'newer'}
        username={profile.username}
        type={'achievement'}
        posts={posts}
        postChanger={postChanger}
      />
      {/*<PostMasonryCollection posts={posts} />*/}
      <PostListCollection posts={posts} />

      <ShowMorePostsButton
        variant={'older'}
        username={profile.username}
        type={'achievement'}
        posts={posts}
        postChanger={postChanger}
      />
    </>
  )
}

export default UserAchievementsPage;
