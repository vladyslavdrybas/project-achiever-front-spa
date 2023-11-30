import React, {useState} from "react";
import {TAchievementPrerequisites, TPostViewResponse} from "@/api/types";
import {
    Box,
    Tab,
} from "@mui/material";
import {
    TabContext,
    TabList,
    TabPanel,
} from "@mui/lab";
import AchievementPrerequisiteTree from "@/components/post/AchievementPrerequisiteTree";
import {getAchievementPrerequisites} from "@/util/AchievementUtils";
import {toast} from "react-toastify";
import Loading from "@/components/Loading";
import ShareButtons from "@/components/ShareButtons";
import {generatePostUrl} from "@/util/UrlGenerator";

interface PostTabsProps {
    post: TPostViewResponse;
}

const PostTabs: React.FunctionComponent<PostTabsProps> = ({post}) => {
    const [value, setValue] = useState<string>('none');
    const [prerequisites, setPrerequisites] = useState<TAchievementPrerequisites|null>(null);

    const handlePostTabChange = async (event: React.SyntheticEvent, newValue: string) => {
        console.log(newValue);
        console.log(prerequisites);
        if (newValue.startsWith('post-prerequisites') && !prerequisites) {
            showPrerequisites(post.data);
        }
        setValue(newValue);
    };

    const showPrerequisites = async (achievement:any) => {
        try {
            const p = await getAchievementPrerequisites(achievement);
            setPrerequisites(p);
        } catch (e:any) {
            console.log(e);
            toast.error(e?.message ?? 'Prerequisites load. Unknown error.');
        }
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handlePostTabChange} aria-label="post details">
                        <Tab label="Share" value={`post-share-${post.id}`} />
                        <Tab label="Comments" value={`post-comments-${post.id}`} />
                        {post.data.object.toLowerCase() === 'achievement' && (
                            <Tab label="Prerequisites" value={`post-prerequisites-${post.id}`} />
                        )}
                    </TabList>
                </Box>
                <TabPanel value={`post-share-${post.id}`}>
                    <ShareButtons shareUrl={generatePostUrl(post)} title={post.title}/>
                </TabPanel>
                <TabPanel value={`post-comments-${post.id}`}>
                    Comments
                </TabPanel>
                {post.data.object.toLowerCase() === 'achievement' && (
                    <TabPanel value={`post-prerequisites-${post.id}`}>
                        {null === prerequisites ? (<Loading />) : (<AchievementPrerequisiteTree prerequisites={prerequisites}/>)}
                    </TabPanel>
                )}
            </TabContext>
        </Box>
    )
}

export default PostTabs;
