import React from "react";
import {Box} from "@mui/material";
import {thumb} from "@/artifacts/faked";

interface PostThumbnailProps {
  post: any;
}

const PostThumbnail: React.FunctionComponent<PostThumbnailProps> = ({post}) => {
  const thumbnail = post.thumbnail ?? thumb();

  return (
    <>
    {thumbnail && (
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          p: 1,
          width: '100%',
        }}
      >
        <Box
          component="img"
          className="post-thumbnail"
          sx={{
            maxHeight: '377px',
            maxWidth: '100%',
          }}
          src={thumbnail}
          alt={post.data.title}
        />
      </Box>
    )}
    </>
  )
}

export default PostThumbnail;
