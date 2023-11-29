import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

interface PostListProps {
  list: any;
}

const PostListView: React.FunctionComponent<PostListProps> = ({list}) => {
  return (
    <Card
      className="post-card"
      sx={{
        mt: 0,
      }}
    >
      <CardHeader
        component={"div"}
        className="post-header"
        subheader={
          <Box
            className="post-subheader"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'center',
              alignContent: 'flex-start',
            }}
          >
            <Typography
              className="date-created-at date"
              variant="body1"
              component="div"
              sx={{
                mr: {xs: 1, md: 2},
              }}
            >
              created: {list.createdAt.toUserView()}
            </Typography>
            <Typography
              className=""
              variant="body1"
              component="div"
              sx={{
                mr: {xs: 1, md: 2},
              }}
            >
              achievements: {list.achievementsAmount > 0 ? list.achievementsAmount : 'none'}
            </Typography>
          </Box>
        }
      />
      <CardContent
        className="post-card-content"
      >
        <Typography
          className="post-description"
          variant="body1"
          component="div"
        >
          {list.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PostListView;
