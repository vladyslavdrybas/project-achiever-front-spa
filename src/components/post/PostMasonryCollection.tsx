import React from "react";
import {Box} from "@mui/material";
import PostView from "@/components/post/PostView";
import {Masonry} from "@mui/lab";

interface PostMasonryProps {
  posts: any[];
}

const PostMasonryCollection: React.FunctionComponent<PostMasonryProps> = ({posts}) => {
  return (
    <Masonry
      className="post-masonry"
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
            className={`post-order-${i}`}
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
  )
}

export default PostMasonryCollection;
