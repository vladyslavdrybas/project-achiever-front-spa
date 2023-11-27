import React from "react";
import ActionsBlock from "@/components/an/action/ActionsBlock";
import {useRouteLoaderData} from "react-router-dom";
import {TPostsCollection, TProfileResponse} from "@/api/types";
import PostView from "@/components/post/PostView";

const UserAchievementsPage: React.FunctionComponent = () => {
  const { profile } = useRouteLoaderData('ann-user') as { profile: TProfileResponse };
  const { posts } = useRouteLoaderData('ann-user-posts-collection') as { posts: TPostsCollection };
  console.log('UserAchievementsPage', posts);

  return (
    <>
      <ActionsBlock types={['achievements']} profile={profile} />
      {
        posts.map(p => (
          <PostView post={p} key={`post-${p.id}`}/>
        ))
      }
    </>
  )
}

export default UserAchievementsPage;
