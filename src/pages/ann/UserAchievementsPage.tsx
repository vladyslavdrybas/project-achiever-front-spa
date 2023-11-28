import React, {useState} from "react";
import ActionsBlock from "@/components/ann/action/ActionsBlock";
import {useRouteLoaderData} from "react-router-dom";
import {TPostsCollection, TProfileResponse} from "@/api/types";
import PostView from "@/components/post/PostView";
import {Masonry} from "@mui/lab";
import {Box} from "@mui/material";

const UserAchievementsPage: React.FunctionComponent = () => {
  const { profile } = useRouteLoaderData('ann-user') as { profile: TProfileResponse };
  const { posts:loaderPosts } = useRouteLoaderData('ann-user-posts-collection') as { posts: TPostsCollection };

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
        types={['achievements']}
        profile={profile}
        posts={posts}
        postChanger={postChanger}
      />
      <Masonry
        columns={{xs:1, md:2}}
        spacing={0}
        sx={{
          overflow: 'hidden',
          padding: '1px',
          marginLeft: '-8px',
          width: 'calc(100% + 8px)',
        }}
      >
        {
          posts.map((p: any, i: number) => (
            <Box
              className={i % 2 === 0 ? 'even' : 'odd'}
              key={`masonry-item--post-${p.id}`}
              sx={{
                padding: '8px 0 0 8px',
              }}
            >
              <PostView post={p} key={`post-${p.id}`}/>
            </Box>
          ))
        }
      </Masonry>
    </>
  )
}

export default UserAchievementsPage;
