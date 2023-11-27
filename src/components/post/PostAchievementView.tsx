import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

interface PostAchievementProps {
    achievement: any;
}

const PostAchievementView: React.FunctionComponent<PostAchievementProps> = ({achievement}) => {
    return (
        <Card
            className="post-card"
            sx={{
                mt: 0,
            }}
        >
            <CardHeader
                className="post-header"
                subheader={
                    <Box
                        className="post-achievement-dates"
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          alignItems: 'start',
                          alignContent: 'center',
                        }}
                    >
                      <Typography
                        className="post-achievement-done-at date"
                        variant="body1"
                        component="div"
                        sx={{
                          mr: {xs: 1, md: 2},
                        }}
                      >
                        {achievement.doneAt !== null ? "start: " + achievement.doneAt.toUserView() : "in progress"}
                      </Typography>
                      <Typography
                          className="post-achievement-done-at date"
                          variant="body1"
                          component="div"
                      >
                              {achievement.doneAt !== null ? "complete: " + achievement.doneAt.toUserView() : "in progress"}
                      </Typography>
                    </Box>
                }
            />
            <CardContent
                className="post-achievement-card-content"
            >
                <Typography
                    className="post-description"
                    variant="body1"
                    component="div"
                >
                    {achievement.description}
                </Typography>

                <Box
                    className="post-tags flex-row-start"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'start',
                        alignContent: 'center',
                        marginTop: '8px',
                    }}
                >
                    {
                        achievement.tags.map((t:any) => (
                            <Typography
                                className="post-tag"
                                variant="body1"
                                component="span"
                                sx={{
                                    mr: 2,
                                }}
                            >
                                #{t}
                            </Typography>
                        ))
                    }
                </Box>
            </CardContent>
        </Card>
    )
}

export default PostAchievementView;
