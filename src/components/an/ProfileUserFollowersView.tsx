import React from "react";
import {
  Paper,
  Link,
  Avatar,
  Box,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {TProfileResponse} from "@/api/types";

interface ProfileUserListsViewProps {
  profile: TProfileResponse|null;
  followers: any;
}

const ProfileUserFollowersView: React.FunctionComponent<ProfileUserListsViewProps> = ({profile, followers}) => {
  return (null === profile || followers.length === 0) ? (<></>) : (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "start",
        alignContent: "center",
        p: 1,
        mb: 1,
      }}
    >
      <Link
        className="list-title-link router-link"
        component={RouterLink}
        to={`/ann/${profile.username}/followers`}
        sx={{
          mb: 1,
        }}
      >
        Followers
      </Link>
      {followers.map((l:any) => (
        <Box
          className="user-stripe flex-row-start"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'start',
            alignContent: 'center',
            mt: 1,
          }}
        >
          <Avatar
            className="user-stripe "
            src={l.avatar}
          />
          <Link
            className="list-item-link router-link"
            component={RouterLink}
            to={`/ann/${l.username}`}
            sx={{
              mt: '0.5rem',
              pl: 1,
            }}
          >
            {l.name}
          </Link>
        </Box>
      ))}
    </Paper>
  )
}

export default ProfileUserFollowersView;
