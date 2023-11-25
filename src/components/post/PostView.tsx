import React from "react";
import {
    Paper,
} from "@mui/material";
import {TPostViewResponse} from "@/api/types";
import UserInfoStripe from "@/components/user/UserInfoStripe";
import PostAchievementView from "@/components/post/PostAchievementView";
import PostTabs from "@/components/post/PostTabs";

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

    return (
        <Paper
            className={`post post-${post.id} post-${post.type} post-${post.data.object.toLowerCase()}`}
            sx={{
                mb: 2,
                p: 1,
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                alignItems: "start",
                alignContent: "center",
            }}
        >
            <UserInfoStripe user={post.data.owner} />
            {renderPostContent(post)}
            <PostTabs post={post}/>
        </Paper>
    )
}

export default PostView;