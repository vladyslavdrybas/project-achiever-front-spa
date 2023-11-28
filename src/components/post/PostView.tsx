import React from "react";
import {
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import {TPostViewResponse} from "@/api/types";
import UserInfoStripe from "@/components/user/UserInfoStripe";
import PostAchievementView from "@/components/post/PostAchievementView";
import PostTabs from "@/components/post/PostTabs";
// import PostThumbnail from "@/components/post/PostThumbnail";
import DateW3c from "@/util/DateW3c";
import {config} from "@/config";

interface PostViewProps {
    post: TPostViewResponse;
}

const PostView: React.FunctionComponent<PostViewProps> = ({post}) => {
  console.log('PostView', post);

  const renderPostContent = (post: TPostViewResponse) => {
      switch (post.data.object.toLowerCase()) {
          case 'achievement':
              return <PostAchievementView achievement={post.data}/>;
          default:
              return <></>
      }
  }

  const isNew = Math.floor(((new DateW3c()).getTime() - (new DateW3c(post.createdAt)).getTime())/1000) < config.post.periodOfNewInSeconds;

  return (
    <Paper
        className={`post post-${post.id} post-${post.type} post-${post.data.object.toLowerCase()}`}
        sx={{
            // mb: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "start",
            alignContent: "center",
        }}
    >
      <UserInfoStripe user={post.owner} />

      <Typography
        className="post-title"
        variant="body1"
        component="div"
      >
        {post.data.title}{isNew && (<Chip variant="new" label="new" color="success"/>)}
      </Typography>

      {/*<PostThumbnail post={post}/>*/}

      {renderPostContent(post)}

      <PostTabs post={post}/>
    </Paper>
  )
}

export default PostView;
