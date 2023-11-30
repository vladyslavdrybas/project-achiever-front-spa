import React, {useState} from "react";
import ActionsBlock from "@/components/ann/action/ActionsBlock";
import {useRouteLoaderData} from "react-router-dom";
import {TPostsCollection} from "@/api/types";
import PostListCollection from "@/components/post/PostListCollection";
import ShowMorePostsButton from "@/components/post/ShowMorePostsButton";
import {config} from "@/config";

const ListAchievementsPage: React.FunctionComponent = () => {
  const { profile } = useRouteLoaderData('list-root') as { profile: any };
  const { posts:loaderPosts } = useRouteLoaderData('list-concrete') as { posts: TPostsCollection };

  const [posts, setPosts] = useState<any>(loaderPosts);
  const [stateChangeTrigger, setStateChangeTrigger] = useState<boolean>(false);
  console.log('ListAchievementsPage', posts);

  const postChanger = (posts: any) => {
    setPosts(posts);
    setStateChangeTrigger(!stateChangeTrigger);
  }

  return (
    <>
      <ActionsBlock
        types={[config.features.achievement.title]}
        profile={profile}
        posts={posts}
        postChanger={postChanger}
      />

      <ShowMorePostsButton
        variant={config.api.load.timerange.newer}
        username={profile.username}
        target={config.features.achievement.title}
        posts={posts}
        postChanger={postChanger}
      />

      {/*<PostMasonryCollection posts={posts} />*/}
      <PostListCollection posts={posts} />

      <ShowMorePostsButton
        variant={config.api.load.timerange.older}
        username={profile.username}
        target={config.features.achievement.title}
        posts={posts}
        postChanger={postChanger}
      />
    </>
  )
}

export default ListAchievementsPage;
