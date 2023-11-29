import React from "react";
import {Box} from "@mui/material";
import PostView from "@/components/post/PostView";

interface PostMasonryProps {
  posts: any[];
}

const PostListCollection: React.FunctionComponent<PostMasonryProps> = ({posts}) => {
  return (
    <Box
      className="post-list"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {
        posts.map((p: any, i: number) => (
          <Box
            className={`post-order-${i}`}
            key={`list-item--post-${p.id}`}
            sx={{
              padding: '0 0 8px 0',
            }}
          >
            <PostView post={p} key={`post-${p.id}`}/>
          </Box>
        ))
      }
    </Box>
  )
}

export default PostListCollection;
